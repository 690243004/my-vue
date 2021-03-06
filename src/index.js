import { isUndef, isDef } from "./utils";
import VNode from "./utils/vnode";
import DOM from "./utils/dom";
import Dep from "./utils/dep";
import Watcher from "./utils/watcher";
// 全局累加
let uid = 0;
// 全局 记录当前即将patch的vm实例
export let activeInstance = null;

/**
 * vm 实例
 *   |_ el 真实DOM
 *   |_ options
 *   |_ vnode
 *     |_ vnode(组件类型)
 *          |_ componentOptions
 *          |     |_Ctor(继承的Vue 构造函数)
 *          |_ componentInstance (Ctor的实例，即对应的vm实例)
 *                |_ activeInstance 上一个vm实例
 */

export class Vue {
  constructor() {
    this._uid = uid++;
    this._self = this;
    this._data = null; // options 中的 data函数
    this._vnode = null; // render出来的_vnode节点
    this._options = null; // options的引用
    this._el = null; // 对应vnode的真实DOM节点，会在patch之后赋值
    this._hooks = null; // 钩子存放处
    this._watchers = null;
    this._watcher = null;
  }

  // 入口函数
  _init(options) {
    this._initCycle(options);
    this._callHook("beforeCreate");
    if (options._isComponent) {
      // 非根组件
      this._options = {
        ...options,
        parent: options.parent, // 即activeInstance
        _parentVNode: options._parentVNode,
        propsData: options.componentOptions.propsData,
        _parentListeners: options.componentOptions._parentListeners,
        _renderChildren: options.componentOptions.children,
        _componentTag: options.componentOptions.tag,
        render: options.render,
      };
    } else {
      // 是根组件
      this._options = {
        ...options,
      };
    }
    this._initState();
    // 如果指定了父节点，则挂载 子组件不走这一步，而是在init后，手动触发mount
    if (this._options.el) {
      this._mount(this._options.el);
    }
  }

  // 1. 挂载组件
  _mount(el) {
    this._callHook("beforeMount");
    this._el = el;
    const updateComponent = () => {
      console.log("触发了重新更新");
      this._render();
      this._update();
    };
    new Watcher({
      vm: this,
      callback: updateComponent,
      isRenderWatcher: true,
    });
    this._callHook("mounted");
  }

  // 2. 生成虚拟DOM(vnode)数组
  _render() {
    this._prevVNode = this._vnode;
    // 通过传递风格的编程，在render函数中通过控制反转生成vnode节点
    this._vnode = this._options.render.call(this, VNode.createVNode.bind(this));
    // 设置 parent
    console.log(this._options, "设置Parent");
    this._vnode.parent = this._options._parentVNode;
  }

  // 3. 更新
  _update() {
    const preActiveInstance = activeInstance;
    activeInstance = this;
    this._patch();
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
    if (!this._prevVNode) {
      // 初次渲染
      this._el = DOM.createRealDOM(this._vnode, this._el);
    } else {
      // TODO 更新节点
      console.log(this._prevVNode, "preNode");
      this._el = DOM.createRealDOM(this._vnode, this._prevVNode);
    }
  }

  _destory() {
    this._callHook("beforeDestory");
    // TODO 将自己从父vm实例中移除
    // TODO 销毁watcher
    this._isDestoryed = true;
  }

  /**
   * 暴露出去的方法，用于注册全局组件
   * @param {string} name : 组件名
   * @param {function} options : 组件构造配置
   */
  component(name, ctr) {
    this._globalComponent[name] = ctr;
  }

  _callHook(type) {
    const handlers = this._hooks[type + "s"];
    handlers.forEach((fn) => fn.call(this));
  }

  // 初始化组件状态
  _initState() {
    this._watchers = [];
    this._initProps();
    this._initData();
    this._initMethods();
    this._initProxy();
  }

  // 初始化 props
  _initProps() {
    if (this._options.props) {
      const propsData = this._options.propsData;
      this._props = {};
      const keys = (this._options._propKeys = []);
      for (const key in this._options.props) {
        keys.push(key);
        this._props[key] = propsData[key];
        // definedRective
      }
    } else {
      this._props = {};
    }
  }
  // 初始化 methods
  _initMethods() {
    const methods = this._options.methods;
    if (methods) {
      this._methods = methods;
    } else {
      this._methods = {};
    }
  }

  // 初始化data
  _initData() {
    const data = this._options.data;
    if (typeof data === "function") {
      this._data = data();
    } else {
      this._data = {};
    }
  }

  // 反向代理属性访问
  _initProxy() {
    this._dep = new Dep();
    this._proxy = new Proxy(this, {
      get(context, key) {
        console.log("来了么", key, Dep.target);
        // 收集依赖
        if (Dep.target) {
          console.log(context._dep, "收集依赖呢");
          context._dep.addSub(Dep.target);
        }
        if (context._props[key]) {
          return context._props[key];
        }
        if (context._data[key]) {
          return context._data[key];
        }
        if (context._methods[key]) {
          return context._methods[key];
        }
      },
      set(context, key, value) {
        if (context._methods[key]) {
          context._methods[key] = value;
        }
        if (context._data[key]) {
          context._data[key] = value;
          context._dep.notify();
          return true;
        }
      },
    });
  }

  // 初始化组件生命周期
  _initCycle(options) {
    // 生命周期函数 因为子组件的构造函数与父组件不一样
    // 所以只能放在这里了
    this._hooks = {
      beforeCreates: [],
      createds: [],
      beforeMounts: [],
      mounteds: [],
      beforeUpdates: [],
      updateds: [],
      beforeDestorys: [],
      destoreds: [],
    };
    // 初始化生命周期
    const {
      beforeCreate,
      created,
      mounted,
      beforeMount,
      beforeDestory,
      destoryed,
    } = options;
    if (beforeCreate) {
      this._hooks.beforeCreates.push(beforeCreate);
    }
    if (created) {
      this._hooks.createds.push(created);
    }
    if (mounted) {
      this._hooks.mounteds.push(mounted);
    }
    if (beforeMount) {
      this._hooks.beforeMounts.push(beforeMount);
    }
    if (beforeDestory) {
      this._hooks.beforeDestorys.push(beforeDestory);
    }
    if (destoryed) {
      this._hooks.destoryeds.push(destoryed);
    }
  }
}

export default function(options) {
  return new Vue()._init(options);
}
