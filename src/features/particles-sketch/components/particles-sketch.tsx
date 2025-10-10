import { useCallback } from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { ParticlesSketchManager } from "../sketch/particles-sketch-manager";

/**
 * ParticlesSketch React component.
 *
 * This component renders an animated particle system using p5.js via the ReactP5Wrapper.
 * Each particle is drawn as a circle and dynamically connects to nearby particles with lines.
 * The number of particles automatically adjusts to the window size, and the animation
 * responds to window resizing events.
 */
export function ParticlesSketch() {
  const Sketch = useCallback((p5: P5CanvasInstance) => {
    const sketch = new ParticlesSketchManager();

    p5.setup = () => {
      p5.createCanvas(innerWidth, innerHeight);
    };

    p5.draw = () => {
      p5.clear();
      sketch.draw(p5);
      sketch.update(p5);
    };

    p5.windowResized = () => {
      sketch.handleWindowResize();
    };
  }, []);

  // COMPONENT
  return (
    <div className="backdrop-blur-lg">
      <ReactP5Wrapper sketch={Sketch} />
    </div>
  );
}
