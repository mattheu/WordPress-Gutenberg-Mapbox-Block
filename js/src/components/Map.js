export default class Map extends React.Component {
	render() {

		let styles = {
			width: '100%',
			height: '400px',
		}

		return <div className="mattheu-gb-map-test-map-container" ref="map" style={ styles }></div>;
	}

	componentDidMount() {
		mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhldSIsImEiOiJlMDNjODAyNWIzOTE5MTk3ZTljODBlYzVjOGQzNDU5ZSJ9.U4AMvD0NzwPd7WUW-U0W4g';

		this.map = new mapboxgl.Map({
			container: this.refs.map,
			style: this.props.style,
			center: [-74.50, 40],
			zoom: 9,
		});
	}

	shouldComponentUpdate() {
		return false;
	}
}

Map.defaultProps = {
	name: 'Matt',
	style: 'mapbox://styles/mapbox/outdoors-v10',
	token: 'pk.eyJ1IjoibWF0dGhldSIsImEiOiJlMDNjODAyNWIzOTE5MTk3ZTljODBlYzVjOGQzNDU5ZSJ9.U4AMvD0NzwPd7WUW-U0W4g',
};
