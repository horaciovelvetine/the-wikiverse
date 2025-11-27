import { Camera, Vector } from "p5";
import { P5CanvasInstance } from "@p5-wrapper/react";
import {
  CameraSettingsState,
  Point,
  SketchUpdateProps,
} from "../../../../types";

export class ManagedCamera {
  private p5: P5CanvasInstance<SketchUpdateProps>;
  private p5cam: Camera | undefined;
  // State Settings...
  private _minDrawDistance: number = 1;
  private _maxDrawDistance: number = 5000;
  private _xSensitivity: number = 1;
  private _ySensitivity: number = 1;
  private _zSensitivity: number = 1;
  private _focusOnSelected: boolean = true;

  private _currentFocusTarget: Point = new Point();
  private _currentFocusStart: Point | null = null;
  private _currentFocusAnimationLength = 100;
  private _currentFocusKeyFrame: number = 0;

  constructor(p5: P5CanvasInstance<SketchUpdateProps>) {
    this.p5 = p5;
  }

  get P5CAM() {
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

  get currentFocus() {
    return this._currentFocusTarget;
  }

  get currentFocusAnimationLength() {
    return this._currentFocusAnimationLength;
  }

  get focusOnSelected() {
    return this._focusOnSelected;
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
      maxDrawDistance,
      minDrawDistance,
      currentFocus,
      currentFocusAnimationLength,
      focusOnSelected,
    } = cameraSettings;
    this._xSensitivity = xSensitivity.value;
    this._ySensitivity = ySensitivity.value;
    this._zSensitivity = zSensitivity.value;

    if (this._focusOnSelected !== focusOnSelected.value) {
      this._focusOnSelected = focusOnSelected.value;
    }

    // Update the cameras lookat target and restart animation when it changes.
    // Normalize currentFocus to a Point instance if it's a plain object
    const normalizedFocus = this.normalizeToPoint(currentFocus);
    if (!this._currentFocusTarget.equals(normalizedFocus)) {
      this._currentFocusTarget = normalizedFocus;
      this.resetFocusAnimationState();
    }

    // Update how long it takes the camera to lookat target.
    if (
      this._currentFocusAnimationLength !== currentFocusAnimationLength.value
    ) {
      this._currentFocusAnimationLength = currentFocusAnimationLength.value;
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

  handleAdvanceCanimation() {
    this.advanceLookAtAnimation();
    // TODO: this.advanceCameraMoveAnimation();
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
    return 2 * this.p5.atan(this.p5.height / 2 / 800);
  }

  /**
   * Advances the "look at" animation for the camera's focus transition.
   *
   * This method should be called on each animation frame while a camera focus transition is in progress.
   * It interpolates the camera's look-at position between the current focus and the target focus,
   * smoothly animating the camera's direction of view.
   *
   * When the animation completes (i.e., the key frame exceeds the animation length),
   * it resets the animation state.
   *
   * @private
   */

  private advanceLookAtAnimation() {
    if (this.p5cam === undefined) return;
    // if (this._currentFocusActual === null) return;
    // if (this._currentFocusKeyFrame === 0) return;

    const { x, y, z } = this.getLookAtChangeVector();
    this.p5cam.lookAt(x, y, z);

    if (this._currentFocusKeyFrame < this.currentFocusAnimationLength) {
      this._currentFocusKeyFrame += 1;
    } else {
      this._currentFocusKeyFrame = 0;
      this._currentFocusStart = new Point(
        this._currentFocusTarget.x,
        this._currentFocusTarget.y,
        this._currentFocusTarget.z || 0
      );
    }
  }

  /**
   * Calculates the current "look at" vector used for animating the camera's focus transition.
   *
   * This method computes the interpolated look-at vector (x, y, z) between the current camera
   * center and the target focus point, based on the current animation frame and total animation length.
   * It uses linear interpolation (lerp) to create a smooth transition during camera re-focusing animations.
   *
   * If the camera instance (`p5cam`) is undefined, returns a zero vector.
   *
   * @returns {Vector} The interpolated look-at vector for the current animation frame.
   */
  private getLookAtChangeVector(): Vector {
    if (this.p5cam === undefined) return this.p5.createVector(0, 0, 0);

    const start =
      this._currentFocusStart ||
      new Point(
        this.p5cam.centerX,
        this.p5cam.centerY,
        this.p5cam.centerZ || 0
      );
    const progress = this.getFocusAnimationProgress();

    return this.p5.createVector(
      this.p5.lerp(start.x, this._currentFocusTarget.x, progress),
      this.p5.lerp(start.y, this._currentFocusTarget.y, progress),
      this.p5.lerp(start.z || 0, this._currentFocusTarget.z || 0, progress)
    );
  }

  /**
   * Calculates the current normalized progress value for the focus animation.
   * Keeps the lerp factor between 0 and 1 even when animation length is 0.
   */
  private getFocusAnimationProgress(): number {
    if (this.currentFocusAnimationLength <= 0) return 1;

    const progress =
      this._currentFocusKeyFrame / this.currentFocusAnimationLength;

    return this.p5.constrain(progress, 0, 1);
  }

  /**
   * Normalizes a Point-like value to a Point instance.
   * If the input is already a Point instance, returns it as-is.
   * If it's a plain object with x, y, z properties, creates a new Point instance.
   *
   * @param pointLike - Either a Point instance or a plain object with x, y, z properties
   * @returns A Point instance
   */
  private normalizeToPoint(pointLike: Point): Point {
    // If it's already a Point instance (has the equals method), return it
    if (pointLike && typeof pointLike.equals === "function") {
      return pointLike;
    }
    // Otherwise, create a new Point instance from the plain object
    return new Point(pointLike.x ?? 0, pointLike.y ?? 0, pointLike.z ?? 0);
  }

  /**
   * Captures the current camera lookAt point so the next focus animation knows
   * where it is starting from. Falls back to the target when a camera does not
   * yet exist.
   */
  private resetFocusAnimationState() {
    this._currentFocusKeyFrame = 0;
    if (this.p5cam) {
      this._currentFocusStart = new Point(
        this.p5cam.centerX,
        this.p5cam.centerY,
        this.p5cam.centerZ || 0
      );
    } else {
      this._currentFocusStart = new Point(
        this._currentFocusTarget.x,
        this._currentFocusTarget.y,
        this._currentFocusTarget.z || 0
      );
    }
  }
}
