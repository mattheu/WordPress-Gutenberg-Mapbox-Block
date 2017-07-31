const Editable = wp.blocks.Editable;
const __ = wp.i18n.__;

import objectDefaults from 'lodash/defaults';

export default class Marker {

	constructor( args, onChange ) {
		this.args = objectDefaults( args, {
			lngLat: [ 0, 0 ],
			title: '',
			text: '',
		} );

		this.onChange = onChange;
	}

	addToMap( map ) {

		let el = window.document.createElement('div');

		this.popup = new mapboxgl.Popup()
			.setLngLat( this.args.lngLat )
			.setDOMContent( ReactDOM.render( <div>Foo</div>, window.document.createElement('div') ) )
			.setDOMContent( ReactDOM.render( <div>
				<Editable
					key="title"
					tagName="h3"
					className="gb-map-test-popup-title"
					value={ this.args.title }
					onChange={ ( value ) => {
						this.args.title = value;
						this.onChange( this.args );
					} }
					placeholder={ __( 'Popup title' ) }
				/>
				<Editable
					key="text"
					tagName="p"
					className="gb-map-test-popup-text"
					value={ this.args.text.trim() }
					onChange={ ( value ) => {
						this.args.text = value;
						this.onChange( this.args );
					} }
					placeholder={ __( 'Popup text' ) }
				/>
				<button onClick={ () => { this.onChange( 'delete' ) } }>Remove</button>
			</div>, el ) )
			.addTo( map );

		let markerEL = document.createElement('div');
		markerEL.className = 'gb-map-test-marker';

		this.marker = new mapboxgl.Marker( markerEL )
			.setLngLat( this.args.lngLat )
			.addTo( map )
			.setPopup( this.popup );

	}

}
