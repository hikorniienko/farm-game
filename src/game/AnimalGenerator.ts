import { IAnimalGenerator } from "../type";

export class AnimalGenerator implements IAnimalGenerator {
    protected generate: () => void = () => {};
    protected createInterval: number | null = null;

    constructor() {}

    init = (generate: () => void) => {
        this.generate = generate;
    };

    create = (count: number = 0) => {
        for (let i = 0; i < count; i++) {
            this.generate();
        }
    };

    createStart = (ms: number = 3000, count: number = 1) => {
        this.createInterval = setInterval(() => {
            this.create(count);
        }, ms);
    };

    createStop = () => {
        if (this.createInterval === null) return;
        clearInterval(this.createInterval);
        this.createInterval = null;
    };
}
