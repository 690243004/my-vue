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
