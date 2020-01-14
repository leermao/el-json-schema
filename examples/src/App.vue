<template>
  <div id="app">
    <el-header>Form-Json-Schema</el-header>

    <div id="nav">
      <router-link to="/">基础用法</router-link> |
      <router-link to="/about">UI界面快速生成</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.el-header {
  background: #42b983;
  display: flex;
  align-items: center;
  font-size: 24px;
}
</style>
