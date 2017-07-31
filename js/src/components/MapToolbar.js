import React from 'react';

const {
	registerBlockType,
	query
} = wp.blocks;

const {
	Toolbar
} = wp.components;

const {
	__
} = wp.i18n;

const BLOCK_ALIGNMENTS_CONTROLS = {
	left: {
		icon: 'align-left',
		title: __( 'Align left' ),
	},
	center: {
		icon: 'align-center',
		title: __( 'Align center' ),
	},
	right: {
		icon: 'align-right',
		title: __( 'Align right' ),
	},
	wide: {
		icon: 'align-wide',
		title: __( 'Wide width' ),
	},
	full: {
		icon: 'align-full-width',
		title: __( 'Full width' ),
	},
};

// Custom toolbar component.
// This is just a clone of wp.components.toolbar as that wasn't working correctly. Its probably me though...
export default class MapToolbar extends React.Component {

	applyOrUnset( align ) {
		return () => this.props.onChange( this.props.value === align ? undefined : align );
	}

	render() {
		return <Toolbar
			controls={
				this.props.controls.map( control => {
					return {
						icon: BLOCK_ALIGNMENTS_CONTROLS[ control ].icon,
						title: BLOCK_ALIGNMENTS_CONTROLS[ control ].title,
						isActive: this.props.value === control,
						onClick: this.applyOrUnset( control ),
					};
				} )
			}
		/>
	}
}

MapToolbar.defaultProps = {
	onChange: ( align ) => { alert( align ) },
	value: undefined,
	controls: [ 'left', 'center', 'right' ],
};
