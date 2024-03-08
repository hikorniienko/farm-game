import { ICounter } from "../type";

export class Counter implements ICounter {
    protected count: number = 0;
    protected max: number = Infinity;

    constructor(max: number | undefined) {
        if (typeof max === "number") this.max = max;
    }

    increment = () => {
        this.count = Math.min(this.count + 1, this.max);
    };

    decrement = () => {
        this.count = Math.max(this.count - 1, 0);
    };

    reset = () => {
        this.count = 0;
    };

    getCount = () => this.count;

    getMax = () => this.max;

    isMax = () => this.count === this.max;

    isZero = () => this.count === 0;
}
