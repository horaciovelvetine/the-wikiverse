import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import { SketchProps } from "../../../../types/core";
import "./wikiverse-sketch.css";
import { useCallback } from "react";

export const WikiverseSketch = ({ sketchRef }: SketchProps) => {
  
  const sketch: Sketch = useCallback(
    (p5: P5CanvasInstance) => {
      
      //*/==> CONFIG!
      p5.preload = () => {
        // sketchRef.preloadFont();
      };
      p5.setup = () => {
        // sketchRef.createCanvas();
        // sketchRef.setTextFont();
        // sketchRef.initManagedCamera();
        // sketchRef.initCameraPositionAtOriginVertex();
        // sketchRef.getInitialRelatedData(makePostRequest);
      };

      //*/==> RESIZE!
      p5.windowResized = () => {
        // sketchRef.handleWindowResize();
      };

      //*/==> DRAW!
      p5.draw = () => {
        // sketchRef.drawUI(); //
        // sketchRef.drawVertices();
        // sketchRef.drawSelectedDetails();
        // sketchRef.drawHoveredDetails();
        // sketchRef.advanceCanimations();
      };

      //*/==> HOVER!
      p5.mouseMoved = () => {
        // const curMouseTarget = sketchRef.mousePositionedOnVertex();
        // const hovIsCurSelected =
        //   sketchRef.curTgtVertMatchesCurSelectedVertex(curMouseTarget);

        // if (!curMouseTarget || hovIsCurSelected) {
        //   sketchRef.state.setCurHovered(null);
        // } else {
        //   sketchRef.state.setCurHovered(curMouseTarget);
        // }
      };

      //*/==> CLICKED (LEFT ONLY!!)
      p5.mouseClicked = () => {
        // const clickTarget = sketchRef.mousePositionedOnVertex();
        // if (!clickTarget) return;

        // if (sketchRef.curTgtVertMatchesCurSelectedVertex(clickTarget)) {
        //   // Deselect curSelected...
        //   sketchRef.state.setCurSelected(null);
        //   return;
        // }

        // sketchRef.handleNewSelectionClickTarget(clickTarget);
        // sketchRef.handleClickToFetchTarget(clickTarget, makePostRequest);
      };

      //*/==> KEYPRESS!
      p5.keyPressed = () => {
        // switch (p5.key) {
        //   case "?":
        //   case "/":
        //     console.log("SketchData@", sketchRef.graphset);
        //     break;
        //   case ",":
        //   case "<":
        //     sketchRef.state.toggleShowSketchDetailsSummary();
        //     break;
        //   case ".":
        //   case ">":
        //     sketchRef.state.toggleClickToFetch();
        //     break;
        //   default:
        //     return;
        // }
      };
    }, [sketchRef]);
  return <ReactP5Wrapper sketch={sketch} />;
};
