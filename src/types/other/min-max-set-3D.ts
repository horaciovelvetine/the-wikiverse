/**
 * A collection of the minimum and maximum values found in each axis of the graphsets {@link Graphset} vertices.position().
 */
export interface MinMaxSet3D {
  x: MinMaxData;
  y: MinMaxData;
  z: MinMaxData;
}

export interface MinMaxData {
  min: number;
  max: number;
  diff: number;
}
