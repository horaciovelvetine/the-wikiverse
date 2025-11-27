import { Dispatch, SetStateAction } from "react";
import { Point, VertexData, SketchUpdateProps } from "../../../../types";
import { Vertex } from "./vertex";

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
  private selectedVertexSetter: Dispatch<
    SetStateAction<VertexData | null>
  > | null = null;
  private hoveredVertexSetter: Dispatch<
    SetStateAction<VertexData | null>
  > | null = null;
  private clickToFetchSetter: Dispatch<SetStateAction<boolean>> | null = null;
  private currentFocusSetter: Dispatch<SetStateAction<Point>> | null = null;

  get allSettersAssigned() {
    return (
      this.hoveredVertexSetterAssigned() &&
      this.selectedVertexSetterAssigned() &&
      this.clickToFetchSetterAssigned() &&
      this.currentFocusSetterAssigned()
    );
  }

  assignAllSetters(state: SketchUpdateProps) {
    this.selectedVertexSetter = state.graphsetData.setSelectedVertex;
    this.hoveredVertexSetter = state.graphsetData.setHoveredVertex;
    this.clickToFetchSetter = state.sketchSettings.clickToFetch.setter;
    this.currentFocusSetter = state.cameraSettings.setCurrentFocus;
  }

  setSelectedVertex(v: Vertex | null) {
    if (this.selectedVertexSetter) this.selectedVertexSetter(v ? v : null);
  }

  setHoveredVertex(v: Vertex | null) {
    if (this.hoveredVertexSetter) this.hoveredVertexSetter(v ? v : null);
  }

  toggleClickToFetch() {
    if (this.clickToFetchSetter) this.clickToFetchSetter(prev => !prev);
  }

  setCurrentFocus(focus: Point) {
    if (this.currentFocusSetter) this.currentFocusSetter(focus);
  }

  //! PRIVATE METHODS
  //!=================================================================>
  //!=================================================================>

  private selectedVertexSetterAssigned() {
    return this.selectedVertexSetter !== null;
  }

  private hoveredVertexSetterAssigned() {
    return this.hoveredVertexSetter !== null;
  }

  private clickToFetchSetterAssigned() {
    return this.clickToFetchSetter !== null;
  }

  private currentFocusSetterAssigned() {
    return this.currentFocusSetter !== null;
  }
}
