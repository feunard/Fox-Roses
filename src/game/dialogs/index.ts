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
        $fox("Tu peux aussi t'accroupir avec la touche S."),
    ],
    level1_fox5: [
        $fox("Tu es dans tes rêves."),
        $fox("Tu es consciente mais tu ne peux pas te réveiller."),
        $fox("Pas de panique, il y a un ascenceur onirique à côté."),
    ],
    level1_fox6: [
        $fox("Un crystal ! Tu reviendras ici si tu fais une bêtise."),
    ],
    level1_fox7: [
        $fox("L'ascenceur est juste en face. Bouge la caisse rouge pour passer."),
    ],
    level1_fox_end: [
        $fox("Je comprends pas. L'ascenseur devait être ici !"),
        $fox("Il est peut être un peu plus bas. On va devoir sauter."),
    ],
    l2_1: [
        $fox("Qu'est ce qui c'est passé ici ?!? Ce n'est pas normal."),
        $kstore("A l'aide !"),
        $fox("Vite, quelqu'un appel à l'aide."),
    ],
    l2_2: [
        $kstore("Ah, vous tombez à pic."),
        $fox("Ecrase le monstre en sautant dessus avec la touche S enfoncée."),
        $fox("Ecrase le monstre en sautant dessus avec la touche S enfoncée."),
    ],
    l2_3: [
        $kstore("Merci. Je cherchais ma soeur mais un squelette m'a attaqué."),
        $fox("On va la retrouver. Mais, pourquoi il y a des squelettes partout ?"),
        $kstore("Escamort, c'est lui derrière cette armée. Il est entrain de détruire les rêves."),
    ],
    l2_4: [
        $kstore("Les miroirs peuvent te téléporter si tu restes devant. Attention."),
        $fox("Je déteste les miroirs.")
    ],
    l2_5: [
        $acidpop("Kstore! J'avais si peur. Qui sont les gens avec toi ?"),
        $fox("Je suis Renard et voici Rêveuse, elle vient de tomber du ciel."),
        $kstore("Merci à vous, prenez ce parchemin et sortez nous de là."),
    ],
    l2_6: [
        $fox("Nous cherchons l'ascenseur onirique pour réveiller la rêveuse."),
        $acidpop("Escamort l'a volé. Il veut l'utiliser pour son armée."),
        $kstore("C'est pour ça qu'on doit le vaincre, mais il est trop fort pour nous."),
        $fox("Oh, mais j'ai un ami qui peut faire ça. Il habite juste en bas."),
        $kstore("Allons-y."),
    ],
    l3_1: [
        $fox("J'ai un ami dragon, il réside pas loin d'ici."),
        $kstore("Un dragon ?!?"),
        $fox("Tous les dragons ne sont pas méchants, madame."),
    ],
    l3_2: [
        $dragon("Renard... Fripouille. Que viens-tu faire ici avec tes amis ?"),
        $fox("Nous avons besoin de toi. Escamort fabrique une armée pour détruire les rêves."),
        $dragon("Qui est la jeune fille avec toi ?"),
        $fox("Rêveuse, elle dort trop profondément pour se réveiller."),
        $dragon("Une rêveuse, parfait. Allez me cherche une rose des rêves et je vous aiderai."),
    ],
    l3_3: [
        $kstore("Il y a encore un pallier avant d'être chez Escamort."),
        $shrek("Vous voulez un cadeau ?"),
        $fox("Qui vient de parler ?"),
        $shrek("Shrek, cadeau ?"),
    ],
    l3_loot: [
        $chest("Vous obtenez une rose des rêves."),
        $dragon("Parfait, reviens me donner la rose."),
        $acidpop("Pourquoi une rose ?"),
        $fox("Je ne sais pas, il va nous expliquer.")
    ],
    l3_loot_after: [
        $dragon("Ah... merci. Je voulais voir une dernière fois une rose de rêve."),
        $dragon("Rêveuse, je suis vieux, je vais bientôt partir, mais je peux encore t'aider."),
        $chest("Vous obtenez des ailes de dragon. Vous pouvez sauter 2 fois de suite."),
        $dragon("Avec mes ailes, tu pourras atteindre des nouveaux endroits."),
        $kstore("Mais on fait comment pour Escamort ? Nous avions besoin de vous."),
        $dragon("La rêveuse va s'en charger. Je vais veiller sur elle le temps qu'il me reste."),
        $fox("C'est de la folie, Sindra."),
    ],
    l4_1: [
        $shrek("Shrek, content. Shrek, cadeau."),
        $fox("Mais, on ne veut pas de tes cadeaux !"),
        $acidpop("Peut être qu'on devrait accepter son cadeau."),
        $shrek("Cadeaux..."),
    ],
    l4_2: [
        $fox("Oh non, on ne peut pas traverser, Rêveuse ne va pas assez vite."),
    ],
    l4_3: [
        $shrek("Shrek content, Shrek cadeau"),
        $acidpop("Mais c'est trop bien."),
        $fox("Peut être qu'on peut accepter ses cadeaux du moment qu'il nous dérange pas."),
    ],
    l4_4: [
        $dragon("Les amis, le repère d'Escamort est juste en dessous."),
        $kstore("Nous sommes tous prêt."),
        $shrek("Shrek, cadeau."),
    ],
    l5_1: [
        $skeleton("Misérable, pathétique. Je vais vous spoiler la fin. Vous allez tous mourir."),
        $fox("Il a l'air en colère."),
        $skeleton("La secte du symbol infini est trop forte. Vous ne pouvez rien faire."),
    ],
    l5_3: [
        $skeleton("L'infini est la seule solution, l'éternité est la seule approche !"),
    ],
    l5_4: [
        $skeleton("Gloire au symbol infini, les rêves n'ont pas de fin !"),
        $fox("Tout à une fin Escamort, la tienne arrive bientôt."),
    ],
    l5_2: [
        $skeleton("Non, mais c'est impossible. Comment avez vous pu atteindre cet endroit ?"),
        $fox("En sautant peut être ?"),
        $skeleton("Je dois battre en retraite."),
        $kstore("Suivons le !"),
    ],
    l6_0: [
        $skeleton("VOUS NE PASSEREZ PAS !"),
    ],
    l6_1: [
        $kstore("C'était lui ? Mais il est nul."),
        $skeleton("AHAH, ET BIEN NON. MISERABLE."),
    ],
    l6_2: [
        $acidpop("Cette fois ci, c'était bien lui."),
        $skeleton("AHAH, JE SUIS INFINI. PATHETIQUE."),
    ],
    l6_3: [
        $shrek("Escamort cadeau mort."),
        $skeleton("AHAH, NON, JE M'EN BRANLE DE TES CADEAUX."),
    ],
    l6_4: [
        $dragon("C'est terminé."),
        $fox("Vite, l'ascenseur onirique est en bas !"),
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