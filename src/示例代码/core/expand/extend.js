import Vue from '../index'
let cid = 0
// 这个函数的作用是
// 传入一个config 然后返回一个函数，该函数可以对组件内容进行初始化
// 相当于走一遍new Vue的流程
// 这个extendOptions就是我们写的那个 export default { data : {},methods :{},mounted: ...}
Vue.extend = function (extendOptions) {
  extendOptions = extendOptions || {}
  const self = this // 此处指vue
  const name = extendOptions.name || self.options.name
  const Sub = function VueCompnent(options) {
    console.log(options,'触发了回调')
    this._init(options)
  }
  Sub.prototype = Object.create(self.prototype)
  Sub.options = Object.assign({}, self.options, extendOptions)
  Sub['super'] = self
  Sub.cid = cid++
  Sub.superOptions = self.options
  Sub.extendOptions = extendOptions
  Sub.sealedOptions = Object.assign({}, Sub.options)
  return Sub
}
