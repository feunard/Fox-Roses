import {Animation, ImageSource, SpriteSheet} from "excalibur";

export const images: { [key: string]: ImageSource } = {
    bolt: new ImageSource(require("../resources/bolt.png").default),
    hero_idle: new ImageSource(require("../resources/hero_idle.png").default),
    heroExias_idle: new ImageSource(require("../resources/Exias_idleV4.png").default),
    hero_run: new ImageSource(require("../resources/hero_run.png").default),
   // heroExias_run: new ImageSource(require("../resources/Exias_runningV2.png")),
    hero_jump: new ImageSource(require("../resources/hero_jump.png").default),
    hero_down: new ImageSource(require("../resources/hero_down.png").default),
    hero_attack: new ImageSource(require("../resources/hero_attack.png").default),
    hero_attack_down: new ImageSource(require("../resources/hero_down_attack.png").default),
    hero_attack_jump: new ImageSource(require("../resources/hero_jump_attack.png").default),
    rose: new ImageSource(require("../resources/rose.png").default),
    fox: new ImageSource(require("../resources/fox.png").default)
}

export const sounds = {}

const default_hero_grid = {
    columns: 1,
    rows: 8,
    spriteWidth: 56,
    spriteHeight: 48
};

const default_grid = {
    columns: 1,
    rows: 1,
    spriteWidth: 64,
    spriteHeight: 64
};

export const fox_sheet = SpriteSheet.fromImageSource({
    image: images.fox,
    grid: default_grid
});

export const rose_sheet = SpriteSheet.fromImageSource({
    image: images.rose,
    grid: default_grid
});

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
    grid: {...default_hero_grid, rows: 11}
});

export const hero_attack_down_sheet = SpriteSheet.fromImageSource({
    image: images.hero_attack_down,
    grid: {...default_hero_grid, rows: 7}
});

export const hero_attack_jump_sheet = SpriteSheet.fromImageSource({
    image: images.hero_attack_jump,
    grid: {...default_hero_grid, rows: 5}
});

export const hero_idle_sheet = SpriteSheet.fromImageSource({
    image: images.hero_idle,
    grid: default_hero_grid,
});

export const heroExias_idle_sheet = SpriteSheet.fromImageSource({
    image: images.heroExias_idle,
    grid: default_hero_grid,
});

export const hero_down_sheet = SpriteSheet.fromImageSource({
    image: images.hero_down,
    grid: default_hero_grid
});

export const hero_run_sheet = SpriteSheet.fromImageSource({
    image: images.hero_run,
    grid: default_hero_grid
});

/*export const heroExias_run_sheet = SpriteSheet.fromImageSource({
    image: images.heroExias_run,
    grid: {...default_grid, rows: 9}
})*/

export const hero_jump_sheet = SpriteSheet.fromImageSource({
    image: images.hero_jump,
    grid: {...default_hero_grid, rows: 12}
});

export const animations = {
    bolt: Animation.fromSpriteSheet(bolt_sheet, [0, 1, 2, 3, 4], 60),
    rose: Animation.fromSpriteSheet(rose_sheet, [0], 60),
    fox: Animation.fromSpriteSheet(fox_sheet, [0], 60),
}

export type AnimationsType = keyof typeof animations;
export const animationsList = Object.keys(animations);
