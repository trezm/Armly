
// The model for a Unit.  Stats should include the relevant stats,
// Options should include various kit-out possibilities, along with
// the relevant rules.
function Unit( name, stats, options, minSize, maxSize, currentSize, cost ) {
	this.name = name;
	this.stats = stats;
	this.options = options;
	for ( var i = 0; i < this.options.length; i++ ) {
		this.options[ i ].setUnit( this );
	}

	this.minSize = minSize;
	this.maxSize = maxSize;
	this.currentSize = currentSize;
	this.cost = cost;
}

Unit.prototype.setUnitSize = function( newSize ) {
	if ( newSize < this.maxSize + 1 && newSize > this.minSize - 1 ) {
		this.currentSize = newSize;
	}
};