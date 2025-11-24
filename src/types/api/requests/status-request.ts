import { APIRequest } from "./api-request";

export interface StatusRequest extends APIRequest {
  wikiverseState: string;
  wikidataStatus: string;
  wikidataPingMillis: number;
}
