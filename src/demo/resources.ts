import * as ex from 'excalibur';

const botFile = require('../res/excalibot.png').default;
const botRedFile = require('../res/excalibot-red.png').default;
const baddieFile = require('../res/baddie.png').default;
const blockFile = require('../res/block.png').default;
const npcFile = require('../res/npc.png').default;
const jumpSound = require('../res/jump.wav').default;
const hitSound = require('../res/hurt.wav').default;
const gotEmSound = require('../res/gottem.wav').default;

const Resources = {
    bot: new ex.ImageSource(botFile),
    botRed: new ex.ImageSource(botRedFile),
    baddie: new ex.ImageSource(baddieFile),
    block: new ex.ImageSource(blockFile),
    npc: new ex.ImageSource(npcFile),
    jump: new ex.Sound(jumpSound),
    hit: new ex.Sound(hitSound),
    gotEm: new ex.Sound(gotEmSound)
}

const loader = new ex.Loader();

const botSpriteSheet = ex.SpriteSheet.fromImageSource({
    image:Resources.bot, 
    grid: { 
        columns: 8,
        rows: 1, 
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const botRedSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.botRed,
    grid: {
        columns: 8, 
        rows: 1,
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const baddieSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.baddie,
    grid: {
        columns: 6, 
        rows: 1,
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const blockSprite = Resources.block.toSprite();
const npcSprite = Resources.npc.toSprite();

for (const res in Resources) {
    loader.addResource((Resources as any)[res]);
}

export { Resources, loader, botSpriteSheet, botRedSpriteSheet, baddieSpriteSheet, blockSprite, npcSprite }