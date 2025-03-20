import "./particles-sketch.css";
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "@p5-wrapper/react";

// import { WikiverseServiceResponse } from '../../types';
import { useCallback } from "react";
import { Dimensions } from "../../../types/core";
import { mainDisplayDimensions } from "../../../util/main-display-dimensions";
import { BLUE, SKETCH_BG, WHITE } from "../../../constants/styles";

interface ParticlesSketchProps {
  // sketchData: WikiverseServiceResponse | null;
}
/**
 * Credit for this sketch goes to @ Sagar Arora
 * https://archive.p5js.org/examples/simulate-particles.html
 *
 * A P5 Sketch which creates an idle animation to fill the #wikiverse-app-main-display while
 * no WikiverseSketch is currently active. The Sketch draws a number of particles on screen, moves them
 * around the screen, and joined with nearby particles on every frame. The canvas resizes with the window.
 */
export const ParticlesSketch = ({}: ParticlesSketchProps) => {
  const particles: Particle[] = [];

  const sketch: Sketch = useCallback(
    (p5: P5CanvasInstance) => {
      // called once at the beginning
      p5.setup = () => {
        const { width, height } = mainDisplayDimensions();
        // console.log(width, height)
        p5.createCanvas(width, height);

        const totalParticles = width / 10;
        for (let n = 0; n < totalParticles; n++) {
          const particle = new Particle(p5, { width, height });
          particles.push(particle);
        }
      };

      p5.draw = () => {
        p5.background(SKETCH_BG("1.0"));
        for (let i = 0; i < particles.length; i++) {
          particles[i].draw();
          particles[i].move();
          particles[i].joinNearby(particles.slice(i));
        }
      };

      p5.windowResized = () => {
        const { width, height } = mainDisplayDimensions();
        p5.resizeCanvas(width, height);
      };
    },
    [particles]
  );
  return (
    <div id="particles-sketch-container" className="on-screen">
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};

/**
 * 2D Version of the Vertex used in the Background-Sketch to add visual interest to an idle screen.
 */

const MAX_SPEED = 0.7;
const MAX_RADIUS = 10;
const MIN_RADIUS = 2;
const CONNECTION_DIST_MAX = 100;

class Particle {
  p5: P5CanvasInstance;
  xPos: number;
  yPos: number;
  rad: number;
  xSpeed: number;
  ySpeed: number;

  constructor(p5: P5CanvasInstance, dimensions: Dimensions) {
    this.p5 = p5;
    this.xPos = p5.random(0, dimensions.width);
    this.yPos = p5.random(0, dimensions.height);
    this.rad = p5.random(MIN_RADIUS, MAX_RADIUS);
    this.xSpeed = p5.random(-MAX_SPEED, MAX_SPEED);
    this.ySpeed = p5.random(-MAX_SPEED, MAX_SPEED);
  }

  /**
   * @method draw() - draws the particle onto the screen
   */
  draw() {
    this.p5.noStroke();
    this.p5.fill(WHITE("0.5"));
    this.p5.circle(this.xPos, this.yPos, this.rad);
  }

  /**
   * @method joinNearby() - connect this particle to any neighbors within the CONNECTION_DIST_MAX with a line
   */
  joinNearby(particlesArr: Particle[]) {
    particlesArr.forEach(particle => {
      const distance = this.p5.dist(
        this.xPos,
        this.yPos,
        particle.xPos,
        particle.yPos
      );
      if (distance < CONNECTION_DIST_MAX) {
        this.p5.stroke(BLUE("1.0"));
        this.p5.line(this.xPos, this.yPos, particle.xPos, particle.yPos);
      }
    });
  }

  /**
   * @method move() - moves this particle in between draw() calls.
   */
  move() {
    if (this.xPos < 0 || this.xPos > this.p5.width) {
      this.xSpeed *= -1;
      this.xPos = this.p5.constrain(this.xPos, 0, this.p5.width);
    }
    if (this.yPos < 0 || this.yPos > this.p5.height) {
      this.ySpeed *= -1;
      this.yPos = this.p5.constrain(this.yPos, 0, this.p5.height);
    }
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
  }
}
