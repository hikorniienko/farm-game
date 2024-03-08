import "./style.css";

import { Engine } from "./core/Engine";
import { Runner } from "./core/Runner";

import { Counter } from "./module/Counter";
import { Group } from "./module/Group";
import { Move } from "./module/Move";
import { Event } from "./module/Event";
import { Collision } from "./module/Collision";

import { Background } from "./game/Background";
import { Score } from "./game/Score";
import { Home } from "./game/Home";
import { Player } from "./game/Player";
import { AnimalGenerator } from "./game/AnimalGenerator";
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

    // Background
    const bg = new Background(engine.app);
    runner.add(bg);

    // Score
    const score = new Score(engine.app);
    runner.add(score);

    // Home
    const home = new Home(engine.app);
    runner.add(home);

    // Counter
    const counter = new Counter(5);

    // Player
    const player = new Player(engine.app);
    runner.add(player);

    const playerMove = new Move(player);
    runner.add(playerMove);

    const playerEvent = new Event(engine.app);
    playerEvent.onClick((event) => playerMove.to(event.x, event.y));

    const playerCollision = new Collision(player, home);
    playerCollision.setCallback(() => {
        score.add(counter.getCount());
        counter.reset();
        playerGroup.reset();
    });
    runner.add(playerCollision);

    const playerGroup = new Group(player);
    runner.add(playerGroup);

    // Animal
    const animal = () => {
        const animal = new Animal(engine.app);
        runner.add(animal);

        const animalMove = new Move(animal);
        animalMove.toRandom();
        animalMove.setCallback(() => {
            animalMove.toRandom();
        });
        runner.add(animalMove);

        const animalCollision = new Collision(animal, player);
        animalCollision.setCallback(() => {
            if (counter.isMax()) return;
            counter.increment();
            animalCollision.remove();

            playerGroup.add(
                (x, y) => animalMove.to(x, y),
                () => {
                    const { x, y } = home.getPosition();
                    animalMove.setCallback(animal.remove);
                    animalMove.to(x, y);
                }
            );
        });
        runner.add(animalCollision);
    };

    // Animal Generator
    const animals = new AnimalGenerator();
    animals.init(animal);
    animals.create(5);
    animals.createStart(10000, Math.floor(Math.random() * 5) + 1);
}

main();
