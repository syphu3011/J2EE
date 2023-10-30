const path = require("path");
const fs = require("fs");
const webpack = require('webpack');
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
            'path': false,  
            "constants": false,
            "crypto": false,
            "buffer": false
        },
    },
    devServer: {
        host: "localhost",
        port: 8080, 
        static: path.resolve(appDirectory, ""), 
        // hot: true,
        devMiddleware: {
            publicPath: "/",
        },
        headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept'
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
            use: [
           { loader: "url-loader",
            options: { limit: false },
          }
            ]
          },
        //   {
        //     test: /\.(png|jpe?g|gif|jp2|webp)$/,
        //     use: [
        //         {
        //           loader: 'file-loader',

        //             options: {
        //                 name: '[name].[ext]',
        //             },
        //         },
        //       ]
        //   }
        ],


      },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "public/index.html"),
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],

    mode: "development",
    
};