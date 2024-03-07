import * as PIXI from "pixi.js";
import { Graphics } from "../module/Graphics";

export class Animal extends Graphics {
    constructor(app: PIXI.Application) {
        super(app);
    }

    draw = () => {
        const x = Math.floor(Math.random() * this.app.screen.width);
        const y = Math.floor(Math.random() * this.app.screen.height);
        this.obj.position.set(x, y);

        const radius = 10;

        this.obj.circle(0, 0, radius);
        this.obj.fill(0xffffff);

        const eyeRadius = radius * 0.3;
        this.obj.circle(0, 0 - (radius - eyeRadius), eyeRadius);
        this.obj.fill(0x2b0601);
    };
}
