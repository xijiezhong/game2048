var webpack = require("webpack");
var path = require("path");

module.exports = {
  devtool: 'eval-source-map',
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
      }
  	]
  },
  plugins:[
     new webpack.ProvidePlugin({
       $:"jquery",
       jquery:"jquery",
       "window.jquery":"jquery"
     })
  ]
}