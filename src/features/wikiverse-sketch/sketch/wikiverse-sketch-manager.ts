import InterTightFont from "../../../assets/fonts/InterTight-VariableFont_wght.ttf";
// P5 Imports
import { Font } from "p5";
import { P5CanvasInstance } from "@p5-wrapper/react";
// Sketch Classes
import { Vertex, Graphset, ReactDispatcher, ManagedCamera, Edge } from ".";
// Site Imports
import {
  SketchSettingsState,
  SketchUpdateProps,
  TagData,
} from "../../../types";
import { getWikiverseSketchContainer } from "../../../functions";
import { MinMaxSet } from "../types";

export class WikiverseSketchManager {
  private p5: P5CanvasInstance<SketchUpdateProps>;
  private p5Font: Font | undefined;

  // internal sketch data and class instances...
  readonly data: Graphset = new Graphset();
  readonly dispatcher: ReactDispatcher = new ReactDispatcher();
  readonly cam: ManagedCamera;
  // state
  private _showBoundingBox: boolean = false;
  private _showOrientationAxis: boolean = false;
  private _clickToFetch: boolean = false;
  private _settingsMenuShown: boolean = false;

  constructor(p5: P5CanvasInstance<SketchUpdateProps>) {
    this.p5 = p5;
    this.cam = new ManagedCamera(p5);
  }

  /**
   * Load the site font for use inside of the sketch (for labels)
   */
  preloadFont() {
    this.p5Font = this.p5.loadFont(InterTightFont);
  }

  /**
   * Set the font to use inside of the sketch
   */
  setFont() {
    if (this.p5Font) this.p5.textFont(this.p5Font);
  }

  /**
   * Initial method used to create a new canvas (defaults to a 3D Canvas)
   */
  createCanvas() {
    const container = getWikiverseSketchContainer();
    if (container) {
      this.p5.createCanvas(
        container.clientWidth + 4,
        container.clientHeight,
        this.p5.WEBGL
      );
    }
    // this.p5.createCanvas(innerWidth - 100, innerHeight, this.p5.WEBGL);
  }

  /**
   * Handle the window resizing, adjusts canvas to match new dimensions
   */
  handleWindowResize() {
    const container = getWikiverseSketchContainer();
    if (container) {
      this.p5.resizeCanvas(container.clientWidth + 4, container.clientHeight);
    }
  }

  /**
   * Draw the needed primary UI elements required to be drawn on every frame. E.g. the Background
   */
  drawSketchUI() {
    this.p5.background("black");
    // Sets up control schema
    if (!this._settingsMenuShown) {
      // Setup controls for orbiting
      this.p5.orbitControl(
        this.cam.xSensitivity,
        this.cam.ySensitivity,
        this.cam.zSensitivity
      );
    }

    // State based UI to draw
    this.p5.push();
    const minMax = this.data.getMinimumsAndMaximumsInSet();
    this.p5.translate(0, 0, 0);
    this.drawBoundingBox(minMax);
    this.displayOrientationAxisUI(minMax);
    this.p5.pop();
  }

  /**
   * Draws all visible vertices in the sketch.
   *
   * This method iterates through each {@link Vertex} in the graph, skipping any vertices that are marked as hidden
   * or excluded (via active vertex filters). For each vertex to be drawn, it calls the vertex's {@link Vertex.draw}
   * method, passing in the p5 instance and a boolean indicating whether the vertex is currently selected.
   * Selected vertices are visually distinguished from others.
   *
   * Hidden or excluded vertices are not drawn.
   */
  drawVertices() {
    for (const vert of this.data.vertices) {
      // Skip Hidden/Excluded Vertices
      if (vert.hidden || this.data.vertexIsExcluded(vert)) {
        continue;
      }

      vert.draw(this.p5, this.data.isSelected(vert));
    }
  }

  /**
   * Iterates through all tags in the graph and draws their UI elements based on tag settings.
   *
   * For each tag in the graph:
   *  - If the tag's `displayBoundingBox` is true, draws a bounding box around the vertices associated with the tag.
   *  - If the tag's `displayConnectingEdges` is true, draws lines connecting the tag's associated vertices.
   *
   * This method enables grouped or highlighted visualization of vertices according to tag-based categories.
   */
  drawTags() {
    for (const tag of this.data.tags) {
      if (tag.displayBoundingBox) {
        this.drawTagsBoundingBox(
          this.data.getMinimumsAndMaximumsInSet(tag.vertexIDs),
          tag
        );
      }

      if (tag.displayConnectingEdges) {
        this.drawTagsEdges(tag);
      }
    }
  }

  /**
   * Renders the label and related UI elements for the currently selected vertex.
   *
   * This method checks if there is a selected vertex in the graph. If so, it retrieves
   * the corresponding {@link Vertex} object, and calls its `drawLabel` method to
   * display the vertex's label using the p5 instance, font, and camera.
   * Additionally, it calls `drawRelatedEdgesUI` to highlight edges related to the selected vertex.
   *
   * If no vertex is currently selected, this method does nothing.
   */
  drawSelectedVertexUI() {
    if (!this.data.selectedVertex) return;

    const selected = this.data.vertices.find(
      v => v.id === this.data.selectedVertex?.id
    );

    if (!selected) return;

    selected.drawLabel(this.p5, this.p5Font, this.cam.P5CAM);
    this.drawRelatedEdgesUI(selected);
  }

  /**
   * Renders the label and UI for the currently hovered vertex, if any.
   *
   * Locates the vertex being hovered over (if one exists) and uses its
   * `drawLabel` method to display its label in the sketch with the current
   * p5 instance, font, and camera. Also draws UI elements associated with
   * this hovered vertex.
   *
   * Does nothing if there is no hovered vertex.
   */
  drawHoveredVertexUI() {
    if (!this.data.hoveredVertex) return;

    const hovered = this.data.vertices.find(
      v => v.id === this.data.hoveredVertex?.id
    );

    if (!hovered) return;

    hovered!.drawLabel(this.p5, this.p5Font, this.cam.P5CAM);
    this.drawRelatedEdgesUI(hovered);
  }

  /**
   * Check if the mouse is positioned over/on an { @see Vertex } and returns null if not.
   */
  mousePositionedOnVertex(): Vertex | null {
    let target: Vertex | null = null;

    for (const v of this.data.vertices) {
      if (v.traceRay(this.p5, this.cam.P5CAM)) target = v;
    }

    return target;
  }

  //? PROPS/STATE UPDATES
  //?=================================================================>
  //?=================================================================>
  setSettingsMenuShown(showSettingsMenu: boolean) {
    this._settingsMenuShown = showSettingsMenu;
  }

  settingsMenuShown() {
    return this._settingsMenuShown;
  }

  setSketchSettings(sketchSettings: SketchSettingsState) {
    const { clickToFetch, showBoundingBox, showOrientationAxis } =
      sketchSettings;

    if (clickToFetch.value !== this._clickToFetch) {
      this._clickToFetch = clickToFetch.value;
    }

    if (showBoundingBox.value !== this._showBoundingBox) {
      this._showBoundingBox = showBoundingBox.value;
    }

    if (showOrientationAxis.value !== this._showOrientationAxis) {
      this._showOrientationAxis = showOrientationAxis.value;
    }
  }

  //?=================================================================>
  //?=================================================================>

  /**
   * Draws all edges related to a given vertex in the sketch UI.
   *
   * This method iterates through all edges connected to the specified vertex,
   * determines the "alternate" vertex at the other end of each edge, and renders
   * a line between the vertices in the 3D (or 2D) canvas space. The visual
   * appearance of the edge (stroke color) is set based on whether the edge is
   * parallel (bidirectional), and the direction of the edge relative to the vertex.
   *
   * @param v1 - The vertex whose related edges should be drawn.
   */
  /**
   * Draws all edges connected to a given vertex in the sketch UI.
   * - For bidirectional (parallel) edges, only draws one to avoid duplicate lines.
   * - Sets color based on edge direction and parallelness.
   */
  private drawRelatedEdgesUI(vertex: Vertex) {
    const relatedEdges = this.data.getRelatedEdges(vertex);
    if (relatedEdges.length === 0) return;

    relatedEdges.forEach(edge => {
      const otherVertex = this.data.getAlternateVertex(edge, vertex);
      // If no other vertex, dont display the edge
      if (!otherVertex || otherVertex.hidden) return;
      // If no property, don't display the edge
      const property = this.data.properties.find(p => p.id === edge.propertyID);
      if (!property || property.hidden) return;
      // If other vertex has existing filter, don't draw this edge
      if (this.data.vertexIsExcluded(otherVertex)) return;
      // If property has an existing filter, dont draw this edge
      if (this.data.propertyIsExcluded(edge.propertyID)) return;

      const parallelEdge = edge.hasParallelEdge(relatedEdges);

      // For parallel (bidirectional) edges, only draw one:
      // Always keep the edge with the lexicographically lower statementID.
      if (parallelEdge) {
        // For consistency, only draw the edge whose statementID is less than the parallel's statementID.
        if (edge.statementID > parallelEdge.statementID) {
          return;
        }
      }

      const { x: x1, y: y1, z: z1 } = vertex.position;
      const { x: x2, y: y2, z: z2 } = otherVertex.position;

      this.setEdgeStrokeColor(vertex, edge, Boolean(parallelEdge));

      // Draw a 3D or 2D line, depending on whether z-coordinates are present
      const hasZCoords = z1 !== undefined && z2 !== undefined;
      if (hasZCoords) {
        this.p5.line(x1, y1, z1, x2, y2, z2);
      } else {
        this.p5.line(x1, y1, x2, y2);
      }
    });
  }

  /**
   * Sets the stroke color for drawing an edge based on its direction and parallel status.
   *
   * - If the edge is parallel to another edge (bidirectional), the stroke will be purple.
   * - If the given vertex (v1) is the source of the edge, the stroke will be red.
   * - Otherwise, the stroke will be blue.
   *
   * @param v1 - The reference vertex involved in the edge.
   * @param e - The edge for which the stroke color is being set.
   * @param isParallel - Whether a parallel (opposite direction) edge exists between the same vertices.
   */
  private setEdgeStrokeColor(v1: Vertex, e: Edge, isParallel: boolean) {
    if (isParallel) {
      this.p5.stroke("purple");
    } else if (e.isSource(v1)) {
      // * OUTWARD EDGE
      this.p5.stroke("red");
    } else {
      // * INWARD EDGE
      this.p5.stroke("blue");
    }
  }

  /**
   * Displays the bounding box UI in the sketch using the supplied minimum and maximum coordinate values.
   *
   * Draws a box in the scene that visualizes the spatial bounds of all vertices, according to the dimensions
   * captured in the provided MinMaxSet. The box is styled with a white stroke, thick outline, and no fill.
   * If the bounding box display is disabled, this method returns immediately.
   *
   * @param minMax - The minimum and maximum values for x, y, and z coordinates,
   *   as calculated across all relevant vertices, which determine the dimensions of the box to draw.
   */
  private drawBoundingBox(minMax: MinMaxSet) {
    if (this._showBoundingBox) {
      this.p5.noFill();
      this.p5.strokeWeight(5);
      this.p5.stroke("rgba(255,255,255,0.5)");
      this.p5.box(minMax.x.diff, minMax.y.diff, minMax.z.diff);
    }
  }

  /**
   * Displays the orientation axis in the sketch, based on the supplied min and max coordinate values.
   *
   * Draws three colored lines (axes) at the origin of the scene to represent the X, Y, and Z axes for orientation.
   * - The X axis is red.
   * - The Y axis is blue.
   * - The Z axis is green.
   * Each axis extends in both positive and negative directions, covering half the width/height/depth captured in the MinMaxSet.
   * If the orientation axis display is disabled, this method returns immediately.
   *
   * @param minMax - The minimum and maximum values for x, y, and z coordinates,
   *   as calculated across all relevant vertices. The differences (diff) are used to determine the axis lengths.
   */
  private displayOrientationAxisUI(minMax: MinMaxSet) {
    if (this._showOrientationAxis) {
      this.p5.push();
      const xLen = minMax.x.diff / 2;
      const yLen = minMax.y.diff / 2;
      const zLen = minMax.z.diff / 2;

      this.p5.strokeWeight(3);
      this.p5.stroke("red");
      this.p5.line(-xLen, 0, 0, xLen, 0, 0);
      this.p5.stroke("blue");
      this.p5.line(0, -yLen, 0, 0, yLen, 0);
      this.p5.stroke("green");
      this.p5.line(0, 0, -zLen, 0, 0, zLen);
      this.p5.noStroke();
      this.p5.pop();
    }
  }

  /**
   * Draws connecting edges between all vertices in a tag group.
   *
   * This method takes the given tag, retrieves its member vertices, and draws lines between
   * every unique pair of those vertices. The stroke color for the lines is set to the tag's color.
   * Lines are drawn in 3D (with z-coordinates) if available, or in 2D otherwise.
   * Edges are only drawn if there are at least two vertices in the tag.
   *
   * @param tag - The TagData object containing vertexIDs and color for connecting edges.
   */
  private drawTagsEdges(tag: TagData) {
    const vertices = this.data.getVertices(tag.vertexIDs);
    // No edges to draw, return
    if (vertices.length <= 1) return;

    // Set stroke color to tag color
    this.p5.stroke(tag.color);
    this.p5.strokeWeight(2);

    // Draw lines between all pairs of vertices
    for (let i = 0; i < vertices.length; i++) {
      const vert1 = vertices[i];

      for (let j = i + 1; j < vertices.length; j++) {
        const vert2 = vertices[j];

        const { x: x1, y: y1, z: z1 } = vert1.position;
        const { x: x2, y: y2, z: z2 } = vert2.position;

        // Draw a 3D or 2D line, depending on whether z-coordinates are present
        const hasZCoords = z1 !== undefined && z2 !== undefined;
        if (hasZCoords) {
          this.p5.line(x1, y1, z1, x2, y2, z2);
        } else {
          this.p5.line(x1, y1, x2, y2);
        }
      }
    }
  }

  /**
   * Draws a bounding box around all vertices belonging to a given tag.
   *
   * This method computes the center and extents of the bounding box using the provided
   * minimum and maximum coordinates of the tag's member vertices and renders a box in the tag's color.
   * The bounding box helps visualize the spatial grouping of all vertices associated with the tag.
   *
   * @param minMax - An object specifying the minimum and maximum x, y, z coordinates for the tag's vertices.
   *                 Also includes the difference ('diff') for each coordinate axis (e.g., minMax.x.diff).
   * @param tag - The TagData object containing style information (e.g., color) used for rendering the bounding box.
   */
  private drawTagsBoundingBox(minMax: MinMaxSet, tag: TagData) {
    // Calculate the center of the tag's vertices
    const centerX = (minMax.x.min + minMax.x.max) / 2;
    const centerY = (minMax.y.min + minMax.y.max) / 2;
    const centerZ = (minMax.z.min + minMax.z.max) / 2;

    this.p5.push();
    this.p5.translate(centerX, centerY, centerZ);
    this.p5.noFill();
    this.p5.strokeWeight(4);
    const colorWithAlpha = this.p5.color(tag.color);
    colorWithAlpha.setAlpha(128); // 128/255 = 50% opacity
    this.p5.stroke(colorWithAlpha);
    this.p5.box(minMax.x.diff, minMax.y.diff, minMax.z.diff);
    this.p5.pop();
  }
}
