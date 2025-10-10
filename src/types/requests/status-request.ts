import { Request } from "./request";

export interface StatusRequest extends Request {
  wikiverseState: string;
  wikidataStatus: string;
  wikidataPingMillis: number;
}
