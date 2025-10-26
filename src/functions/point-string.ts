import { Point } from "../types";

/**
 * Converts a Point object into a string representation.
 *
 * @param {Point} p - The point object containing x, y, and optionally z coordinates.
 * @returns {string} A string in the format "[x: value, y: value]" or "[x: value, y: value, z: value]" if z is present.
 */

export function pointString(p: Point): string {
  return p.z ? `[x: ${p.x}, y: ${p.y}, z: ${p.z}` : `[x: ${p.x}, y: ${p.y}]`;
}
