import { Dispatch, SetStateAction } from "react";
import { SketchState } from "./sketch-state";
import { SketchTypes } from "./sketch-types";
import { StateManager } from "./state-manager";
import { Graphset } from "../interfaces/graphset";
import { P5_Graphset } from "./p5-graphset";

export class P5_ManagedState extends StateManager<SketchState> {
  constructor() {
    super();
    // initialize all default values for SketchState
    this.initializeState("clickToFetch", false);
    this.initializeState("displayBoundingBox", false);
    this.initializeState("boundingBoxStrokeWeight", 5);
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
  addClickToFetchSubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<boolean>>
  ) {
    this.addSubscriber("clickToFetch", componentID, setter);
  }
  removeClickToFetchSubscriber(componentID: string) {
    this.removeSubscriber("clickToFetch", componentID);
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
  addDisplayBoundingBoxSubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<boolean>>
  ) {
    this.addSubscriber("displayBoundingBox", componentID, setter);
  }
  removeDisplayBoundingBoxSubscriber(componentID: string) {
    this.removeSubscriber("displayBoundingBox", componentID);
  }
  getBoundBoxStrokeWeight() {
    return this.getValue("boundingBoxStrokeWeight");
  }
  setBoundBoxStrokeWeight(value: number) {
    this.notifySubscribers("boundingBoxStrokeWeight", value);
  }
  addBoundBoxStrokeWeightSubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<number>>
  ) {
    this.addSubscriber("boundingBoxStrokeWeight", componentID, setter);
  }
  removeBoundBoxStrokeWeightSubscriber(componentID: string) {
    this.removeSubscriber("boundingBoxStrokeWeight", componentID);
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
    componentID: string,
    setter: Dispatch<SetStateAction<boolean>>
  ) {
    this.addSubscriber("displayAxisOrientation", componentID, setter);
  }
  removeDisplayAxisOrientationSubscriber(componentID: string) {
    this.removeSubscriber("displayAxisOrientation", componentID);
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
    componentID: string,
    setter: Dispatch<SetStateAction<boolean>>
  ) {
    this.addSubscriber("displayGraphStatistics", componentID, setter);
  }
  removeDisplayGraphStatisticsSubscriber(componentID: string) {
    this.removeSubscriber("displayGraphStatistics", componentID);
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
  addDisplaySettingsMenuSubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<boolean>>
  ) {
    this.addSubscriber("displaySettingsMenu", componentID, setter);
  }
  removeDisplaySettingsMenuSubscriber(componentID: string) {
    this.removeSubscriber("displaySettingsMenu", componentID);
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
  addXSensitivitySubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<number>>
  ) {
    this.addSubscriber("xSensitivity", componentID, setter);
  }
  removeXSensitivitySubscriber(componentID: string) {
    this.removeSubscriber("xSensitivity", componentID);
  }

  //Y
  getYSensitivity() {
    return this.getValue("ySensitivity");
  }
  setYSensitivity(value: number) {
    this.notifySubscribers("ySensitivity", value);
  }
  addYSensitivitySubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<number>>
  ) {
    this.addSubscriber("ySensitivity", componentID, setter);
  }
  removeYSensitivitySubscriber(componentID: string) {
    this.removeSubscriber("ySensitivity", componentID);
  }

  //Z
  getZSensitivity() {
    return this.getValue("zSensitivity");
  }
  setZSensitivity(value: number) {
    this.notifySubscribers("zSensitivity", value);
  }
  addZSensitivitySubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<number>>
  ) {
    this.addSubscriber("zSensitivity", componentID, setter);
  }
  removeZSensitivitySubscriber(componentID: string) {
    this.removeSubscriber("zSensitivity", componentID);
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

  addCurrentlySelectedSubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<any>>
  ) {
    this.addSubscriber("currentlySelected", componentID, setter);
  }
  removeCurrentlySelectedSubscriber(componentID: string) {
    this.removeSubscriber("currentlySelected", componentID);
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
  addCurrentlyHoveredSubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<any>>
  ) {
    this.addSubscriber("currentlyHovered", componentID, setter);
  }
  removeCurrentlyHoveredSubscriber(componentID: string) {
    this.removeSubscriber("currentlyHovered", componentID);
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
  addTypeSubscriber(
    componentID: string,
    setter: Dispatch<SetStateAction<SketchTypes>>
  ) {
    this.addSubscriber("type", componentID, setter);
  }
  removeTypeSubscriber(componentID: string) {
    this.removeSubscriber("type", componentID);
  }

  /**
   * Graph: The {@link Graphset} where all of the sketches data is stored. The Graphset doesn't have any subscribers,contrary to other pieces of state managed here.
   */
  getGraphset() {
    return this.getValue("graphset");
  }

  setGraphset(value: P5_Graphset) {
    this.initializeState("graphset", value);
    this.notifySubscribers("graphset", value);
  }
}
