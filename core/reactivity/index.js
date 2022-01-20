let currentEffect = null;
const targetMap = new WeakMap(); 
/**
  targetMap: WeakMap {
    target: Map {
      key: Dep()
    }
  }
*/

class Dep {
  constructor(val) {
    this.val = val;
    this.effects = new Set();
  }

  get value() {
    this.depend();
    return this.val;
  }

  set value(newVal) {
    this.val = newVal;
    this.notice();
  }

  depend() {
    currentEffect && this.effects.add(currentEffect);
  }

  notice() {
    this.effects.forEach(effect);
  }
}

function getDep(target, key) {
  let depMap = targetMap.get(target);

  if (!depMap) {
    depMap = new Map();
    targetMap.set(target, depMap);
  }

  let dep = depMap.get(key);

  if (!dep) {
    dep = new Dep();
    depMap.set(key, dep);
  }
  return dep;
}

export function effect(callback) {
  currentEffect = callback;
  callback();
  currentEffect = null;
}

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      const dep = getDep(target, key);

      dep.depend(); // 收集 effect
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value)

      dep.notice(); // Reflect.set 後通知執行 effect
      return result;
    }
  })
}
