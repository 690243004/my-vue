// vm 就是vue实例对象
// options 就是那个vnode
export function initInternalComponent(vm, options) {
  // 默认配置 : 未实现
  // const opts = (vm.$options = Object.create(vm.constructor.options));
  // 关联父节点
  const opts = (vm.$options = {
    data: {}
  });
  const parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  const vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}
