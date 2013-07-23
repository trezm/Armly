var UNIT_BORDER_COLOR = "#FFFFFF";
var UNIT_FONT_COLOR = "#FFFFFF";
var UNIT_TITLE_PERCENTAGE = 20
var UNIT_STAT_LEFT_MARGIN = 2
var UNIT_STAT_RIGHT_MARGIN = 2
var GENERAL_BUFFER = "5px"

function UnitMakerView( MakerViewController ) {
	this.makerViewController = MakerViewController;

	this.headerline = [];
	this.statlines = [];
}

UnitMakerView.prototype.getDOMElement = function() {
	if ( this.domElement ) {
		return this.domElement;
	}

	// Create the initial container
	this.domElement = document.createElement( 'div' );
	this.domElement.style.marginBottom = "10px";
	this.domElement.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.domElement.style.color = UNIT_FONT_COLOR;

	return this.domElement;
};

// Callback methods for buttons
UnitMakerView.prototype.addStatButtonPressed = function( e ) {
	this.makerViewController.addStatToUnitView( this );
}

// Methods for adding the default stats/headers
UnitMakerView.prototype.addStatHeaders = function( headers ) {
	this.headerline = this.headerline.concat( headers );

	// Add 0 for any extra header not already in the stat line
	for ( var i = 0; i < this.statlines.length; i++ ) {
		for ( var j = this.statlines[ i ].stats.length; j < this.headerline.length; j++ ) {
			this.statlines[ i ].stats.push( 0 );
		}
	}
}

UnitMakerView.prototype.addStatLine = function( statline ) {
	this.statlines.push( statline );
}

// Refresh view, called when data has been changed.
UnitMakerView.prototype.refreshView = function() {
	console.log( "Refreshing view..." );
	console.log( "Headers: " + this.headerline );

	// Clear all of the children
	this.domElement.innerHTML = '';

	// Redraw add stat button
	this.drawAddStatButton();

	// Redraw headers
	if ( this.headerline.length > 0 ) {
		this.drawStatHeaders( this.headerline );
	}

	// Redraw stat lines
	for ( var i = 0; i < this.statlines.length; i++ ) {
		this.drawStatLine( this.statlines[ i ] );
	}
}

// Drawing methods
UnitMakerView.prototype.drawAddStatButton = function() {
	// Add Stat button
	var addStatButton = document.createElement( 'input' );
	addStatButton.type = "button";
	addStatButton.style.cssFloat = "left";
	addStatButton.value = "Add Stat";
	addStatButton.style.className = "increase_button";
	addStatButton.makerView = this;
	addStatButton.onclick = function( e ) {
		this.makerView.addStatButtonPressed( e );
	};

	this.domElement.appendChild( addStatButton );
}


UnitMakerView.prototype.drawStatHeaders = function( headers ) {
	var unitStatPercentage = (100 - UNIT_TITLE_PERCENTAGE) / headers.length;

	// Add header divs
	for ( var i = headers.length - 1; i >= 0; i-- ) {
		var headerString = headers[ i ];

		var headerDiv = document.createElement( 'input' );
		headerDiv.style.color = UNIT_FONT_COLOR;
		headerDiv.style.cssFloat = "right";
		headerDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
		headerDiv.style.width = unitStatPercentage - UNIT_STAT_LEFT_MARGIN - UNIT_STAT_RIGHT_MARGIN + "%";
		headerDiv.style.textAlign = "center";
		headerDiv.style.marginLeft = "calc(" + UNIT_STAT_LEFT_MARGIN + "% - 1px)";
		headerDiv.style.marginRight = "calc(" + UNIT_STAT_RIGHT_MARGIN + "% - 1px)";
		headerDiv.style.textAlign = "center";
		headerDiv.style.background = "#333333";
		headerDiv.value = headerString;

		this.getDOMElement().appendChild( headerDiv );

	}

	// Append last element to force a reflow
	var lastElement = document.createElement( 'div' );
	lastElement.style.clear = "both";
	this.getDOMElement().appendChild( lastElement );
}

UnitMakerView.prototype.drawStatLine = function( statline ) {
	var unitName = statline.name;
	var unitStats = statline.stats;

	// Add unit name
	var nameDiv = document.createElement( 'input' );
	nameDiv.style.color = UNIT_FONT_COLOR;
	nameDiv.style.cssFloat = "left";
	nameDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	nameDiv.style.width = UNIT_TITLE_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	nameDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	nameDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	nameDiv.style.background = "#333333";
	nameDiv.value = unitName;
	this.getDOMElement().appendChild( nameDiv );

	// Add stat divs
	var unitStatPercentage = (100 - UNIT_TITLE_PERCENTAGE) / unitStats.length;
	for (  var i = unitStats.length - 1; i >= 0; i--  ) {
		var statString = unitStats[ i ];

		var statDiv = document.createElement( 'input' );
		statDiv.type = "text";

		statDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
		statDiv.style.color = UNIT_FONT_COLOR;
		statDiv.style.cssFloat = "right";
		statDiv.style.width = unitStatPercentage - UNIT_STAT_LEFT_MARGIN - UNIT_STAT_RIGHT_MARGIN + "%";
		statDiv.style.textAlign = "center";
		statDiv.style.marginLeft = "calc(" + UNIT_STAT_LEFT_MARGIN + "% - 1px)";
		statDiv.style.marginRight = "calc(" + UNIT_STAT_RIGHT_MARGIN + "% - 1px)";
		statDiv.value = statString;

		statDiv.style.background = "#333333";


		this.getDOMElement().appendChild( statDiv );
	}

	// Append last element to force a reflow
	var lastElement = document.createElement( 'div' );
	lastElement.style.clear = "both";
	this.getDOMElement().appendChild( lastElement );
}