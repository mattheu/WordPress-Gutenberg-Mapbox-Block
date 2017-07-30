export default class Btn {}

Btn.prototype.onAdd = function( map ) {
	this._map = map;
	this._container = document.createElement( 'div' );
	this._container.className   = 'mapboxgl-ctrl mapboxgl-ctrl-group';
	ReactDOM.render(
		<button onClick={ () => { this.onClickHandler(); } }>New</button>,
		this._container
	);
	return this._container;
};

Btn.prototype.onRemove = function() {
	this._container.parentNode.removeChild( this._container );
	this._map = undefined;
};
