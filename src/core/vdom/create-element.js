import VNode from "./vnode";
import {isDef } from '../../shared/util'
import { normalizeChildren } from '../helpers/normalizeChildren'
import createComponent from './create-component'
// render会触发该方法
export default function createElement(context, tag, data, children) {
  console.log("MyVue : createElement has been start", tag, data, children)
  if(Array.isArray(data)) { 
    children = data 
    data = undefined
    console.log(children,'是你吧')
  }
  return _createElement(context, tag, data, children)
}


export function _createElement(context,tag,data,children) { 
  let vnode 
  if(Array.isArray(data)) { 
    children = data 
  }
  // 处理子节点
  children = normalizeChildren(children)
  if(typeof tag === 'string') { 
    vnode = new VNode(tag,data,children,undefined,undefined,context)
  } else { 
    // 创建组件节点
    // data: ƒ data()
    // render: ƒ ()
    // staticRenderFns: [ƒ]
    // _compiled: true
    // __file: "examples/word/App.vue"
    // __proto__: Object
    vnode = createComponent(tag,context)
    console.log(vnode,"创建组件节点")
  } 

  if(Array.isArray(vnode)) { 
    return vnode
  } else if(isDef(vnode)) { 
    return vnode
  }
}