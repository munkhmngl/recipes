const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'development',
   // mode: 'production',
   entry: './src/js/index.js',
   output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist')
   },
   devServer: {
      static: './dist'
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'src/index.html'
      })
   ],
   module: {
      rules: [
         {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [
                     ['@babel/preset-env', { targets: "defaults" }]
                  ]
               }
            }
         }
      ]
   }
};