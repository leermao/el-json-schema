export default {
  name: "formJsonSchemas",
  props: {
    schemas: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: this.mergeValues()
    };
  },
  render(h) {
    return h(
      "el-form",
      {
        props: {
          model: this.formData,
          labelWidth: "80px"
        },
        ref: "formData"
      },
      [...this.renderFormItems(h), ...this.renderButtomItems(h)]
    );
  },

  created() {
    this.$emit("input", this.formData);
  },

  watch: {
    formData: {
      handler(formData) {
        this.updating = true;
        this.$emit("input", formData);
      },
      deep: true
    }
  },

  methods: {
    mergeValues() {
      const vm = this;
      const { value } = vm;
      const defaultValues = {};

      return {
        ...defaultValues,
        ...value
      };
    },
    renderButtomItems(h) {
      const vm = this;
      return [
        h(
          "el-button",
          {
            on: {
              click() {
                vm.$refs.formData.resetFields();
                vm.$emit("cancel", { ...vm.formData });
              }
            }
          },
          "取消"
        ),
        h(
          "el-button",
          {
            on: {
              click() {
                vm.$emit("submit", { ...vm.formData });
              }
            }
          },
          "确定"
        )
      ];
    },
    /**
     * el-form-item
     */
    renderFormItems(h) {
      const vm = this;
      const children = [];
      const tagsMap = {
        "el-input": vm.handleRenderInput,
        "el-select": vm.handleRenderSelect,
        "el-checkbox": vm.handleRenderCheckBox
      };

      vm.schemas.map(item => {
        if (tagsMap[item.tag]) {
          const formItem = h(
            "el-form-item",
            {
              props: {
                rule: [...item.rule],
                label: item.label
              }
            },
            [...tagsMap[item.tag](h, item)]
          );

          children.push(formItem);
        }
      });

      return children;
    },

    handleModel(item) {
      const vm = this;
      const value = vm.formData[item.model] || null;
      const modelEvents = {
        input: function(value) {
          vm.formData[item.model] = value;
        }
      };
      return {
        value,
        modelEvents
      };
    },

    /**
     * 输入框
     */
    handleRenderInput(h, item) {
      const { modelEvents, value } = this.handleModel(item);

      return [
        h(item.tag, {
          props: {
            value,
            ...item.props
          },
          on: {
            ...modelEvents,
            ...item.events
          }
        })
      ];
    },

    /**
     * 选择框
     */
    handleRenderSelect(h, item) {
      const { modelEvents, value } = this.handleModel(item);
      let children = [];

      if (Array.isArray(item.options)) {
        const items = item.options || [];
        items.map(option => {
          const ArrOption = h("el-option", {
            props: {
              value: option.value || option["value"],
              label: option.label || option["label"],
              ...item.props,
              key: option.value
            }
          });

          children.push(ArrOption);
        });
      } else {
        const items = item.options || {};
        for (let i in items) {
          const objOption = h("el-option", {
            props: {
              value: i,
              key: i,
              label: items[i],
              ...item.props
            }
          });

          children.push(objOption);
        }
      }

      return [
        h(
          item.tag,
          {
            props: {
              value,
              ...item.props
            },
            on: {
              ...modelEvents,
              ...item.events
            }
          },
          children
        )
      ];
    },
    /**
     * 复选框
     */
    handleRenderCheckBox() {}
  }
};
