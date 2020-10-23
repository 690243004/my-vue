import Vue from '../index'
import { isDef, isUndef } from '../../shared/util'
import nodeOps from '../dom/nodeOps'
import VNode from '../vdom/vnode'
const { createElement, createTextNode } = nodeOps

function insert(parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      // ...处理ref
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}

function createChildren(vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    children.forEach((child, i) => {
      createElm(child, insertedVnodeQueue, vnode.elm, null, true, children, i)
    })
  }
}

function initComponent(vnode) {
  vnode.elm = vnode.componentInstance.$el
}

function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i) && isDef((i = i.hook)) && isDef((i = i.init))) {
    i(vnode)
  }

  if (vnode.componentInstance) {
    initComponent(vnode)
    insert(parentElm, vnode.elm, refElm)
    return true
  }
  // if (vnode.componentOptions) {
  //   const options = vnode.componentOptions.Ctor.options;
  //   options.el = parentElm;
  //   options._isComponent = true;
  //   return new vnode.componentOptions.Ctor(options);
  // }
}

/**
 *
 * @param {*} vnode 对应的render返回的虚拟DOM
 * @param {*} insertedVnodeQueue
 * @param {*} parentElm
 * @param {*} refElm
 * @param {*} nested
 * @param {*} ownerArray
 * @param {*} index
 */
function createElm(
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  if (isDef(vnode.elm) && isDep(ownerArray)) {
    // 数组处理
  }
  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag

  // 尝试渲染组件节点
  if (createComponent(vnode, [], parentElm, refElm)) {
    return
  }

  if (isDef(tag)) {
    // ...校验tag是否存在等逻辑
    vnode.elm = createElement(tag)
    // createChildren
    createChildren(vnode, children, insertedVnodeQueue)
  } else {
    vnode.elm = createTextNode(vnode.text)
  }
  if (isDef(parentElm)) {
    insert(parentElm, vnode.elm)
  }
}

function emptyNodeAt(elm) {
  return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
}

Vue.prototype.__patch__ = function patch(oldVnode, vnode) {
  console.log('5. MyVue : __patch__ has been start')
  let isInitialPatch = false
  if (isUndef(oldVnode)) {
    isInitialPatch = true
    createElm(vnode, [])
  } else {
    const isRealElement = isDef(oldVnode.nodeType)
    if (isRealElement) {
      // 初次渲染 会传入一个真实DOM 这里将真实DOM转为虚拟DOM
      oldVnode = emptyNodeAt(oldVnode)
    }
    const oldElm = oldVnode.elm
    // 获得oldVnode对应的真实DOM节点的父节点
    const parentElm = nodeOps.parentNode(oldElm)
    console.log(parentElm)
    createElm(vnode, [], parentElm)
  }
  return vnode.elm
}
