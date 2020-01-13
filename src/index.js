import FormsShema from "./formschema.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

export default {
  install: Vue => {
    Vue.use(ElementUI);
    Vue.component("el-form-shema", FormsShema);
  }
};
