import {Event} from "../entities/Event";

export const camera_zoom = async (e: Event) => {

    await e.scene.camera.zoomOverTime(1, 2000);

}