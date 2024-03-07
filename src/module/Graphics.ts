import * as PIXI from "pixi.js";
import { RunnerObject } from "../core/Runner";
import { IGraphics } from "../type";

export abstract class Graphics extends RunnerObject implements IGraphics {
    protected obj: PIXI.Graphics;
    protected app: PIXI.Application;
    protected width: number = 0;
    protected height: number = 0;
    protected removed: boolean = false;

    constructor(app: PIXI.Application) {
        super();
        this.app = app;
        this.obj = new PIXI.Graphics();
        this.app.stage.addChild(this.obj);
    }

    protected draw = () => {
        throw new Error("draw method not implemented.");
        return;
    };

    isRemoved = () => {
        return this.removed;
    };

    update = () => {
        if (this.removed) return false;
        if (this.width == this.app.screen.width && this.height == this.app.screen.height)
            return false;

        this.width = this.app.screen.width;
        this.height = this.app.screen.height;
        this.obj.clear();
        this.draw();
        return true;
    };

    remove = () => {
        if (this.removed) return true;

        this.app.stage.removeChild(this.obj);
        this.obj.destroy();
        this.removed = true;
        return true;
    };

    getPosition = () => {
        return {
            x: this.obj.x,
            y: this.obj.y,
        };
    };

    setPosition = (x: number, y: number) => {
        this.obj.position.set(x, y);
    };

    getRotation = () => {
        return this.obj.rotation;
    };

    setRotation = (rotation: number) => {
        this.obj.rotation = rotation;
    };
}
