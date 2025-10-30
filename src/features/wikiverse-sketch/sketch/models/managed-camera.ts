import { Camera } from "p5";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { SketchUpdateProps } from "../../../../types";

export class ManagedCamera {
  private p5: P5CanvasInstance<SketchUpdateProps>;
  private p5cam: Camera | undefined;
  private _fieldOfView: number = 800;
  private _minDrawDistance: number = 1;
  private _maxDrawDistance: number = 5000;

  constructor(p5: P5CanvasInstance<SketchUpdateProps>) {
    this.p5 = p5;
  }

  P5CAM() {
    return this.p5cam;
  }

  /**
   * Initialize the Camera for the WEBGL 3D Version of the Sketch
   */
  setupSketchCamera3D() {
    this.p5cam = this.p5.createCamera();
    this.p5.perspective(
      this.getFovInRadians(),
      this.getAspectRatio(),
      this._minDrawDistance,
      this._maxDrawDistance
    );
  }

  /**
   * Updates the camera's perspective matrix to account for changes in the canvas size or aspect ratio.
   *
   * This method should be called whenever the canvas is resized to ensure the camera's perspective
   * projection is recalculated using the current field of view and aspect ratio.
   */
  handleCanvasResizeAdjustPerspective() {
    this.p5.perspective(this.getFovInRadians(), this.getAspectRatio());
  }

  /**
   * Updates the minimum and maximum draw (clipping) distances for the camera's perspective projection.
   *
   * The near and far clipping planes define the range of distances from the camera at which objects are rendered.
   * Objects closer than `min` or farther than `max` will not be visible.
   * This method updates the camera settings and recalculates the perspective projection matrix accordingly.
   *
   * @param {number} min - The minimum draw distance (near clipping plane).
   * @param {number} max - The maximum draw distance (far clipping plane).
   */
  updateDrawDistances(min: number, max: number) {
    this._maxDrawDistance = max;
    this._minDrawDistance = min;
    this.p5.perspective(
      this.getFovInRadians(),
      this.getAspectRatio(),
      min,
      max
    );
  }

  /**
   * Sets the field of view distance used for the camera's perspective projection.
   *
   * The field of view (FOV) determines how wide the camera's viewing angle is. Smaller values zoom in (narrow FOV),
   * and larger values zoom out (wider FOV). This value is typically used as the "distance to canvas plane" in
   * radians calculation for p5's perspective method.
   *
   * After calling this method, you should update the camera's perspective matrix
   * (e.g., by calling `handleResizePerspective`) to reflect the change visually.
   *
   * @param {number} value - The distance value to use in the field of view calculation.
   */
  setFieldOfView(value: number) {
    this._fieldOfView = value;
  }

  //! PRIVATE METHODS
  //!=================================================================>
  //!=================================================================>

  /**
   * Calculates and returns the aspect ratio of the p5 canvas.
   * @returns {number} The width divided by the height of the canvas.
   */
  private getAspectRatio(): number {
    return this.p5.width / this.p5.height;
  }

  /**
   * Calculates and returns the field of view (FOV) in radians for the perspective camera.
   *
   * The FOV depends on the canvas height and a fixed camera distance (800 units).
   * The fixed camera distance acts as the distance from the camera to the canvas plane.
   * A smaller distance value results in a wider field of view (zoomed out effect),
   * while a larger distance results in a narrower field of view (zoomed in effect).
   * If the camera distance changes, the FOV adapts accordingly to maintain visual proportions
   * based on the canvas height and perspective projection, affecting how much of the scene is visible.
   *
   * @returns {number} The field of view in radians.
   */
  private getFovInRadians() {
    return 2 * this.p5.atan(this.p5.height / 2 / this._fieldOfView);
  }
}
