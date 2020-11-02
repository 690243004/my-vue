import { isDef } from "./index";
import get from "lodash/get";
class DOM {
  static createComponent(vnode, parentElm) {
    const init = get(vnode, "data.hook.init", function() {});
    // 执行 Ctor
    init(vnode);
    console.log(vnode.componentInstance, "vnode.componentInstance");
    if (vnode.componentInstance) {
      vnode.elm = vnode.componentInstance._el;
      DOM.insert(parentElm, vnode.elm);
    }
    return true;
  }

  /**
   * 将vnode渲染为真是DOM 并返回
   * @param {*} vnode
   * @param { DOMElement } parentElm
   */
  static createRealDOM(vnode, parentElm) {
    const { tag, data, children } = vnode;
    if (vnode.componentOptions) {
      // 初始化组件
      return DOM.createComponent(vnode, parentElm);
    }

    // TODO put data a slotScopes

    if (isDef(tag)) {
      vnode.elm = DOM.createElement(tag);
      // 深度优先搜索创建子真实DOM
      if (children && children.length) {
        children.forEach((child) => {
          DOM.createRealDOM(child, vnode.elm);
        });
      }
    } else {
      vnode.elm = DOM.createTextNode(vnode.text);
    }
    if (isDef(parentElm)) {
      if (parentElm.nodeType) {
        DOM.insert(parentElm, vnode.elm);
      } else {
        // update Nodes
        const preVNode = parentElm;
        if (vnode.key == preVNode.key) {
          // 创建新节点
          const componnentVNode = vnode.parent;
          // 更新占位节点 执行卸载函数

          // 删除旧节点
        } else {
          // 获取children 执行diff
        }
      }
    }
    return vnode.elm;
  }

  static createTextNode(text) {
    return document.createTextNode(text);
  }

  static createElement(tag) {
    return document.createElement(tag);
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

export default DOM;
