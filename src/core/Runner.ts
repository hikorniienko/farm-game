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
        this.objects = this.objects.filter((object) => !object.isRemoved());
        this.objects.forEach((object) => object.update());
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
