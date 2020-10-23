// import Vue from './core'
// import './core/expand/mount'
// import './core/expand/render'
// import './core/expand/patch'
// import './core/expand/update'
// import './core/expand/extend'
// export default Vue

import { isUndef, isDef } from "./utils";
import VNode from "./utils/vnode";
import DOM from './utils/dom'
// 全局累加
let uid = 0;
// 全局 记录当前即将patch的vm实例
export let activeInstance = null;

class Vue {
  constructor() {
    this._uid = uid++;
    this._self = this;
    this._data = null; // options 中的 data函数
    this._vnode = null; // render出来的_vnode节点
    this._options = null; // options的引用
  }

  // 入口函数
  _init(options) {
    if (options._isComponent) {
      // 非根组件
      this._options = { data: {} };
      this._options.parent = this.options.parent;
      this._options._parentNode = this.options.parentNode;
      this.options.propsData = this.options.componentOptions.propsData;
      this._options._parentListeners = this.options.componentOptions.listeners;
      this._options._renderChildren = this.options.componentOptions.children;
      this._options._componentTag = this.options.componentOptions.tag;
      if (this.options.render) {
        this._options.render = this.options.render;
      }
    } else {
      // 是根组件
      this._options = {
        ...options
      };
    }
    this.data = this._data = this._options.data;
    // 如果指定了父节点，则挂载
    if (this._options.el) {
      this._mount(this._options.el);
    }
  }

  // 1. 挂载组件
  _mount(el) {
    this._el = el;
    this._render();
    this._update();
  }

  // 2. 生成虚拟DOM(vnode)数组
  _render() {
    this._prevVNode = this._vnode;
    // 通过传递风格的编程，在render函数中通过控制反转生成vnode节点
    this._vnode = this._options.render.call(this, VNode.createVNode.bind(this));
  }

  // 3. 更新
  _update() {
    const preActiveInstance = activeInstance;
    activeInstance = this;
    this._patch();
    activeInstance = preActiveInstance;
  }

  // 4. 将vnode 渲染为 真实DOM
  _patch(vnode) {
    if (isUndef(this._vnode)) {
      if (isDef(this._prevVNode)) {
        // TODO desctory _preVNode hook
        return;
      }
    }
    if (!this._prevVNode) {
      console.log('el',this._el)
      // ...
      this._el = DOM.createRealDOM(this._vnode,this._el)
    } else { 
      this._el =  DOM.createRealDOM(this._vnode,vnode)
    }
  }

  /**
   * 暴露出去的方法，用于注册全局组件
   * @param {string} name : 组件名
   * @param {function} options : 组件构造配置
   */
  component(name, ctr) {
    this._globalComponent[name] = ctr;
  }

}

export default function(options) {
  return new Vue()._init(options);
};
