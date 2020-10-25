const path = require("path");
const fs = require("fs");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// examples 子目录的 js 入口文件名
const DEFAULT_CHUNK_NAME = "app.js";

// wepback 根据example 的文件 去读取index.html 与 app.js
// 生成一个入口对象 还有htmlwebpackPlugin的对象
function getEntryAndHTMLPlugn(entryPath) {
  const devDefaultPlugin = {
    template: path.join(__dirname, entryPath, "index.html"),
    filename: "index.html",
  };

  // 读取文件目录 可以获得['render','ssr'] 这样的目录
  const dirs = fs
    .readdirSync(path.join(__dirname, entryPath))
    .filter((dir) => !dir.includes("."));
  // 检查
  dirs.forEach((dir) => {
    // 查找该文件下有没有app.js目录
    const files = fs.readdirSync(path.join(__dirname, entryPath, dir));
    if (!files.includes("index.html") || !files.includes(DEFAULT_CHUNK_NAME)) {
      throw Error(
        `example 的子目录必须包含index.html 与 ${DEFAULT_CHUNK_NAME}文件`
      );
    }
  });
  let entry = {},
    htmlPlugins = [new htmlWebpackPlugin(devDefaultPlugin)];
  dirs.forEach((dir) => {
    entry[dir] = path.join(__dirname, entryPath, dir, DEFAULT_CHUNK_NAME);
    htmlPlugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, entryPath, dir, "index.html"),
        filename: dir + ".html",
        chunks: [dir],
      })
    );
  });
  return {
    entry,
    htmlPlugins,
  };
}

const { entry, htmlPlugins } = getEntryAndHTMLPlugn("examples");

module.exports = {
  devtool: "eval-source-map",
  entry: entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    chunkFilename: "js/[id].chunk.js", //chunk生成的配置
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.js$/, use: ["babel-loader"], exclude: /node_modules/ },
    ],
  },
  resolve: {
    alias: {
      "@s": path.join(__dirname, "./src"),
    },
    modules: [path.resolve("src"), path.resolve("node_modules")],
    // 省略后缀
    extensions: [".js", ".ts"],
  },
  plugins: [...htmlPlugins, new VueLoaderPlugin()],
  devServer: {
    port: "8080",
    contentBase: path.join(__dirname, "dist"),
    index: "index.html",
  },
};
