import * as PIXI from "pixi.js";
import { IEngine } from "../type";

export class Engine implements IEngine {
    app: PIXI.Application;

    constructor() {
        this.app = new PIXI.Application();
    }

    init = async () => {
        await this.app.init({
            backgroundAlpha: 0,
            resizeTo: window,
            width: window.innerWidth,
            height: window.innerWidth,
            resolution: 2,
        });

        this.app.ticker.maxFPS = 60;

        document.body.appendChild(this.app.canvas);
    };
}
