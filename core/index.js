import { effect } from "./reactivity/index.js";
import { mountElement } from "./render/index.js";

export default function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup(); // 響應式 data

      effect(() => {
        const subDOM = rootComponent.render(context); // h()

        mountElement(subDOM, rootContainer);
      })
    }
  }
}