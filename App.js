import { reactive, effect } from "./reactivity/index.js";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });
  
    effect(() => {
      console.log("effect", "count", state.count);
    });
    window.state = state;
    return { state };
  }
}
