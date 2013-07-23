function UnitGroup( units, statHeaders ) {
	this.units = units;
	this.statHeaders = statHeaders;
}

UnitGroup.prototype.toJSON = function() {
	var	unitList = [];
	for ( var i = 0; i < this.units.length; i++ ) {
		unitList.push( this.units[ i ].toJSON() );
	}

	return {
		"units":unitList,
		"statHeaders":this.statHeaders
	}
};