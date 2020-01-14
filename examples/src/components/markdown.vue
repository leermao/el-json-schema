<template>
  <vue-markdown class="article" :source="content" v-highlight>
    ``` js ## 1234 ```
  </vue-markdown>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  name: "demo",
  data() {
    return {
      content: "## 这里是要展示的markdown文字，也可以通过props传递"
    };
  },
  components: {
    VueMarkdown
  }
};
</script>
