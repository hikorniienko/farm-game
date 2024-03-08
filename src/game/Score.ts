import * as PIXI from "pixi.js";
import { Text } from "../module/Text";

export class Score extends Text {
    protected score: number = 0;

    constructor(app: PIXI.Application) {
        super(app);
    }

    draw = () => {
        this.obj.position.set(10, 10);
        this.obj.zIndex = 1;
        this.obj.text = `Score: ${this.score}`;
    };

    add = (point: number) => {
        this.score += point;
        this.draw();
    };
}
