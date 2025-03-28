import { multiply, inv } from "mathjs";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { Point3D } from "../interfaces/point-3D";
import { Vertex } from "../interfaces/vertex";
import { Camera, Vector } from "p5";
import { MinMaxData } from "../../other/min-max-set-3D";
import { GRAY_500, YELLOW } from "../../../constants/styles";
import { P5_ManagedCamera } from "./p5-managed-camera";

/**
 * The number of frames for any vertex which is currently moving to animate to its new position.
 */
const POSITION_ANIMATION_DURATION = 65;
/**
 * A Starting boundary to restrict the size of the radius too...
 */
const RADIUS_SIZE_BOUNDS: MinMaxData = { min: 14, max: 30, diff: 0 };

/**
 * The P5 implementation of the core {@link Vertex} interface which provides a variety of methods and helpers for use inside of a Sketch to be able to draw this data into the {@link P5CanvasInstance}.
 */
export class P5_Vertex implements Vertex {
  id: string;
  label: string;
  description: string;
  position: Point3D;
  previousPosition: Point3D | null;
  positionKeyframe: number;
  locked: boolean;
  fetchedEdges: boolean;

  constructor(data: Vertex) {
    this.id = data.id;
    this.label = data.label;
    this.description = data.description;
    this.position = data.position;
    this.previousPosition = null;
    this.positionKeyframe = 1;
    this.locked = data.locked;
    this.fetchedEdges = data.fetchedEdges;
  }

  /**
   * @method draw() - called on every frame of a Sketch in p5.js to draw the Vertex on screen
   */
  draw(p5: P5CanvasInstance, isSelected: boolean, edgesCount = 0) {
    p5.push();
    //? Check if the positions of this Vertex is currently being animated...
    if (this.previousPosition) {
      const drawPosition = this.calculatePositionUpdateVector(p5);
      p5.translate(drawPosition.x, drawPosition.y, drawPosition.z);
      this.positionKeyframe += 1;

      //? Reset animation values if complete
      if (this.positionKeyframe >= POSITION_ANIMATION_DURATION) {
        this.positionKeyframe = 1;
        this.previousPosition = null;
      }
    } else {
      p5.translate(this.position.x, this.position.y, this.position.z);
    }

    p5.strokeWeight(1.2);
    p5.stroke(1, 1, 14);
    if (isSelected) {
      // rgba(245,193,68, 0.9)
      p5.fill(YELLOW("0.9"));
    } else {
      // rgba(206,212,218, 0.8)
      p5.fill(GRAY_500("0.8"));
    }

    const radius = this.calculateRadius(edgesCount);
    p5.box(radius);

    p5.noStroke();
    p5.pop();
  }

  /**
   * @method drawLabel() - labels the vertex in-sketch when it is either currently selected or hovered
   */
  public drawLabel(p5: P5CanvasInstance, mngdCam: P5_ManagedCamera) {
    const { x, y, z } = this.position;
    const labelStr = `${this.label}`;
    const cam = mngdCam.getCamera();

    p5.push();
    p5.translate(x, y, z);
    this.applyLabelPositionTransforms(p5, cam);
    this.applyLabelTextSetup(p5);
    p5.text(labelStr, 0, 0);
    p5.pop();
  }

  /**
   * @method calculatePositionUpdateVector() - Uses the current positionKeyfram value to interpolate a new [x,y,z] position for the Vertex to be drawn at while animated
   */
  public calculatePositionUpdateVector(p5: P5CanvasInstance): Vector {
    const mult =
      (this.positionKeyframe * 1.00001) / POSITION_ANIMATION_DURATION;
    return p5.createVector(
      p5.lerp(this.previousPosition!.x, this.position.x, mult),
      p5.lerp(this.previousPosition!.y, this.position.y, mult),
      p5.lerp(this.previousPosition!.z, this.position.z, mult)
    );
  }

  /**
   *!!//==> PRIVATE METHODS
   *!!//==> PRIVATE METHODS
   *!!//==> PRIVATE METHODS
   */

  /**
   * @method calculateRadius() - Uses the number of related edges to calculate a radius size for the Vertex between the {@link RADIUS_SIZE_BOUNDS}
   */
  private calculateRadius(edgesCount: number): number {
    const { min, max } = RADIUS_SIZE_BOUNDS;
    return min + (max - min) * (1 - Math.exp(-edgesCount / 10));
  }

  /**
   *
   * @method applyLabelPositionTransforms() - The way that text & p5.js intertact when using WEBGL
   * leaves a bit to be desired. The applied translations face a Vertices label to the camera legibly.
   * Thank you to @camelCaseSensitive on {github} & @morejpeg on {youtube}
   * Excellent tutorial for this approach ==> (https://www.youtube.com/watch?v=kJMx0F7e9QU)
   *
   * @apiNote - these translations are called deliberately in order, accumulating these in singular calls breaks the positioning.
   */
  private applyLabelPositionTransforms(p5: P5CanvasInstance, cam: Camera) {
    const { pan, tilt } = this.calcCamerasAngles(p5, cam);

    p5.rotateY(-pan); //rotate to face camera horizon
    p5.rotateZ(tilt + p5.PI); //rotate to face camera vertical
    p5.rotateY(-p5.PI / 2); // reasons unclear
    p5.rotateZ(p5.PI); // flip around to face (scenes) up
  }
  /**
   * @method applyLabelTextSetup() - helper applies text formatting calls before drawing text to screen.
   */
  private applyLabelTextSetup(p5: P5CanvasInstance) {
    p5.textSize(8);
    p5.fill("rgb(245, 245, 245)");
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.translate(0, -20, 0); // position over vertex (y-axis reverse in p5 by default)
  }

  /**
   * @method calcCamerasAngles() - Determine the pan and tilt of the current @Camera in relation to where it is currently focused.
   * @returns - an object containing the pan & tilt {number} values.
   */
  private calcCamerasAngles(p5: P5CanvasInstance, cam: Camera) {
    const { ex, ey, ez } = { ...{ ex: cam.eyeX, ey: cam.eyeY, ez: cam.eyeZ } };
    const { fx, fy, fz } = {
      ...{ fx: cam.centerX, fy: cam.centerY, fz: cam.centerZ },
    };

    const pan = p5.atan2(ez - fz, ex - fx);
    const tilt = p5.atan2(ey - fy, p5.dist(ex, ez, fx, fz));
    return { pan, tilt };
  }

  /**
   * @method traceRay() - Traces a ray from the camera through the mouse position on the canvas and checks if it intersects with a given vertex.
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
  traceRay(p5: P5CanvasInstance, cam: Camera) {
    // if (!this.fetchedEdges) return false; // dissalow collision for unfetched vertices...

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
    const rayLength = p5.dist(cam.eyeX, cam.eyeY, cam.eyeZ, x, y, z);
    const phi = p5.atan2(
      worldVec[1] - cam.eyeY,
      p5.dist(worldVec[0], worldVec[2], cam.eyeX, cam.eyeZ)
    );
    const theta =
      -p5.atan2(worldVec[0] - cam.eyeX, worldVec[2] - cam.eyeZ) + p5.PI / 2;
    const xVec = cam.eyeX + rayLength * p5.cos(phi) * p5.cos(theta);
    const yVec = cam.eyeY + rayLength * p5.sin(phi);
    const zVec = cam.eyeZ + rayLength * p5.cos(phi) * p5.sin(theta);
    const distFromVert = p5.dist(x, y, z, xVec, yVec, zVec);
    if (distFromVert < 20) {
      return [xVec, yVec, zVec];
    }
    return false;
  }
}
