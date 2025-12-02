import { TaggingViews } from "../../../../../../../types";
import { TagsListOverview } from "./tags-list-overview";
import { VertexListOverview } from "./vertex-list-overview";

export const TaggingViewsMap = [
  {
    id: "vertex-list" as TaggingViews,
    label: "List by Vertex",
    component: VertexListOverview,
  },
  {
    id: "tags-list" as TaggingViews,
    label: "Tags List",
    component: TagsListOverview,
  },
];
