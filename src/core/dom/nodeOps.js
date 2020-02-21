// 该文件在node_modules\vue\src\platforms\web\runtime\node-ops.js

export function createElement(tagName) {
  const elm = document.createElement(tagName);
  return elm;
}

// 生成text节点
export function createTextNode (text) {
  return document.createTextNode(text)
}

export function appendChild(node, child) {
  node.appendChild(child);
}

export function parentNode (node){
  return node.parentNode
}

export function nextSibling (node) {
  return node.nextSibling
}

export function tagName (node) {
  return node.tagName
}


export default {
  createElement,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  createTextNode
};
