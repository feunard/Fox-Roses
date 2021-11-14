import {Actor, Animation, CollisionType, Color, Engine, Shape, Side, vec, Vector} from 'excalibur';
import {
    hero_attack_sheet,
    hero_down_sheet,
    hero_idle_sheet,
    hero_jump_sheet,
    hero_run_sheet,
    sounds
} from './resources';
import {Bolt, Direction} from "./Bolt";
import {Keybinds} from "../game/Keybinds";
import {Hitbox} from "../game/Hitbox";
import {game} from "../game/Game";
import {PreCollisionEvent} from "excalibur/build/dist/Events";

export class Hero extends Actor {

    direction: Direction = Direction.RIGHT;
    animSit!: Animation;
    animIdle!: Animation;
    animJumpTop!: Animation;
    animJumpDown!: Animation;
    animAttack!: Animation;
    animRunLeft!: Animation;
    animRunRight!: Animation;
    hitboxHead: Hitbox;
    doubleJump = false;
    sit = false;
    cooldownFire = false;
    animSitLock = false;

    // canFireBolt = true;
    // canDoubleJump = true;
    // canFly = true;

    constructor(
        pos: Vector,
        private _height = 48,
        private _width = 56,
    ) {
        super({
            width: _width,
            height: _height,
            color: Color.Cyan,
            name: 'Hero',
            pos,
            collider: Shape.Box(_width - 16, _height * 2 - 32, Vector.Half, vec(0, 16)),
            collisionType: CollisionType.Active,
        });

        this.hitboxHead = new Hitbox(
            Shape.Box(_width - 16 - 4, _height * 2 - 32 - 32, Vector.Half, vec(0, 0)),
            Side.Top
        );

        this.addChild(this.hitboxHead);

        this.updateBoxCollider();

        const precollision = (ev: PreCollisionEvent) => {
            if (ev.other.name === "end") {
                this.off("precollision", precollision);
                game.next();
            }
        };
        this.on("precollision", precollision)
    }

    get onGround(): boolean {
        return this.vel.y === 0;
    }

    onInitialize(engine: Engine) {
        const default_frame = [0, 1, 2, 3, 4, 5, 6, 7];
        const default_duration = 80;
        const default_scale = new Vector(2, 2);

        this.animAttack = Animation.fromSpriteSheet(hero_attack_sheet, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 40);
        this.animAttack.scale = default_scale;

        this.animJumpDown = Animation.fromSpriteSheet(hero_jump_sheet, [5, 6, 7], 500);
        this.animJumpDown.scale = default_scale;

        this.animJumpTop = Animation.fromSpriteSheet(hero_jump_sheet, [1, 2, 3, 4], 500);
        this.animJumpTop.scale = default_scale;

        this.animSit = Animation.fromSpriteSheet(hero_down_sheet, [5, 6, 7, 8], default_duration);
        this.animSit.scale = default_scale;

        this.animIdle = Animation.fromSpriteSheet(hero_idle_sheet, default_frame, default_duration);
        this.animIdle.scale = default_scale;

        this.animRunLeft = Animation.fromSpriteSheet(hero_run_sheet, default_frame, default_duration);
        this.animRunLeft.scale = default_scale;
        this.animRunLeft.flipHorizontal = true;

        this.animRunRight = Animation.fromSpriteSheet(hero_run_sheet, default_frame, default_duration);
        this.animRunRight.scale = default_scale;

        // Register animations with actor
        this.graphics.add("idle", this.animIdle);
        this.graphics.add("left", this.animRunLeft);
        this.graphics.add("right", this.animRunRight);
        this.graphics.add("jump_up", this.animJumpTop);
        this.graphics.add("jump_down", this.animJumpDown);
        this.graphics.add("attack", this.animAttack);
    }

    updateBoxCollider(height = 32) {
        this.collider.useBoxCollider(this._width - 16, this._height * 2 - height, Vector.Half, vec(0, height / 2));
    }

    flip(direction: Direction) {
        if (direction === Direction.RIGHT) {
            this.animIdle.flipHorizontal = false
            this.animJumpTop.flipHorizontal = false
            this.animJumpDown.flipHorizontal = false
            this.animSit.flipHorizontal = false
            this.animAttack.flipHorizontal = false;
            this.direction = Direction.RIGHT;
        }
        if (direction === Direction.LEFT) {
            this.animIdle.flipHorizontal = true
            this.animJumpTop.flipHorizontal = true
            this.animJumpDown.flipHorizontal = true
            this.animSit.flipHorizontal = true
            this.animAttack.flipHorizontal = true;
            this.direction = Direction.LEFT;
        }
    }

    // After main update, once per frame execute this code
    onPreUpdate(engine: Engine, delta: number) {
        const kb = new Keybinds(engine);

        // check if dead zone

        if (this.pos.y > 1000) {
            this.pos = new Vector(0, -200);
            this.vel = new Vector(0, 0);
        }

        if (this.pos.y < -10000) {
            this.pos = new Vector(0, -200);
            this.vel = new Vector(0, 0);
        }

        // Reset x velocity

        this.vel.x = 0;

        if (this.handleSit(kb)) {
            return;
        }
        this.handleFire(kb);
        if (this.animSitLock) {
            return;
        }
        this.handleLeftRight(kb);
        this.handleJump(kb);
        this.handleIdle();
    }

    handleSit(kb: Keybinds) {

        if (kb.isHeld("sit")) {
            if (this.onGround) {
                if (!this.sit) {
                    this.sit = true;
                }
            }
        } else {
            if (this.sit) {
                if (!this.hitboxHead.contact) {
                    this.sit = false;
                }
            }
        }

        if (this.sit || (this.hitboxHead.contact && this.onGround)) {

            this.updateBoxCollider(52);

            this.graphics.use(this.animSit);

            if (kb.wasPressed("fire") && !this.cooldownFire) {

                this.scene.engine.add(new Bolt(
                    new Vector(this.pos.x, this.pos.y + this._height / 2),
                    this.direction
                ))

                this.cooldownFire = true;

                setTimeout(() => {
                    this.cooldownFire = false;
                }, 1000);
            }

            if (kb.isHeld("left")) {
                this.vel.x = -50;
                this.flip(Direction.LEFT);
            }

            if (kb.isHeld("right")) {
                this.vel.x = 50;
                this.flip(Direction.RIGHT);
            }

            return true;
        } else {
            this.updateBoxCollider();
        }
    }

    handleFire(kb: Keybinds) {
        if (kb.wasPressed("fire") && !this.cooldownFire) {
            this.scene.engine.add(new Bolt(
                new Vector(this.pos.x, this.pos.y + this._height / 2 - 7),
                this.direction
            ))
            this.graphics.use(this.animAttack);
            this.animSitLock = true;
            this.cooldownFire = true;

            setTimeout(() => {
                this.animSitLock = false;
                this.animAttack.reset();
            }, 440);

            setTimeout(() => {
                this.cooldownFire = false;
            }, 1000);

            return true;
        }
    }

    handleLeftRight(kb: Keybinds) {
        if (kb.isHeld("left")) {
            this.vel.x = -300;
            this.flip(Direction.LEFT);
            this.graphics.use("left");
        }

        if (kb.isHeld("right")) {
            this.vel.x = 300;
            this.flip(Direction.RIGHT);
            this.graphics.use("right");
        }
    }

    handleJump(kb: Keybinds) {
        if (kb.wasPressed("jump")) {
            if (this.onGround) {
                this.vel.y = -400;
                this.doubleJump = true;
                sounds.jump.play(.1);
            } else if (this.doubleJump) {
                this.vel.y = -400;
                this.doubleJump = false;
                sounds.jump.play(.1);
            }
        }
    }

    handleIdle() {
        if (this.vel.x === 0) {
            this.graphics.use("idle")
        }

        if (this.vel.y < 0) {
            this.graphics.use(this.animJumpTop); // TODO: Move to held/jump
        }

        if (this.vel.y > 0) {
            this.graphics.use(this.animJumpDown);
        }
    }
}





