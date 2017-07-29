<?php
/*
Plugin Name: Matts Gutenberg Maps Test
Plugin URI: http://matth.eu
Description: Testing Gutenberg
Version: 1.0
Author: Matthew Haines-Young
Author URI: http://matth.eu
*/

namespace Mattheu\GutenbergMapBoxBlock;

add_action( 'wp_enqueue_scripts',           __NAMESPACE__ . '\\register_scripts', 1 );
add_action( 'admin_enqueue_scripts',        __NAMESPACE__ . '\\register_scripts', 1 );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
add_action( 'enqueue_block_assets',        __NAMESPACE__ . '\\enqueue_block_assets' );

function register_scripts() {

	wp_register_style(
		'mattheu-gb-map-test-mapbox',
		'https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css'
	);

	wp_register_script(
		'mattheu-gb-map-test-mapbox',
		'https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.js'
	);

}

function enqueue_block_editor_assets() {
	wp_enqueue_script(
		'mattheu-gb-map-test',
		plugins_url( 'js/build/editor.bundle.js', __FILE__ ),
		[ 'wp-blocks', 'wp-element', 'mattheu-gb-map-test-mapbox' ]
	);

	wp_localize_script( 'mattheu-gb-map-test', 'mattheuGbMapTestData', [
		'mapboxKey' => defined( 'MATTHEU_GB_MB_TEST_KEY' ) ? MATTHEU_GB_MB_TEST_KEY : null,
	] );
}

function enqueue_block_assets() {

	if ( ! is_admin() ) {

		wp_enqueue_script(
			'mattheu-gb-map-test',
			plugins_url( 'js/build/frontend.bundle.js', __FILE__ ),
			[ 'mattheu-gb-map-test-mapbox', 'wp-element' ],
			'0.1',
			true
		);

		wp_localize_script( 'mattheu-gb-map-test', 'mattheuGbMapTestData', [
			'mapboxKey' => defined( 'MATTHEU_GB_MB_TEST_KEY' ) ? MATTHEU_GB_MB_TEST_KEY : null,
		] );

	}

	wp_enqueue_style(
		'mattheu-gb-map-test',
		plugins_url( 'css/editor.css', __FILE__ ),
		[ 'mattheu-gb-map-test-mapbox' ],
		filemtime( plugin_dir_path( __FILE__ ) . '/css/editor.css' )
	);

}
