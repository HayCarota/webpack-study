const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js", // 入口
  output: {
    path: path.join(__dirname, "dist"), // 出口路径
    filename: "main.js" // 出口文件名
  },
  // “plugins”里面实例化插件
  plugins: [
    new CleanWebpackPlugin(), // 自动删除"dist"文件夹的实例化
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }) // 打包后生成html文件并自动引入打包后的js ,配置后src/index.html文件中无需再引用index.js文件,不然该文件会运行两次。
  ],
  devServer: {
    compress: true,
    port: 3000,
    open: true
  },
  module: {
    rules: [
      // loader的规则
      {
        test: /\.(css|less)$/, // 匹配所有的css或less文件
        /**
         * use数组里从右向左运行
         * 先用 css-loader 让webpack能够识别 css 文件的内容并打包
         * 再用 style-loader 将样式, 把css插入到dom中
         * 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
         */
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        // webpack5版本
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: "asset"
      },
      //   {// webpack5之前版本
      //     test: /\.(png|jpg|gif|jpeg)$/i,
      //     use: [
      //       {
      //         loader: "url-loader", // 匹配文件, 尝试转base64字符串打包到js中, url-loader 把文件转base64 打包进js中, 会有30%的增大, file-loader 把文件直接复制输出
      //         options: {
      //           limi: 8 * 1024 // 配置limit, 超过8k, 不转, file-loader复制, 随机名, 输出文件
      //         }
      //       }    
      //     ]
      //   }
      {
        // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
        test: /\.(eot|svg|ttf|woff|woff2)$/,   
        type: "asset/resource",
        generator: {
          filename: "font-[name].[hash:6][ext]"
        }
      }
    ]
  }
};
