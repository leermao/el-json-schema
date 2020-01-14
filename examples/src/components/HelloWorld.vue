<template>
  <el-form-shema
    :schemas="schemas"
    v-model="formValues"
    @submit="handleSubmit"
  ></el-form-shema>
</template>

<script>
export default {
  data() {
    return {
      schemas: [
        {
          tag: "el-input",
          props: {
            size: "small",
            placeholder: "测试输入框"
          },
          events: {
            blur() {}
          },
          rule: [
            { required: true, message: "请输入邮箱地址", trigger: "blur" },
            {
              type: "email",
              message: "请输入正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ],
          options: [],
          model: "name",
          label: "输入框"
        },
        {
          tag: "el-select",
          props: {
            size: "small",
            multiple: true,
            placeholder: "测试输入框为数组的情况"
          },
          events: {},
          rule: [],
          options: [
            {
              value: "选项1",
              label: "黄金糕"
            },
            {
              value: "选项2",
              label: "双皮奶"
            },
            {
              value: "选项3",
              label: "蚵仔煎"
            },
            {
              value: "选项4",
              label: "龙须面"
            },
            {
              value: "选项5",
              label: "北京烤鸭"
            }
          ],
          model: "select1",
          label: "选择框1"
        },
        {
          tag: "el-select",
          props: {
            size: "small",
            placeholder: "测试输入框为对象的情况"
          },
          events: {},
          rule: [],
          options: {
            1: "选项1",
            2: "选项2",
            3: "选项3"
          },
          model: "select2",
          label: "选择框2"
        },
        {
          tag: "el-date-picker",
          props: {
            size: "small",
            placeholder: "日期选择"
          },
          events: {},
          rule: [],
          options: [],
          model: "picker",
          label: "日期选择"
        },
        {
          tag: "el-switch",
          props: {
            size: "small",
            placeholder: "日期选择"
          },
          events: {},
          rule: [],
          options: [],
          model: "switch",
          label: "开关"
        },
        {
          tag: "el-radio",
          props: {
            placeholder: "单选框"
          },
          events: {},
          rule: [],
          options: ["上海", "北京", "广州", "深圳"],
          model: "radio",
          label: "单选框Array"
        },
        {
          tag: "el-radio",
          props: {
            placeholder: "单选框"
          },
          events: {},
          rule: [],
          options: ["北京", "广州", "深圳"],
          model: "radio1",
          label: "单选框Array-OBJ"
        },
        {
          tag: "el-checkbox",
          props: {
            size: "small",
            placeholder: "复选框"
          },
          events: {},
          rule: [],
          options: ["上海", "北京", "广州", "深圳"],
          model: "checkbox",
          label: "复选框Array"
        },
        {
          tag: "el-custom",
          render: (h, p) => {
            return h("div", p.tag);
          },
          model: "custom",
          label: "自定义"
        }
      ],
      formValues: {
        name: "",
        select1: "",
        select2: "",
        picker: "",
        switch: "",
        radio: "",
        radio1: "",
        checkbox: "",
        checkbox1: "",
        checkbox2: ""
      }
    };
  },
  methods: {
    handleSubmit(data) {
      console.log(data);
    }
  }
};
</script>
