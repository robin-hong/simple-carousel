const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const ROOT = process.cwd()

module.exports = {
    entry: {
        global: path.join(ROOT, 'src', 'index')
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].chunk.js',
        path: path.join(ROOT, 'dist')
    },
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            context: ROOT,
                            configFile: path.join(ROOT, 'config', 'tsconfig.json')
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            //modules: true,
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(ROOT, 'public', 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        hot: true
    }
}
