import { Point3D } from "../interfaces/point-3D";
import { Vertex } from "../interfaces/vertex";

export class P5_Vertex implements Vertex {
  id: string;
  label: string;
  description: string;
  position: Point3D;
  locked: boolean;
  fetchedEdges: boolean;

  constructor(data: Vertex) {
    this.id = data.id;
    this.label = data.label;
    this.description = data.description;
    this.position = data.position;
    this.locked = data.locked;
    this.fetchedEdges = data.fetchedEdges;
  }
}
