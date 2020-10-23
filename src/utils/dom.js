import { isDef } from "./index";
import get from "lodash/get";
class DOM {
  /**
   * 将vnode渲染为真是DOM 并返回
   * @param {*} vnode
   * @param { DOMElement } parentElm
   */
  static createRealDOM(vnode, parentElm) {
    const { tag, data, children } = vnode;

    if (vnode.componentInstance) {
      // 初始化组件
      return createComponent(vnode, parentElm);
    }

    // TODO put data a slotScopes

    if (isDef(tag)) {
      vnode.elm = DOM.createElement(tag);
      // 深度优先搜索创建子真实DOM
      if (children && children.length) {
        children.forEach(child => {
          DOM.createRealDOM(child, vnode.elm);
        });
      }
    } else {
      vnode.elm = DOM.createTextNode(vnode.text);
    }
    if (isDef(parentElm)) {
 
      DOM.insert(parentElm, vnode.elm);
    }
  }

  static createTextNode(text) {
    return document.createTextNode(text);
  }

  static createElement(tag) {
    return document.createElement(tag);
  }

  static createComponent(vnode, parentElm) {
    const init = get(vnode, "data.hook.init", function() {});
    // 执行 Ctor
    init();
    if (vnode.componentInstance) {
      vnode.elm = vnode.componentInstance.$el;
      DOM.insert(parentElm, vnode.elm);
    }
    return true;
  }

  static insert(parent, elm) {
    // TODO deal with ref
    if (isDef(parent)) {
      DOM.appendChild(parent, elm);
    }
  }

  static appendChild(node, child) {
    node.appendChild(child);
  }
}

export default DOM