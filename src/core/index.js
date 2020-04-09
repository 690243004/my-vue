import initProxy from "./proxy/initProxy";
import { initInternalComponent } from "./instance/init";
import { extend, mergeOptions } from "./helpers/util";
function Vue(options) {
  this._init(options);
}

function resolveConstructorOptions(Ctor) {
  return Ctor.options;
}

const ASSET_TYPES = ["component", "directive", "filter"];

// 内置组件
const builtInComponents = {};

// 初始Vue这个构造函数的option
function initGlobalAPI(Vue) {
  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(type => {
    Vue.options[type + "s"] = Object.create(null);
  });
  // 将内置组件合并到components中
  extend(Vue.options.components, builtInComponents);
}

let uid = 0;
Vue.prototype._init = function(options) {
  const vm = this;
  vm._uid = uid++;
  vm.isVue = true;
  vm._self = vm;
  if (options._isComponent) {
    initInternalComponent(vm, options);
  } else {
    // 子组件并不走这里 就显得很奇怪
    vm.$options = mergeOptions(
      // vm.constructor相当于 Vue 的 "component", "directive", "filter"
      // "component", "directive", "filter"定义在全局方法 initGlobal()中
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    );
  }

  vm.data = vm._data = vm.$options.data;
  Object.keys(vm.data).forEach(key => {
    initProxy(vm, key);
  });
  vm._renderProxy = vm;

  if (vm.$options.el) {
    // 将节点挂载到dom上
    vm.$mount(vm.$options.el);
  }
  return this;
};

initGlobalAPI(Vue);
export default Vue;
