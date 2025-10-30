import { Point } from "../../site";
import { ClaimData } from "./claim-data";

/**
 * The primary data for a Node in the Graph, describes an article on Wikipedia.
 */
export interface VertexData {
  id: string;
  label: string;
  description: string;
  url: string;
  position: Point;
  claims: ClaimData[];
}
