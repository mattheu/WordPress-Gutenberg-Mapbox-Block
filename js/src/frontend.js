import _each from 'lodash/each';
import _get from 'lodash/get';
import mapStyles from './utils/map'

// console.log( document.getElementsByClassName( 'wp-block-mattheu-gb-map-test' ) );
_each( document.getElementsByClassName( 'gb-map-test-map-container' ), el => {
	console.log( el.dataset );
	const attributes = {
		align:          _get( el.dataset, 'align', '' ),
		height:         _get( el.dataset, 'height', '' ),
		mapZoom:        _get( el.dataset, 'mapZoom', '' ),
		mapCenter:      _get( el.dataset, 'mapCenter', '0,0' ),
		mapAllowScroll: _get( el.dataset, 'mapScroll' ) === 'true',
		mapStyle:       _get( el.dataset, 'mapStyle', 'streets' ),
	};

	attributes.mapCenter = attributes.mapCenter.split(',');

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

	if ( attributes.mapAllowScroll ) {
		map.addControl( new mapboxgl.NavigationControl(), 'top-right' );
	}

} );
