import Vue from '../index'
import VNode from './vnode'
import activeInstance from '../expand/update'

export default function createComponent(Ctor, context) {
  Ctor = Vue.extend(Ctor)
  const name = Ctor.options.name || tag
  const data = {}
  installComponentHooks(data)
  const vnode = new VNode(
    `vue-component-${Ctor.cid}-${name}`,
    data,
    undefined,
    undefined,
    undefined,
    context,
    { Ctor, data }
  )
  return vnode
}

// 组件钩子函数 在patch时使用，但是在创建vnode安装

const componentVNodeHooks = {
  init(vnode) {
    const child = (vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      activeInstance
    ))
    debugger
    child.$mount()
  },
}

// 钩子函数名称  Array
const hooksToMerge = Object.keys(componentVNodeHooks)

function installComponentHooks(data) {
  const hooks = data.hook || (data.hook = {})
  for (let i = 0; i < hooksToMerge.length; i++) {
    const key = hooksToMerge[i]
    // const existing = hooks[key]
    const toMerge = componentVNodeHooks[key]
    hooks[key] = toMerge
  }
}

function createComponentInstanceForVnode(vnode, parent) {
  const options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent,
    ...vnode.componentOptions,
  }
  options.render = vnode.componentOptions.Ctor.options.render
  options.staticRenderFns = vnode.componentOptions.Ctor.options.staticRenderFns
  return new vnode.componentOptions.Ctor(options)
}
