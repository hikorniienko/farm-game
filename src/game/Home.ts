import * as PIXI from "pixi.js";
import { Graphics } from "../module/Graphics";

export class Home extends Graphics {
    constructor(app: PIXI.Application) {
        super(app);
    }

    draw = () => {
        const width = 50;
        const height = 50;
        const x = this.app.screen.width / 2;
        const y = this.app.screen.height / 2;

        this.obj.rect(0, 0, width, height);
        this.obj.fill(0xd8db36);
        this.obj.pivot.set(width * 0.5, height * 0.5);
        this.obj.position.set(x, y);
    };
}
