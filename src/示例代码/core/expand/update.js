import Vue from "../index";
export let activeInstance = null;
// 调用时机 : 首次渲染
Vue.prototype._update = function(vnode) {
  console.log("4. MyVue : _update has been start");
  const vm = this;
  const prevEl = vm.$el;
  const prevVnode = vm._vnode;
  const preActiveIntance = activeInstance;
  activeInstance = vm;
  vm._vnode = vnode;

  if (!prevVnode) {
    // 首次渲染
    vm.$el = vm.__patch__(vm.$el, vnode);
  } else {
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  activeInstance = preActiveIntance;
};
