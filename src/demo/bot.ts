import * as ex from 'excalibur';
import {botSpriteSheet, hero_idle_sheet, hero_jump_sheet, hero_run_sheet, sounds} from './resources';
import {CollisionGroupManager, Shape, Vector} from "excalibur";

export class Bot extends ex.Actor {
    public onGround = true;
    public jumped = false;
    public hurt = false;
    public hurtTime: number = 0;

    constructor(x: number, y: number) {
        super({
            name: 'Bot',
            pos: new ex.Vector(x, y),
            collisionType: ex.CollisionType.Active,
            collisionGroup: ex.CollisionGroupManager.groupByName("player"),
            collider: ex.Shape.Box(56, 48, ex.Vector.Half, ex.vec(0, 48 / 2))
        });
    }

    idle!: ex.Animation;
    jump_up!: ex.Animation;
    jump_down!: ex.Animation;

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        // Initialize actor

        // Setup visuals
        const hurtleft = ex.Animation.fromSpriteSheet(botSpriteSheet, [0, 1, 0, 1, 0, 1], 150);
        hurtleft.scale = new ex.Vector(2, 2);

        const hurtright = ex.Animation.fromSpriteSheet(botSpriteSheet, [0, 1, 0, 1, 0, 1], 150);
        hurtright.scale = new ex.Vector(2, 2);
        hurtright.flipHorizontal = true;

        const default_frame = [0, 1, 2, 3, 4, 5, 6, 7];
        const default_duration = 100;
        const default_scale = new Vector(2, 2);

        this.jump_down = ex.Animation.fromSpriteSheet(hero_jump_sheet, [5, 6, 7], 500);
        this.jump_down.scale = default_scale;

        this.jump_up = ex.Animation.fromSpriteSheet(hero_jump_sheet, [1, 2, 3, 4], 500);
        this.jump_up.scale = default_scale;

        this.idle = ex.Animation.fromSpriteSheet(hero_idle_sheet, default_frame, default_duration);
        this.idle.scale = default_scale;

        const left = ex.Animation.fromSpriteSheet(hero_run_sheet, default_frame, default_duration);
        left.scale = default_scale;
        left.flipHorizontal = true;

        const right = ex.Animation.fromSpriteSheet(hero_run_sheet, default_frame, default_duration);
        right.scale = default_scale;

        // Register animations with actor
        this.graphics.add("hurtleft", hurtleft);
        this.graphics.add("hurtright", hurtright);
        this.graphics.add("idle", this.idle);
        this.graphics.add("left", left);
        this.graphics.add("right", right);
        this.graphics.add("jump_up", this.jump_up);
        this.graphics.add("jump_down", this.jump_down);

        // onPostCollision is an event, not a lifecycle meaning it can be subscribed to by other things
        this.on('postcollision', this.onPostCollision);
    }

    onPostCollision(evt: ex.PostCollisionEvent) {
        if (evt.side === ex.Side.Bottom) {
            this.onGround = true;
        }
    }

    // After main update, once per frame execute this code
    onPreUpdate(engine: ex.Engine, delta: number) {
        // If hurt, count down
        if (this.hurtTime >= 0 && this.hurt) {
            this.hurtTime -= delta;
            if (this.hurtTime < 0) {
                this.hurt = false;
            }
        }

        // Reset x velocity
        this.vel.x = 0;

        // Player input
        if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.x = -250;
            this.idle.flipHorizontal = true;
            this.jump_up.flipHorizontal = true;
            this.jump_down.flipHorizontal = true;
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
            this.vel.x = 250;
            this.idle.flipHorizontal = false;
            this.jump_up.flipHorizontal = false;
            this.jump_down.flipHorizontal = false;
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.onGround) {
            this.vel.y = -400;
            this.onGround = false;
            sounds.jump.play(.1);
        }

        // Change animation based on velocity
        if (this.vel.x < 0 && !this.hurt) {
            this.graphics.use("left");
        }
        if (this.vel.x > 0 && !this.hurt) {
            this.graphics.use("right");
        }
        if (this.vel.x === 0 && !this.hurt) {
            this.graphics.use("idle")
        }
        if (this.vel.y < 0) {
            this.graphics.use(this.jump_up);
        }
        if (this.vel.y > 0) {
            this.graphics.use(this.jump_down);
        }
    }
}