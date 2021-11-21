import {Animation, Engine, Vector} from 'excalibur';
import {
    hero_attack_down_sheet,
    hero_attack_jump_sheet,
    hero_attack_sheet,
    hero_down_sheet,
    hero_jump_sheet,
    heroExias_idle_sheet,
    heroExias_run_sheet
} from '../resources';
import {Hero} from "./Hero";

export class HeroExias extends Hero {

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: Engine) {
        const default_frame = [0, 1, 2, 3, 4, 5, 6, 7];
        const default_duration = 80;
        const default_scale = new Vector(2, 2);

        this.animAttack = Animation.fromSpriteSheet(hero_attack_sheet, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 40);
        this.animAttack.scale = default_scale;

        this.animAttackDown = Animation.fromSpriteSheet(hero_attack_down_sheet, [0, 1, 2, 3, 4, 5, 6], 70);
        this.animAttackDown.scale = default_scale;

        this.animAttackJump = Animation.fromSpriteSheet(hero_attack_jump_sheet, [0, 1, 2, 3, 4], 80);
        this.animAttackJump.scale = default_scale;

        this.animJumpDown = Animation.fromSpriteSheet(hero_jump_sheet, [5, 6, 7], 500);
        this.animJumpDown.scale = default_scale;

        this.animJumpTop = Animation.fromSpriteSheet(hero_jump_sheet, [1, 2, 3, 4], 500);
        this.animJumpTop.scale = default_scale;

        this.animSit = Animation.fromSpriteSheet(hero_down_sheet, [5, 6, 7, 8], default_duration);
        this.animSit.scale = default_scale;

        this.animIdle = Animation.fromSpriteSheet(heroExias_idle_sheet, default_frame, 120);
        this.animIdle.scale = default_scale;

        this.animRunLeft = Animation.fromSpriteSheet(heroExias_run_sheet, default_frame, default_duration);
        this.animRunLeft.scale = default_scale;
        this.animRunLeft.flipHorizontal = true;

        this.animRunRight = Animation.fromSpriteSheet(heroExias_run_sheet, default_frame, default_duration);
        this.animRunRight.scale = default_scale;

        // Register animations with actor
        this.register();
    }
}





