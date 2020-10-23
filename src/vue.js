import { isUndef, isDef, normalizeArrayChildren } from "./utils";
import VNode from "./utils/vnode";
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
    console.log('执行了')
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
        ...this.options
      };
    }
    this.data = this._data = this._options.data;
    // 如果指定了父节点，则挂载
    if (this._options.el) {
      this.$mount(this._options.el);
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
    this.$el = this._patch();
    activeInstance = preActiveInstance;
  }

  // 4. 将vnode 渲染为 真实DOM
  _patch() {
    if (isUndef(this._vnode)) {
      if (isDef(this._prevVNode)) {
        // TODO desctory _preVNode hook
        return;
      }
    }
    if (isUndef(this._prevVNode)) {
      // ...
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

  /**
   * 在render阶段中生成vnode节点 以下是控制反转的参数
   * @param {string} tag 标签名字
   * @param { object } data 子节点 props
   * @param { VNode [] | null } children 子vnode配置
   */
  _createVNode(tag, data, children) {
    let vnode;
    if (!children) {
      children = data;
    }
    children = normalizeArrayChildren(children);
    if (typeof tag === "string") {
      vnode = new VNode(tag, data, children, undefined, undefined, this);
    } else {
      // 创建组件
      vnode = VNode.createComponentVNode(tag, data, children);
    }
    return vnode;
  }
}

export default function(options) {
  return new Vue()._init(options);
};
