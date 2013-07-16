var TITLE_PERCENTAGE = 20;
var OPTION_INSET = 10;
var HEADER_COLOR = "#777777";
var STAT_COLOR = "#d6d6d6";
var NAME_COLOR = "#777777";
var TOP_COLOR = "#555555";

function UnitView( domElement, headers, units, unitViewController ) {
	this.domElement = domElement;
	this.headers = headers;
	this.units = units;
	this.unitViewController = unitViewController;
}

UnitView.prototype.addDomElements = function() {
	// Create the total cost in the upper left and the unit count in
	// the upper right.
	var unitCost = 0;
	var unitSize = 0;

	var top = document.createElement( 'div' );
	top.style.width = "100%";
	top.style.cssFloat = "left";

	// Unit cost
	this.unitCostContainer = document.createElement( 'div' );
	this.unitCostContainer.style.cssFloat = "left";
	this.unitCostContainer.style.width = "50%";	
	this.unitCostContainer.style.color = TOP_COLOR;
	this.unitCostContainer.innerHTML = "Total Pts: " + unitCost;
	top.appendChild( this.unitCostContainer );

	this.increaseUnitSizeArray = [];
	this.decreaseUnitSizeArray = [];
	this.unitSizeArray = [];
	for ( var i = 0; i < this.units.length; i++ ) {
		var unitSizeParent = document.createElement( 'div' );
		// unitSizeParent.style.cssFloat = "left";

		// Create the unit size container and such
		var increaseUnitSize = document.createElement( 'input' );
		increaseUnitSize.type = "button";
		increaseUnitSize.style.cssFloat = "right";
		increaseUnitSize.value = "Increase";
		increaseUnitSize.unitView = this;
		increaseUnitSize.onclick = function( e ) {
			this.unitView.increaseUnitSize( e );
		}

		var decreaseUnitSize = document.createElement( 'input' );
		decreaseUnitSize.type = "button";
		decreaseUnitSize.style.cssFloat = "right";
		decreaseUnitSize.value = "Decrease";
		decreaseUnitSize.unitView = this;
		decreaseUnitSize.onclick = function( e ) {
			this.unitView.decreaseUnitSize( e );
		}

		var unitSizeContainer = document.createElement( 'div' );
		unitSizeContainer.style.cssFloat = "right";
		unitSizeContainer.style.color = TOP_COLOR;
		unitSizeContainer.style.paddingLeft = "10px";
		unitSizeContainer.style.paddingRight = "10px";
		unitSizeContainer.innerHTML = "Unit Size: " + unitSize;

		unitSizeParent.appendChild( unitSizeContainer );
		unitSizeParent.appendChild( decreaseUnitSize );
		unitSizeParent.appendChild( increaseUnitSize );
		top.appendChild( unitSizeParent );
		top.appendChild( document.createElement( 'br' ) );
		top.appendChild( document.createElement( 'br' ) );

		this.increaseUnitSizeArray.push( increaseUnitSize );
		this.decreaseUnitSizeArray.push( decreaseUnitSize );
		this.unitSizeArray.push( unitSizeContainer );
	}

	this.domElement.appendChild( top );

	// Add the unit container
	var unitContainer = document.createElement( 'div' );
	unitContainer.className = "unit";

	// Add just the unit names
	var unitNames = this.getDefaultDiv();
	unitNames.style.cssFloat = "left";
	unitNames.style.width = TITLE_PERCENTAGE + "%";
	unitNames.style.textAlign = "left";

	unitNames.appendChild( document.createElement( 'br' ) );
	for ( var i = 0; i < this.units.length; i++ ) {
		unitNames.appendChild( this.getDefaultName( this.units[ i ].name ) );
	}
	unitContainer.appendChild( unitNames );

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

		unitContainer.appendChild( div );
	}

	var lastElement = document.createElement( 'div' );
	lastElement.style.clear = "both";

	unitContainer.appendChild( lastElement );
	this.domElement.appendChild( unitContainer );
};

UnitView.prototype.increaseUnitSize = function( e ) {
	var unit;

	for ( var i = 0; i < this.units.length; i++ ) {
		unit = this.units[ i ];

		if ( e.target == this.increaseUnitSizeArray[ i ] ) {
			break;
		}
	}

	this.unitViewController.increaseUnitSize( unit );
};

UnitView.prototype.decreaseUnitSize = function( e ) {
	var unit;

	for ( var i = 0; i < this.units.length; i++ ) {
		unit = this.units[ i ];

		if ( e.target == this.decreaseUnitSizeArray[ i ] ) {
			break;
		}
	}

	this.unitViewController.decreaseUnitSize( unit );
};

UnitView.prototype.setUnitCost = function( unitCost ) {
	this.unitCostContainer.innerHTML = "Total Pts: " + unitCost;
};

UnitView.prototype.refreshUnitSize = function() {
	for ( var i = 0; i < this.units.length; i++ ) {
		var unit = this.units[ i ];
		this.unitSizeArray[ i ].innerHTML = "Unit Size: " + this.units[ i ].currentSize;
	}
}

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

