import objectDefaults from 'lodash/defaults';
import mapStyles from './../utils/map'

export default class Map extends React.Component {
	render() {
		return <div className="mattheu-gb-map-test-map-container" ref="map"></div>;
	}

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

		console.log( this.map );

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
	}

	// Need to do this if we can't disable shouldComponentUpdate
	// as this prevents componentDidUpdate from firing.
	// componentWillReceiveProps( nextProps ) {
	// 	if ( nextProps.align !== this.props.align ) {
	// 		window.setTimeout( () => {
	// 			this.map.resize();
	// 		});
	// 	}
	// }
	// componentWillReceiveProps( nextProps ) {
	// 	console.log( 'componentWillReceiveProps', nextProps.style, this.props.style );
	// }

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

	toggleControls() {

		let btn = class {
			
		}

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

		if ( ! this.props.isFocused && this.props.allowScroll && ! this.userNav ) {
			this.userNav = new mapboxgl.NavigationControl();
			this.map.addControl( this.userNav, 'top-right' );
		} else if ( this.props.isFocused && this.userNav ) {
			this.map.removeControl( this.userNav );
			delete this.userNav;
		}

	}

	// I thought I needed this to prevent re-render...
	// but I think that if i'm not actually changing the dom, it won't.
	// shouldComponentUpdate() {
	// 	return false;
	// }
	//

	renderSearchBox() {
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
	onChange: () => { console.log( this.props.settings ) }
};
