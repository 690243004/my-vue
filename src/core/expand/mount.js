import Vue from "../index.js";

export function mountComponent(vm, el) {
  vm.$el = el;
  const vnode = vm._render();

  vm._update(vnode);

  return vm;
}

// hydrating与服务端渲染有关
Vue.prototype.$mount = function(el) {
  console.log("2. MyVue : $mount has been start");
  // 做限制
  // if(el === document.body || el === document.documentElement) {
  //   throw Error('不要试图将Vue实例挂载到body或者html身上')
  // }
  return mountComponent(this, el);
};
