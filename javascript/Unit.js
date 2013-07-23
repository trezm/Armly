
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

Unit.prototype.addOptionGroup = function( optionGroup ) {
	this.options.push( optionGroup );
}

Unit.prototype.setUnitSize = function( newSize ) {
	if ( newSize < this.maxSize + 1 && newSize > this.minSize - 1 ) {
		this.currentSize = newSize;
	}
};

Unit.prototype.toJSON = function() {
	var optionsGroupList = []

	for ( var i = 0; i < this.options.list; i++ ) {
		optionsGroupList.push( this.options[ i ].toJSON() );
	}

	return {
		"name":this.name,
		"stats":this.stats,
		"minSize":this.minSize,
		"maxSize":this.maxSize,
		"currentSize":this.currentSize,
		"cost":this.cost,
		"options":optionsGroupList
	}
}