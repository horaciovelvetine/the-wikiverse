import { GraphsetData } from "../data/graphset-data";
import { Metadata } from "../data/metadata";
import { APIRequest } from "./api-request";

export interface GraphsetRequest extends APIRequest {
  metadata: Metadata;
  graphset: GraphsetData;
}
