const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
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
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: "/",
        assetModuleFilename: '[name][ext]',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true,
        open: true,
        compress: true,
        host: 'localhost',
        port: 3000,
        hot: true,
        allowedHosts: ['https://localhost:4000', 'https://localhost:3000'],
        client: {
            overlay: {
                errors: true,
                warnings: true,
            },
        },
        server: {
            type: 'https',
            options: {   
                key: './cert.key',
                cert: './cert.crt',
            }  
        } 
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            //title: isProduction ? 'Production' : 'Development',
            filename: 'index.html',
            favicon: './public/favicon.ico'
        }),
        new CompressionPlugin({
            //filename: "[path][base].gz",
            filename: "[base].gz",
            //filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|jsx|ts|tsx|css|html|svg|webp)$/,
            threshold: 8192,
            minRatio: 0.8
            }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            //filename: "[path][base].br",
            filename: "[base].br",
            test: /\.(js|jsx|ts|tsx|css|html|svg|webp)$/,
            threshold: 10240,
            minRatio: 0.8
            }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_HOST_PORT': JSON.stringify(4000),
            'process.env.REACT_APP_HOST': JSON.stringify('https://localhost:4000'),
            'process.env.REACT_APP_CORS': JSON.stringify('https://localhost:3000'),
            'process.env.REACT_APP_CORS_PORT': JSON.stringify(3000),
            'process.env.REACT_APP_ADMIN_PATH': JSON.stringify('https://localhost:3000/admin'),
            'process.env.REACT_APP_NOVA_POSHTA_API': JSON.stringify('https://api.novaposhta.ua'),
            'process.env.REACT_APP_NOVA_POSHTA_API_KEY': JSON.stringify('09e9681869e82e412dcea97b1b65972c'),
            'process.env.REACT_APP_DELIVERY_API': JSON.stringify('https://www.delivery-auto.com/api/v4/Public'),
            'process.env.REACT_APP_DELIVERY_API_KEY': JSON.stringify('6e9a78307c331a3a9ac51285769ccacd'),
            'process.env.SKIP_PREFLIGHT_CHECK': JSON.stringify(true),
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    optimization: {
        //runtimeChunk: true,
        minimize: true,
        mergeDuplicateChunks: true,
        removeEmptyChunks: true,
        minimizer: [
            new TerserPlugin(),
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
