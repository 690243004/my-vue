class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    console.log(sub, "sub");
    this.subs.push(sub);
  }

  removeSub(sub) {
    const index = this.subs.findIndex((s) => s === sub);
    this.subs.splice(index, 1);
  }
  /*Github:https://github.com/answershuto*/
  notify() {
    // stabilize the subscriber list first
    this.subs.forEach((sub) => sub.update());
  }
}

export default Dep;
