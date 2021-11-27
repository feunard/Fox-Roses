import {game, GameState} from "../Game";

export const the_end = async () => {
    console.log("trigger", window.document.querySelector(".Level_white"))
    window.document.querySelector(".Level_white")?.classList.add("enabled");
    setTimeout(() => {
        game.levelId = 0;
        game.engine.stop();
        game.state = GameState.END;
    }, 8000)
}