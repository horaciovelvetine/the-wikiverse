import { P5CanvasInstance } from "@p5-wrapper/react";
import { Font } from "p5";
import { ManagedCamera } from "./managed-camera";

export class WikiverseSketchManager {
  private p5: P5CanvasInstance;
  private p5Font: Font | undefined;
  private cam: ManagedCamera;

  constructor(p5: P5CanvasInstance) {
    this.p5 = p5;
    this.cam = new ManagedCamera(p5);
  }
}
