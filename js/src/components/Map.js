const mapStyles = {
	streets: 'mapbox://styles/mapbox/streets-v10',
	light: 'mapbox://styles/mapbox/light-v9',
	dark: 'mapbox://styles/mapbox/dark-v9',
	outdoors: 'mapbox://styles/mapbox/outdoors-v10',
	satellite: 'mapbox://styles/mapbox/satellite-v9',
}

import objectDefaults from 'lodash/defaults';

export default class Map extends React.Component {
	render() {
		return <div className="mattheu-gb-map-test-map-container" ref="map"></div>;
	}

	componentDidMount() {
		mapboxgl.accessToken = this.props.token;

		// let settings = this.getSettings();

		this.map = new mapboxgl.Map({
			container: this.refs.map,
			style: this.getMapStyleUrl( this.props.style ),
			center: this.props.center,
			zoom: this.props.zoom,
			scrollZoom: this.props.allowScroll,
			dragPan: this.props.allowScroll,
			dragRotate: false,
			pitchWithRotate: false,
		});

		this.map.on( 'moveend', ( e ) => {
			this.props.zoom = this.map.getZoom();
			this.props.center = this.map.getCenter().toArray();
			this.props.onChange( {
				zoom: this.props.zoom,
				center: this.props.center,
			} );
		} );
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
			this.map.setStyle( this.getMapStyleUrl( this.props.style ) );
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
	}

	getMapStyleUrl( style ) {
		return ( style in mapStyles ) ? mapStyles[ style ] : mapStyles[ Object.keys( mapStyles )[0] ];
	}

	// I thought I needed this to prevent re-render...
	// but I think that if i'm not actually changing the dom, it won't.
	// shouldComponentUpdate() {
	// 	return false;
	// }
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
