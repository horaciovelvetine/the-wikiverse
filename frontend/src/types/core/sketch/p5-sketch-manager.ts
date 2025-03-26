import { P5CanvasInstance } from "@p5-wrapper/react";
import { P5_ManagedCamera } from "./p5-managed-camera";
import { P5_ManagedState } from "./p5-managed-state";
import { Edge, P5_Vertex, SketchTypes, Vertex } from "..";
import { mainDisplayDimensions } from "../../../util/main-display-dimensions";
import { BLUE, PURPLE, RED, SKETCH_BG, WHITE } from "../../../constants/styles";
import { MinMaxSet3D } from "../../other/min-max-set-3D";
import { P5_Graphset } from "./p5-graphset";

export class P5_SketchManager {
  /**
   * Centralizes helpers and methods used to control and change the clients camera inside the sketch
   */
  private cam: P5_ManagedCamera;

  /**
   * Maintains state which is shared in either and in both directions between the sketch and React.
   * Uses a get/set and subscription pattern to maintain state sync across both libraries.
   */
  private state: P5_ManagedState;

  /**
   * Reference to the currently active P5 instance through the ReactP5Wrapper
   */
  private p5!: P5CanvasInstance;

  constructor() {
    this.cam = new P5_ManagedCamera();
    this.state = new P5_ManagedState();
  }

  public canvas() {
    return this.p5;
  }

  public setCanvas(p5: P5CanvasInstance) {
    this.p5 = p5;
  }

  /**
   * @return the current type of sketch displayed on-screen
   */
  public type() {
    return this.state.getType();
  }

  /**
   * @return the current graphset data
   */
  public graphset() {
    return this.state.getGraphset();
  }

  /**
   * @return the {@link P5_ManagedState} which synchronizes sketch state between React and P5.js (the sketch)
   */
  public getState() {
    return this.state;
  }

  /**
   * @method handleSearchTargetClick() - initializes the sketch instance with the provided {@link Vertex} target, and a value for the query.
   */
  public handleSearchTargetClick(result: Vertex, query: string) {
    this.state.setGraphset(
      new P5_Graphset(query, result, mainDisplayDimensions())
    );
    this.state.setType(SketchTypes.WIKIVERSE);
  }

  /**
   * @method createCanvas() - Initializes the p5 canvas according to the size of the dispaly window & setup a 3D instanced canvas.
   */
  public createCanvas() {
    const { width, height } = mainDisplayDimensions();
    this.p5.createCanvas(width, height, this.p5.WEBGL);
  }

  /**
   * @method handleWindowResize() - Helper to resize the window based on the new mainDisplayDimensions grid-size.
   */
  public handleWindowResize() {
    const { width, height } = mainDisplayDimensions();
    this.p5.resizeCanvas(width, height, false);
  }

  /**
   * @method initializeManagedCamera() - Init the camera and manager {@link P5_ManagedCamera} for the sketch, providing canvas instance and camera instance
   * to the manager to let it know on which instances to perform it's methods.
   */
  public initializeManagedCamera() {
    this.cam.setSketch(this.p5);
    const aspectRatio = this.p5.width / this.p5.height;
    const fovRad = 2 * this.p5.atan(this.p5.height / 2 / 800);
    const p5Cam = this.p5.createCamera();
    this.p5.perspective(fovRad, aspectRatio, 1, 12000);
    this.cam.setCamera(p5Cam);
  }

  /**
   * @method setCameraLookAtOrigin() - Animates the position and lookAt of the camera to a position looking at the origin hardcoded at [0,0,0]. This is called at the beginning of the sketch before a real "Graph" exists.
   */

  public setCameraLookAtOrigin() {
    const { x, y, z } = { x: 0, y: 0, z: 0 };
    this.cam.setCurrentPosition(x, y, z + 200);
    this.cam.setLookAtTarget({ x, y, z });
  }

  /**
   * @method drawSketchUI() - draw each piece of the sketch which is required to be called on each frame (p5.draw()), normally for visual elements that remain consistent on-screen across draws.
   */
  public drawSketchRequiredUI() {
    //SKETCH_BG ==> rgb(1,1,14)
    this.p5.background(SKETCH_BG("1"));

    //enable 3D orbit control
    this.p5.orbitControl(
      this.state.getXSensitivity(),
      this.state.getYSensitivity(),
      this.state.getZSensitivity()
    );

    // UI potentially drawn on-screen each frame...
    const boundaries = this.state.getGraphset().getBoundingBoxValues();
    this.p5.push();
    this.p5.translate(0, 0, 0);
    this.drawBoundingBox(boundaries);
    this.drawAxisOrientation(boundaries);
    this.p5.pop();
  }

  /**
   * @method drawVertices() - draw each of the vertices on screen from the {@link P5_Graphset}
   */
  public drawVertices() {
    const graph = this.state.getGraphset();
    if (!graph) {
      console.log("nograph");
      debugger;
    }
    if (!graph.vertices) {
      console.log("no vertices");
      debugger;
    }

    this.state.getGraphset().vertices.forEach(vert => {
      const isCurrentSel = vert.id === this.state.getCurrentlySelected()?.id;
      const edgeCount = this.state.getGraphset().getRelatedEdges(vert).length;
      vert.draw(this.p5, isCurrentSel, edgeCount);
    });
  }

  /**
   * @method drawCurrentlySelectedUI() - draw additional ents on-screen for whichever {@link Vertex} is currently selected, and skips it if none are selected.
   */
  public drawCurrentlySelectedUI() {
    const selected = this.state.getCurrentlySelected();
    if (selected) {
      selected.drawLabel(this.p5, this.cam);
      this.drawRelatedEdgesUI(selected);
    }
  }

  /**
   * @method drawCurrentlyHoveredUI() - draw additional ents on-screen for whichever {@link Vertex} is currently selected, and skips it if none are selected.
   */
  public drawCurrentlyHoveredUI() {
    const hovered = this.state.getCurrentlyHovered();
    if (hovered) {
      hovered.drawLabel(this.p5, this.cam);
      this.drawRelatedEdgesUI(hovered);
    }
  }

  /**
   * @method advanceCamAnimations() - helper to move the underlying cam forwards by one step for the applicable entities which are iterated at a sketch level ( as opposed to an individual entity)
   */
  public advanceCamAnimations() {
    this.cam.advanceAnimations();
  }

  /**
   * @method mousePoisitionedOverVertex() - checks if the mouse is currently hovered over any of the vertices returning the first {@link P5_Vertex} it finds where this is true, or null if no Vertex is currently positioned under the mouse.
   */
  public mousePositionedOverVertex() {
    let target: P5_Vertex | null = null;

    for (const vert of this.state.getGraphset().vertices) {
      if (vert.traceRay(this.p5, this.cam.getCamera())) target = vert;
    }
    return target;
  }

  /**
   *!!//==> PRIVATE METHODS
   *!!//==> PRIVATE METHODS
   *!!//==> PRIVATE METHODS
   */

  /**
   * @method drawRelatedEdgesUI() - draws the connections between a {@link Vertex} and all of the other Vertices to which it is related.
   */
  private drawRelatedEdgesUI(vert: P5_Vertex | null) {
    if (!vert) return;

    const graph = this.state.getGraphset();
    const relatedEdges = graph.getRelatedEdges(vert);
    if (relatedEdges.length === 0) return;

    for (const edge of relatedEdges) {
      const altVert = graph.getAlternateVertex(edge, vert);
      if (!altVert) continue;

      const isParallel = edge.hasExistingParallelEdgeInRelated(relatedEdges);
      const vertPos = vert.previousPosition
        ? vert.calculatePositionUpdateVector(this.p5)
        : vert.position;
      const altPos = altVert.previousPosition
        ? altVert.calculatePositionUpdateVector(this.p5)
        : altVert.position;

      const { x: x1, y: y1, z: z1 } = vertPos;
      const { x: x2, y: y2, z: z2 } = altPos;

      this.p5.push();
      this.setEdgeStrokeColor(vert, edge, isParallel);
      this.p5.line(x1, y1, z1, x2, y2, z2);
      this.p5.pop();
    }
  }

  /**
   * @method setEdgeStrokeColor() - Sets the sketches stroke() color to the correct rgb() value based on the contextually provided curVertex and Edge which is being drawn.
   */
  private setEdgeStrokeColor(curVert: Vertex, edge: Edge, isParallel: boolean) {
    if (isParallel) {
      this.p5.stroke(PURPLE("1"));
    } else if (curVert.id === edge.sourceID) {
      this.p5.stroke(RED("1"));
    } else if (curVert.id === edge.targetID) {
      this.p5.stroke(BLUE("1"));
    } else {
      // to catch those nasty weird edges (otherwise should probably just default? parallel)
      // todo - should be removed from any production
      this.p5.stroke("green");
    }
  }

  /**
   * Draws a rectangular outline around the whole sketch to help orient the user in 3D space visually. The volume of the rectangle is based on the boundary dimensions from the {@link Graphset}
   */
  private drawBoundingBox(bounds: MinMaxSet3D) {
    if (this.state.getDisplayBoundingBox()) {
      this.p5.noFill();
      this.p5.strokeWeight(this.state.getBoundBoxStrokeWeight());
      this.p5.stroke(WHITE("0.5"));
      this.p5.box(bounds.x.diff, bounds.y.diff, bounds.z.diff);
    }
  }

  /**
   * Draws a [x:Red, y:Green, z:Blue] axis directional indicator at the center of the sketch [0,0,0]. The lengths of the axis are based on the boundary dimensions from the {@link Graphset}
   */
  private drawAxisOrientation(bounds: MinMaxSet3D) {
    if (this.state.getDisplayAxisOrientation()) {
      const xLen = bounds.x.diff / 2;
      const yLen = bounds.y.diff / 2;
      const zLen = bounds.z.diff / 2;
      this.p5.strokeWeight(this.state.getBoundBoxStrokeWeight());
      this.p5.stroke(255, 0, 0);
      this.p5.line(-xLen, 0, 0, xLen, 0, 0);
      this.p5.stroke(0, 255, 0);
      this.p5.line(0, -yLen, 0, 0, yLen, 0);
      this.p5.stroke(0, 0, 255);
      this.p5.line(0, 0, -zLen, 0, 0, zLen);
      this.p5.noStroke();
    }
  }
}
