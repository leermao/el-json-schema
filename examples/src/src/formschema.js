const baseConfig = {
  size: "mini",
  labelWidth: "80px",
  labelPosition: "right",
  inline: false,
  componentWidth: 12
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
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    formConfig() {
      return { ...baseConfig, ...this.config };
    }
  },
  data() {
    return {
      formData: this.mergeValues()
    };
  },
  render(h) {
    const {
      formConfig: { labelWidth, labelPosition, inline }
    } = this;

    return h(
      "el-form",
      {
        props: {
          model: this.formData,
          labelWidth,
          labelPosition,
          inline
        },
        ref: "formData"
      },
      [
        ...(this.$slots.prepend || []),
        ...this.renderFormItems(h),
        ...this.renderButtomItems(h),
        ...(this.$slots.append || [])
      ]
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
      const {
        formConfig: { size }
      } = vm;

      return [
        h(
          "el-form-item",
          {
            props: {
              size
            }
          },
          [
            h(
              "el-button",
              {
                props: {
                  size
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
                  size,
                  type: "primary"
                },
                on: {
                  click() {
                    vm.$refs.formData.validate(valid => {
                      if (valid) {
                        vm.$emit("submit", { ...vm.formData });
                      } else {
                        return false;
                      }
                    });
                  }
                }
              },
              "确定"
            )
          ]
        )
      ];
    },
    /**
     * el-form-item
     */
    renderFormItems(h) {
      const vm = this;
      const { formConfig } = vm;
      const children = [];
      const tagsMap = {
        "el-input": vm.handleRenderCommonItems,
        "el-select": vm.handleRenderSelect,
        "el-date-picker": vm.handleRenderCommonItems,
        "el-switch": vm.handleRenderCommonItems,
        "el-radio": vm.handleRenderRadio,
        "el-custom": vm.handleRenderCustom
      };

      vm.schemas.map(item => {
        if (tagsMap[item.tag]) {
          const formItem = h(
            formConfig.inline ? "el-col" : "div",
            {
              props: {
                span: formConfig.componentWidth
              }
            },
            [
              h(
                "el-form-item",
                {
                  props: {
                    rules: [...(item.rule || [])],
                    label: item.label,
                    prop: item.model
                  }
                },
                item.render
                  ? [item.render(h, item)]
                  : [...tagsMap[item.tag](h, item)]
              )
            ]
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
      const {
        formConfig: { size }
      } = this;

      return [
        h(item.tag, {
          props: {
            value,
            size,
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
      const {
        formConfig: { size }
      } = this;

      return [
        h(
          item.tag,
          {
            props: {
              value,
              size,
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

    handleResetOptions(h, item) {
      let options = [];

      if (Array.isArray(item.options)) {
        (item.options || []).map(option => {
          let arrItem = {};
          if (typeof option === "object") {
            arrItem = {
              type: "array",
              value: item.keyVal ? option[item.keyVal] : option["value"],
              label: item.labelVal ? option[item.labelVal] : option["label"]
            };
          } else {
            arrItem = {
              type: "base",
              value: option,
              label: option
            };
          }

          options.push(arrItem);
        });
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

      return options;
    },

    handleRenderChildren(h, item, tag) {
      let children = [];
      let options = this.handleResetOptions(h, item);

      options.map(option => {
        const object = { ...option };
        const ArrOption = h(tag, {
          props: {
            value: object["value"],
            label: object["label"],
            key: object["value"]
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
      const {
        formConfig: { size }
      } = this;
      const { modelEvents, value } = this.handleModel(item);
      let children = this.handleRenderChildren(h, item, "el-radio");

      return [
        h(
          "el-radio-group",
          {
            props: {
              value,
              size,
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
     * 自定义部门
     */
    handleRenderCustom(h, item) {
      return item.render(h, item);
    }
  }
};
