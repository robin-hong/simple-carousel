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
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@components': path.join(ROOT, 'src', 'components'),
            '@store': path.join(ROOT, 'src', 'store'),
            '@scene': path.join(ROOT, 'src', 'scene')
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
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
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
