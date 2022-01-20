import { reactive } from "./reactivity/index.js";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });
  
    window.state = state;
    return { state };
  }
}
