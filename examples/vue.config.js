module.exports = {
  devServer: {
    port: 7000
  },
  configureWebpack: config => {
    config.module.rules.push({
      // 处理markdown文件
      test: /\.md$/,
      use: [
        {
          loader: "vue-loader"
        },
        {
          loader: require.resolve("./src/markdownLoader")
        }
      ]
    });
  }
};
