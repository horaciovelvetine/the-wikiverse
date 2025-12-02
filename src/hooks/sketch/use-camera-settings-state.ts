import { useCallback, useState } from "react";
import { CameraSettingsState, Point, PointData, VertexData } from "../../types";

export function useCameraSettingsState(): CameraSettingsState {
  //?/==> Sketch Internal Camera State
  const [currentFocus, setCurrentFocus] = useState<Point>(new Point());
  const [cameraPosition, setCameraPosition] = useState<Point>(new Point());
  const [currentFocusAnimationLength, setCurrentFocusAnimationLength] =
    useState(35);
  const [cameraMoveAnimationLength, setCameraMoveAnimationLength] =
    useState(50);

  //?/==> Camera Behavior Settings
  const [focusOnSelected, setFocusOnSelected] = useState(true);

  //?/==>  Drawing Distance(s)
  const [minDrawDistance, setMinDrawDistance] = useState(1);
  const [maxDrawDistance, setMaxDrawDistance] = useState(8000);

  //?/==> Mouse Sensitivity
  const [xSensitivity, setXSensitivity] = useState(1);
  const [ySensitivity, setYSensitivity] = useState(1);
  const [zSensitivity, setZSensitivity] = useState(1);

  /**
   * Imperatively focuses the camera on the given vertex.
   *
   * This function updates the internal camera focus state to match the position of the supplied vertex,
   * if the target position is different from the current focus point. Used to programmatically center
   * the camera on a vertex within the graph.
   *
   * @param {VertexData} v - The vertex whose position should become the camera's new focus.
   *
   * @example
   *   focusCameraOnVertex(vertex);
   */
  const focusCameraOnVertex = useCallback(
    (v: VertexData) => {
      // already focused on vertex
      if (currentFocus.equals(v.position)) return;
      setCurrentFocus(v.position);
    },
    [currentFocus]
  );

  /**
   * Imperatively focuses the camera on the given Point.
   *
   * This callback updates the internal camera focus state if the
   * provided point is different from the current focus point.
   * Used to programmatically center the view on a specific PointData
   * (such as a spatial coordinate or object position in the graph).
   *
   * @param {PointData} p - The point to focus the camera on.
   */
  const focusCameraOnPoint = useCallback(
    (p: PointData) => {
      if (currentFocus.equals(p)) return;
      setCurrentFocus(new Point(p.x, p.y, p.z));
    },
    [currentFocus]
  );

  return {
    currentFocus,
    focusCameraOnVertex,
    focusCameraOnPoint,
    cameraPosition,
    setCameraPosition,
    focusOnSelected: {
      label: "Focus on Selected",
      description:
        "On selecting a Vertex the camera will 'focus' (center on) on that Vertex.",
      value: focusOnSelected,
      setter: setFocusOnSelected,
    },
    currentFocusAnimationLength: {
      label: "Camera Focus Animation",
      description:
        "How long the camera takes to focus on a new target (in frames)",
      min: 4,
      max: 100,
      step: 5,
      setter: setCurrentFocusAnimationLength,
      value: currentFocusAnimationLength,
    },

    cameraMoveAnimationLength: {
      label: "Camera Movement Animation",
      description:
        "How long the camera takes getting from point A to point B when moved (in frames)",
      min: 4,
      max: 100,
      step: 5,
      setter: setCameraMoveAnimationLength,
      value: cameraMoveAnimationLength,
    },

    minDrawDistance: {
      label: "Minimum Draw Distance",
      description: "How closely to the camera any item will be drawn",
      min: 1,
      max: 50,
      step: 5,
      setter: setMinDrawDistance,
      value: minDrawDistance,
    },

    maxDrawDistance: {
      label: "Maximum Draw Distance",
      description: "How far away from the camera any item will be drawn",
      min: 5000,
      max: 24000,
      step: 100,
      setter: setMaxDrawDistance,
      value: maxDrawDistance,
    },
    xSensitivity: {
      label: "X Sensitivity",
      description: "The mouses sensitivity along the X axis (horizontal)",
      min: 1,
      max: 10,
      step: 1,
      setter: setXSensitivity,
      value: xSensitivity,
    },

    ySensitivity: {
      label: "X Sensitivity",
      description: "The mouses sensitivity along the Y axis (vertical)",
      min: 1,
      max: 10,
      step: 1,
      setter: setYSensitivity,
      value: ySensitivity,
    },

    zSensitivity: {
      label: "Z Sensitivity",
      description: "The mouses sensitivity along the Z (or zoom) axis",
      min: 1,
      max: 10,
      step: 1,
      setter: setZSensitivity,
      value: zSensitivity,
    },
  };
}
