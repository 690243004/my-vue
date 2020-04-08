import Vue from "@s/index.js";
// import Vue from '@s/lib/vue'
import App from "./App.vue";
console.log(App, "?App");
const app = new Vue({
  el: document.getElementById("app"),
  render: function(createElement) {
    return createElement(
      "div",
      {
        // data
        attrs: {
          id: "app"
        }
      },
      [
        this.message,
        createElement(
          "p",
          {
            attrs: {
              id: "title"
            }
          },
          this.description
        ),
        createElement(
          "p",
          {
            attrs: {
              id: "title"
            }
          },
          this.description
        )
      ]
    );
  },
  data: {
    message: "Hello Vue",
    description: "Vue is a frontend build util"
  }
});
/* const app = new Vue({
  el: document.getElementById('app'),
  render: function(h) {
    return h(App)
  },
  data: {
    message: 'Hello Vue',
    description: 'Vue is a frontend build util',
  },
})
 */
console.log(app);
