const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/script/game.ts'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist/script')
    }
};