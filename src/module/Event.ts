import * as PIXI from "pixi.js";
import { IEvent } from "../type";

export class Event implements IEvent {
    private app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this.app = app;
    }

    onClick = (callback: (event: PointerEvent) => void) => {
        this.app.canvas.addEventListener("pointerdown", (event: PointerEvent) => {
            callback(event);
        });
    };
}
