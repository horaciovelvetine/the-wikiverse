import { Metadata } from "../../site";
import { GraphsetData } from "../data/graphset-data";
import { Request } from "./request";

export interface GraphsetRequest extends Request {
  metadata: Metadata;
  graphset: GraphsetData;
}
