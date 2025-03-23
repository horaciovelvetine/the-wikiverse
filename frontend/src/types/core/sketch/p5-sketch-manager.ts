import { P5CanvasInstance } from "@p5-wrapper/react";
import { P5_ManagedCamera } from "./p5-managed-camera";
import { P5_ManagedState } from "./p5-managed-state";
import { Vertex } from "..";

export class P5_SketchManager {
  /**
   * Centralizes helpers and methods used to control and change the clients camera inside the sketch
   */
  private managedCam: P5_ManagedCamera;

  /**
   * Maintains state which is shared in either and in both directions between the sketch and React.
   * Uses a get/set and subscription pattern to maintain state sync across both libraries.
   */
  private managedState: P5_ManagedState;

  /**
   * Reference to the currently active P5 instance through the ReactP5Wrapper
   */
  private canvas!: P5CanvasInstance;

  constructor() {
    this.managedCam = new P5_ManagedCamera();
    this.managedState = new P5_ManagedState();
  }

  public cam() {
    return this.managedCam;
  }

  public state() {
    return this.managedState;
  }

  public p5() {
    return this.canvas;
  }

  public setCanvas(p5: P5CanvasInstance) {
    this.canvas = p5;
  }

  public handleSearchTargetClick(vert: Vertex) {
    //somehow needs to stash those vert details, then change the type. When the type changes it should set int action
    console.log("handleSearchTargetClick()", vert);
    //TODO - this is going to need to integrate managed state and alert a list of subscribers...
  }
}
