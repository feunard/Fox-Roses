import {Event} from "../entities/Event";

export const camera_back = async (e: Event) => {

    await e.scene.camera.zoomOverTime(0.5, 2000);

}