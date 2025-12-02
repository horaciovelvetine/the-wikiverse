import { SolidCubeIcon } from "../../../../../../assets";
import {
  getEdgeDirectionIcon,
  hasParallelEdgeInSet,
} from "../../../../../../functions";
import {
  CameraSettingsState,
  EdgeData,
  SketchDataState,
  VertexData,
} from "../../../../../../types";

interface RelatedEdgeItemProps {
  edge: EdgeData;
  sketchDataState: SketchDataState;
  cameraSettings: CameraSettingsState;
}

export function RelatedEdgeItem({
  edge,
  sketchDataState,
  cameraSettings,
}: RelatedEdgeItemProps) {
  const contextVertex = sketchDataState.selectedVertex;
  // No Selected Vertex OR No Data to Use
  if (!contextVertex) return <></>;
  const targetID =
    edge.sourceID === contextVertex.id ? edge.targetID : edge.sourceID;
  // Find Additional Data
  const alternateVertex = sketchDataState.vertices.find(v => v.id === targetID);
  const property = sketchDataState.properties.find(
    p => p.id === edge.propertyID
  );

  const missingSourceData = !alternateVertex || !property;

  if (missingSourceData) return <></>;

  const parallelEdge = hasParallelEdgeInSet(edge, sketchDataState.relatedEdges);

  // Display only one of the two Parallel Edges per list...
  if (parallelEdge && edge.statementID > parallelEdge.statementID) {
    return <></>;
  }
  const ArrowIcon = getEdgeDirectionIcon(contextVertex, edge, parallelEdge);

  const iconColoring = parallelEdge
    ? "text-purple-500"
    : sketchDataState.selectedVertex?.id === edge.sourceID
      ? "text-red-500"
      : "text-blue-500";

  return (
    <li
      key={`edge-item-${edge.statementID}`}
      className="flex items-center text-lg gap-1 tracking-tight"
    >
      {/* CONTEXT EDGE */}
      <a
        className="cursor-pointer"
        onClick={() => cameraSettings.focusCameraOnVertex(contextVertex)}
      >
        <div className="inline-flex items-center gap-0.5">
          <SolidCubeIcon styles="text-yellow-300 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </a>

      <ArrowIcon styles={iconColoring} />

      {/* PROPERTY  */}
      <a
        className="cursor-pointer"
        href={`https://www.wikidata.org/wiki/Property:` + property.id}
        target="_blank"
      >
        <h4 className="font-semibold text-nowrap">
          {property.label.charAt(0).toUpperCase() + property.label.slice(1)}
        </h4>
      </a>

      <ArrowIcon styles={iconColoring} />

      {/* ALTERNATE VERTEX */}
      <a
        onClick={() => cameraSettings.focusCameraOnVertex(alternateVertex)}
        className="cursor-pointer"
      >
        <h4 className="font-semibold text-nowrap">{alternateVertex.label}</h4>
      </a>
    </li>
  );
}
