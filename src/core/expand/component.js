import Vue from '../index'

/**
 * @param {string} id 组件名称
 */
Vue.prototype.component = function(id, definition) {
  this.options.components[id] = definition
}
