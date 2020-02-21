import Vue from "../index";

// 调用时机 : 首次渲染
Vue.prototype._update = function(vnode) {
  console.log("4. MyVue : _update has been start");
  const vm = this;
  const prevVnode = vm._vnode;
  let activeInstance = vm;
  const preActiveIntance = activeInstance;
  vm._vnode = vnode;
  if (!prevVnode) {
    // 首次渲染
    vm.$el = vm.__patch__(vm.$el, vnode);
  }
};
