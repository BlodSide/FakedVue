// const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    mode: 'production',
    devtool: 'null',
    
    entry:  __dirname + "/src/entry.js",//已多次提及的唯一入口文件
    output: {
      path: __dirname + "/dist",//打包后的文件存放的地方
      filename: "FakedVue.js"//打包后输出文件的文件名
    },

    devServer: {
        contentBase: "./dist",  //本地服务器所加载的页面所在的目录
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // new HtmlWebpackPlugin({
        //     template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        // }),
        new UglifyJsPlugin()
    ],
  }