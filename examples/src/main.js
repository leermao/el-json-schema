import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import FormsShema from "../../packages/formschema/index.js";
import marked from "./marked";
import "./index.less";
import JsonViewer from "vue-json-viewer";

Vue.use(JsonViewer);
Vue.use(FormsShema);
Vue.use(ElementUI);
Vue.use(marked);

import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
