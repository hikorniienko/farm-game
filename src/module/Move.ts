import { RunnerObject } from "../core/Runner";
import { IGraphics } from "../type";

export class Move extends RunnerObject {
    private obj: IGraphics;
    private toX: number | null = null;
    private toY: number | null = null;
    private callback: () => void = () => {};

    constructor(obj: IGraphics) {
        super();
        this.obj = obj;
    }

    private angle = (fromX: number, fromY: number, toX: number, toY: number) => {
        return Math.atan2(toY - fromY, toX - fromX);
    };

    private velocity = (fromX: number, fromY: number, toX: number, toY: number) => {
        const angle = this.angle(fromX, fromY, toX, toY);

        return {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };
    };

    private distance = (fromX: number, fromY: number, toX: number, toY: number) => {
        return Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    };

    to(toX: number, toY: number) {
        this.toX = toX;
        this.toY = toY;
    }

    toRandom = () => {
        this.toX = Math.random() * window.innerWidth;
        this.toY = Math.random() * window.innerHeight;
    };

    setCallback = (callback: () => void) => {
        this.callback = callback;
    };

    isRemoved = () => {
        return this.obj.isRemoved();
    };

    update = () => {
        if (this.toX === null || this.toY === null) return false;
        if (this.obj.isRemoved()) return false;

        const from = this.obj.getPosition();
        const velocity = this.velocity(from.x, from.y, this.toX, this.toY);
        const distance = this.distance(from.x, from.y, this.toX, this.toY);

        if (distance < 1) {
            this.toX = null;
            this.toY = null;
            this.callback();
            return false;
        }

        const angle = this.angle(from.x, from.y, this.toX, this.toY);
        this.obj.setRotation(angle + Math.PI / 2);
        this.obj.setPosition(from.x + velocity.x, from.y + velocity.y);

        return true;
    };
}
