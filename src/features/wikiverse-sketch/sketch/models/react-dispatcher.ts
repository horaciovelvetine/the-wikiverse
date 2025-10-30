import { Dispatch, SetStateAction } from "react";
import { VertexData, SketchUpdateProps } from "../../../../types";
import { Vertex } from "./vertex";

export class ReactDispatcher {
  private selectedVertexSetter: Dispatch<
    SetStateAction<VertexData | null>
  > | null = null;
  private hoveredVertexSetter: Dispatch<
    SetStateAction<VertexData | null>
  > | null = null;
  private clickToFetchSetter: Dispatch<SetStateAction<boolean>> | null = null;

  allSettersAssigned() {
    return (
      this.hoveredVertexSetterAssigned() &&
      this.selectedVertexSetterAssigned() &&
      this.clickToFetchSetterAssigned()
    );
  }

  assignAllSetters(state: SketchUpdateProps) {
    this.selectedVertexSetter = state.graphsetData.setSelectedVertex;
    this.hoveredVertexSetter = state.graphsetData.setHoveredVertex;
    this.clickToFetchSetter = state.sketchSettings.setClickToFetch;
  }

  setSelectedVertex(v: Vertex | null) {
    if (this.selectedVertexSetter) this.selectedVertexSetter(v ? v.data : null);
  }

  setHoveredVertex(v: Vertex | null) {
    if (this.hoveredVertexSetter) this.hoveredVertexSetter(v ? v.data : null);
  }

  toggleClickToFetch() {
    if (this.clickToFetchSetter) this.clickToFetchSetter(prev => !prev);
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
}
