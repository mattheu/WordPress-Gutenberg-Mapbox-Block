var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry : {
		editor: './js/src/editor.js',
		frontend: './js/src/frontend.js'
	},
	output: {
		path: path.resolve( __dirname, 'js/build' ),
		filename: '[name].bundle.js'
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
