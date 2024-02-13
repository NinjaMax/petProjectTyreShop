// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
console.log('IS_PODUCTION: ', isProduction);
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    context: __dirname,
    //target: 'node',
 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        //publicPath: '/',
        //publicPath: "/",
        clean: true,
    },
    devServer: {
        //contentBase: path.join(__dirname, "public"),
        //static: './dist',
        //static: path.join(__dirname, 'dist'),
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: '/',
        },
        historyApiFallback: true,
        //contentBase: path.join(__dirname, 'dist'),
        open: true,
        compress: true,
        host: 'localhost',
        port: 3000,
        hot: true,
        allowedHosts: ['https://localhost:4000', 'https://localhost:3000'],
        server: {
            type: 'https',
            options: {   
                key: './cert.key',
                cert: './cert.crt',
                // passphrase: 'webpack-dev-server',
                // requestCert: true,
            }  
        } 
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: isProduction ? 'Production' : 'Development',
            filename: 'index.html',
            favicon: './public/favicon.ico'
        }),
        new CompressionPlugin({
            filename: "[path][base].gz",
            //filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 8192,
            minRatio: 0.8
            }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            filename: "[path][base].br",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
            }),
        new BundleAnalyzerPlugin()
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                //use: 'ts-loader',
                exclude: /node_modules/,
                loader: 'ts-loader',
                // options: {
                //     compilerOptions: {
                //       noEmit: false,
                //     },
                // },
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp|ico)$/i,
                type: 'asset/resource',
                generator: {
                    emit: false,
                },
            },
            // {
            //     test: /\.(js|jsx|ts|tsx)$/,
            //     exclude: /node_modules/,
            //     use: ["babel-loader"],
            // },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    optimization: {
        //runtimeChunk: true,
        minimizer: [
            new CssMinimizerPlugin()
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new MiniCssExtractPlugin({ignoreOrder: true}));
    } else {
        config.mode = 'development';
    }
    return config;
};
