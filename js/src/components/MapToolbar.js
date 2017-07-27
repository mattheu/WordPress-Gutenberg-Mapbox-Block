const {
	registerBlockType,
	query
} = wp.blocks;

// const BLOCK_ALIGNMENTS_CONTROLS = {
// 	center: {
// 		icon: 'align-center',
// 		title: __( 'Align center' ),
// 	},
// 	wide: {
// 		icon: 'align-wide',
// 		title: __( 'Wide width' ),
// 	},
// 	full: {
// 		icon: 'align-full-width',
// 		title: __( 'Full width' ),
// 	},
// };

export default class MapToolbar extends React.Component {

	render() {
		function applyOrUnset( align ) {
			return () => this.props.onChange( value === align ? undefined : align );
		}

		let btnClass = [ 'components-button', 'components-icon-button', 'components-toolbar__control' ];

		return <div className="editor-visual-editor__block-controls">
			<ul className="components-toolbar">
				<li><button type="button" className={ btnClass.join( ' ' ) }><svg ariaHidden="true" role="img" className="dashicon dashicons-align-center" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M3 5h14V3H3v2zm12 8V7H5v6h10zM3 17h14v-2H3v2z"></path></svg></button></li>
				<li><button type="button" className={ btnClass.join( ' ' ) }><svg ariaHidden="true" role="img" className="dashicon dashicons-align-wide" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M5 5h10V3H5v2zm12 8V7H3v6h14zM5 17h10v-2H5v2z"></path></svg></button></li>
				<li><button type="button" className={ btnClass.join( ' ' ) }><svg ariaHidden="true" role="img" className="dashicon dashicons-align-full-width" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M17 13V3H3v10h14zM5 17h10v-2H5v2z"></path></svg></button></li>
			</ul>
		</div>
	}
};
