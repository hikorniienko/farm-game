import * as PIXI from "pixi.js";
import { Graphics } from "../module/Graphics";

export class Background extends Graphics {
    constructor(app: PIXI.Application) {
        super(app);
    }

    protected draw = () => {
        this.obj.rect(0, 0, this.width, this.height);
        this.obj.fill(0x3cb73c);
    };
}
