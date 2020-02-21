export default function initProxy(vm, key) {
  console.log(vm,key)
  Object.defineProperty(vm, key, {
    configurable: false,
    enumerable: true,
    get: function proxyGetter() {
      return vm._data[key];
    },
    set: function proxySetter(newVal) {
      vm._data[key] = newVal;
    }
  });
}
