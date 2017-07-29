import _find from 'lodash/find';
const __ = ( wp && wp.i18n ) ? wp.i18n.__ : ( string ) => { return string; } ;

const mapStyles = [
	{ name: 'streets',   url: 'mapbox://styles/mapbox/streets-v10',  label: __( 'Streets' ) },
	{ name: 'light',     url: 'mapbox://styles/mapbox/light-v9',     label: __( 'Light' ) },
	{ name: 'dark',      url: 'mapbox://styles/mapbox/dark-v9',      label: __( 'Dark' ) },
	{ name: 'outdoors',  url: 'mapbox://styles/mapbox/outdoors-v10', label: __( 'Outdoors' ) },
	{ name: 'satellite', url: 'mapbox://styles/mapbox/satellite-v9', label: __( 'Satellite' ) },
];

export default {
	getOptions: () => {
		return mapStyles.map( style => {
			return { label: style.label, value: style.name };
		} );
	},

	getUrl: ( style ) => {
		let data = _find( mapStyles, { 'name': style } );
		return data ? data.url : mapStyles[ Object.keys( mapStyles )[0] ];
	}
}
