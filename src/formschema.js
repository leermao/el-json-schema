/* eslint-disable */
import {hasChildren} from './utils'
export default {
  name: 'formJsonSchema',
  
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      formData: {}
    }
  },

  render(h) {
    const vm = this

    return h(
      'el-form',
      {
        props: {}
      },
      [
        ...(vm.$slots.prepend || []),
        ...(vm.renderFormItems(h) || []),
        ...(vm.$slots.append || [])
      ]
    )
  },

  methods: {
    renderFormItem(h) {
      const children = [];
      const tagsMap = {
        'el-input': handleRenderInput,
        'el-select': handleRenderSelect,
        'el-checkbox': handleCheckBox
      }

      this.value.map(item => {
        if (tagsMap[item.tag] && hasChildren(item)) {
          const formItem = h(
            'el-form-item',
            {
              props: {}
            },
            tagsMap[item.tag](h, item)
          );
          children.push(formItem)
        }
      });

      return children;
    },

    handleRenderInput() {},

    handleRenderSelect() {}
  }
};