const path = require('path');
require('env2')('./config.env');

module.exports = {
    entry: ['./src/client/index.js'],
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        proxy: {
            '/api': {
                target: `http://localhost:${process.env.PORT || 4000}`,
                secure: false
            }
        },
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public'),
        publicPath: path.join(__dirname, 'public')
    }
};
