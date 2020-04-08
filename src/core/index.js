import initProxy from "./proxy/initProxy";
import { initInternalComponent } from "./instance/init";
function Vue(options) {
  this._init(options);
}

let uid = 0;
Vue.prototype._init = function(options) {
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
