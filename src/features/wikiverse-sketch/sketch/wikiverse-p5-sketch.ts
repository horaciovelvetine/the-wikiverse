import { P5CanvasInstance } from "@p5-wrapper/react";

import { SketchUpdateProps } from "../../../types";
import { WikiverseSketchManager } from "./wikiverse-sketch-manager";

export function WikiverseP5Sketch(p5: P5CanvasInstance<SketchUpdateProps>) {
  const SK = new WikiverseSketchManager(p5);

  //*/===> SETUP!
  //*/===> SETUP!
  //*/===> SETUP!
  p5.preload = () => {
    SK.preloadFont();
  };
  p5.setup = () => {
    SK.setFont();
    SK.createCanvas();
    SK.cam.setupSketchCamera3D();
  };

  //*/===> DRAW!
  //*/===> DRAW!
  //*/===> DRAW!
  p5.draw = () => {
    SK.drawSketchUI();
    SK.drawVertices();
    SK.drawSelectedVertexUI();
    SK.drawHoveredVertexUI();
    SK.drawTags();
    SK.cam.handleAdvanceCanimation();
  };

  //*/===> WINDOW RESIZE!
  //*/===> WINDOW RESIZE!
  //*/===> WINDOW RESIZE!
  p5.windowResized = () => {
    SK.handleWindowResize();
    SK.cam.handleCanvasResizeAdjustPerspective();
  };

  //*/===> PROPS UPDATE!
  //*/===> PROPS UPDATE!
  //*/===> PROPS UPDATE!
  p5.updateWithProps = state => {
    if (!SK.dispatcher.allSettersAssigned) {
      //==> Initial Setter Assignment for first update...
      SK.dispatcher.assignAllSetters(state);
    }

    if (SK.settingsMenuShown() !== state.showSettingsMenu) {
      //==> Keeps track of settings menu being shown to prevent unintended interaction
      SK.setSettingsMenuShown(state.showSettingsMenu);
      return;
    }

    const { sketchDataState, cameraSettings, sketchSettings } = state;
    SK.data.setGraphsetData(sketchDataState);
    SK.cam.setCameraSettings(cameraSettings);
    SK.setSketchSettings(sketchSettings);
    // console.log({ src: "updateWithProps()" });
  };

  //*/===> MOUSE MOVED (HOVER)!
  //*/===> MOUSE MOVED (HOVER)!
  //*/===> MOUSE MOVED (HOVER)!
  p5.mouseMoved = () => {
    //==> Skip if Menu Open...
    if (SK.settingsMenuShown()) return;

    const hoverTarget = SK.mousePositionedOnVertex();
    if (!hoverTarget && !SK.data.hoveredVertex) {
      // No Target, State Already Null... Do Nothing
      return;
    }

    if (hoverTarget && SK.data.hoveredVertex?.id === hoverTarget.id) {
      // Current Target Already Hovered... Do Nothing
      return;
    }
    // Else... Update Current Hovered State to Target
    SK.dispatcher.setHoveredVertex(hoverTarget);
  };

  //*/===> CLICK (LEFT ONLY)!
  //*/===> CLICK (LEFT ONLY)!
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
      // Vertex not selected, select, and remove from hovered!
      SK.dispatcher.setHoveredVertex(null);
      SK.dispatcher.setSelectedVertex(clickTarget);
      // Only focus the camera if setting is enables
      if (SK.cam.focusOnSelected) {
        SK.dispatcher.setCurrentFocus(clickTarget.position);
      }
    }
  };

  //*/===> KEYPRESSED!
  //*/===> KEYPRESSED!
  //*/===> KEYPRESSED!
  p5.keyPressed = () => {
    //==> Skip if Menu Open...
    if (SK.settingsMenuShown()) return;

    switch (p5.key) {
      //? Log Graphset Data to Console
      case "?":
      case "/":
        // eslint-disable-next-line no-console
        console.log({ keypressed: p5.key, data: SK.data });
        break;

      //? Toggle Click To Fetch
      case ",":
      case "<":
        SK.dispatcher.toggleClickToFetch();
        break;

      default:
      // Ignore the key press...
      // console.log("keypressed: ", p5.key);
    }
  };
}
