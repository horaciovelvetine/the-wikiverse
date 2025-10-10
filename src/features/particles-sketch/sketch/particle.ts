import { P5CanvasInstance } from "@p5-wrapper/react";
import { Point, Velocity } from "../../../types";

const MIN_RADIUS = 2;
const MAX_RADIUS = 10;
const MAX_SPEED = 1;
const CONNECTION_THRESHOLD = 100;

/**
 * Represents a single particle in the particle system.
 *
 * The Particle class encapsulates the state and behavior of an individual particle,
 * including its position, radius, and velocity. It provides methods to:
 * - Draw itself as a circle on a p5.js canvas.
 * - Draw lines connecting itself to nearby particles within a certain distance threshold.
 * - Update its position based on its velocity, handling boundary collisions.
 *
 * Particles are initialized with random positions, radii, and velocities.
 */
export class Particle {
  position: Point;
  radius: number;
  velocity: Velocity;

  constructor() {
    this.position = this.getRandomPosition();
    this.radius = this.getRandomRadius();
    this.velocity = this.getRandomVelocity();
  }

  /**
   * Draws the particle on the provided p5 canvas instance.
   *
   * The particle is rendered as a filled circle with a grayscale color
   * determined by its radius. No stroke is applied.
   *
   * @param {P5CanvasInstance} p5 - The p5 canvas instance used for drawing.
   */
  draw(p5: P5CanvasInstance) {
    p5.noStroke();
    const minGray = 80;
    const maxGray = 150;
    const gray = p5.map(this.radius, MIN_RADIUS, MAX_RADIUS, minGray, maxGray);
    p5.fill(gray);
    p5.circle(this.position.x, this.position.y, this.radius);
  }

  /**
   * Draws lines between this particle and nearby particles within a certain threshold.
   *
   * For each particle in the provided array, if the distance between this particle and the other
   * is less than or equal to the CONNECTION_THRESHOLD, a line is drawn between them.
   * The opacity of the line decreases as the distance increases, making closer connections more visible.
   *
   * @param {P5CanvasInstance} p5 - The p5 canvas instance used for drawing.
   * @param {Particle[]} particles - Array of particles to check for proximity and draw connections to.
   */
  joinNearby(p5: P5CanvasInstance, particles: Particle[]) {
    particles.forEach(particle => {
      const { x, y } = this.position;
      const ox = particle.position.x;
      const oy = particle.position.y;
      const distance = p5.dist(x, y, ox, oy);
      if (distance <= CONNECTION_THRESHOLD) {
        // Opacity decreases as distance increases; closer = more opaque
        // At distance 0: opacity = 191 (75%), at CONNECTION_THRESHOLD: opacity = 0
        const maxOpacity = 191;
        const opacity = p5.map(
          distance,
          0,
          CONNECTION_THRESHOLD,
          maxOpacity,
          0
        );
        p5.stroke(200, 200, 200, opacity);
        p5.line(x, y, ox, oy);
      }
    });
  }

  /**
   * Updates the particle's position based on its velocity and handles boundary collisions.
   *
   * If the particle moves beyond the canvas boundaries, its velocity is reversed in the corresponding direction,
   * and its position is constrained within the canvas. The position is then updated by adding the velocity components.
   *
   * @param {P5CanvasInstance} p5 - The p5 canvas instance, used to access canvas dimensions and utility functions.
   */
  update(p5: P5CanvasInstance) {
    const { x, y } = this.position;
    if (x < 0 || x > p5.width) {
      this.velocity.x *= -1;
      this.position.x = p5.constrain(x, 0, p5.width);
    }
    if (y < 0 || y > p5.height) {
      this.velocity.y *= -1;
      this.position.y = p5.constrain(y, 0, p5.height);
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  /**
   * Generates a random position within the given dimensions.
   *
   * If the `dimensions` object includes a `depth` property, the returned point will include a `z` coordinate.
   * Otherwise, the point will only have `x` and `y` coordinates.
   *
   * @returns {Point} A random point within the specified dimensions.
   */
  private getRandomPosition(): Point {
    const x = Math.random() * innerWidth;
    const y = Math.random() * innerHeight;
    return { x, y };
  }

  /**
   * Generates a random radius for the particle within the allowed range.
   *
   * @returns {number} A random radius value between MIN_RADIUS and MAX_RADIUS.
   */
  private getRandomRadius(): number {
    return Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
  }

  /**
   * Generates a random velocity vector for the particle.
   *
   * The velocity components (x and y) are random values between -MAX_SPEED and +MAX_SPEED.
   *
   * @returns {Velocity} A velocity object with random x and y components.
   */
  private getRandomVelocity(): Velocity {
    const x = Math.random() * 2 * MAX_SPEED - MAX_SPEED;
    const y = Math.random() * 2 * MAX_SPEED - MAX_SPEED;
    return { x, y };
  }
}
