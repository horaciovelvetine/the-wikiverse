import { multiply, inv } from "mathjs";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { Point, VertexData, SketchUpdateProps } from "../../../../types";
import { Camera, Font } from "p5";

export class Vertex implements VertexData {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly url: string;
  readonly fetched: boolean;
  position: Point;
  locked: boolean;
  private prevPosition: Point | null = null;
  private positionUpdateKeyframe = 0;
  private readonly radius = 20;

  constructor(vert: VertexData) {
    this.id = vert.id;
    this.label = vert.label;
    this.description = vert.description;
    this.url = vert.url;
    this.position = new Point(
      vert.position.x,
      vert.position.y,
      vert.position.z
    );
    this.locked = vert.locked ?? false;
    this.fetched = vert.fetched ?? false;
  }

  /**
   * Draws the vertex as a 3D box at its position on the canvas.
   *
   * If the vertex is currently animating towards a new position (`prevPosition` is not null),
   * this method would handle drawing the vertex between its previous and target positions
   * (currently stubbed out). Otherwise, it draws the vertex at its static position.
   *
   * The box's fill color is determined by the selection state:
   * - If `isSelected` is true, it uses a highlighted fill.
   * - Otherwise, it uses a default fill color.
   *
   * @param p5 - The p5.js canvas instance.
   * @param isSelected - Whether this vertex is currently selected.
   */
  draw(p5: P5CanvasInstance<SketchUpdateProps>, isSelected: boolean) {
    p5.push();
    if (this.prevPosition) {
      // vertices is currently in motion to a new position
      // const drawCoords = this.calcCoordUpdateVectorPosition(p5);
      // p5.translate(drawCoords.x, drawCoords.y, drawCoords.z);
      // this.coordTransitionKeyFrm += 1;
      // if (this.coordTransitionKeyFrm === COORD_TRANSITION_DURATION) {
      //   this.coordTransitionKeyFrm = 1;
      //   this.prevCoords = null;
      // }
    } else {
      // vertex is stationary
      p5.translate(this.position.x, this.position.y, this.position.z);
    }

    p5.strokeWeight(1.2);
    p5.stroke(1, 1, 14);
    if (isSelected) {
      p5.fill("rgba(252 , 220 , 18, 0.9)");
    } else {
      p5.fill("rgba(205, 205, 205, 0.8)");
    }
    p5.box(this.radius);
    p5.noStroke();
    p5.pop();
  }

  /**
   * Draws the label for this vertex at its current position in 3D space.
   *
   * This method will render the vertex's label string ("data.label") using the provided p5.js instance, font, and camera.
   * It performs a translation to the vertex position, applies transform logic to orient the label correctly relative to the camera,
   * and uses the correct font and visual parameters to render readable text.
   *
   * @param p5 - The p5.js canvas instance to draw onto.
   * @param font - The font to use when rendering the label text.
   * @param cam - The camera instance, used to transform the label so it faces the camera.
   */
  drawLabel(
    p5: P5CanvasInstance<SketchUpdateProps>,
    font: Font | undefined,
    cam: Camera | undefined
  ) {
    if (font !== undefined || cam !== undefined) {
      const { x, y, z } = this.position;
      const labelStr = `${this.label}`;

      p5.push();
      p5.translate(x, y, z);
      // Undefined initializers caught above
      this.applyLabelPositionTransforms(p5, cam!);
      this.applyLabelTextSetup(p5, font!);
      p5.text(labelStr, 0, 0);
      p5.pop();
    }
  }

  /**
   * Traces a ray from the camera through the mouse position on the canvas and checks if it intersects with a given vertex.
   *
   * @param p5 - The p5.js canvas instance.
   * @param cam - The camera object from p5.js.
   * @returns An array containing the intersection point [x, y, z] if the ray intersects with the vertex, otherwise false.
   *
   * @apiNote - This function uses the projection and model-view matrices from the p5.js renderer to transform the mouse
   * coordinates into world coordinates and then checks if the ray intersects with the given vertex, sometimes the matrices
   * are empty which throws an error - this is only for a single frame as the Sketch mounts and can be ignored.
   *
   * @example
   * ```typescript
   * const intersection = traceRay(p5Instance, camera, vertex);
   * return intersection ? [x, y, z] : false;
   * ```
   *
   * Credit to @camelCaseSensitive on {github} & @morejpeg on {youtube}
   * For the original code, npm package, and tutorial on so many things p5.js
   * Adapted slightly for React/TS and use outside of a p5.js sketch instance
   * @see {@link https://github.com/camelCaseSensitive/p5-raycast/blob/main/p5-raycast.js} for the original implementation.
   */
  traceRay(p5: P5CanvasInstance<SketchUpdateProps>, cam: Camera | undefined) {
    // if (!this.fetched) return false; // dissalow collision for unfetched vertices...
    if (!cam) return;

    const ndcX = ((p5.mouseX - p5.width / 2) / p5.width) * 2;
    const ndcY = ((p5.mouseY - p5.height / 2) / p5.height) * 2;
    const ndcVect = [ndcX, -ndcY, 1, 1];

    // Dig into the p5.js instance to get the projection matrix && copy it to a new mat4
    // not a value intended to be accessed in/by p5.js API - a needed workaround here.
    const camRenderer = cam as any;
    const p5ProjMat = camRenderer._renderer.uPMatrix.mat4;

    const projMat = [
      [p5ProjMat[0], p5ProjMat[1], p5ProjMat[2], p5ProjMat[3]],
      [p5ProjMat[4], p5ProjMat[5], p5ProjMat[6], p5ProjMat[7]],
      [p5ProjMat[8], p5ProjMat[9], p5ProjMat[10], p5ProjMat[11]],
      [p5ProjMat[12], p5ProjMat[13], p5ProjMat[14], p5ProjMat[15]],
    ];
    const camVec = multiply(ndcVect, inv(projMat));

    // same workaround as above for access to renderer...
    const p5ModMat = camRenderer._renderer.uMVMatrix.mat4;
    const modMat = [
      [p5ModMat[0], p5ModMat[1], p5ModMat[2], p5ModMat[3]],
      [p5ModMat[4], p5ModMat[5], p5ModMat[6], p5ModMat[7]],
      [p5ModMat[8], p5ModMat[9], p5ModMat[10], p5ModMat[11]],
      [p5ModMat[12], p5ModMat[13], p5ModMat[14], p5ModMat[15]],
    ];

    const worldMat = multiply(camVec, inv(modMat));
    const perspDiv = camVec[3];
    const worldVec = [
      worldMat[0] / perspDiv,
      worldMat[1] / perspDiv,
      worldMat[2] / perspDiv,
    ];
    const { x, y, z } = { ...this.position };
    const rayLength = p5.dist(cam.eyeX, cam.eyeY, cam.eyeZ, x, y, z!);
    const phi = p5.atan2(
      worldVec[1] - cam.eyeY,
      p5.dist(worldVec[0], worldVec[2], cam.eyeX, cam.eyeZ)
    );
    const theta =
      -p5.atan2(worldVec[0] - cam.eyeX, worldVec[2] - cam.eyeZ) + p5.PI / 2;
    const xVec = cam.eyeX + rayLength * p5.cos(phi) * p5.cos(theta);
    const yVec = cam.eyeY + rayLength * p5.sin(phi);
    const zVec = cam.eyeZ + rayLength * p5.cos(phi) * p5.sin(theta);
    const distFromVert = p5.dist(x, y, z!, xVec, yVec, zVec);
    if (distFromVert < this.radius) {
      return [xVec, yVec, zVec];
    }
    return false;
  }

  //! PRIVATE METHODS
  //!=================================================================>
  //!=================================================================>

  /**
   * Helper to apply all the required formatting calls for p5.js to put formatted text on screen. Sets up size, color, alignment and a position for the label.
   */
  private applyLabelTextSetup(
    p5: P5CanvasInstance<SketchUpdateProps>,
    font: Font
  ) {
    p5.textSize(8);
    p5.fill("rgb(245, 245, 245)");
    p5.textFont(font);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.translate(0, this.radius * -1.25, 0); // position over vertex
  }

  /**
   * Faces the text for the label towards the camera by transforming it based on camera position and relative angles, uses the { @see calcCamerasAngles } for underlying math.
   */
  private applyLabelPositionTransforms(
    p5: P5CanvasInstance<SketchUpdateProps>,
    cam: Camera
  ) {
    const { pan, tilt } = this.calcCamerasAngles(p5, cam);

    p5.rotateY(-pan); //rotate to face camera horizon
    p5.rotateZ(tilt + p5.PI); //rotate to face camera vertical
    p5.rotateY(-p5.PI / 2); // reasons unclear
    p5.rotateZ(p5.PI); // flip around to face (scenes) up
  }

  /**
   * Calculate needed transformation pan and tilt for showing the text label to the camera in 3D.
   */
  private calcCamerasAngles(
    p5: P5CanvasInstance<SketchUpdateProps>,
    cam: Camera
  ) {
    const { ex, ey, ez } = { ...{ ex: cam.eyeX, ey: cam.eyeY, ez: cam.eyeZ } };
    const { fx, fy, fz } = {
      ...{ fx: cam.centerX, fy: cam.centerY, fz: cam.centerZ },
    };

    const pan = p5.atan2(ez - fz, ex - fx);
    const tilt = p5.atan2(ey - fy, p5.dist(ex, ez, fx, fz));
    return { pan, tilt };
  }
}
