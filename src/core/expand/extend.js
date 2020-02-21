import Vue from '../index'
let cid = 0
Vue.extend = function(extendOptions) { 
  extendOptions = extendOptions || {}
  const self = this // 此处指vue
  const name = extendOptions.name || self.options.name 
  const Sub = function VueCompnent(options) {
    this._init(options)
  }
  Sub.prototype = Object.create(self.prototype)
  Sub.options = Object.assign({},self.options,extendOptions)
  Sub['super'] = self
  Sub.cid = cid++
  Sub.superOptions = self.options
  Sub.extendOptions = extendOptions
  Sub.sealedOptions = Object.assign({}, Sub.options)
  return Sub
}