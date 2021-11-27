const fox = {
    "icon": "avatar_fox",
    "sound": "s278",
    "author": "Renard",
}
const _fox = (content: string) => ({...fox, content})

export const dialogs = {
    fox1: [
        {
            ...fox,
            "content": "Oh, encore un visteur tombé du ciel."
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
            content: "Tu es dans l'onirisme. Tes rêves en gros."
        },
        {
            ...fox,
            content: "Rigolo, tu as l'air consciente. Mais tu ne peux pas te réveiller."
        },
        {
            ...fox,
            content: "Tu es bloquée dans cette noirceur, avec moi."
        }
    ],
    level1_fox6: [
        _fox("Les crystaux de rêves sont utiles pour revenir si tu es perdu."),
        _fox("Par exemple, ne va pas dans les bulles de cauchemard."),
    ],
    level1_fox7: [
        _fox("L'ascenceur est face. Bouge la caisse pour passer."),
    ],
    level1_fox_end: [
        {
            ...fox,
            content: "Je comprends pas. L'ascenseur devait être ici."
        },
        {
            ...fox,
            content: "Il est peut être un peu plus bas. On va sauter dans le vide."
        }
    ],
    end: [
        {
            ...fox,
            content: "Nous y sommes enfin."
        },
        {
            ...fox,
            content: "Arrivé en haut, tu pourras te réveiller comme promis."
        },
        {
            ...fox,
            content: "Bon bah, c'était sympathique cette petite aventure ensemble."
        },
        {
            ...fox,
            content: "N'oublie pas de dormir, j'espère qu'on se reverra."
        },
        {
            ...fox,
            content: "Tu vas me manquer..."
        }
    ]
}