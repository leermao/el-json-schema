<template>
  <el-form-shema v-model="json"></el-form-shema>
</template>

<script>
export default {
  data() {
    return {
      json: [
        {
          tag: "el-input",
          rule: [],
          props: {
            event: {},
            attrs: {}
          },
          options: [],
          render: () => {}
        }
      ]
    };
  }
};
</script>
