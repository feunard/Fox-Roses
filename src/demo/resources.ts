import {ImageSource, Sound, SpriteSheet} from "excalibur";

export const images: { [key: string]: ImageSource } = {
    bolt: new ImageSource(require("../resources/bolt.png").default),
    hero_idle: new ImageSource(require("../resources/hero_idle.png").default),
    heroExias_idle: new ImageSource(require("../resources/Exias_idleV2.png").default),
    hero_run: new ImageSource(require("../resources/hero_run.png").default),
    hero_jump: new ImageSource(require("../resources/hero_jump.png").default),
    hero_down: new ImageSource(require("../resources/hero_down.png").default),
    hero_attack: new ImageSource(require("../resources/hero_attack.png").default)
}

export const sounds: { [key: string]: Sound } = {
    jump: new Sound(require('../resources/jump.wav').default)
}

const default_grid = {
    columns: 1,
    rows: 8,
    spriteWidth: 56,
    spriteHeight: 48
};

export const bolt_sheet = SpriteSheet.fromImageSource({
    image: images.bolt,
    grid: {
        columns: 1,
        rows: 5, // 5
        spriteWidth: 32,
        spriteHeight: 32
    }
});

export const hero_attack_sheet = SpriteSheet.fromImageSource({
    image: images.hero_attack,
    grid: {...default_grid, rows: 11}
});

export const hero_idle_sheet = SpriteSheet.fromImageSource({
    image: images.hero_idle,
    grid: default_grid,
});

export const heroExias_idle_sheet = SpriteSheet.fromImageSource({
    image: images.heroExias_idle,
    grid: default_grid,
});

export const hero_down_sheet = SpriteSheet.fromImageSource({
    image: images.hero_down,
    grid: default_grid
});

export const hero_run_sheet = SpriteSheet.fromImageSource({
    image: images.hero_run,
    grid: default_grid
});

export const hero_jump_sheet = SpriteSheet.fromImageSource({
    image: images.hero_jump,
    grid: {...default_grid, rows: 12}
});

