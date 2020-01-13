const setVal = (item, val) => {
  return typeof item === "object" ? item[val] : item;
};

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
          labelWidth: "180px"
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
            props: {
              size: "small"
            },
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
            props: {
              size: "small",
              type: "primary"
            },
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
        "el-input": vm.handleRenderCommonItems,
        "el-select": vm.handleRenderSelect,
        "el-date-picker": vm.handleRenderCommonItems,
        "el-switch": vm.handleRenderCommonItems,
        "el-checkbox": vm.handleRenderCheckBox,
        "el-radio": vm.handleRenderRadio
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
     * 输入框/日期
     */
    handleRenderCommonItems(h, item) {
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
      let children = this.handleRenderChildren(h, item, "el-option");

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

    handleRenderChildren(h, item, tag) {
      let children = [];
      let options = [];

      if (Array.isArray(item.options)) {
        options = item.options || [];
      } else {
        const items = item.options || {};
        for (let i in items) {
          const objOption = {
            type: "object",
            value: i,
            label: items[i]
          };

          options.push(objOption);
        }
      }

      options.map(option => {
        const object = { ...option };
        const ArrOption = h(tag, {
          props: {
            value: setVal(object, item.value || "value"),
            label: setVal(object, item.label || "label"),
            key: setVal(object, item.label || "value"),
            ...item.props
          }
        });

        children.push(ArrOption);
      });

      return children;
    },

    /**
     * radio
     */
    handleRenderRadio(h, item) {
      const { modelEvents, value } = this.handleModel(item);
      let children = this.handleRenderChildren(h, item, "el-radio");

      return [
        h(
          "el-radio-group",
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
     * checkbox
     */
    handleRenderCheckBox(h, item) {
      const { modelEvents, value } = this.handleModel(item);
      let children = this.handleRenderChildren(h, item, "el-checkbox");

      return [
        h(
          "el-checkbox-group",
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
    }
  }
};
