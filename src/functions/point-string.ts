import { Point } from "../types";

/**
 * Returns a readable string representation of a Point object.
 *
 * @param p - The point object, possibly undefined.
 * @returns String describing the rounded coordinates, or an empty string if undefined.
 */
export function pointString(p: Point | undefined): string {
  if (!p) {
    return "";
  }

  const x = Math.round(p.x);
  const y = Math.round(p.y);

  // If the z coordinate exists, include it; otherwise, leave it out.
  if (typeof p.z === "number") {
    const z = Math.round(p.z);
    return `[x: ${x}, y: ${y}, z: ${z}]`;
  }

  return `[x: ${x}, y: ${y}]`;
}
