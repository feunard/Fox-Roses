/**
 * Audio Manager
 */
import {sounds} from "../resources";
import {Sound} from "excalibur";
import {rand} from "./resources";
import {config, config_set} from "./config";

export type keyof_typeof_sounds = keyof typeof sounds;

export class AudioManager {

    volume = config.sound;
    volumeMusic = config.music;
    currentMusic?: Sound;

    toggleVolume() {
        if (this.volume > 0) {
            this.setVolume(0);
        } else {
            this.setVolume(0.5);
        }
    }

    setVolume(volume: number) {
        console.log("audio::set_volume", volume);
        this.volume = volume;
        config_set({sound: volume})
    }

    toggleMusicVolume() {
        if (this.volumeMusic) {
            this.setMusicVolume(0);
        } else {
            this.setMusicVolume(0.5);
        }
    }

    setMusicVolume(volume: number) {
        console.log("audio::set_music_volume", volume);
        this.volumeMusic = volume;
        config_set({music: volume})
        if (this.currentMusic) {
            this.currentMusic.volume = this.volumeMusic;
        }
    }

    playMusic(k: keyof_typeof_sounds, loop = true) {
        if (this.currentMusic) {
            if (this.currentMusic.path === sounds[k].path) {
                return;
            }
            this.currentMusic.stop();
        }
        this.currentMusic = sounds[k];
        this.currentMusic.play(this.volumeMusic);
        this.currentMusic.volume = this.volumeMusic;
        this.currentMusic.loop = loop;
    }

    play(k: keyof_typeof_sounds) {
        if (sounds[k]) {
            sounds[k].play(this.volume);
            sounds[k].volume = this.volume;
        }
    }

    random(...k: keyof_typeof_sounds[]) {
        const self = this;
        const list = k.map(_ => sounds[_]);
        return {
            play() {
                const i = rand(list.length);
                list[i].play(self.volume);
                list[i].volume = self.volume;
            }
        }
    }

    stop() {
        if (this.currentMusic) {
            this.currentMusic.stop();
        }
    }
}

export const audio = new AudioManager();