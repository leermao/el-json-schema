const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

function resolve(file) {
  return path.join(__dirname, file);
}

module.exports = {
  mode: "production",
  entry: resolve("packages/formschema/index.js"),
  output: {
    path: resolve("dist"),
    filename: "el-form-schema.js",
    libraryTarget: "umd",
    library: "el-form-schema",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [resolve("src"), resolve("test")],
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: true })]
  }
};
