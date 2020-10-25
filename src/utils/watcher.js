import Dep from "./dep";
let uid = 0;
export default class Watcher {
  constructor({ vm, keyStr, callback }) {
    this.vm = vm;
    this._callback = callback;
    this.vm._watchers.push(this);
    this.deps = [];
    this.depIds = new Set();
    this.keyStr = keyStr;
    this.value = this.get();
    this.id = uid++;
    this._callback.call(this.vm);
  }

  udpate() {
    this.run();
  }

  run() {
    const value = this.get();
    const oldValue = this.value;
    if (value !== oldValue) {
      this.value = value;
      this._callback.call(this.vm);
    }
  }

  get() {
    let value;
    Dep.target = this;
    this.keyStr.split(".").forEach((key) => (value = this.vm[key]));
    Dep.target = null;
    return value;
  }

  run() {
    const value = this.get();
  }

  addDep(dep) {
    const id = dep.id;
    if (!this.depIds.has(id)) {
      this.deps.push(dep);
      this.depIds.add(id);
    }
  }
}
