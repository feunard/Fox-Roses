export const $fox = (content: string) => ({
    "icon": "avatar_fox",
    "sound": "s278",
    "author": "Renard", content
})
export const $shrek = (content: string) => ({
    "icon": "avatar_shrek",
    "sound": "s279",
    "author": "Shrek", content
})
export const $acidpop = (content: string) => ({
    "icon": "avatar_acidpop",
    "sound": "s270",
    "author": "Acidpop",
    content
})
export const $kstore = (content: string) => ({
    "icon": "avatar_kstore",
    "sound": "s268",
    "author": "Kstore",
    content
})
export const $dragon = (content: string) => ({
    "icon": "avatar_dragon",
    "sound": "s283",
    "author": "Sindragoseur",
    content
})
export const $skeleton = (content: string) => ({
    "icon": "avatar_skeleton",
    "sound": "s281",
    "author": "Escamort",
    content
})
export const $chest = (content: string) => ({
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
        $fox("C'est rare de voir quelqu'un tomber ici."),
        $fox("Essaye d'aller à droite avec la touche D pour voir ?")
    ],
    fox2: [
        $fox("Non, je t'ai dit d'aller à droite, pas à gauche.")
    ],
    fox3: [
        $fox("Peut être que tu te demandes où tu es ?"),
        $fox("Avant ça, utilise Z pour sauter les obstacles."),
    ],
    fox4: [
        $fox("Tu peux aussi d'accroupir avec la touche S."),
    ],
    level1_fox5: [
        $fox("Tu es dans tes rêves."),
        $fox("Tu es consciente mais tu ne peux pas te réveiller."),
        $fox("Pas de panique, il y a un ascenceur onirique à côté."),
    ],
    level1_fox6: [
        $fox("Un crystal ! Utile pour revenir si tu meurs."),
    ],
    level1_fox7: [
        $fox("L'ascenceur est juste en face. Bouge la caisse rouge pour passer."),
    ],
    level1_fox_end: [
        $fox("Je comprends pas. L'ascenseur devait être ici !"),
        $fox("Il est peut être un peu plus bas. On va devoir sauter."),
    ],
    l2_1: [
        $fox("Qu'est ce que c'est passé ici ?!? Ce n'est pas normal."),
        $kstore("A l'aide !"),
        $fox("Vite, quelqu'un appel à l'aide."),
    ],
    l2_2: [
        $kstore("Ah, vous tombez à pic."),
        $fox("Ecrase le monstre en sautant dessus avec la touche S."),
    ],
    l2_3: [
        $kstore("Merci. Je cherchais ma soeur mais un squelette m'a attaqué."),
        $fox("On va la retrouver. Mais, pourquoi il y a des squelettes partout ?"),
        $kstore("Escamort, c'est lui derrière cette armée. Il est entrain de détruire les rêves."),
    ],
    l2_4: [
        $kstore("Les miroirs peuvent te téléporter si tu restes devant. Attention."),
        $fox("Je deteste les miroirs...")
    ],
    l2_5: [
        $acidpop("Kstore! J'avais si peur. Qui sont les gens avec toi ?"),
        $fox("Je suis Renard et voici Réveuse, elle vient de tomber du ciel."),
        $kstore("Merci à vous, prennez ce parchemin et sortez nous de là."),
    ],
    l2_6: [
        $fox("Nous cherchons l'ascenseur onirique pour réveiller la rêveuse."),
        $acidpop("Escamort l'a volé. Il veut l'utiliser pour son armée."),
        $kstore("C'est pour ça qu'on doit le vaincre, mais il est trop fort pour nous."),
        $fox("Oh, mais j'ai un ami qui peut faire ça. Il habite juste en bas."),
        $kstore("Allons-y."),
    ],
    //
    end: [
        $fox("Nous y sommes... enfin."),
        $fox("Arrivé en haut, tu pourras te réveiller."),
        $fox("Quand a nous, il ne reste plus qu'à se dire aurevoir."),
        $acidpop("Aurevoir rêveuse !"),
        $kstore("Aurevoir."),
        $fox("Ce n'est pas un adieu, on restera dans ta tête."),
        $fox("Mais pour combien de temps ?"),
        $shrek("Et mes cadeaux..."),
        $dragon("Je les brûle tes cadeaux !"),
        $shrek("Aurevoir rêveuse..."),
        $dragon("Bon reveil."),
        $fox("Reviens vite."),
    ],
    //
    loot_firebolt: $chest("Vous obtenez un parchemin de boule de feu. Appuyez sur E pour lancer des flammes."),
    loot_doublejump: $chest("Vous obtenez des ailes de dragon. Vous pouvez sauter 2 fois de suite."),
    loot_speed: $chest("Vous obtenez des chaussures de sport Balancica. Vous courrez maintenant plus vite."),
}