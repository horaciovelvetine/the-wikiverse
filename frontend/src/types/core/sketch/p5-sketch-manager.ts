import { P5CanvasInstance } from "@p5-wrapper/react";
import { P5_ManagedCamera } from "./p5-managed-camera";
import { P5_ManagedState } from "./p5-managed-state";
import { SketchTypes } from "./sketch-types";

export class P5_SketchManager {
  /**
   * The kind of Sketch of Sketch which is rendered by the {@link SketchContainer} component.
   */
  private type: SketchTypes = SketchTypes.PARTICLES;

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

  public getType() {
    return this.type;
  }

  public setType(type: SketchTypes) {
    this.type = type;
  }

  public getCam() {
    return this.managedCam;
  }

  public state() {
    return this.managedState;
  }

  public setCanvas(p5: P5CanvasInstance) {
    this.canvas = p5;
  }

  public getCanvas() {
    return this.canvas;
  }
}
