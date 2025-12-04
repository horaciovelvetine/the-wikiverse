import { SearchResultData, VertexData } from "../api";

export type SearchDisplayResult =
  | {
      kind: "vertex";
      id: string;
      title: string;
      description?: string;
      vertex: VertexData;
    }
  | {
      kind: "wikidata";
      id: string;
      title: string;
      description?: string;
      remote: SearchResultData;
    };
