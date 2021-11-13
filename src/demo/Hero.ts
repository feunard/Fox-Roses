import * as ex from 'excalibur';
import {Actor, CollisionType, Color, Input, PolygonCollider, Shape, Side, Vector} from 'excalibur';
import {hero_down_sheet, hero_idle_sheet, hero_jump_sheet, hero_run_sheet, sounds} from './resources';
import {Bolt, Direction} from "./Bolt";

class HitBox extends Actor {
    contact: string;

    constructor(
        collider: PolygonCollider,
        private side: Side
    ) {
        super({
            collider,
            collisionType: CollisionType.Passive,
        });
        this.on("collisionstart", (ev) => {
            if (ev.other?.name.includes("floor")) {
                this.contact = ev.other.name;
            }
        });
        this.on("collisionend", (ev) => {
            if (ev.other?.name === this.contact) {
                this.contact = "";
            }
        });
        this.contact = "";
    }
}


export class Hero extends Actor {
    public direction: Direction = Direction.RIGHT;
    down!: ex.Animation;
    idle!: ex.Animation;
    jump_up!: ex.Animation;
    jump_down!: ex.Animation;
    doubleJump = false;
    plan = false;
    sit = false;

    private sitPrevent: HitBox;
    private jumpPrevent: HitBox;

    constructor(
        private _height = 48,
        private _width = 56,
    ) {
        super({
            width: _width,
            height: _height,
            color: Color.Cyan,
            name: 'Bot',
            pos: new ex.Vector(0, -500),
            collider: Shape.Box(_width - 16, _height * 2 - 32, Vector.Half, ex.vec(0, 16)),
            collisionType: ex.CollisionType.Active,
        });

        this.sitPrevent = new HitBox(
            Shape.Box(_width - 16 - 2, _height * 2 - 32 - 32, Vector.Half, ex.vec(0, 0)),
            Side.Top
        );
        this.jumpPrevent = new HitBox(
            Shape.Box(_width - 16 - 2, _height * 2 - 32 - 32, Vector.Half, ex.vec(0, 32)),
            Side.Bottom
        );

        this.addChild(this.sitPrevent);
        this.addChild(this.jumpPrevent);
        this.box();
    }

    get onGround(): boolean {
        return !!this.jumpPrevent.contact;
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        // Initialize actor

        const default_frame = [0, 1, 2, 3, 4, 5, 6, 7];
        const default_duration = 80;
        const default_scale = new Vector(2, 2);
        const default_origin = new Vector(10, 0);

        this.jump_down = ex.Animation.fromSpriteSheet(hero_jump_sheet, [5, 6, 7], 500);
        this.jump_down.scale = default_scale;
        this.jump_down.origin = default_origin;

        this.jump_up = ex.Animation.fromSpriteSheet(hero_jump_sheet, [1, 2, 3, 4], 500);
        this.jump_up.scale = default_scale;
        this.jump_up.origin = default_origin;

        this.down = ex.Animation.fromSpriteSheet(hero_down_sheet, [5, 6, 7, 8], default_duration);
        this.down.scale = default_scale;
        this.down.origin = default_origin;

        this.idle = ex.Animation.fromSpriteSheet(hero_idle_sheet, default_frame, default_duration);
        this.idle.scale = default_scale;
        this.idle.origin = default_origin;

        const left = ex.Animation.fromSpriteSheet(hero_run_sheet, default_frame, default_duration);
        left.scale = default_scale;
        left.flipHorizontal = true;

        const right = ex.Animation.fromSpriteSheet(hero_run_sheet, default_frame, default_duration);
        right.scale = default_scale;

        // Register animations with actor
        this.graphics.add("idle", this.idle);
        this.graphics.add("left", left);
        this.graphics.add("right", right);
        this.graphics.add("jump_up", this.jump_up);
        this.graphics.add("jump_down", this.jump_down);
    }

    box(height = 32) {
        this.collider.useBoxCollider(this._width - 16, this._height * 2 - height, Vector.Half, ex.vec(0, height / 2));
    }

    // After main update, once per frame execute this code
    onPreUpdate(engine: ex.Engine, delta: number) {
        if (this.pos.y > 1000) {
            this.pos = new Vector(0, -200);
            this.vel = new Vector(0, 0);
        }


        // Reset x velocity
        this.vel.x = 0;

        // sit
        if
        (
            engine.input.keyboard.isHeld(ex.Input.Keys.S) ||
            engine.input.keyboard.isHeld(ex.Input.Keys.Down) ||
            engine.input.keyboard.isHeld(ex.Input.Keys.ShiftLeft)
        ) {
            if (this.onGround) {
                if (!this.sit) {
                    this.sit = true;
                    this.box(52);
                }
            }
        } else {
            if (this.sit) {
                if (!this.sitPrevent.contact) {
                    this.box();
                    this.sit = false;
                }
            }
        }

        if (this.sit) {
            this.graphics.use(this.down);
            if (engine.input.keyboard.wasPressed(Input.Keys.E)) {
                this.scene.engine.add(new Bolt(
                    new Vector(this.pos.x, this.pos.y + this._height / 2),
                    this.direction
                ))
            }
            if (engine.input.keyboard.isHeld(ex.Input.Keys.A)
                || engine.input.keyboard.isHeld(ex.Input.Keys.Q)
                || engine.input.keyboard.isHeld(ex.Input.Keys.Left)
            ) {
                this.vel.x = -50;
                this.idle.flipHorizontal = true;
                this.jump_up.flipHorizontal = true;
                this.jump_down.flipHorizontal = true;
                this.down.flipHorizontal = true;
                this.direction = Direction.LEFT;
            }

            if (engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Right)
            ) {
                this.vel.x = 50;
                this.idle.flipHorizontal = false;
                this.jump_up.flipHorizontal = false;
                this.jump_down.flipHorizontal = false;
                this.down.flipHorizontal = false;
                this.direction = Direction.RIGHT;
            }
            return;
        } else {
            //this.collider.useBoxCollider(this._width - 6, this._height * 2 - 32, Vector.Half, ex.vec(0, 16));
        }

        // Player input
        if (engine.input.keyboard.wasPressed(Input.Keys.E)) {
            this.scene.engine.add(new Bolt(
                this.pos,
                this.direction
            ))
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.A)
            || engine.input.keyboard.isHeld(ex.Input.Keys.Q)
            || engine.input.keyboard.isHeld(ex.Input.Keys.Left)
        ) {
            this.vel.x = -300;
            this.idle.flipHorizontal = true;
            this.jump_up.flipHorizontal = true;
            this.jump_down.flipHorizontal = true;
            this.down.flipHorizontal = true;
            this.direction = Direction.LEFT;
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
            engine.input.keyboard.isHeld(ex.Input.Keys.Right)
        ) {
            this.vel.x = 300;
            this.idle.flipHorizontal = false;
            this.jump_up.flipHorizontal = false;
            this.jump_down.flipHorizontal = false;
            this.down.flipHorizontal = false;
            this.direction = Direction.RIGHT;
        }

        if (
            engine.input.keyboard.wasPressed(ex.Input.Keys.J)
        ) {
            engine.showDebug(true);
        }
        if (
            engine.input.keyboard.wasPressed(ex.Input.Keys.K)
        ) {
            engine.showDebug(false);
        }


        if (
            engine.input.keyboard.isHeld(ex.Input.Keys.Space) ||
            engine.input.keyboard.isHeld(ex.Input.Keys.Up) ||
            engine.input.keyboard.isHeld(ex.Input.Keys.KeyZ) ||
            engine.input.keyboard.isHeld(ex.Input.Keys.KeyW)
        ) {
            if (this.plan) {
                this.acc.y = 0;
            }
        }

        if (
            engine.input.keyboard.wasPressed(ex.Input.Keys.Space) ||
            engine.input.keyboard.wasPressed(ex.Input.Keys.Up) ||
            engine.input.keyboard.wasPressed(ex.Input.Keys.KeyZ) ||
            engine.input.keyboard.wasPressed(ex.Input.Keys.KeyW)
        ) {
            this.plan = false;
            if (this.onGround) {
                console.log("JUMP 1")
                this.vel.y = -400;
                this.doubleJump = true;
                sounds.jump.play(.1);
            } else if (this.doubleJump) {
                console.log("JUMP 2")
                this.vel.y = -300;
                this.doubleJump = false;
                sounds.hit.play(.1);
            }
        }

        // Change animation based on velocity
        if (this.vel.x < 0) {
            this.graphics.use("left");
        }
        if (this.vel.x > 0) {
            this.graphics.use("right");
        }
        if (this.vel.x === 0) {
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





