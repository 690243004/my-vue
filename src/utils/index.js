import VNode from './vnode'
export function isDef(data) {
  return data !== undefined;
}

export function isUndef(data) {
  return data === undefined;
}

// 判断是否是除了 undefined null 之外的原始类型
export function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    // $flow-disable-line
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

export function normalizeChildren(children) {
  if (isPrimitive(children)) {
    return [VNode.createTextVNode(children)];
  } else {
    if (Array.isArray(children)) {
      return normalizeArrayChildren(children);
    }
  }
}

export function normalizeArrayChildren(children) {
  const result = [];
  let current;
  for (let i = 0; i < children.length; i++) {
    current = children[i];
    if (Array.isArray(current)) {
      if (current.length > 0) {
        current = normalizeArrayChildren(current);
      }
    } else if (isPrimitive(current)) {
      if (current !== "") {
        result.push(VNode.createTextVNode(children));
      }
    } else {
      result.push(current);
    }
  }
  return result;
}
