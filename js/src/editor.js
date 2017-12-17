import Map from './components/Map'
import mapStyles from './utils/map'
import _get from 'lodash/get';

const {
	registerBlockType,
	BlockControls,
	InspectorControls,
	BlockDescription,
	Editable,
	BlockAlignmentToolbar,
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

	attributes: {
        align: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-align',
            selector: '.gb-map-test-map-container',
        },
        height: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-height',
            selector: '.gb-map-test-map-container',
            default: 'small',
        },
        mapStyle: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-map-style',
            selector: '.gb-map-test-map-container',
            default: 'outdoors',
        },
        mapCenter: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-map-center',
            selector: '.gb-map-test-map-container',
            default: '0,20',
        },
        mapZoom: {
            type: 'number',
            source: 'attribute',
            attribute: 'data-map-zoom',
            selector: '.gb-map-test-map-container',
            default: 20,
        },
        mapScroll: {
            type: 'boolean',
            source: 'attribute',
            attribute: 'data-map-scroll',
            selector: '.gb-map-test-map-container',
            default: false,
        }
	},

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
		const { align, height, mapZoom, mapStyle, mapAllowScroll, caption } = attributes;
		const mapCenter = attributes.mapCenter.split(',');

		const onChangeMap = ( settings ) => {
			setAttributes( {
				mapZoom: settings.zoom,
				mapCenter: settings.center.join(','),
			});
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
				<BlockAlignmentToolbar
					value={ align }
					onChange={ onChangeAlign }
					controls={ [ 'left', 'right', 'center', 'wide', 'full' ] }
				/>
		 	</BlockControls> ),
			focus && ( <InspectorControls key="inspector">
				<BlockDescription>
					<p>{ __( 'Mapbox Map Block.' ) }</p>
				</BlockDescription>
				<h3>{ __( 'Map Settings' ) }</h3>
				<SelectControl
					label={ __( 'Map style.' ) }
					options={ mapStyles.getOptions() }
					onChange={ ( value ) => { setAttributes( { mapStyle: value } ); } }
					value={ mapStyle }
				/>
				<SelectControl
					label={ __( 'Map height.' ) }
					options={ [ { label: __( 'Small' ), 'value': 'small' }, { label: __( 'Medium' ), 'value': 'medium' }, { label: __( 'Large' ), 'value': 'large' } ] }
					onChange={ ( value ) => { setAttributes( { height: value } ); } }
					selected={ height }
				/>
				<ToggleControl
					label={ __( 'Allow user scroll and zoom?' ) }
					checked={ !! mapAllowScroll }
					onChange={ toggleMapAllowZoom }
				/>
			</InspectorControls> ),
			<figure
				className="gb-map-test"
				key="mapContainer"
				data-focused={ focus ? true : false }
			>
				<Map
					align={ align }
					height={ height }
					isFocused={ focus }
					onChange={ onChangeMap }
					zoom={ mapZoom }
					center={ mapCenter }
					style={ mapStyle }
					allowScroll={ mapAllowScroll }
				/>
				{ ( caption && caption.length > 0 ) || !! focus ? (
					<Editable
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
				data-align={ _get( attributes, 'align' ) }
				data-height={ _get( attributes, 'height', 'small' ) }
				data-map-style={ _get( attributes, 'mapStyle', 'light' ) }
				data-map-scroll={ _get( attributes, 'mapAllowScroll', false ) }
				data-map-center={ _get( attributes, 'mapCenter' ) }
				data-map-zoom={ _get( attributes, 'mapZoom' ) }
			></div>
			{ ( attributes.caption && attributes.caption.length ) ?
				<figcaption className="gb-map-test-caption">
					{ attributes.caption }
				</figcaption>
			: null }
		</figure>
	}
} );
