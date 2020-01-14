<template>
  <markdown-it-vue :content="content" />
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";

export default {
  components: {
    MarkdownItVue
  },
  data() {
    return {
      content: ""
    };
  },
  props: ["form", "schemas", "formValues"],
  methods: {
    handleInit() {
      this.content = `
        <template>
          <el-form-shema
              :schemas="schemas"
              v-model="formValues"
              :config="config"
            ></el-form-shema>
        </template>

        data() {
          return {
            form: ${JSON.stringify(this.form)},
            schemas: ${JSON.stringify(this.schemas)},
            formValues: ${JSON.stringify(this.formValues)}
          };
        },
      `;
    }
  },
  mounted() {
    this.handleInit();
  }
};
</script>
