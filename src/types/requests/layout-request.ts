import { Graphset, Metadata } from "../site";
import { Request } from "./request";

export interface LayoutRequest extends Request {
  metadata: Metadata;
  graphset: Graphset;
}
