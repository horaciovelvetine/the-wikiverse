import { Dimensions } from "./dimensions";

/**
 *  Detail storage for a parent {@link Graphset} instance including details to compute layout, and find the origin.
 */
export interface GraphsetMetadata {
  /**
   * The original query string used to generate the graphset.
   */
  query: string;

  /**
   * The ID of the origin node in the graphset.
   */
  originID: string;

  /**
   * Clients preferred Wikidata source language (used where applicable, defaults to "enwiki")
   */
  wikiLanguagePref: string;

  /**
   * Multiplier affecting the attraction force between nodes.
   */
  attractionMultiplier: number;

  /**
   * Multiplier affecting the repulsion force between nodes.
   */
  repulsionMultiplier: number;

  /**
   * The size multiplier of the layout for the graphset.
   */
  layoutSize: number;

  /**
   * The dimensions store for the layout
   */
  dimensions: Dimensions;
}
