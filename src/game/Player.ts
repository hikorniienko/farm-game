import * as PIXI from "pixi.js";
import { Graphics } from "../module/Graphics";

export class Player extends Graphics {
    constructor(app: PIXI.Application) {
        super(app);
    }

    draw = () => {
        const x = this.app.screen.width / 2;
        const y = this.app.screen.height / 2;
        this.obj.position.set(x, y);

        const radius = 15;
        this.obj.circle(0, 0, radius);
        this.obj.fill(0xff1668);

        const eyeRadius = radius * 0.3;
        this.obj.circle(0, 0 - (radius - eyeRadius), eyeRadius);
        this.obj.fill(0x2b0601);
    };
}
