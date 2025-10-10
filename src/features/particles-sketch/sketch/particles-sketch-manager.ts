import { P5CanvasInstance } from "@p5-wrapper/react";
import { Particle } from "./particle";

const PARTICLE_DENSITY = 15000;

/**
 * Manages the state and behavior of a particle system sketch.
 *
 * The ParticlesSketchManager class is responsible for:
 * - Initializing and maintaining an array of Particle instances.
 * - Drawing all particles and their dynamic connections on a p5.js canvas.
 * - Updating particle positions and handling boundary collisions.
 * - Dynamically adjusting the number of particles in response to window resizing,
 *   maintaining a consistent density of particles per unit area.
 *
 * Usage:
 *   - Instantiate this class within a p5.js sketch.
 *   - Call `draw(p5)` in the p5.js draw loop to render particles and their connections.
 *   - Call `update(p5)` in the p5.js draw loop to update particle positions.
 *   - Call `handleWindowResize()` in response to window resize events to adjust particle count.
 */
export class ParticlesSketchManager {
  private particles: Particle[];

  constructor() {
    // Generate a number of particles based on the window size (e.g., 1 particle per 2500 px^2)
    this.particles = this.generateRandomParticles();
  }

  /**
   * Draws all particles and their connections on the provided p5 canvas instance.
   *
   * For each particle, this method:
   * - Draws the particle as a circle.
   * - Draws lines connecting the particle to nearby particles within a certain threshold.
   *
   * @param {P5CanvasInstance} p5 - The p5 canvas instance used for drawing.
   */
  draw(p5: P5CanvasInstance) {
    this.particles.forEach((particle, index) => {
      particle.joinNearby(p5, this.particles.slice(index));
      particle.draw(p5);
    });
  }

  /**
   * Updates the state of all particles in the sketch.
   *
   * For each particle, this method updates its position based on its velocity,
   * handles boundary collisions, and applies any other per-frame logic.
   *
   * @param {P5CanvasInstance} p5 - The p5 canvas instance, used for canvas dimensions and utilities.
   */
  update(p5: P5CanvasInstance) {
    this.particles.forEach(particle => particle.update(p5));
  }

  /**
   * Adjusts the number of particles based on the current window size.
   *
   * This method recalculates the desired number of particles according to the window's area
   * (using a density of 1 particle per 2500 px^2, with a minimum of 10 particles).
   * If there are fewer particles than desired, new particles are added.
   * If there are more particles than desired, excess particles are removed.
   */
  handleWindowResize() {
    const area = innerWidth * innerHeight;
    const desiredCount = Math.max(
      10,
      Math.floor(area * (1 / PARTICLE_DENSITY))
    );
    const currentCount = this.particles.length;

    if (currentCount < desiredCount) {
      // Add new particles
      const toAdd = desiredCount - currentCount;
      for (let i = 0; i < toAdd; i++) {
        this.particles.push(new Particle());
      }
    } else if (currentCount > desiredCount) {
      // Remove excess particles
      this.particles.splice(desiredCount, currentCount - desiredCount);
    }
  }

  /**
   * Generates an array of randomly positioned particles.
   *
   * The number of particles is determined by the current window area,
   * with a minimum of 10 particles and a density of 1 particle per 2500 px^2.
   *
   * @returns {Particle[]} An array of newly created Particle instances.
   */
  private generateRandomParticles(): Particle[] {
    const area = innerWidth * innerHeight;
    const amount = Math.max(10, Math.floor(area * (1 / PARTICLE_DENSITY)));
    return Array.from({ length: amount }, () => new Particle());
  }
}
