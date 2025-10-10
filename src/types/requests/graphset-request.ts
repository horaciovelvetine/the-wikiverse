import { Graphset, Metadata } from "../site";
import { Request } from "./request";

export interface GraphsetRequest extends Request {
  metadata: Metadata;
  graphset: Graphset;
}
