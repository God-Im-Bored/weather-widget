'use strict'

module.exports = {
    entry: '/client/index.js',
    mode: 'development',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
      publicPath: '/',
      contentBase: './public',
      hot: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/, 
                exclude: /node_modules/, 
                loader: "babel-loader", 
                
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
              }
        ]
    }
}