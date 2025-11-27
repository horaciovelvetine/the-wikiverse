import { SolidCubeIcon } from "../../../../../../assets";
import {
  getEdgeDirectionIcon,
  hasParallelEdgeInSet,
} from "../../../../../../functions";
import {
  CameraSettingsState,
  EdgeData,
  GraphsetDataState,
  VertexData,
} from "../../../../../../types";

interface RelatedEdgeItemProps {
  edge: EdgeData;
  graphsetState: GraphsetDataState;
  cameraSettings: CameraSettingsState;
}

export function RelatedEdgeItem({
  edge,
  graphsetState,
  cameraSettings,
}: RelatedEdgeItemProps) {
  const contextVertex = graphsetState.selectedVertex;
  // No Selected Vertex OR No Data to Use
  if (!contextVertex || !graphsetState.graphset) return <></>;
  const targetID =
    edge.sourceID === contextVertex.id ? edge.targetID : edge.sourceID;
  // Find Additional Data
  const alternateVertex = graphsetState.graphset.vertices.find(
    v => v.id === targetID
  );
  const property = graphsetState.graphset?.properties.find(
    p => p.id === edge.propertyID
  );

  const missingSourceData = !alternateVertex || !property;

  if (missingSourceData) return <></>;

  const parallelEdge = hasParallelEdgeInSet(edge, graphsetState.relatedEdges);

  // Display only one of the two Parallel Edges per list...
  if (parallelEdge && edge.statementID > parallelEdge.statementID) {
    return <></>;
  }
  const ArrowIcon = getEdgeDirectionIcon(contextVertex, edge, parallelEdge);

  const iconColoring = parallelEdge
    ? "text-purple-500"
    : graphsetState.selectedVertex?.id === edge.sourceID
      ? "text-red-500"
      : "text-blue-500";

  const handleSetFocusTarget = (
    _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    v: VertexData
  ) => {
    if (cameraSettings.currentFocus === v.position) {
      return;
    }
    console.log({ src: "handleSetFocusTarget", v });
    cameraSettings.setCurrentFocus(v.position);
  };

  return (
    <li
      key={`edge-item-${edge.statementID}`}
      className="flex items-center text-lg gap-1 tracking-tight"
    >
      {/* TODO: Click Target FOCUS ON CONTEXT VERTEX */}
      <a onClick={e => handleSetFocusTarget(e, contextVertex)}>
        <div className="inline-flex items-center gap-0.5">
          <SolidCubeIcon styles="text-yellow-300 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </a>
      <ArrowIcon styles={iconColoring} />

      {/* TODO: Click Target OPEN PROPERTY IN WIKIDATA */}
      <div>
        <h4 className="font-semibold text-nowrap">
          {property.label.charAt(0).toUpperCase() + property.label.slice(1)}
        </h4>
      </div>
      <ArrowIcon styles={iconColoring} />
      {/* TODO: Click Target FOCUS ALTERNATE VERTEX */}
      {/* TODO: Click Target OPEN WIKIPEDIA PAGE IN NEW WINDOW */}
      <a onClick={e => handleSetFocusTarget(e, alternateVertex)}>
        <h4 className="font-semibold text-nowrap">{alternateVertex.label}</h4>
      </a>
    </li>
  );
}
