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
	externals: {
		'jquery': 'jQuery',
		'react': 'React',
		'react-dom': 'ReactDom',
		'mapbox-gl': 'mapboxgl',
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
