import initProxy from "./proxy/initProxy";
import { initInternalComponent } from "./instance/init";
function Vue(options) {
  if (this instanceof Vue) {
    this._init(options);
  } else {
    console.log("vue 一定要使用 new 关键字初始化实例");
  }
}

let uid = 0;
Vue.prototype._init = function(options) {
  console.log("1. MyVue : _init has been start 222");
  const vm = this;
  vm._uid = uid++;
  vm.isVue = true;
  vm._self = vm;
  if (options._isComponent) {
    initInternalComponent(vm, options);
  } 
  
  vm.$options = Object.assign({}, options, vm);
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

export default Vue;
