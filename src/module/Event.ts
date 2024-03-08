import * as PIXI from "pixi.js";
import { IEvent } from "../type";

export class Event implements IEvent {
    protected app: PIXI.Application;
    protected onClickList: ((event: PointerEvent) => void)[] = [];

    constructor(app: PIXI.Application) {
        this.app = app;
        this.app.canvas.addEventListener("pointerdown", this.listenerOnClick);
    }

    protected listenerOnClick = (event: PointerEvent) => {
        this.onClickList.forEach((callback) => {
            callback(event);
        });
    };

    onClick = (callback: (event: PointerEvent) => void) => {
        this.onClickList.push(callback);
    };

    remove = () => {
        this.app.canvas.removeEventListener("pointerdown", this.listenerOnClick);
        this.onClickList = [];
    };
}
