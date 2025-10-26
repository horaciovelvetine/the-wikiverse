import { P5CanvasInstance } from "@p5-wrapper/react";
import { Font } from "p5";
import { ManagedCamera } from "./managed-camera";
import { WikiverseSketchProps } from "../wikiverse-sketch-props";

export class WikiverseSketchManager {
  private p5: P5CanvasInstance<WikiverseSketchProps>;
  private p5Font: Font | undefined;
  private cam: ManagedCamera;

  constructor(p5: P5CanvasInstance<WikiverseSketchProps>) {
    this.p5 = p5;
    this.cam = new ManagedCamera(p5);
  }
}
