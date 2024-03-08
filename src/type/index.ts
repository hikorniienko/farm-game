import * as PIXI from "pixi.js";

/* ******************************************
CORE
****************************************** */

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

/* ******************************************
MODULE
****************************************** */

export interface IText extends IRunnerObject {
    remove: () => boolean;
}

export interface IGraphics extends IRunnerObject {
    remove: () => boolean;
    getPosition: () => { x: number; y: number };
    setPosition: (x: number, y: number) => void;
    getRotation: () => number;
    setRotation: (rotation: number) => void;
    getBounds: () => PIXI.Bounds;
}

export interface IMove extends IRunnerObject {
    to: (toX: number, toY: number) => void;
    toRandom: () => void;
    setSpeed: (speed: number) => void;
    setCallback: (callback: () => void) => void;
}

export interface ICollision extends IRunnerObject {
    remove: () => void;
    setCallback: (callback: () => void) => void;
}

export interface IGroup extends IRunnerObject {
    add: (
        callbackCord: (x: number, y: number) => void,
        callbackRemove: (x: number, y: number) => void
    ) => boolean;
    reset: () => void;
    remove: () => void;
}

export interface IEvent {
    onClick: (callback: (event: PointerEvent) => void) => void;
    remove: () => void;
}

export interface ICounter {
    getCount: () => number;
    getMax: () => number;
    isMax: () => boolean;
    isZero: () => boolean;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

/* ******************************************
GAME
****************************************** */

export interface IScore extends IText {
    add: (point: number) => void;
    remove: () => boolean;
}

export interface IAnimalGenerator {
    init: (callback: () => void) => void;
    create: (count: number) => void;
    createStart: (ms: number, count: number) => void;
    createStop: () => void;
}
