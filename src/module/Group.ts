import { RunnerObject } from "../core/Runner";
import { IGraphics, IGroup } from "../type";

export class Group extends RunnerObject implements IGroup {
    protected obj: IGraphics;
    protected callbackCordList: Array<(x: number, y: number) => void> = [];
    protected callbackRemoveList: Array<(x: number, y: number) => void> = [];
    protected removed: boolean = false;

    constructor(obj: IGraphics) {
        super();
        this.obj = obj;
    }

    protected getAroundPoint = (x: number, y: number, r: number, deg: number) => {
        const angleInRadians = (deg * Math.PI) / 180;
        return {
            x: x + r * Math.cos(angleInRadians),
            y: y + r * Math.sin(angleInRadians),
        };
    };

    add = (
        callbackCord: (x: number, y: number) => void,
        callbackRemove: (x: number, y: number) => void
    ) => {
        if (this.obj.isRemoved() || this.removed) return false;

        this.callbackCordList.push(callbackCord);
        this.callbackRemoveList.push(callbackRemove);

        return true;
    };

    reset = () => {
        if (this.obj.isRemoved() || this.removed) return;

        const { x, y } = this.obj.getPosition();
        this.callbackRemoveList.forEach((callback) => {
            callback(x, y);
        });
        this.callbackCordList = [];
        this.callbackRemoveList = [];
    };

    remove = () => {
        this.removed = true;
    };

    isRemoved = () => {
        return this.obj.isRemoved() || this.removed;
    };

    update = () => {
        if (this.removed) return false;
        if (this.obj.isRemoved()) return false;

        const to = this.obj.getPosition();

        this.callbackCordList.forEach((callback, index) => {
            const deg = index * (360 / this.callbackCordList.length);
            const { x, y } = this.getAroundPoint(to.x, to.y, 30, deg);
            callback(x, y);
        });

        return true;
    };
}
