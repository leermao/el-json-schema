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
            placeholder: "输入placeholder",
            clearable: true,
            "show-password": true,
            // disabled: true,
            size: "small"
          },
          events: {
            blur() {
              console.log("事件");
            }
          },
          rule: [],
          render: () => {},
          options: [],
          model: "name",
          label: "输入框"
        }
      ],
      formValues: {
        name: "Some Awesome Title"
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
