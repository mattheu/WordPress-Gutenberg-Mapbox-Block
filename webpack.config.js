var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './js/src/main.js',
	output: {
		path: path.resolve( __dirname, 'js/build' ),
		filename: 'main.bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2017', 'react' ]
				}
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
