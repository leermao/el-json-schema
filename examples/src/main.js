import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import FormsShema from "el-form-schema";
import marked from "./marked";

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
