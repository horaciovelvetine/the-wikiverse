import { Point3D } from "./point-3d";

export interface Vertex {
  id: string;
  label: string;
  description: string;
  url: string;
  position: Point3D;
}
