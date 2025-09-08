import { Dimensions } from "../interfaces/dimensions";
import { GraphsetMetadata } from "../interfaces/graphset-metadata";
import { Vertex } from "../interfaces/vertex";

export class P5_GraphsetMetadata implements GraphsetMetadata {
  originalQuery: string;
  originID: string;
  dimensions: Dimensions;
  attractionMultiplier = 1.25;
  repulsionMultiplier = 0.4;
  layoutSize = 0.0001;

  constructor(query: string, result: Vertex, dimensions: Dimensions) {
    this.originID = result.id;
    this.originalQuery = query;
    this.dimensions = dimensions;
  }

  /**
   * Gets the original query string.
   * @returns The original query string.
   */
  getOriginalQuery(): string {
    return this.originalQuery;
  }

  /**
   * Sets the original query string.
   * @param query - The new query string.
   */
  setOriginalQuery(query: string): void {
    this.originalQuery = query;
  }

  /**
   * Gets the origin ID.
   * @returns The origin ID.
   */
  getOriginID(): string {
    return this.originID;
  }

  /**
   * Sets the origin ID.
   * @param id - The new origin ID.
   */
  setOriginID(id: string): void {
    this.originID = id;
  }

  /**
   * Gets the attraction multiplier.
   * @returns The attraction multiplier.
   */
  getAttractionMultiplier(): number {
    return this.attractionMultiplier;
  }

  /**
   * Sets the attraction multiplier.
   * @param multiplier - The new attraction multiplier.
   */
  setAttractionMultiplier(multiplier: number): void {
    this.attractionMultiplier = multiplier;
  }

  /**
   * Gets the repulsion multiplier.
   * @returns The repulsion multiplier.
   */
  getRepulsionMultiplier(): number {
    return this.repulsionMultiplier;
  }

  /**
   * Sets the repulsion multiplier.
   * @param multiplier - The new repulsion multiplier.
   */
  setRepulsionMultiplier(multiplier: number): void {
    this.repulsionMultiplier = multiplier;
  }

  /**
   * Gets the layout size.
   * @returns The layout size.
   */
  getLayoutSize(): number {
    return this.layoutSize;
  }

  /**
   * Sets the layout size.
   * @param size - The new layout size.
   */
  setLayoutSize(size: number): void {
    this.layoutSize = size;
  }

  /**
   * Gets the dimensions of the graphset.
   * @returns The dimensions of the graphset.
   */
  getDimensions(): Dimensions {
    return this.dimensions;
  }

  /**
   * Sets the dimensions of the graphset.
   * @param dimensions - The new dimensions of the graphset.
   */
  setDimensions(dimensions: Dimensions): void {
    this.dimensions = dimensions;
  }
}
