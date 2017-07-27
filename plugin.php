<?php
/*
Plugin Name: Matts Gutenberg Maps Test
Plugin URI: http://matth.eu
Description: Testing Gutenberg
Version: 1.0
Author: Matthew Haines-Young
Author URI: http://matth.eu
*/

add_action( 'enqueue_block_editor_assets', function() {

	wp_register_script(
		'mattheu-gb-map-test-mapbox',
		'https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.js'
	);

	wp_enqueue_script(
		'mattheu-gb-map-test',
		plugins_url( 'js/build/main.bundle.js', __FILE__ ),
		[ 'wp-blocks', 'wp-element', 'mattheu-gb-map-test-mapbox' ]
	);

} );

add_action( 'enqueue_block_assets', function() {

	wp_enqueue_style(
		'mattheu-gb-map-test',
		plugins_url( 'css/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . '/css/editor.css' )
	);

} );
