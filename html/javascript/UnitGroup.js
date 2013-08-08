function UnitGroup( units, statHeaders, groupName, groupType ) {
	this.units = units;
	this.statHeaders = statHeaders;
	this.groupName = groupName;
	this.groupType = groupType;
}

UnitGroup.prototype.toJSON = function() {
	var	unitList = [];
	for ( var i = 0; i < this.units.length; i++ ) {
		unitList.push( this.units[ i ].toJSON() );
	}

	return {
		"units":unitList,
		"statHeaders":this.statHeaders,
		"groupName":this.groupName,
		"groupType":this.groupType
	}
};

UnitGroup.prototype.removeUnit = function( unit ) {
	for ( var i = 0; i < this.units.length; i++ ) {
		if ( this.units[ i ] == unit ) {
			this.units.splice( i, 1 );
			break;
		}
	}
}