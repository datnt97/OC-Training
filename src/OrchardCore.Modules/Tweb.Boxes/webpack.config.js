// webpack.config.js

var path = require('path');

module.exports = {
    mode: 'development',
    entry: './Assets/js/boxes.js',
    output: {
        path: path.resolve(__dirname, 'wwwroot/Scripts'),
        filename: 'boxes.js'
    },
    watch: true,
    resolve: {
        extensions: ['*', '.js', 'js']
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
