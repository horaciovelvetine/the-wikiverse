import { Point3D } from "./point-3D";

/**
 * A single topic or node inside of the {@link Graphset}.
 */
export interface Vertex {
  /**
   * Unique identifier for the vertex.
   */
  id: string;

  /**
   * Label or name of the vertex.
   */
  label: string;

  /**
   * Description providing additional details about the vertex.
   */
  description: string;

  /**
   * Position of the vertex in 3D space.
   */
  position: Point3D;

  /**
   * Indicates whether the vertex is locked and cannot be moved.
   */
  locked: boolean;

  /**
   * Weather of not the statements have been collected on this particular piece of data (indicating it is pre-fetch from Wikidata to get the full EntityDocument results)
   */
  fetchedEdges: boolean;

  /**
   * The source URL for this entity from its originating service
   */
  url: string;
}
