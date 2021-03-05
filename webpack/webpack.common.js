const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, '..', '..', 'dist')
    },
    externals: {
        writer: 'writer',
        substance: 'substance'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                'core/_utilities.scss',
                                'core/_typography.scss',
                            ].map((file) => path.join(__dirname, `../src/scss/${file}`)),
                        },
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'string-replace-loader',
                options: {
                    search: '{{version}}',
                    replace: process.env.version || 'dev',
                    flags: 'g'
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    failOnWarning: false,
                    failOnError: false,
                    formatter: require('eslint').CLIEngine.getFormatter('stylish')
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    optimization: {
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        removeAvailableModules: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
}
