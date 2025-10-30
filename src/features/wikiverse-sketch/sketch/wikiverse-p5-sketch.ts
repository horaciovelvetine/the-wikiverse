import { P5CanvasInstance } from "@p5-wrapper/react";

import { SketchUpdateProps } from "../../../types";
import { WikiverseSketchManager } from "./wikiverse-sketch-manager";

export function WikiverseP5Sketch(p5: P5CanvasInstance<SketchUpdateProps>) {
  const SK = new WikiverseSketchManager(p5);

  //*/===> SETUP!
  p5.preload = () => {
    SK.preloadFont();
  };
  p5.setup = () => {
    SK.setFont();
    SK.createCanvas();
    SK.cam.setupSketchCamera3D();
    // SK.initCameraPositionAtOriginVertex();
    // SK.getInitialRelatedData(postRequest);
  };

  //*/===> DRAW!
  p5.draw = () => {
    SK.drawSketchUI();
    SK.drawVertices();
    // SK.drawSelectedDetails();
    // SK.drawHoveredDetails();
    // SK.advanceCamAnimations();
  };

  //*/===> WINDOW RESIZE!
  p5.windowResized = () => {
    SK.handleWindowResize();
  };

  //*/===> PROPS UPDATE!
  p5.updateWithProps = state => {
    if (!SK.dispatcher.allSettersAssigned()) {
      //==> Initial Setter Assignment for first update...
      SK.dispatcher.assignAllSetters(state);
    }

    if (SK.settingsMenuShown() !== state.showSettingsMenu) {
      //==> Keeps track of settings menu being shown to prevent unintended interaction
      SK.setSettingsMenuShown(state.showSettingsMenu);
    }

    const { graphsetData } = state;
    SK.data.setGraphsetData(graphsetData.graphset);
    SK.data.setSelectedVertex(graphsetData.selectedVertex);
    SK.data.setHoveredVertex(graphsetData.hoveredVertex);

    console.log("sketch.updateWithProps()");
  };

  //*/===> MOUSE MOVED (HOVER)!
  p5.mouseMoved = () => {
    //==> Skip if Menu Open...
    if (SK.settingsMenuShown()) return;

    const hoverTarget = SK.mousePositionedOnVertex();
    if (!hoverTarget && !SK.data.hoveredVertex()) {
      // No Target, State Already Null... Do Nothing
      return;
    }

    if (hoverTarget && SK.data.hoveredVertex()?.id === hoverTarget.data.id) {
      // Current Target Already Hovered... Do Nothing
      return;
    }

    // Else... Update Current Hovered State to Target
    SK.dispatcher.setHoveredVertex(hoverTarget);
  };

  //*/===> CLICK (LEFT ONLY)!
  p5.mouseClicked = () => {
    //==> Skip if Menu Open...
    if (SK.settingsMenuShown()) return;

    const clickTarget = SK.mousePositionedOnVertex();
    // User clicked on nothing, ignore this!
    if (!clickTarget) return;

    if (SK.data.isSelected(clickTarget)) {
      // Vertex already selected, deselect!
      SK.dispatcher.setSelectedVertex(null);
    } else {
      // Vertex not selected, select!
      SK.dispatcher.setSelectedVertex(clickTarget);
    }
  };

  //*/===> KEYPRESSED!
  p5.keyPressed = () => {
    //==> Skip if Menu Open...
    if (SK.settingsMenuShown()) return;

    switch (p5.key) {
      //? Log Graphset Data to Console
      case "?":
      case "/":
        console.log({ keypressed: p5.key, data: SK.data });
        break;

      //? Toggle Click To Fetch
      case ",":
      case "<":
        SK.dispatcher.toggleClickToFetch();
        break;

      default:
        console.log("keypressed: ", p5.key);
    }
  };
}
