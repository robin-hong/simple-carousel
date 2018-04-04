const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const ROOT = process.cwd()

module.exports = {
    entry: path.join(ROOT, 'src', 'index'),
    output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].chunk.js',
        path: path.join(ROOT, 'dist')
    },
    mode: 'production',
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                //modules: true,
                                importLoaders: 1,
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]_[local]_[hash:base64]',
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/js', 'dist/css'], {
            root: ROOT
        }),
        new HTMLWebpackPlugin({
            template: path.join(ROOT, 'public', 'index.html')
        }),
        new ExtractTextPlugin('./css/[name].[hash:8].css')
    ]
}
