import { Camera } from "p5";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { CameraSettingsState, SketchUpdateProps } from "../../../../types";

export class ManagedCamera {
  private p5: P5CanvasInstance<SketchUpdateProps>;
  private p5cam: Camera | undefined;
  // State Settings...
  private _fieldOfView: number = 800;
  private _minDrawDistance: number = 1;
  private _maxDrawDistance: number = 5000;
  private _xSensitivity: number = 1;
  private _ySensitivity: number = 1;
  private _zSensitivity: number = 1;

  constructor(p5: P5CanvasInstance<SketchUpdateProps>) {
    this.p5 = p5;
  }

  P5CAM() {
    return this.p5cam;
  }

  get xSensitivity() {
    return this._xSensitivity;
  }

  get ySensitivity() {
    return this._ySensitivity;
  }

  get zSensitivity() {
    return this._zSensitivity;
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
   * Initialize all of the camera settings state called on the first .updateWithProps() from the sketch
   */
  setCameraSettings(cameraSettings: CameraSettingsState) {
    const {
      xSensitivity,
      ySensitivity,
      zSensitivity,
      fieldOfView,
      maxDrawDistance,
      minDrawDistance,
    } = cameraSettings;
    this._xSensitivity = xSensitivity.value;
    this._ySensitivity = ySensitivity.value;
    this._zSensitivity = zSensitivity.value;

    if (this._fieldOfView !== fieldOfView.value) {
      this._fieldOfView = fieldOfView.value;
    }

    let updated = false;
    if (this._maxDrawDistance !== maxDrawDistance.value) {
      this._maxDrawDistance = maxDrawDistance.value;
      updated = true;
    }

    if (this._minDrawDistance !== minDrawDistance.value) {
      this._minDrawDistance = minDrawDistance.value;
      updated = true;
    }

    // Only allow calling this update for the right renderer and if things have been updated...
    if (updated && this.p5.webglVersion === this.p5.WEBGL2) {
      this.p5.perspective(
        this.getFovInRadians(),
        this.getAspectRatio(),
        this._minDrawDistance,
        this._maxDrawDistance
      );
    }
  }

  /**
   * Updates the camera's perspective matrix to account for changes in the canvas size or aspect ratio.
   *
   * This method should be called whenever the canvas is resized to ensure the camera's perspective
   * projection is recalculated using the current field of view and aspect ratio.
   */
  handleCanvasResizeAdjustPerspective() {
    this.p5.perspective(
      this.getFovInRadians(),
      this.getAspectRatio(),
      this._minDrawDistance,
      this._maxDrawDistance
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
  private getFovInRadians(): number {
    return 2 * this.p5.atan(this.p5.height / 2 / this._fieldOfView);
  }
}
