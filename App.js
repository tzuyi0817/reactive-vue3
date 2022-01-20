import { reactive } from "./core/reactivity/index.js";
import h from "./core/h.js";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });
  
    window.state = state;
    return { state };
  },
  render(context) {
    const { count } = context.state;

    return h(
      "div",
      {
        id: `app-${count}`,
        class: `class-${count}`
      },
      [
        h("p", { class: "hello" }, "hello-world"),
        h("p", { class: "count" }, count),
      ]
    )
  }
}
