import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import FormsShema from "./src/index.js";
import VueMarkdown from "vue-markdown";

Vue.use(ElementUI);
Vue.use(FormsShema);
Vue.use(VueMarkdown);

import router from "./router";
import store from "./store";

import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";

Vue.directive("highlight", el => {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  components: {
    VueMarkdown
  },
  render: h => h(App)
});
