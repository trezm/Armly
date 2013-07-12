var TITLE_PERCENTAGE = 20;
var HEADER_COLOR = "#777777";
var STAT_COLOR = "#d6d6d6";
var NAME_COLOR = "#777777";

function UnitView( domElement, headers, units ) {
	this.domElement = domElement;
	this.headers = headers;
	this.units = units;
}

UnitView.prototype.addDomElements = function() {
	// Add just the unit names
	var unitNames = this.getDefaultDiv();
	unitNames.style.cssFloat = "left";
	unitNames.style.width = TITLE_PERCENTAGE + "%";
	unitNames.style.textAlign = "left";

	unitNames.appendChild( document.createElement( 'br' ) );
	for ( var i = 0; i < this.units.length; i++ ) {
		unitNames.appendChild( this.getDefaultName( this.units[ i ].name ) );
	}
	this.domElement.appendChild( unitNames );

	// Add the unit stats
	var widthPercentage = (100 - TITLE_PERCENTAGE) / this.headers.length;
	for ( var i = this.headers.length - 1; i > -1; i-- ) {
		var header = this.headers[ i ];

		var div = this.getDefaultDiv();
		div.style.width = widthPercentage + "%";

		div.appendChild( this.getDefaultHeader( header ) );
		for ( var j = 0; j < this.units.length; j++ ) {
			div.appendChild( this.getDefaultStat( this.units[ j ].stats[ i ] ) );
		}

		this.domElement.appendChild( div );
	}

	var lastElement = document.createElement( 'div' );
	lastElement.style.clear = "both";
	this.domElement.appendChild( lastElement );
};

UnitView.prototype.getDefaultDiv = function() {
	var div = document.createElement( 'div' );
	div.style.marginRight = "0px";
	div.style.marginTop = "10px";
	div.style.textAlign = "center";
	div.style.cssFloat = "right";

	return div;
};

UnitView.prototype.getDefaultHeader = function( headerString ) {
	var div = document.createElement( 'div' );
	div.innerHTML = headerString;
	div.style.color = HEADER_COLOR;

	return div;
};

UnitView.prototype.getDefaultStat = function( stat ) {
	var div = document.createElement( 'div' );
	div.innerHTML = stat;
	div.style.color = STAT_COLOR;

	return div
};

UnitView.prototype.getDefaultName = function( name ) {
	var div = document.createElement( 'div' );
	div.innerHTML = name;
	div.style.color = NAME_COLOR;

	return div
};

