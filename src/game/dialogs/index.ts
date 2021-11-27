const fox = {
    "icon": "avatar_fox",
    "sound": "s278",
    "author": "Renard",
}
const $fox = (content: string) => ({
    "icon": "avatar_fox",
    "sound": "s278",
    "author": "Renard", content
})
const $shrek = (content: string) => ({
    "icon": "avatar_shrek",
    "sound": "s279",
    "author": "Shrek", content
})
const $acidpop = (content: string) => ({
    "icon": "avatar_acidpop",
    "sound": "s270",
    "author": "Acidpop",
    content
})
const $kstore = (content: string) => ({
    "icon": "avatar_kstore",
    "sound": "s268",
    "author": "Kstore",
    content
})
const $dragon = (content: string) => ({
    "icon": "avatar_dragon",
    "sound": "s283",
    "author": "Sindragoseur",
    content
})
const $skeleton = (content: string) => ({
    "icon": "avatar_skeleton",
    "sound": "s281",
    "author": "Escamort",
    content
})
const $chest = (content: string) => ({
    "icon": "avatar_chest",
    "sound": "s2045",
    "author": "~ ! ~",
    content
})


export const dialogs = {
    test: [
        $fox("Je suis Renard & ceci est un test !"),
        $shrek("Je suis Shrek & ceci est un test !"),
        $acidpop("Je suis Acidpop & ceci est un test !"),
        $kstore("Je suis Kstore & ceci est un test !"),
        $dragon("Je suis Sindragoseur & ceci est un test !"),
        $skeleton("Je suis Escamort & ceci est un test !"),
        $chest("Vous venez de terminer le test !"),
    ],

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
    level1$fox5: [
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
    level1$fox6: [
        $fox("Les crystaux de rêves sont utiles pour revenir si tu es perdu."),
        $fox("Par exemple, ne va pas dans les bulles de cauchemard."),
    ],
    level1$fox7: [
        $fox("L'ascenceur est face. Bouge la caisse pour passer."),
    ],
    level1$fox_end: [
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