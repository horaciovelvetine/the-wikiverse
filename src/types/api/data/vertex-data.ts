import { Point } from "../../models/point";
/**
 * The primary data for a Node in the Graph, describes an article on Wikipedia.
 */
export interface VertexData {
  id: string;
  label: string;
  description: string;
  url: string;
  position: Point;
  locked: boolean;
  fetched: boolean;
  hidden: boolean;
}
