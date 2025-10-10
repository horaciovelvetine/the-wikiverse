// @p5.perspective()
// @param fovy - frustum vertical field of view in andleMode units
// @param aspect — camera frustum aspect ratio
// @param near — frustum near plane length
// @param far — frustum far plane length

export interface CameraSettings {
  fieldOfViewHeight: number;
  aspectRatio: number;
  minDrawDistance: number;
  maxDrawDistance: number;
}
