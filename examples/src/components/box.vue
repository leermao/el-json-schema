<template>
  <fieldset class="content">
    <legend>{{ title }}:</legend>
    <slot></slot>
  </fieldset>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="less">
.content {
  border: 1px solid #ddd;
  margin: 0 20px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;

  .title {
    position: absolute;
    top: -14px;
  }
}
</style>
