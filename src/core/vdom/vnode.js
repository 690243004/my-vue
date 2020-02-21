export default class VNode {

  constructor(tag, data, children, text, elm,context,componentOptions, key, parent) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.context = context;
    this.componentOptions = componentOptions;
    this.key = key;
    this.parent = parent;
    this.componenetInstance = undefined;
  }
}


export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}