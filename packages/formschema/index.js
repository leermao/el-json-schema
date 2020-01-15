import FormsShema from "./src/formschema.js";

export default {
  install: Vue => {
    Vue.component("el-form-shema", FormsShema);
  }
};
