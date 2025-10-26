import { Claim } from "./claim";
import { Point } from "./point";

export interface Vertex {
  id: string;
  label: string;
  description: string;
  url: string;
  position: Point;
  claims: Claim[];
}
