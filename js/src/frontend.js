import _each from 'lodash/each';
import mapStyles from './utils/map'

// console.log( document.getElementsByClassName( 'wp-block-mattheu-gb-map-test' ) );
_each( document.getElementsByClassName( 'wp-block-mattheu-gb-map-test' ), el => {
	const attributes = JSON.parse( el.dataset.attributes );
	const { align, height, mapZoom, mapCenter, mapStyle, mapAllowScroll } = attributes;

	mapboxgl.accessToken = mattheuGbMapTestData.mapboxKey;

	let map = new mapboxgl.Map({
		container: el,
		style: mapStyles.getUrl( attributes.mapStyle ),
		center: attributes.mapCenter,
		zoom: attributes.mapZoom,
		scrollZoom: attributes.mapAllowScroll,
		dragPan: attributes.mapAllowScroll,
		doubleClickZoom: attributes.mapAllowScroll,
		dragRotate: false,
		pitchWithRotate: false,
	});

	console.log( mapboxgl );

	if ( attributes.mapAllowScroll ) {
		map.addControl( new mapboxgl.NavigationControl(), 'top-right' );
	}

} );
