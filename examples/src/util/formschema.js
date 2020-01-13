// import { hasChildren } from "./utils";

export default {
  name: "formJsonSchema",
  props: {
    schema: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  render(h) {
    return h(
      "el-form",
      {
        props: {}
      },
      [...this.renderFormItems(h)]
    );
  },
  methods: {
    renderFormItems(h) {
      return [h("div", 111), h("span", 333)];
    }
    // /**
    //  * el-form-item
    //  */
    // renderFormItem(h) {
    //   const children = [];
    //   const tagsMap = {
    //     "el-input": this.handleRenderInput,
    //     "el-select": this.handleRenderSelect,
    //     "el-checkbox": this.handleRenderCheckBox
    //   };
    //   this.schema.map(item => {
    //     if (tagsMap[item.tag]) {
    //       const formItem = h(
    //         "el-form-item",
    //         {
    //           props: {}
    //         },
    //         tagsMap[item.tag](h, item)
    //       );
    //       children.push(formItem);
    //     }
    //   });
    //   return children;
    // },
    // /**
    //  * 输入框
    //  */
    // handleRenderInput() {},
    // /**
    //  * 选择框
    //  */
    // handleRenderSelect() {},
    // /**
    //  * 复选框
    //  */
    // handleRenderCheckBox() {}
  }
};
