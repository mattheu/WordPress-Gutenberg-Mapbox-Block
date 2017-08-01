import React from 'react';
import objectDefaults from 'lodash/defaults';
import mapStyles from './../utils/map'

const __ = wp.i18n.__;
const Editable = wp.blocks.Editable;

export default class Map extends React.Component {

	/**
	 * Render.
	 *
	 * This is super simple.
	 * Because no props are used here, changing them doesn't cause it to re-render.
	 */
	render() {
		return <div key="map" className="mattheu-gb-map-test-map-container" ref="map"></div>;
	}

	/**
	 * Initial map setup.
	 *
	 * @return null
	 */
	componentDidMount() {
		mapboxgl.accessToken = this.props.token;

		this.map = new mapboxgl.Map({
			container: this.refs.map,
			style: mapStyles.getUrl( this.props.style ),
			center: this.props.center,
			zoom: this.props.zoom,
			scrollZoom: this.props.allowScroll,
			dragPan: this.props.allowScroll,
			doubleClickZoom: this.props.mapAllowScroll,
			dragRotate: false,
			pitchWithRotate: false,
			attributionControl: false,
		});

		// Add compact attribution.
		this.map.addControl( new mapboxgl.AttributionControl({ compact: true }), 'bottom-right' );

		// Trigger change after move.
		this.map.on( 'moveend', ( e ) => { this.onChange } );

		// Add the map controls on initial render. Note that these are shown/hidden in CSS as appropriate.
		this.addControls();
		this.refs.map.classList.toggle( 'gb-map-test-container--no-scroll', ! this.props.allowScroll );

	}

	/**
	 * Handle updated props.
	 *
	 * @param  object prevProps Previous props.
	 * @return null
	 */
	componentDidUpdate( prevProps ) {

		if ( prevProps.align !== this.props.align || prevProps.height !== this.props.height ) {
			this.map.resize();
		}

		if ( prevProps.style !== this.props.style ) {
			this.map.setStyle( mapStyles.getUrl( this.props.style ) );
		}

		this.refs.map.classList.toggle( 'gb-map-test-container--no-scroll', ! this.props.allowScroll );

		if ( this.props.allowScroll || this.props.isFocused ) {
			this.map.dragPan.enable();
			this.map.scrollZoom.enable();
		} else {
			this.map.dragPan.disable();
			this.map.scrollZoom.disable();
		}

	}

	onChange() {
		this.props.onChange( {
			zoom:    this.map.getZoom(),
			center:  this.map.getCenter().toArray(),
		} );
	}

	/**
	 * Add controls to map.
	 *
	 * These are shown/hidden in CSS depending on focus.
	 */
	addControls() {

		this.controls = {};

		this.controls.geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
		this.map.addControl( this.controls.geocoder, 'top-right' );

		this.controls.nav = new mapboxgl.NavigationControl();
		this.map.addControl( this.controls.nav, 'top-right' );

		this.controls.geolocate = new mapboxgl.GeolocateControl({
			positionOptions: { enableHighAccuracy: true },
			trackUserLocation: true
		});
		this.map.addControl( this.controls.geolocate, 'top-right' );

	}

}

Map.defaultProps = {
	token: mattheuGbMapTestData.mapboxKey,
	isFocused: false,
	align: undefined,
	height: undefined,
	center: [ 0, 20 ],
	zoom: 0.75,
	style: 'outdoors',
	allowScroll: false,
	onChange: () => { console.log( this.props ) },
};
