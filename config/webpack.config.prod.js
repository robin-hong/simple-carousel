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
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@components': path.join(ROOT, 'src', 'components'),
            '@store': path.join(ROOT, 'src', 'store'),
            '@scene': path.join(ROOT, 'src', 'scene'),
            '@style': path.join(ROOT, 'src', 'style')
        }
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
                        loader: 'ts-loader'
                    }
                ]
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
                                namedExport: true,
                                camelCase: true,
                                localIdentName: '[name]__[local]__[hash:8]',
                                importLoaders: 1,
                                sourceMap: true
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
