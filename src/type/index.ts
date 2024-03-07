import * as PIXI from "pixi.js";

export interface IEngine {
    app: PIXI.Application;
    init: () => Promise<void>;
}

export interface IRunner {
    add: (object: IRunnerObject) => void;
}

export interface IRunnerObject {
    isRemoved: () => boolean;
    update: () => boolean;
}

export interface IGraphics extends IRunnerObject {
    remove: () => boolean;
    getPosition: () => { x: number; y: number };
    setPosition: (x: number, y: number) => void;
    getRotation: () => number;
    setRotation: (rotation: number) => void;
}

export interface IEvent {
    onClick: (callback: (event: PointerEvent) => void) => void;
}
