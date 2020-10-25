import Vue from "@s/index.js";

// 组件
const HellWorld = {
  name: "hello world",
  render(h) {
    return h("h1", {}, "Hello World");
  },
  beforeCreate() {
    console.log(this, "what the fuck");
  },
  methods: {
    getUesrName() {
      return console.log(this, "userName");
    },
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
