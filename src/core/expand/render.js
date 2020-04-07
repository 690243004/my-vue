import Vue from '../index'
import createElement from '../vdom/create-element'
import { createTextVNode } from '../vdom/vnode'
// 调用createElement方法，将实例变成一个虚拟DOM
Vue.prototype._render = function() { 
  console.log('3. MyVue : _render has been start')
  const vm = this 
  const { render,_parentNode,staticRenderFns } = vm.$options 
  vm.$vnode = _parentNode 

  let vnode 
  try{
    if(staticRenderFns && staticRenderFns.length > 0) { 
      vm.$createElement = createElement.bind(this,vm)
      vm._v = createTextVNode
      vnode =  staticRenderFns[0].call(vm._renderProxy,)
    } else { 
      vnode = render.call(vm._renderProxy,createElement.bind(this,vm))
      console.log(vnode,"vnode")
    }

  }catch(e) { 
    console.log(e)
  }
  return vnode
}

// var render = function() {
//   var _vm = this
//   var _h = _vm.$createElement
//   var _c = _vm._self._c || _h
//   return _vm._m(0)
// }
// var staticRenderFns = [
//   function() {
//     var _vm = this
//     var _h = _vm.$createElement
//     var _c = _vm._self._c || _h
//     return _c("div", { attrs: { id: "app" } }, [
//       _vm._v("\n  Hello world \n  "),
//       _c("p", [_vm._v("Vue is a frontend build util")])
//     ])
//   }
// ]
// render._withStripped = true

// export { render, staticRenderFns }