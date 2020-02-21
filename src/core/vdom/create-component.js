import Vue from "../index";
import VNode from "./vnode";
export default function createComponent(Ctor, context) {
  Ctor = Vue.extend(Ctor);
  const name = Ctor.options.name || tag;
  const data = {};
  const vnode = new VNode(
    `vue-component-${Ctor.cid}-${name}`,
    null,
    undefined,
    undefined,
    undefined,
    context,
    { Ctor, data }
  );
  return vnode
  console.log(Ctor);
}
