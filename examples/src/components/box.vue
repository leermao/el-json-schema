<template>
  <div class="content">
    <el-button round class="title" size="mini">{{ title }}</el-button>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
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
