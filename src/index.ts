import "./style.css";

import { Engine } from "./core/Engine";
import { Runner } from "./core/Runner";

import { Move } from "./module/Move";
import { Event } from "./module/Event";

import { Background } from "./game/Background";
import { Home } from "./game/Home";
import { Player } from "./game/Player";
import { Animal } from "./game/Animal";

async function main() {
    /* ******************************************
    CORE
    ****************************************** */

    const engine = new Engine();
    await engine.init();

    const runner = new Runner(engine.app);

    /* ******************************************
    GAME
    ****************************************** */

    const bg = new Background(engine.app);
    runner.add(bg);

    // Home
    const home = new Home(engine.app);
    runner.add(home);

    // Player
    const player = new Player(engine.app);
    runner.add(player);

    const playerMove = new Move(player);
    runner.add(playerMove);

    const playerEvent = new Event(engine.app);
    playerEvent.onClick((event) => playerMove.to(event.x, event.y));

    // Animals
    const count = 20;
    for (let i = 0; i < count; i++) {
        const animal = new Animal(engine.app);
        runner.add(animal);

        const animalMove = new Move(animal);
        animalMove.toRandom();
        animalMove.setCallback(() => {
            animalMove.toRandom();
        });
        runner.add(animalMove);
    }
}

main();
