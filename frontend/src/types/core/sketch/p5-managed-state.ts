import { Dispatch, SetStateAction } from "react";
import { SketchState } from "./sketch-state";
import { SketchTypes } from "./sketch-types";
import { StateManager } from "./state-manager";

export class P5_ManagedState extends StateManager<SketchState> {
  constructor() {
    super();
    // initialize all default values for SketchState
    this.initializeState("clickToFetch", false);
    this.initializeState("displayBoundingBox", false);
    this.initializeState("displayAxisOrientation", false);
    this.initializeState("displayGraphStatistics", false);
    this.initializeState("displaySettingsMenu", false);
    this.initializeState("xSensitivity", 2);
    this.initializeState("ySensitivity", 2);
    this.initializeState("zSensitivity", 1);
    this.initializeState("currentlySelected", null);
    this.initializeState("currentlyHovered", null);
    // Sets the "background" sketch behind the landing page...
    this.initializeState("type", SketchTypes.PARTICLES);
  }

  /**
   * Click To Fetch: weather or not clicking on a Topic will fetch it's related topics
   */
  getClickToFetch() {
    return this.getValue("clickToFetch");
  }
  setClickToFetch(value: boolean) {
    this.notifySubscribers("clickToFetch", value);
  }
  addClickToFetchSubscriber(setter: Dispatch<SetStateAction<boolean>>) {
    this.addSubscriber("clickToFetch", setter);
  }

  /**
   * Display Bounding Box: 3D boundary drawn around the current Graphset to orient it in the sketch visually more easily
   */
  getDisplayBoundingBox() {
    return this.getValue("displayBoundingBox");
  }
  setDisplayBoundingBox(value: boolean) {
    this.notifySubscribers("displayBoundingBox", value);
  }
  addDisplayBoundingBoxSubscriber(setter: Dispatch<SetStateAction<boolean>>) {
    this.addSubscriber("displayBoundingBox", setter);
  }
  /**
   * Display Axis Orientation: displays an X(Red) Y(Green) Z(Blue) axis orientation at the center of the Graphset
   */
  getDisplayAxisOrientation() {
    return this.getValue("displayAxisOrientation");
  }
  setDisplayAxisOrientation(value: boolean) {
    this.notifySubscribers("displayAxisOrientation", value);
  }
  addDisplayAxisOrientationSubscriber(
    setter: Dispatch<SetStateAction<boolean>>
  ) {
    this.addSubscriber("displayAxisOrientation", setter);
  }

  /**
   * Display Graph Statistics: toggle-able <div> element display outlining details about the data
   */
  getDisplayGraphStatistics() {
    return this.getValue("displayGraphStatistics");
  }
  setDisplayGraphStatistics(value: boolean) {
    this.notifySubscribers("displayGraphStatistics", value);
  }
  addDisplayGraphStatisticsSubscriber(
    setter: Dispatch<SetStateAction<boolean>>
  ) {
    this.addSubscriber("displayGraphStatistics", setter);
  }

  /**
   * Display Setings Menu: toggle-able <div> element display allowing the user to tweak the settings
   */
  getDisplaySettingsMenu() {
    return this.getValue("displaySettingsMenu");
  }
  setDisplaySettingsMenu(value: boolean) {
    this.notifySubscribers("displaySettingsMenu", value);
  }
  addDisplaySettingsMenuSubscriber(setter: Dispatch<SetStateAction<boolean>>) {
    this.addSubscriber("displaySettingsMenu", setter);
  }

  /**
   * Mouse Sensitivity: should be relatively self-explanatory.
   */
  //X
  getXSensitivity() {
    return this.getValue("xSensitivity");
  }
  setXSensitivity(value: number) {
    this.notifySubscribers("xSensitivity", value);
  }
  addXSensitivitySubscriber(setter: Dispatch<SetStateAction<number>>) {
    this.addSubscriber("xSensitivity", setter);
  }
  //Y
  getYSensitivity() {
    return this.getValue("ySensitivity");
  }
  setYSensitivity(value: number) {
    this.notifySubscribers("ySensitivity", value);
  }
  addYSensitivitySubscriber(setter: Dispatch<SetStateAction<number>>) {
    this.addSubscriber("ySensitivity", setter);
  }
  //Z
  getZSensitivity() {
    return this.getValue("zSensitivity");
  }
  setZSensitivity(value: number) {
    this.notifySubscribers("zSensitivity", value);
  }
  addZSensitivitySubscriber(setter: Dispatch<SetStateAction<number>>) {
    this.addSubscriber("zSensitivity", setter);
  }

  /**
   * Currently Selected: the Vertex or null which was last selected by the client, deselecting requires re-selecting the previously selected Vertex.
   */
  getCurrentlySelected() {
    return this.getValue("currentlySelected");
  }

  setCurrentlySelected(value: any) {
    this.notifySubscribers("currentlySelected", value);
  }

  addCurrentlySelectedSubscriber(setter: Dispatch<SetStateAction<any>>) {
    this.addSubscriber("currentlySelected", setter);
  }

  /**
   * Currently Hovered: the Vertex or null which is currently under the mouse
   */
  getCurrentlyHovered() {
    return this.getValue("currentlyHovered");
  }
  setCurrentlyHovered(value: any) {
    this.notifySubscribers("currentlyHovered", value);
  }
  addCurrentlyHoveredSubscriber(setter: Dispatch<SetStateAction<any>>) {
    this.addSubscriber("currentlyHovered", setter);
  }

  /**
   * Type: The type of sketch currently active and being displayed to the client.
   */
  getType() {
    return this.getValue("type");
  }
  setType(value: SketchTypes) {
    this.notifySubscribers("type", value);
  }
  addTypeSubscriber(setter: Dispatch<SetStateAction<SketchTypes>>) {
    this.addSubscriber("type", setter);
  }
}
