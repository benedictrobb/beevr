module.exports = {
    entry: [
        './src/client/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://trkdz-spectre-devuan:4000',
                secure: false
            }
        },
        historyApiFallback: true,
        contentBase: './'
    }
};
