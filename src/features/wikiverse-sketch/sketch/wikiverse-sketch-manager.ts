import InterTightFont from "../../../assets/fonts/InterTight-VariableFont_wght.ttf";
// P5 Imports
import { Font } from "p5";
import { P5CanvasInstance } from "@p5-wrapper/react";
// Sketch Classes
import { Vertex, Graphset, ReactDispatcher, ManagedCamera } from "./models";
// Site Imports
import { SketchUpdateProps } from "../../../types";
import { getWikiverseSketchContainer } from "../../../functions";

export class WikiverseSketchManager {
  private p5: P5CanvasInstance<SketchUpdateProps>;
  private p5Font: Font | undefined;

  // internal sketch data and class instances...
  readonly data: Graphset = new Graphset();
  readonly dispatcher: ReactDispatcher = new ReactDispatcher();
  readonly cam: ManagedCamera;
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
      this.p5.orbitControl(1, 1, 1);
    }
  }

  /**
   * Iterate over all the { @see Vertex } objects in the sketch and calls draw()
   */
  drawVertices() {
    this.data.vertices().forEach(vert => {
      vert.draw(this.p5, this.data.isSelected(vert));
    });
  }

  /**
   * Check if the mouse is positioned over/on an { @see Vertex } and returns null if not.
   */
  mousePositionedOnVertex(): Vertex | null {
    let target: Vertex | null = null;

    for (const v of this.data.vertices()) {
      if (v.traceRay(this.p5, this.cam.P5CAM())) target = v;
    }

    return target;
  }

  //? PROPS/STATE UPDATES
  //?=================================================================>
  //?=================================================================>
  updateLayoutState() {
    //==>
  }
  updateSketchState() {
    //==>
  }
  updateCameraState() {
    //==>
  }

  setSettingsMenuShown(showSettingsMenu: boolean) {
    this._settingsMenuShown = showSettingsMenu;
  }

  settingsMenuShown() {
    return this._settingsMenuShown;
  }

  //?=================================================================>
  //?=================================================================>
}
