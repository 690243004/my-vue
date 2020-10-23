import { normalizeChildren } from './index';
import { activeInstance } from '../vue'

// 全局累加 渲染组件次数
let cid = 0;
export default class VNode {
  constructor(tag, data, children, text, elm, context,componentOptions,key, parent) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.context = context;
    this.componentOptions = componentOptions;
    this.key = key;
    this.parent = parent;
    this.componentInstance = undefined;
  }
  /**
   * 根据组件配置 创建组件类型的vnode
   * @param { object } Ctor 组件配置，也就是我们 export default { props,....}
   * @param { object } data 组件数据，也就是传入的(props,on,data..)
   * @param { object[] } children 组件里面嵌套的东西 即slot.default
   */
  static createComponentVNode(config, data, children) {
    const Ctor = function(options) {
      this._init(options);
    };
    Ctor.prototype = this.prototype;
    Ctor.cid = cid++;
    Ctor.options = config;
    const name = config.name;
    if (name) {
      // 往自己身上注册自己，以便自己引用自己
      Ctor.options.name = Ctor;
    }
    // 注入组件patch时执行的周期函数
    data.hook.init = function(vnode) {
      const options = {
        _isComponent : true,
        _parentVNode : vnode,
        parent : activeInstance,
        ...vnode.componentOptions,
        render :  vnode.componentOptions.Ctor.render,
      }
      return new vnode.componentOptions.Ctor(options)
    }

    return new VNode(
      `vue-component-${Ctor.cid}-${name}`,
      data,
      undefined,
      undefined,
      undefined,
      this,
      {
        Ctor,
        data,
        propsData: extractPropsFromVNodeData(data, config),
        children
      }
    );
  }

  static createVNode(tag,data,children) { 
    console.log(tag,data,children)
    let vnode;
    // 多态处理
    if(!children) {
      children = data 
    }
    children = normalizeChildren(children);
    if (typeof tag === "string") {
      // 创建普通vnode 
      vnode = new VNode(tag, data, children, undefined, undefined, this);
    } else {
      // 创建组件类型vnode 
      vnode = VNode.createComponentVNode(tag, data, children);
    }
    return vnode
  }

  static createTextVNode(val) { 
    return new VNode(undefined, undefined, undefined, String(val))
  }
}
