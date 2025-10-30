import { GraphsetData } from "../data/graphset-data";
import { Metadata } from "../data/metadata";
import { Request } from "./request";

export interface LayoutRequest extends Request {
  metadata: Metadata;
  graphset: GraphsetData;
}
