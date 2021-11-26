const fox = {
    "icon": "avatar_fox",
    "sound": "s278",
    "author": "Renard",
}

export const dialogs = {
    fox1: [
        {
            ...fox,
            "content": "Oh, encore un visteur tombé du ciel. Je ne m'en lasse pas."
        },
        {
            ...fox,
            "content": "Essaye d'aller à droite avec la touche D/Droite."
        }
    ],
    fox2: [
        {
            ...fox,
            "content": "Non, je t'ai dit d'aller à droite, pas à gauche."
        }
    ],
    fox3: [
        {
            ...fox,
            "content": "Bien. Peut être que tu te demandes où tu es ?"
        },
        {
            ...fox,
            "content": "Avant de répondre, utilise Z/Haut pour sauter les obstacles."
        }
    ],
    fox4: [
        {
            ...fox,
            content: "Ah, tu peux aussi d'accroupir avec la touche S/Bas. Même si tu viens de sauter."
        }
    ],
    level1_fox5: [
        {
            ...fox,
            content: "Bon, tu es dans l'onirisme. Tes rêves."
        },
        {
            ...fox,
            content: "Rigolo, tu as l'air consciente. Mais tu ne peux pas te réveiller, hein ?"
        },
        {
            ...fox,
            content: "Tu es bloquée dans cette noirceur, avec moi. Hé !"
        }
    ],
    level1_fox_end: [
        {
            ...fox,
            content: "Je comprends pas. L'ascenseur devait être ici."
        },
        {
            ...fox,
            content: "Il est peut être un peu plus bas. On va sauter dans le vide."
        },
        {
            ...fox,
            content: "J'espère juste qu'on ne va pas rencontrer l'ogre."
        }
    ]
}