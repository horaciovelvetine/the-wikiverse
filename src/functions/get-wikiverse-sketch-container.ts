/**
 * Retrieves the DOM element that serves as the main container for the Wikiverse Sketch visualization.
 *
 * @returns {HTMLElement | null} The element with id "wikiverse-sketch-container", or null if not found.
 */

export function getWikiverseSketchContainer(): HTMLElement | null {
  return document.getElementById("wikiverse-sketch-container");
}
