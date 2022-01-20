import { effect } from "@vue/reactivity";

class Dep {
  constructor(val) {
    this.val = val;
  }

  get value() {
    return this.val;
  }

  set value(newVal) {
    this.val = newVal;
  }
}

export function effect() {
  
}

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      return Reflect.set(target, key, value);
    }
  })
}
