var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    debug: true,
    devtool: '#eval',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/app.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app.js',
        publicPath: 'http://localhost:8080/public',
        hotUpdateChunkFilename: "[id].hot-update.js",
        hotUpdateMainFilename: "hot-update.json"
    },

    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "raw!autoprefixer?[browsers=last 2 version, ie9]!less")
            },
            {   test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader?[browsers=last 2 version, ie9]"
            },
            {
                test: /\.(svg|eot|ttf|woff)/,
                loader: 'url'
            },
            {   test: /\.(?:png|jpg|gif)$/,
                loader: 'file-loader'
            },
//            {
//                test: /\.jade$/,
//                loader: "jade-loader?self"
//            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/all.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'development'
            }
        })
//        new webpack.ProvidePlugin({
//            $: "jquery"
//        })
//        new HtmlWebpackPlugin({
//            filename: 'index.html',
//            template: 'src/app.html'
//        })
    ]
};