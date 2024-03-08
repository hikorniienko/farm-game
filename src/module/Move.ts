import { RunnerObject } from "../core/Runner";
import { IGraphics } from "../type";

export class Move extends RunnerObject {
    protected obj: IGraphics;
    protected toX: number | null = null;
    protected toY: number | null = null;
    protected removed: boolean = false;
    protected speed: number = 1;
    protected callback: () => void = () => {};

    constructor(obj: IGraphics) {
        super();
        this.obj = obj;
    }

    protected angle = (fromX: number, fromY: number, toX: number, toY: number) => {
        return Math.atan2(toY - fromY, toX - fromX);
    };

    protected velocity = (fromX: number, fromY: number, toX: number, toY: number) => {
        const angle = this.angle(fromX, fromY, toX, toY);

        return {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };
    };

    protected distance = (fromX: number, fromY: number, toX: number, toY: number) => {
        return Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    };

    to = (toX: number, toY: number) => {
        this.toX = toX;
        this.toY = toY;
    };

    toRandom = () => {
        this.toX = Math.random() * window.innerWidth;
        this.toY = Math.random() * window.innerHeight;
    };

    setCallback = (callback: () => void) => {
        this.callback = callback;
    };

    setSpeed = (speed: number) => {
        this.speed = speed;
    };

    remove = () => {
        this.removed = true;
    };

    isRemoved = () => {
        return this.obj.isRemoved() || this.removed;
    };

    update = () => {
        if (this.removed) return false;
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
        this.obj.setPosition(
            from.x + velocity.x * this.speed,
            from.y + velocity.y * this.speed
        );

        return true;
    };
}
