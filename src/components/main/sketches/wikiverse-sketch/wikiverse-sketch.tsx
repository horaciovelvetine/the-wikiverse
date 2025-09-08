import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import { SketchProps } from "../../../../types/core";
import "./wikiverse-sketch.css";
import { useCallback } from "react";
import CodeFont from "../../../../assets/fonts/CharisSIL-Regular.ttf";
import { Font } from "p5";

export const WikiverseSketch = ({ sketchRef }: SketchProps) => {
  const sketch: Sketch = useCallback(
    (p5: P5CanvasInstance) => {
      //? Tell the sketchManager which canvas instance is active
      sketchRef.setCanvas(p5);
      let font: Font;

      //*/==> CONFIG!
      p5.preload = () => {
        font = p5.loadFont(CodeFont);
      };

      //*/==> SETUP!
      p5.setup = () => {
        sketchRef.createCanvas();
        sketchRef.canvas().textFont(font);
        sketchRef.initializeManagedCamera();
        sketchRef.setCameraLookAtOrigin();
        // sketchRef.getInitialRelatedData(makePostRequest);
      };

      //*/==> RESIZE!
      p5.windowResized = () => {
        sketchRef.handleWindowResize();
      };

      //*/==> DRAW!
      p5.draw = () => {
        sketchRef.drawSketchRequiredUI(); // required first call...
        sketchRef.drawCurrentlySelectedUI();
        sketchRef.drawVertices();
        sketchRef.drawCurrentlySelectedUI();
        sketchRef.drawCurrentlyHoveredUI();
        sketchRef.advanceCamAnimations(); // should be last call...
      };

      //*/==> HOVER!
      p5.mouseMoved = () => {
        const hoverTarget = sketchRef.mousePositionedOverVertex();

        const isHoverTargetValid =
          hoverTarget && !sketchRef.targetIsAlreadySelected(hoverTarget);

        sketchRef
          .getState()
          .setCurrentlyHovered(isHoverTargetValid ? hoverTarget : null);
      };

      //*/==> CLICKED (LEFT ONLY!!)
      p5.mouseClicked = () => {
        const clickTarget = sketchRef.mousePositionedOverVertex();
        // rescue, ignores missed targets on its own by returning early
        if (!clickTarget) return;

        if (sketchRef.targetIsAlreadySelected(clickTarget)) {
          // de-selects the currently selected Vertex
          sketchRef.getState().setCurrentlySelected(null);
        } else {
          // selects a brand new vertex
          sketchRef.selectVertexTarget(clickTarget);
        }

        // todo ==> send request or not for clickToFetch
      };

      //*/==> KEYPRESS!
      p5.keyPressed = () => {
        switch (p5.key) {
          case "?":
          case "/":
            console.log("SketchType@ ", sketchRef.type());
            console.log("SketchData@ ", sketchRef.graphset());
            break;
          case ",":
          case "<":
            sketchRef.getState().toggleDisplayGraphStatistics();
            break;
          case ".":
          case ">":
            sketchRef.getState().toggleClickToFetch();
            break;
          default:
            return;
        }
      };
    },
    [sketchRef]
  );
  return <ReactP5Wrapper sketch={sketch} />;
};
