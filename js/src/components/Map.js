import React from 'react';
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import objectDefaults from 'lodash/defaults';
import mapStyles from './../utils/map'
import NewPointCtrl from './NewPointCtrl'
import MapMarker from '../utils/MapMarker'
import _find from 'lodash/find';

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

		this.map.addControl( new mapboxgl.AttributionControl({ compact: true }), 'bottom-right' );

		this.map.on( 'moveend', ( e ) => {
			this.props.onChange( {
				zoom: this.map.getZoom(),
				center: this.map.getCenter().toArray(),
			} );
		} );

		if ( this.props.allowScroll && ! this.userNav ) {
			this.userNav = new mapboxgl.NavigationControl();
			this.map.addControl( this.userNav, 'top-right' );
		}

		// Add existing markers.
		// Doing some hacky rendering of markers since we're mixing react and the mapbox-gl JS.
		// Defer to allow this react component to render before doing this..
		window.setTimeout( () => {
			this.props.markers.forEach( markerArgs => {
				let marker = new MapMarker( markerArgs, this.props.onChangeMarkers, this.props.onRemoveMarker );
				marker.addToMap( this.map );

				this._markers = this._markers || [];
				this._markers.push( marker );

				this.props.onChangeMarkers( this._markers.map( _marker => { return _marker.args } ) );
			} );
		} );

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

		if ( ! this.props.allowScroll ) {
			if ( this.props.isFocused ) {
				this.map.dragPan.enable();
				this.map.scrollZoom.enable();
			} else {
				this.map.dragPan.disable();
				this.map.scrollZoom.disable();
			}
		}

		this.toggleControls();
	}

	/**
	 * Toggle which map controls are visible.
	 *
	 * Some notes:
	 * Most controls are only visible when focused e.g. geolocation and geocoder.
	 * Navigation controls are visible unfocused if the allowScroll prop is true. Otherwise only for focused.
	 * Note focused and unfocused nav controls are actually different instances... because ordering these was tricky.
	 * New Point controller is a custom button. Adds a new marker at the current map center point.
	 *
	 * @return {[type]} [description]
	 */
	toggleControls() {

		if ( this.props.isFocused && ! this.geocoder ) {
			this.geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
			this.map.addControl( this.geocoder, 'top-right' );
		} else if ( ! this.props.isFocused && this.geocoder ) {
			this.map.removeControl( this.geocoder );
			delete this.geocoder;
		}

		if ( this.props.isFocused && ! this.nav ) {
			this.nav = this.nav ? this.nav : new mapboxgl.NavigationControl();
			this.map.addControl( this.nav, 'top-right' );
		} else if ( ! this.props.isFocused && this.nav ) {
			this.map.removeControl( this.nav );
			delete this.nav;
		}

		if ( this.props.isFocused && ! this.geolocate ) {
			this.geolocate = this.geolocate ? this.geolocate : new mapboxgl.GeolocateControl({
				positionOptions: { enableHighAccuracy: true },
				trackUserLocation: true
			});
			this.map.addControl( this.geolocate, 'top-right' );
		} else if ( ! this.props.isFocused && this.geolocate ) {
			this.map.removeControl( this.geolocate );
			delete this.geolocate;
		}

		if ( this.props.isFocused && ! this.newPointCtrl ) {
			this.newPointCtrl = new NewPointCtrl();
			// Custom click handler.
			this.newPointCtrl.onClickHandler = () => this.addNewMarker();
			this.map.addControl( this.newPointCtrl, 'bottom-right' );
		} else if ( ! this.props.isFocused && this.newPointCtrl ) {
			this.map.removeControl( this.newPointCtrl );
			delete this.newPointCtrl;
		}

		if ( ! this.props.isFocused && this.props.allowScroll && ! this.userNav ) {
			this.userNav = new mapboxgl.NavigationControl();
			this.map.addControl( this.userNav, 'top-right' );
		} else if ( this.props.isFocused && this.userNav ) {
			this.map.removeControl( this.userNav );
			delete this.userNav;
		}

	}

	addNewMarker( markerArgs ) {

		markerArgs = objectDefaults( markerArgs, {
			lngLat: this.map.getCenter(),
			title: '',
			text: '',
		} );

		let marker = new MapMarker( markerArgs, this.props.onChangeMarkers, this.props.onRemoveMarker );
		marker.addToMap( this.map );

		this._markers = this._markers || [];
		this._markers.push( marker );

		this.props.onChangeMarkers( this._markers.map( _marker => { return _marker.args } ) );
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
	markers: [],
	onChange: () => { console.log( this.props ) },
	onChangeMarkers: () => { console.log( this.props ) },
	onRemoveMarker: ( marker ) => { console.log( marker ) },
};
