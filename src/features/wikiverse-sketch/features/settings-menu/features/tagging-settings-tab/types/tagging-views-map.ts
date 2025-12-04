import { TagsListOverview } from "../views/tags-list-overview";
import { VertexListOverview } from "../views/vertex-list-overview";
import type { TaggingViews } from "./tagging-views";

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
