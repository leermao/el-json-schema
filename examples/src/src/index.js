import FormsShema from "./formschema.js";

export default {
  install: Vue => {
    Vue.component("el-form-shema", FormsShema);
  }
};
