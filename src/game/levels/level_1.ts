export const level_1 = {
    name: "Rêve",
    music: "",
    entities: [
        {
            "type": "floor",
            "x": 0,
            "y": -1000,
            "width": 32,
            "height": 5000,
            "color": "000000"
        },
        {
            "type": "floor",
            "x": -1000,
            "y": 600,
            "width": 10000,
            "height": 8
        },
        {
            "type": "event",
            "event": "start",
            "x": 400,
            "y": -1000,
            "width": 64,
            "height": 64
        },
        {
            "type": "npc",
            "x": 440,
            "y": 536,
            "width": 64,
            "height": 64,
            "animation": "fox",
            "messages": [
                {
                    "icon": "avatar_fox",
                    "sound": "s278",
                    "author": "Renard",
                    "content": "Oh, encore un visteur tombé du ciel. Je ne m'en lasse pas."
                },
                {
                    "icon": "avatar_fox",
                    "sound": "s279",
                    "author": "Renard",
                    "content": "Essaye d'aller à droite avec la touche D."
                }
            ],
            "name": "fox"
        }
    ]
}