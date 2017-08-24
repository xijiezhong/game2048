var webpack = require("webpack");
var path = require("path");

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry:  __dirname + "/app/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
  	loaders: [
        {
      	    test:/\.css$/,
      	    loader:'style-loader!css-loader'
        },
        {
            test:/.js$/,
            loader:'babel-loader',
            query: {presets: ['es2015']}
        }
  	]
  },
  plugins:[
     new webpack.ProvidePlugin({
       $:"jquery",
       jquery:"jquery",
     }),
  ]
}