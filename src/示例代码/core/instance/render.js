Vue.prototype._render = function() { 
  const vm = this 
  const { render,_parentVnode } = vm.$options 
  if(_parentVnode) { 
    // slots 相关
  }
  vm.$vnode = _parentVnode
  let vnode 
  try { 
    vnode = render.call(vm.renderProxy,vm.$createElement)
  } catch(e) {
    console.log(e)
  }

  vnode.parent = _parentVnode
  return vnode
}