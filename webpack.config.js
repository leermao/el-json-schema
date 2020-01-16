const path = require("path");
const webpack = require("webpack");

function resolve(file) {
  return path.join(__dirname, file);
}

module.exports = {
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
        include: __dirname,
        exclude: /node_modules/,
        query: { compact: false }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      parallel: true,
      compress: {
        warnings: false
      }
    })
  ],
  externals: {}
};
