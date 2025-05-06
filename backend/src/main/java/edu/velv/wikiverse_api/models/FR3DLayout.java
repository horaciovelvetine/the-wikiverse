package edu.velv.wikiverse_api.models;

import java.awt.Dimension;
import java.util.Set;
import java.util.ConcurrentModificationException;
import java.util.Optional;

import io.vavr.Tuple2;

import com.google.common.base.Function;
import com.google.common.base.Functions;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

import edu.velv.wikiverse_api.models.core.Point3D;
import edu.velv.wikiverse_api.models.core.RequestMetadata;
import edu.velv.wikiverse_api.models.core.Vertex;
import edu.velv.wikiverse_api.models.core.WikiverseError;
import edu.velv.wikiverse_api.models.core.Edge;
import edu.velv.wikiverse_api.models.core.Graphset;

public class FR3DLayout {
  /**
   * Original request provides data access for which the layout is calculated... 
   * Private to prevent potentially messy bi-directional access
   */
  private ClientRequest request;
  /**
   * Stores Vertices with a Point3D as a quickly traverseable <key, value> pair which stores their current position in the FR3DLayout overall.
   * When the layout process is complete this storage will contain the final 'important' data which is then re-written to the vertex.position(Point3D)
   * and transmitted to the client.
   */
  LoadingCache<Vertex, Point3D> locationData = CacheBuilder.newBuilder().build(new CacheLoader<Vertex, Point3D>() {
    public Point3D load(Vertex v) throws Exception {
      return new Point3D();
    }
  });
  /**
   * Stores Vertices with a Point3D in a quickly traverseable <key, value> pair which stores an accrued offset value which represents a Vertices 'per-iteration'
   * movement throughtout the algorithim process. At the beginning of each iteration this value is reset for each Vertex in the Graphset to xyz[0,0,0], and at the end
   * of the process it is used to calculate and update locationData.
   */
  LoadingCache<Vertex, Point3D> offsetData = CacheBuilder.newBuilder().build(new CacheLoader<Vertex, Point3D>() {
    public Point3D load(Vertex v) throws Exception {
      return new Point3D();
    }
  });

  /**
   * Used in calculations to prevent 0 division errors
   */
  private final double EPSILON = 0.000001D;

  /**
   * The number of iterations over the Graphset's vertices accumulated to build the locationData or 'layout'
   */
  private int curIteration;

  /**
   * Iterative framework for simulating the physical process of 'annealing' which in the layout process 'cool's' or reduces the amount of iterative movement any
   * one Vertex can make in a single iteration to allow a layout to positions stablize more consistently. 
   */
  private double temperature;

  /**
   * Simulation force constant's used for force calculations between Vertices 
   */
  private double forceConst;
  private double attrConst;
  private double repConst;

  /**
   * Value sets curve for how temperature cools in a layout across iterations
   */
  private final Integer tempMult = 10;

  /**
   * Maximum iterations allowed before the layout is 'good enough', prevent's perfectionism
   */
  private final Integer maxStepIterations = 250;

  /**
   * Maximum distance units allowed for any one Vertex on a given iteration.
   */
  private final Integer maxIterMvmnt = 30;

  /**
   * Default constructor, provides access to original data-set
   */
  public FR3DLayout(ClientRequest request) {
    this.request = request;
  }

  /**
  * Main function of the layout. Given a vertex, returns the 3D coordinates representing that point
  * in the layout.
  *
  * @param Vertex to get the location data of
  * @return Point3D position
  */
  public Point3D apply(Vertex v) {
    return this.getLocationData(v);
  }

  /**
  * Calls each each initializer method in a single helper, scaling dimensions, initializing positions, then calculating and intializing layout constants related to force and step iterations.
  */
  public void initializeLayout() {
    initializeLayoutConstants();
    scaleDimensionsToGraphsetSize();
    initializeWithRandomLocations();
  }

  /**
   * Moves the algorithm exactly 1 step forward - calculating the cumulative offset effected on each member of the Graphset
   * then applying that cumulative offset to each Vertice's current location to move to their new 'better fit' position
   * 
   * @apiNote This approach explicitly ignores and retries when data is concurrently modified
   */
  public void step() {
    Graphset graph = request.graph;
    curIteration++;
    while (true) {
      try {
        for (Vertex v : graph.getVertices()) {
          if (v.isLocked())
            continue;
          calcRepulsion(v);
        }
        break;
      } catch (ConcurrentModificationException cme) {
      }
    }
    while (true) {
      try {
        for (Edge e : graph.getEdges()) {
          calcAttraction(e);
        }
        break;
      } catch (ConcurrentModificationException cme) {
      }
    }
    while (true) {
      try {
        for (Vertex v : graph.getVertices()) {
          if (v.isLocked())
            continue;
          calcPosition(v);
        }
        break;
      } catch (ConcurrentModificationException cme) {
      }
    }
    cool();

    if (curIteration % 100 == 0) {
      adjustForceConstants();
    }
  }

  /** 
  * Checks wether or not the current layout has reached either the maximum iterations or an acceptable temperature.
  */
  public boolean done() {
    return curIteration > maxStepIterations || temperature < 1.0 / maxDim();
  }

  /**
   * Wraps all of the needed API calls and while loop logic in order to create the layout for the request`
   */
  public Optional<WikiverseError> runLayoutProcess() {
    try {
      initializeLayout();
      while (!done()) {
        step();
      }
      request.graph.updateVertexCoordinatesFromLayout(this);
      return Optional.empty();
    } catch (Exception e) {
      return Optional.of(new WikiverseError.ServiceFault(e.getMessage(),
          "FR3DLayout.java::runLayoutProcess() @ " + e.getStackTrace().toString()));
    }
  }

  //=====================================================================================================================>
  //=====================================================================================================================>
  //=====================================================================================================================>
  //=====================================================================================================================>
  //=====================================================================================================================>
  //! PRIVATE HELPERS...
  //=====================================================================================================================>

  /**
   * Sets the 'physical' constants used in each calculation for the layout, these define the overall shape
   */
  private void initializeLayoutConstants() {
    curIteration = 0;
    RequestMetadata meta = this.request.metadata;
    temperature = meta.getDimensions().getWidth() / tempMult;
    forceConst = Math
        .sqrt(meta.getDimensions().getHeight() * meta.getDimensions().getWidth()
            / request.graph.getVertices().size());
    attrConst = forceConst * meta.getAttractionMultiplier();
    repConst = forceConst * meta.getRepulsionMultiplier();
  }

  /**
  * Calculates the density of Vertices in the overall space, then scales them to be placed in a way which makes them 
  * the most readable for the Client (application). Simple mean calculates current density, then uses it to scale and
  * setSize() for the layout with the scaled width and height.
  *
  * @apinote Uses the maximum of Width || Height for Depth
  */
  private void scaleDimensionsToGraphsetSize() {
    Graphset graph = this.request.graph;
    Dimension dims = this.request.metadata.getDimensions();

    // starting dimensions
    int startWidth = (int) dims.getWidth();
    int startHeight = (int) dims.getHeight();
    int startDepth = (int) this.maxDim();
    // starting density
    int vertCount = graph.getVertices().size() > 0 ? graph.getVertices().size() : 1;
    double startVol = startDepth * startHeight * startWidth;
    double startDens = (vertCount * Math.pow(20, 3) / startVol);
    // scaling (uses metadata.layoutSize from the client to determine the size of the layout)
    double scale = Math.cbrt(startDens / this.request.metadata.getLayoutSize());
    int scWidth = (int) Math.ceil(startWidth * scale);
    int scHeight = (int) Math.ceil(startHeight * scale);

    this.request.metadata.setDimensions(new Dimension(scWidth, scHeight));
  }

  /**
  * Composes a chain function to call which guarentees unrelated Random Positions are initialized for any unlocked Vertex.
  * This needs to be called before the step() function is called for the layout to work correctly.
  *
  * @param initializer - any function which given a Vertex provides a Point3D in return
  */
  private void initializeWithRandomLocations() {
    Function<Vertex, Point3D> randomizer = new RandomPoint3D<>(
        this.request.metadata.getDimensions());

    Function<Vertex, Point3D> chain = Functions.<Vertex, Point3D, Point3D>compose(new Function<Point3D, Point3D>() {
      public Point3D apply(Point3D input) {
        return (Point3D) input.clone();
      }
    }, new Function<Vertex, Point3D>() {
      public Point3D apply(Vertex v) {
        if (v.isLocked() && v.getPosition() != null) {
          return v.getPosition();
        } else {
          return randomizer.apply(v);
        }
      }
    });
    this.locationData = CacheBuilder.newBuilder().build(CacheLoader.from(chain));
    //? sets up corresponding {K,V} to ref -> ea. iter resets to: {0,0,0}
    this.offsetData = CacheBuilder.newBuilder().build(CacheLoader.from(chain));
  }

  /**
   * Gets the offset data from the cache for the provided Vertex
   */
  private Point3D getOffsetData(Vertex v) {
    return offsetData.getUnchecked(v);
  }

  /**
   * Gets the location data from the cache for the provided Vertex
   */
  private Point3D getLocationData(Vertex v) {
    return locationData.getUnchecked(v);
  }

  /**
   * Gets the largest of the two Dimensions (used for a depth (Z) value throghout app)
   */
  private double maxDim() {
    Dimension dims = this.request.metadata.getDimensions();
    return Math.max(dims.getWidth(), dims.getHeight());
  }

  /**
   * Update the current offset values for the given vertex using the displacement values provided
   * scaling in to oppose forces on an opposing locked vertex - still allowing the full intended adjustment.
   * @param Vertex
   * @param displacement of X 
   * @param displacement of Y
   * @param displacement of Z 
   */
  private void updateOffset(Vertex v, double dx, double dy, double dz, double scale) {
    Point3D curOffset = getOffsetData(v);
    double newX = curOffset.getX() + (scale * dx);
    double newY = curOffset.getY() + (scale * dy);
    double newZ = curOffset.getZ() + (scale * dz);
    curOffset.setLocation(newX, newY, newZ);
  }

  private double xDelt(Point3D p1, Point3D p2) {
    return p1.getX() - p2.getX();
  }

  private double yDelt(Point3D p1, Point3D p2) {
    return p1.getY() - p2.getY();
  }

  private double zDelt(Point3D p1, Point3D p2) {
    return p1.getZ() - p2.getZ();
  }

  /**
   * Called once per-step() this simulates the physical 'annealing' process by decreasing overall temperature as
   * the algorithim steps, allowing for less overall movement and a measure of 'completeness'
   */
  private void cool() {
    temperature *= (1.0 - curIteration / (double) maxStepIterations);
  }

  /**
   * Called every 100 iterations to adjust forces based on how the overall layout is proceeding, overall leads to 
   * more consistent layout performance by tweaking each value to force constant to nudge the layout towards balance
   */
  private void adjustForceConstants() {
    double averageRepulsionForce = calculateAverageRepulsionForce();
    double averageAttractionForce = calculateAverageAttractionForce();

    if (averageRepulsionForce > averageAttractionForce) {
      repConst *= 0.9;
      attrConst *= 1.1;
    } else if (averageAttractionForce > averageRepulsionForce) {
      repConst *= 1.1;
      attrConst *= 0.9;
    }
  }

  /**
   * The average of all repulsive forces between each Vertex used to assess
   * current status of the layout for dynamic adjustment during the layout step process
   */
  private double calculateAverageRepulsionForce() {
    double totalRepulsionForce = 0;
    int count = 0;
    Set<Vertex> verts = request.graph.getVertices();
    for (Vertex v1 : verts) {
      for (Vertex v2 : verts) {
        if (v1 != v2) {
          Point3D p1 = getLocationData(v1);
          Point3D p2 = getLocationData(v2);
          double dl = p1.distance(p2);
          double repForce = (repConst * repConst) / dl;
          totalRepulsionForce += repForce;
          count++;
        }
      }
    }

    return totalRepulsionForce / count;
  }

  /**
   * The average of all attractive forces between each existing Edge's endpoints used to assess 
   * current status of the layout for dynamic adjustment during the layout step process
   */
  private double calculateAverageAttractionForce() {
    double totalAttractionForce = 0;
    int count = 0;
    Set<Edge> eds = request.graph.getEdges();

    for (Edge e : eds) {
      Optional<Tuple2<Vertex, Vertex>> endpoints = request.graph.getEndpoints(e);
      if (endpoints.isEmpty()) {
        continue;
      }
      Vertex v1 = endpoints.get()._1();
      Vertex v2 = endpoints.get()._2();

      Point3D p1 = getLocationData(v1);
      Point3D p2 = getLocationData(v2);

      double dl = p1.distance(p2);
      double force = dl * dl / attrConst;
      totalAttractionForce += force;

      count++;
    }

    return totalAttractionForce / count;
  }

  /**
   * Clamps the magnitude of the movement allowed on any iteration within the application.properties set limit, also limiting the movement if the Vertex is currently locked  
   */
  private double clampToMaxIterMvmnt(double disp, Vertex vert) {
    double maxMvmntLim = maxIterMvmnt;
    return Math.max(-maxMvmntLim, Math.min(maxMvmntLim, disp));
  }

  /**
  * Clamps the given value to the dimensions and return a new Point inside the dimensions boundaries
  */
  private Point3D clampNewPositionsToDimensions(double newX, double newY, double newZ) {
    Dimension dims = request.metadata.getDimensions();

    double maxX = dims.getWidth();
    double maxY = dims.getHeight();
    double maxZ = maxDim();

    newX = Math.max(-maxX, Math.min(maxX, newX));
    newY = Math.max(-maxY, Math.min(maxY, newY));
    newZ = Math.max(-maxZ, Math.min(maxZ, newZ));

    return new Point3D(newX, newY, newZ);
  }

  //=====================================================================================================================>
  //! FORCE CALCULATIONS...
  //=====================================================================================================================>
  //=====================================================================================================================>
  //=====================================================================================================================>
  //=====================================================================================================================>
  //=====================================================================================================================>

  protected void calcRepulsion(Vertex v1) {
    Point3D curOffset = getOffsetData(v1);
    if (curOffset == null) // Vertex is not part of initialized set
      return;

    curOffset.setLocation(0, 0, 0); // Offset resets here on each this.step()

    try {
      for (Vertex v2 : request.graph.getVertices()) {
        if (v1.equals(v2))
          continue;

        if (v1.isLocked() && v2.isLocked())
          continue;

        Point3D p1 = getLocationData(v1);
        Point3D p2 = getLocationData(v2);

        if (p1 == null || p2 == null)
          continue;

        double deltaLen = Math.max(EPSILON, p1.distance(p2));
        double force = (repConst * repConst) / deltaLen;

        if (Double.isNaN(force)) {
          throw new RuntimeException("calcRepulsion(): unexpected force value");
        }

        double xDisp = (xDelt(p1, p2) / deltaLen) * force;
        double yDisp = (yDelt(p1, p2) / deltaLen) * force;
        double zDisp = (zDelt(p1, p2) / deltaLen) * force;
        updateOffset(v1, xDisp, yDisp, zDisp, 1);
      }
    } catch (ConcurrentModificationException cme) {
      calcRepulsion(v1);
    }
  }

  //=====================================================================================================================>
  //=====================================================================================================================>

  protected void calcAttraction(Edge e) {
    Optional<Tuple2<Vertex, Vertex>> endpoints = request.graph.getEndpoints(e);
    if (endpoints.isEmpty())
      return;

    Vertex v1 = endpoints.get()._1();
    Vertex v2 = endpoints.get()._2();

    if (v1.isLocked() && v2.isLocked())
      return;

    Point3D p1 = getLocationData(v1);
    Point3D p2 = getLocationData(v2);

    if (p1 == null || p2 == null)
      return;

    double deltaLen = Math.max(EPSILON, p1.distance(p2));
    double force = (deltaLen * deltaLen) / attrConst;

    if (Double.isNaN(force))
      throw new IllegalArgumentException("NaN in repulsion force calc.");

    double xDisp = (xDelt(p1, p2) / deltaLen) * force;
    double yDisp = (yDelt(p1, p2) / deltaLen) * force;
    double zDisp = (zDelt(p1, p2) / deltaLen) * force;

    int v1Scale = v2.isLocked() ? 5 : 1;
    int v2Scale = v1.isLocked() ? 5 : 1;
    // negative to push in opposite directions
    updateOffset(v1, -xDisp, -yDisp, -zDisp, v1Scale);
    updateOffset(v2, xDisp, yDisp, zDisp, v2Scale);

  }

  //=====================================================================================================================>
  //=====================================================================================================================>

  protected void calcPosition(Vertex v) {
    Point3D offset = getOffsetData(v);
    if (offset == null)
      return;

    Point3D location = getLocationData(v);

    double deltaLen = Math.max(EPSILON,
        Math.sqrt((offset.getX() * offset.getX()) + (offset.getY() * offset.getY()) + (offset.getZ() * offset.getZ())));

    double xDisp = offset.getX() / deltaLen * Math.min(deltaLen, temperature);
    double yDisp = offset.getY() / deltaLen * Math.min(deltaLen, temperature);
    double zDisp = offset.getZ() / deltaLen * Math.min(deltaLen, temperature);

    if (Double.isNaN(xDisp) || Double.isNaN(yDisp) || Double.isNaN(zDisp))
      throw new IllegalArgumentException("NaN value found in update position displacement calcs");

    double nX = location.getX() + clampToMaxIterMvmnt(xDisp, v);
    double nY = location.getY() + clampToMaxIterMvmnt(yDisp, v);
    double nZ = location.getZ() + clampToMaxIterMvmnt(zDisp, v);

    location.setLocation(clampNewPositionsToDimensions(nX, nY, nZ));
  }
}
