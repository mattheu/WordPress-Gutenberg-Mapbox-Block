const {
	registerBlockType,
	query
} = wp.blocks;

import Map from './components/Map'
import MapToolbar from './components/MapToolbar'

registerBlockType( 'mattheu/gb-map-test', {
	title: 'Matts Test Map',

	icon: 'universal-access-alt',

	category: 'layout',

	// edit() {
	// 	return <Map name="Kate"/>;
	// },

	edit( { attributes, setAttributes, focus } ) {
		const { content, alignment } = attributes;

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangeAlignment( newAlignment ) {
			setAttributes( { alignment: newAlignment } );
		}

		return [
			!! focus && ( <MapToolbar /> ),
			<Map />
		];
	},

	save() {
		return <p>Hello saved content.</p>;
	},
} );
