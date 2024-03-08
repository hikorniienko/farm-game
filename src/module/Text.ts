import * as PIXI from "pixi.js";
import { RunnerObject } from "../core/Runner";
import { IText } from "../type";

export abstract class Text extends RunnerObject implements IText {
    protected obj: PIXI.Text;
    protected app: PIXI.Application;
    protected width: number = 0;
    protected height: number = 0;
    protected removed: boolean = false;

    constructor(app: PIXI.Application) {
        super();
        this.app = app;
        this.obj = new PIXI.Text();
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
        if (this.width === this.app.screen.width && this.height === this.app.screen.height)
            return false;

        this.width = this.app.screen.width;
        this.height = this.app.screen.height;
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
}
