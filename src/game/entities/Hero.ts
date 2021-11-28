import {Actor, Animation, CollisionType, Color, Engine, Entity, Input, Shape, Side, vec, Vector} from 'excalibur';
import {
    hero_attack_down_sheet,
    hero_attack_jump_sheet,
    hero_attack_sheet,
    hero_down_sheet,
    hero_idle_sheet,
    hero_jump_sheet,
    hero_run_sheet
} from '../resources';
import {Bolt, Direction} from "./misc/Bolt";
import {Keybinds} from "../Keybinds";
import {Hitbox} from "./Hitbox";
import {game} from "../Game";
import {audio} from "../audio";
import {config} from "../config";
import {FloorAware} from "./misc/Floor";

export class Hero extends Actor {

    static NAME = "hero";

    // canFly = true;
    private static COOLDOWN_FIRE: number = 700;
    direction: Direction = Direction.RIGHT;
    animSit!: Animation;
    animIdle!: Animation;
    animJumpTop!: Animation;
    animJumpDown!: Animation;
    animAttack!: Animation;
    animAttackDown!: Animation;
    animAttackJump!: Animation;
    animRunLeft!: Animation;
    animRunRight!: Animation;
    hitboxHead: Hitbox;
    doubleJump = false;
    sit = false;
    cooldownFire = false;

    // canFireBolt = true;
    // canDoubleJump = true;
    animSitLock = false;
    wasOnGround = false;
    audio_jump = audio.random(
        "jump_0",
        "jump_1",
        "jump_2",
    );
    spawn: Vector;
    vel_default = vec(0, 0);
    floor = new FloorAware(this);
    smash: Entity | null = null;

    constructor(
        position: Vector,
        private _height = 48,
        private _width = 56,
    ) {
        super({
            width: _width,
            height: _height,
            color: Color.Cyan,
            name: Hero.NAME,
            pos: position,
            collider: Shape.Box(_width - 16, _height * 2 - 32, Vector.Half, vec(0, 16)),
            collisionType: CollisionType.Active,
        });

        this.spawn = position;
        this.hitboxHead = new Hitbox(
            Shape.Box(_width - 16 - 4, _height * 2 - 32 - 32, Vector.Half, vec(0, -4)),
            Side.Bottom
        );

        this.addChild(this.hitboxHead);
        this.updateBoxCollider();
    }

    onFloor = false;

    get onGround(): boolean {
        return this.vel.y === 0 && this.onFloor;
    }

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

        this.animSit = Animation.fromSpriteSheet(hero_down_sheet, [6, 7], default_duration);
        this.animSit.scale = default_scale;

        this.animIdle = Animation.fromSpriteSheet(hero_idle_sheet, default_frame, default_duration);
        this.animIdle.scale = default_scale;

        this.animRunLeft = Animation.fromSpriteSheet(hero_run_sheet, default_frame, default_duration);
        this.animRunLeft.scale = default_scale;
        this.animRunLeft.flipHorizontal = true;

        this.animRunRight = Animation.fromSpriteSheet(hero_run_sheet, default_frame, default_duration);
        this.animRunRight.scale = default_scale;

        this.register()

        const smash_list = ["mage", "war"]

        this.on("precollision", (ev) => {
            if (ev.side === Side.Bottom && smash_list.includes(ev.other.name)) {
                this.smash = ev.other;
            }
            if (ev.side === Side.Bottom) {
                this.onFloor = true;
            }
        })
    }

    register() {
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
            this.animAttackDown.flipHorizontal = false;
            this.animAttackJump.flipHorizontal = false;
            this.direction = Direction.RIGHT;
        }
        if (direction === Direction.LEFT) {
            this.animIdle.flipHorizontal = true
            this.animJumpTop.flipHorizontal = true
            this.animJumpDown.flipHorizontal = true
            this.animSit.flipHorizontal = true
            this.animAttack.flipHorizontal = true;
            this.animAttackDown.flipHorizontal = true;
            this.animAttackJump.flipHorizontal = true;
            this.direction = Direction.LEFT;
        }
    }

    // After main update, once per frame execute this code
    onPreUpdate(engine: Engine, delta: number) {
        const kb = new Keybinds(engine);

        // check if dead zone

        if (this.pos.y > 4000) {
            game.next();
        }

        if (this.pos.y < -2000) {
            game.next();
        }

        // Reset x velocity

        this.vel.x = 0;
        if (!this.wasOnGround && this.onGround) {
            this.wasOnGround = true;
            if (kb.isHeld("down")) {
                audio.play("hit_light")
                game.engine.currentScene.camera.shake(10, 10, 200)
                if (this.smash) {
                    this.smash.kill();
                }
            }
        }

        this.smash = null;

        if (engine.input.keyboard.isHeld(Input.Keys.Escape)) {
            game.stop();
        }

        if (engine.input.keyboard.isHeld(Input.Keys.O)) {
            game.engine.currentScene.camera.angularVelocity = 20000;
        }

        if (this.handleSit(kb)) {
            return this.end();
        }

        this.handleFire(kb);
        this.handleLeftRight(kb);

        if (this.animSitLock) {
            return this.end();
        }

        this.handleJump(kb);
        this.handleFall(kb);
        this.handleIdle();
        this.end();
    }

    end() {
        this.vel.x += this.vel_default.x;
        this.vel.y += this.vel_default.y;
        this.floor.update();
        this.wasOnGround = this.onGround;
        this.onFloor = false;
        this.vel_default = vec(0, 0);
    }

    handleFall(kb: Keybinds) {
        if (!this.onGround) {
            if (kb.isHeld("down")) {
                this.vel.y += 50;
            }
        }
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

            if (!this.animSitLock)
                this.graphics.use(this.animSit);

            if (kb.wasPressed("fire") && !this.cooldownFire && config.canFirebolt) {

                this.scene.engine.add(new Bolt(
                    new Vector(this.pos.x, this.pos.y + this._height / 2 + 6),
                    this.direction
                ));

                this.graphics.use(this.animAttackDown);
                this.cooldownFire = true;
                this.animSitLock = true;
                audio.play("firebolt");

                setTimeout(() => {
                    this.animSitLock = false;
                    this.animAttackDown.reset();
                }, 440);

                setTimeout(() => {
                    this.cooldownFire = false;
                }, Hero.COOLDOWN_FIRE);
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
        if (kb.wasPressed("fire") && !this.cooldownFire && config.canFirebolt) {
            this.scene.engine.add(new Bolt(
                new Vector(this.pos.x, this.pos.y + this._height / 2 - 7),
                this.direction
            ))
            const anim = this.onGround ? this.animAttack : this.animAttackJump;
            this.graphics.use(anim);
            this.animSitLock = true;
            this.cooldownFire = true;
            audio.play("firebolt");

            setTimeout(() => {
                this.animSitLock = false;
                anim.reset();
            }, 440);

            setTimeout(() => {
                this.cooldownFire = false;
            }, Hero.COOLDOWN_FIRE);

            return true;
        }
    }

    handleLeftRight(kb: Keybinds) {
        const speed = config.canSpeed ? 400 : 250;
        if (kb.isHeld("left")) {
            this.vel.x = -speed;
            this.flip(Direction.LEFT);
            if (!this.animSitLock)
                this.graphics.use("left");
        }

        if (kb.isHeld("right")) {
            this.vel.x = speed;
            this.flip(Direction.RIGHT);
            if (!this.animSitLock)
                this.graphics.use("right");
        }
    }

    handleJump(kb: Keybinds) {
        if (kb.wasPressed("jump")) {
            if (this.onGround) {
                this.audio_jump.play();
                this.vel.y = -400;
                this.doubleJump = true;
            } else if (this.doubleJump && config.canDoubleJump) {
                this.audio_jump.play();
                this.vel.y = -400;
                this.doubleJump = false;
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

    dead() {
        this.pos = this.spawn;
        audio.play("hero_dead");
        this.scene.camera.shake(20, 20, 1000);
        this.vel = new Vector(0, 0);
    }
}





