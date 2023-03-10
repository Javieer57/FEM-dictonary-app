const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 9000,
    // without this, doesn't reload when html files changes
    watchFiles: "src/**/*.*",
  },
  module: {
    rules: [
      {
        // html-loader is needed to output images
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        type: "asset/resource",
        generator: {
          outputPath: "images/",
          publicPath: "images/",
          filename: "[name][ext]",
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`,
    }),
    new MiniCssExtractPlugin(),
  ],
};
