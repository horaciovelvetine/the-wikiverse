import { PointData } from "../api";

/**
 * Represents a point in 2D or 3D space.
 *
 * The `Point` class implements the `PointData` interface,
 * providing x and y coordinates, and an optional z coordinate.
 * It includes methods to compare equality with another point
 * and to reset its coordinates to the origin.
 *
 * @example
 * const p1 = new Point();
 * p1.x = 1;
 * p1.y = 2;
 * p1.z = 3;
 *
 * const p2 = new Point();
 * p2.x = 1;
 * p2.y = 2;
 * p2.z = 3;
 *
 * console.log(p1.equals(p2)); // true
 *
 * p1.reset();
 * console.log(p1); // Point { x: 0, y: 0, z: 0 }
 */

export class Point implements PointData {
  x: number = 0;
  y: number = 0;
  z?: number | undefined = 0;

  /**
   * Creates an instance of Point.
   *
   * If coordinates are provided, initializes the point to those values.
   * Otherwise, initializes to the origin (0, 0, 0).
   *
   * @param {number} [x=0] - The x-coordinate.
   * @param {number} [y=0] - The y-coordinate.
   * @param {number} [z=0] - The z-coordinate (optional).
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Determines whether this point is equal to another point.
   *
   * Equality is based on the x, y, and z coordinates being identical.
   *
   * @param {Point} other - The other Point instance to compare to.
   * @returns {boolean} True if both points have the same x, y, and z values; otherwise, false.
   */
  equals(other: PointData): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  /**
   * Sets the coordinates of this point to match another point.
   *
   * @param {Point} other - The source point whose coordinates should be copied.
   */
  setFrom(other: Point) {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
  }

  /**
   * Returns a plain object representation of this point compatible with PointData.
   *
   * @returns {PointData} A serializable representation of this point.
   */
  toPointData(): PointData {
    return { x: this.x, y: this.y, z: this.z };
  }

  /**
   * Resets the coordinates of this point to the origin (0, 0, 0).
   *
   * Sets the x, y, and z properties to 0.
   */
  reset() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
}
