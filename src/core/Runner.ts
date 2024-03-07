import * as PIXI from "pixi.js";
import { IRunner, IRunnerObject } from "../type";

export class Runner implements IRunner {
    private app: PIXI.Application;
    private objects: IRunnerObject[] = [];

    constructor(app: PIXI.Application) {
        this.app = app;
        this.app.ticker.add(this.update);
    }

    private update = () => {
        const basket = [];

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isRemoved()) {
                basket.push(i);
                continue;
            }

            this.objects[i].update();
        }

        for (const index of basket) {
            this.objects.splice(index, 1);
        }
    };

    add = (object: IRunnerObject) => {
        this.objects.push(object);
    };
}

export abstract class RunnerObject implements IRunnerObject {
    isRemoved = () => {
        throw new Error("isRemoved method not implemented.");
        return false;
    };

    update = () => {
        throw new Error("update method not implemented.");
        return false;
    };
}
