import { P5CanvasInstance } from "@p5-wrapper/react";
import { Camera } from "p5";
import { WikiverseSketchProps } from "../wikiverse-sketch-props";

export class ManagedCamera {
  private p5: P5CanvasInstance<WikiverseSketchProps>;
  private p5cam: Camera | undefined;

  constructor(p5: P5CanvasInstance<WikiverseSketchProps>) {
    this.p5 = p5;
  }

  P5CAM() {
    return this.p5cam;
  }

  initializeCamera() {
    this.p5cam = this.p5.createCamera();
    const aspectRatio = this.p5.width / this.p5.height;
    const fovRad = 2 * this.p5.atan(this.p5.height / 2 / 800);
    this.p5.perspective(fovRad, aspectRatio, 1, 12000);
    // this.cam.setCameraRef(this.p5cam);
  }
}
