// children 规范化
import { isPrimitive } from "../../shared/util";
import { createTextVNode } from '../../core/vdom/vnode'

export function normalizeChildren(children) {
  if (isPrimitive(children)) {
    return [createTextVNode(children)];
  } else {
    if (Array.isArray(children)) {
      return normalizeArrayChildren(children);
    }
  }
}


export function normalizeArrayChildren(children,nestedIndex) { 
  const res = [] 
  let c 
  let lastIndex
  let last 
  for(let i =0;i<children.length;i++) { 
    c = children[i]
    lastIndex = res.length - 1 
    last = res[lastIndex]

    if(Array.isArray(c)) { 
        // 1. 如果子节点是数组
      if(c.length > 0) { 
        c = normalizeArrayChildren(c,`${nestedIndex || ''}_${i}`)
      }
    } else if(isPrimitive(c)) { 
      // 2. 如果子节点是一个原始类型变量
      if(c !== '') { 
        res.push(createTextVNode(c))
      }
    } else { 
      // 已经是vnode了
      console.log(c,'cccccc')
      res.push(c)
    }
  }
  return res 
}