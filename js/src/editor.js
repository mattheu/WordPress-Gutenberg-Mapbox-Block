import Map from './components/Map'
import MapToolbar from './components/MapToolbar'
import mapStyles from './utils/map'

const {
	registerBlockType,
	BlockControls,
	InspectorControls,
	BlockDescription,
	Editable,
} = wp.blocks;

const {
	ToggleControl,
	SelectControl
} = wp.blocks.InspectorControls;

const { __ } = wp.i18n;

registerBlockType( 'mattheu/gb-map-test', {
	title: 'Map - Mapbox',
	icon: 'location-alt',
	category: 'layout',

	getEditWrapperProps( attributes ) {
		const { align, height } = attributes;
		let wrapperProps = {};

		if ( 'center' !== align ) {
			wrapperProps['data-align'] = align;
		}

		if ( 'medium' === height || 'large' === height ) {
			wrapperProps['data-height'] = height;
		}

		return wrapperProps;
	},

	edit( { attributes, setAttributes, focus } ) {
		const { align, height, mapZoom, mapCenter, mapStyle, mapAllowScroll, mapMarkers, caption } = attributes;

		const onChangeMap = ( settings ) => {
			setAttributes( {
				mapZoom: settings.zoom,
				mapCenter: settings.center,
			});
		}

		const onChangeMarkers = ( markers ) => {
			setAttributes( { mapMarkers: markers });
		}

		/**
		 * Change alignment handler.
		 *
		 * @param  string new alignment.
		 * @return null
		 */
		const onChangeAlign = ( newAlignment ) => {
			setAttributes( { align: newAlignment } );
		}

		/**
		 * Toggle User Scroll setting.
		 *
		 * @return null
		 */
		const toggleMapAllowZoom = () => {
			setAttributes( { mapAllowScroll: ! mapAllowScroll } );
		}

		return [
			!! focus && ( <BlockControls key="controls">
				<MapToolbar
					value={ align }
					onChange={ onChangeAlign }
					controls={ [ 'left', 'right', 'center', 'wide', 'full' ] }
				/>
		 	</BlockControls> ),
			focus && ( <InspectorControls key="inspector">
				<BlockDescription key="description">
					<p>{ __( 'Mapbox Map Block.' ) }</p>
				</BlockDescription>
				<h3>{ __( 'Map Settings' ) }</h3>
				<SelectControl
					key="mapStyle"
					label={ __( 'Map style.' ) }
					options={ mapStyles.getOptions() }
					onBlur={ ( value ) => { setAttributes( { mapStyle: value } ); } }
					onChange={ ( e ) => { setAttributes( { mapStyle: e.target.value } ); } }
					selected={ mapStyle }
				/>
				<SelectControl
					key="mapHeight"
					label={ __( 'Map height.' ) }
					options={ [ { label: __( 'Small' ), 'value': 'small' }, { label: __( 'Medium' ), 'value': 'medium' }, { label: __( 'Large' ), 'value': 'large' } ] }
					onBlur={ ( value ) => { setAttributes( { height: value } ); } }
					onChange={ ( e ) => { setAttributes( { height: e.target.value } ); } }
					selected={ height }
				/>
				<ToggleControl
					key="toggleControl"
					label={ __( 'Allow user scroll and zoom?' ) }
					checked={ !! mapAllowScroll }
					onChange={ toggleMapAllowZoom }
				/>
			</InspectorControls> ),
			<figure className="gb-map-test" key="mapContainer">
				<Map
					key="map"
					align={ align }
					height={ height }
					isFocused={ focus }
					onChange={ onChangeMap }
					onChangeMarkers={ onChangeMarkers }
					markers={ mapMarkers }
					zoom={ mapZoom }
					center={ mapCenter }
					style={ mapStyle }
					allowScroll={ mapAllowScroll }
				/>
				{ ( caption && caption.length > 0 ) || !! focus ? (
					<Editable
						key="editable"
						tagName="figcaption"
						className="gb-map-test-caption"
						placeholder={ __( 'Write caption…' ) }
						value={ caption }
						focus={ focus && focus.editable === 'caption' ? focus : undefined }
						onChange={ ( value ) => setAttributes( { caption: value } ) }
						inlineToolbar
					/>
				) : null }
			</figure>
		];
	},

	save( { attributes } ) {
		return <figure className="gb-map-test">
			<div
				className="gb-map-test-map-container"
				data-attributes={ JSON.stringify( attributes ) }
			></div>
			{ ( attributes.caption && attributes.caption.length ) ?
				<figcaption className="gb-map-test-caption">
					{ attributes.caption }
				</figcaption>
			: null }
		</figure>
	}
} );
