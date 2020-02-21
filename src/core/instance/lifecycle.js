export function mmountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  callHook(vm, "beforeMount");
  // 生成虚拟Node
  const vnode = vm._render();

  let updateComponent;
  updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };
  // 实例化一个Watcher 并渲染
  // 回调哈纳树会调用updateComponent
  // vm._update -> 更新DOM
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted) {
          callHook(vm, "beforeUpdate");
        }
      }
    },
    true
  );
  hydrating = false;
  // $vnode 表示根节点
  if (vm.$vnode === null) {
    // 表示该实例已经挂载 并执行mounted钩子函数
    vm._isMounted = true;
    callHook(vm, "mounted");
  }
  return vm;
}
