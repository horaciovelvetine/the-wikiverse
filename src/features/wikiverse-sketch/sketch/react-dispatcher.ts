import { Dispatch, SetStateAction } from "react";
import { SketchUpdateProps, PointData } from "../../../types";
import { Vertex } from "./vertex";
import { Point } from "./point";

/**
 * ReactDispatcher
 *
 * This class serves as an adapter to dispatch state changes from interactions
 * originating inside the p5 sketch to React's state setters.
 *
 * It holds references to React setters for sketch state such as selected vertex,
 * hovered vertex, click-to-fetch toggle, and camera focus, enabling imperative updates
 * to the React state from non-React (imperative/OO) code in the sketch models.
 *
 * Use this class to assign the relevant React state setters through `assignAllSetters`,
 * and then invoke methods to update those pieces of state in response to
 * sketch-side user interactions.
 *
 * Typical Usage:
 *   - Assign React state setters with `assignAllSetters(state)`
 *   - Call `setSelectedVertex`, `setHoveredVertex`, `setCurrentFocus`, or `toggleClickToFetch` from within sketch model events
 *   - Acts as a bridge between p5-based logic and React state
 */

export class ReactDispatcher {
  private selectedVertexIDSetter: Dispatch<
    SetStateAction<string | null>
  > | null = null;
  private hoveredVertexIDSetter: Dispatch<
    SetStateAction<string | null>
  > | null = null;
  private clickToFetchSetter: Dispatch<SetStateAction<boolean>> | null = null;
  private focusCameraOnPoint: ((p: PointData) => void) | undefined;

  get allSettersAssigned() {
    return (
      this.hoveredVertexSetterAssigned() &&
      this.selectedVertexSetterAssigned() &&
      this.clickToFetchSetterAssigned() &&
      this.currentFocusSetterAssigned()
    );
  }

  assignAllSetters(state: SketchUpdateProps) {
    this.selectedVertexIDSetter = state.sketchDataState.setSelectedVertexID;
    this.hoveredVertexIDSetter = state.sketchDataState.setHoveredVertexID;
    this.clickToFetchSetter = state.sketchSettings.clickToFetch.setter;
    this.focusCameraOnPoint = state.cameraSettings.focusCameraOnPoint;
  }

  setSelectedVertex(v: Vertex | null) {
    if (this.selectedVertexIDSetter)
      this.selectedVertexIDSetter(v ? v.id : null);
  }

  setHoveredVertex(v: Vertex | null) {
    if (this.hoveredVertexIDSetter) this.hoveredVertexIDSetter(v ? v.id : null);
  }

  toggleClickToFetch() {
    if (this.clickToFetchSetter) this.clickToFetchSetter(prev => !prev);
  }

  setCurrentFocus(focus: Point) {
    if (this.focusCameraOnPoint) this.focusCameraOnPoint(focus);
  }

  //! PRIVATE METHODS
  //!=================================================================>
  //!=================================================================>

  private selectedVertexSetterAssigned() {
    return this.selectedVertexIDSetter !== null;
  }

  private hoveredVertexSetterAssigned() {
    return this.hoveredVertexIDSetter !== null;
  }

  private clickToFetchSetterAssigned() {
    return this.clickToFetchSetter !== null;
  }

  private currentFocusSetterAssigned() {
    return this.focusCameraOnPoint !== null;
  }
}
