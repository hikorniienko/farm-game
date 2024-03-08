import { RunnerObject } from "../core/Runner";
import { IGraphics } from "../type";

export class Collision extends RunnerObject {
    protected objA: IGraphics;
    protected objB: IGraphics;
    protected removed: boolean = false;
    protected callback: () => void = () => {};

    constructor(objA: IGraphics, objB: IGraphics) {
        super();
        this.objA = objA;
        this.objB = objB;
    }

    protected AABB = () => {
        const bounds1 = this.objA.getBounds();
        const bounds2 = this.objB.getBounds();

        return (
            bounds1.x < bounds2.x + bounds2.width &&
            bounds1.x + bounds1.width > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds1.y + bounds1.height > bounds2.y
        );
    };

    setCallback = (callback: () => void) => {
        this.callback = callback;
    };

    remove = () => {
        this.removed = true;
    };

    isRemoved = () => {
        return this.objA.isRemoved() || this.objB.isRemoved() || this.removed;
    };

    update = () => {
        if (this.isRemoved()) return false;
        if (this.AABB()) {
            this.callback();
            return true;
        }
        return false;
    };
}
