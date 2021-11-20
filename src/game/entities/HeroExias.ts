import * as ex from 'excalibur';
import {Vector} from 'excalibur';
import {heroExias_idle_sheet} from '../resources';
import {Hero} from "./Hero";

export class HeroExias extends Hero {

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        super.onInitialize(engine);
        const default_frame = [0, 1, 2, 3, 4, 5, 6, 7];
        const default_duration = 80;
        const default_scale = new Vector(2, 2);
        this.animIdle = ex.Animation.fromSpriteSheet(heroExias_idle_sheet, default_frame, default_duration);
        this.animIdle.scale = default_scale;
    }
}





