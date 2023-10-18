const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, "src/app.tsx"), 
    output: {
        filename: "js/bundleName.js", 
        clean: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            fs: false,
            'path': false

        }
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080, 
        static: path.resolve(appDirectory, ""), 
        hot: true,
        devMiddleware: {
            publicPath: "/",
        }
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
          {
            test: /\.(sa|sc|c)ss$/, // styles files
            use: ["style-loader", "css-loader", "sass-loader","css-modules-typescript-loader"],
           
          },
          {
            test: /\.(jpeg|jpg|png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
            loader: "url-loader",
            options: { limit: false },
          },
          {
            test: /\.(png|jpe?g|gif|jp2|webp)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
          }
        ],


      },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "public/index.html"),
        })
    ],
    mode: "development",
    
};