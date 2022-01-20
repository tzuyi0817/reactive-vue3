import { effect } from "./reactivity/index.js";
import { mountElement, diff } from "./render/index.js";

export default function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup(); // 響應式 data
      let isMounted = true; // 紀錄是否為 Mounted
      let preSubDOM = null;

      effect(() => {
        const subDOM = rootComponent.render(context); // h()

        if (isMounted) {
          isMounted = false;
          rootContainer.innerHTML = "";
          mountElement(subDOM, rootContainer);
        } else {
          diff(preSubDOM, subDOM); // 跟上一個 DOM 比較
        }
        preSubDOM = subDOM;
      })
    }
  }
}