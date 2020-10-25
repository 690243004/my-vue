export function extend(to, from) {
  for (let key in from) {
    to[key] = from[key];
  }
}

const LIFE_CYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "desctoryed",
  "activaed",
  "deactivaed",
  "errorCaptured"
];

function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      if (Array.isArray(childVal)) {
        return childVal;
      } else {
        return [childVal];
      }
    }
  }
  return parentVal;
}

const strats = Object.create(null);

LIFE_CYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook;
});

function defaultStract(parentVal, childVal) {
  return childVal ? childVal : parentVal;
}

export function mergeOptions(parent, child, vm) {
  if (typeof child === "function") {
    child = child.options;
  }
  const extendFrom = child.extends;
  if (extendFrom) {
    parent = mergeOptions(parent, extendFrom, vm);
  }
  if (child.mixins) {
    child.mixins.forEach(mixin => {
      parent = mergeOptions(parent, mixin, vm);
    });
  }
  const options = {};
  let key;
  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwnProperty.call(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    // 例如mixin中有{ mounted : function mount1(){} }
    // 第一递归调用 parent = mergeOptions({mounted: fn},{mounted : fn1},vm)
    // 触发mergeField() starct = mergeHook
    // 触发mergeHook(fn1,fn2)
    // 则options.mounted = [fn1,fn2]
    const stract = strats[key] || defaultStract;
    options[key] = stract(parent[key], child[key], vm, key);
  }
  return options;
}
