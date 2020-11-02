import Vue from "@s/index.js";

// 组件
const HellWorld = {
  name: "hello world",
  render(h) {
    console.log(this._proxy.fuckYou, "?????");
    return h("h1", {}, this._proxy.fuckYou);
  },
  beforeCreate() {},
  mounted() {
    console.log(this._el, "啊啊啊啊");
    console.log(this, "啊啊啊啊");
    this._el.addEventListener("click", this._methods.setUserName.bind(this));
  },
  methods: {
    getUesrName() {
      return console.log(this, "userName");
    },
    setUserName() {
      this._proxy.fuckYou = "你嗯你马呢";
    },
  },
  data() {
    return {
      fuckYou: "怀着理想不怕痛",
    };
  },
};

Vue({
  el: document.getElementById("app"),
  render(h) {
    return h("div", [
      h(HellWorld),
      h("div", ["套你猴子"]),
      h("div", ["套你猴子"]),
      h("div", ["套你猴子"]),
    ]);
  },
});
