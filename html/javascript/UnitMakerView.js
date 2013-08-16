var UNIT_BORDER_COLOR = "#FFFFFF";
var UNIT_FONT_COLOR = "#FFFFFF";
var UNIT_TITLE_PERCENTAGE = 25;
var UNIT_MINMAX_PERCENTAGE = 7;
var UNIT_STAT_LEFT_MARGIN = 2;
var UNIT_STAT_RIGHT_MARGIN = 2;
var GENERAL_BUFFER = "5px";

function UnitMakerView( MakerViewController ) {
	this.makerViewController = MakerViewController;

	this.headerline = [];
	this.statlines = [];
	this.unitMinsAndMaxes = [];
	this.optionGroupViews = [];
	this.costs = [];

	// These arrays will keep the text fields
	this.unitNames = [];
	// Array of arrays
	this.unitStats = [];
	this.unitHeaders = [];
	this.unitOptionGroups = [];
	this.unitMins = [];
	this.unitMaxes = [];
	this.unitCosts = [];

	this.groupName = "???";
	this.groupType = "Troops";
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

UnitMakerView.prototype.addUnitButtonPressed = function( e ) {
	this.makerViewController.addUnitToUnitView( this );
}

UnitMakerView.prototype.removeUnitButtonPressed = function( e ) {
	this.makerViewController.removeUnitFromUnitView( this );
}

UnitMakerView.prototype.addOptionGroupButtonPressed = function( e ) {
	this.makerViewController.addOptionGroupToUnitView( this );
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

UnitMakerView.prototype.removeStatLine = function() {
	this.statlines.splice( this.statlines.length - 1, 1 );
}

UnitMakerView.prototype.addMinMax = function( minMax ) {
	this.unitMinsAndMaxes.push( minMax );
}

UnitMakerView.prototype.removeMinMax = function() {
	this.unitMinsAndMaxes.splice( this.unitMinsAndMaxes.length - 1, 1 );
}

UnitMakerView.prototype.addCost = function( cost ) {
	this.costs.push( cost );
}

UnitMakerView.prototype.removeCost = function() {
	this.costs.splice( this.costs.length - 1, 1 );
}

UnitMakerView.prototype.addOptionGroup = function( optionGroup ) {
	var optionGroupMakerView = new OptionGroupMakerView( this.makerViewMakerController, this );

	this.optionGroupViews.push( optionGroupMakerView );
}

// Refresh view, called when data has been changed.
UnitMakerView.prototype.refreshView = function() {
	console.log( "Refreshing view..." );
	console.log( "Headers: " + this.headerline );

	// Clear all of the children
	this.getDOMElement().innerHTML = '';

	// Redraw add buttons
	var buttonDiv = document.createElement( 'div' );
	buttonDiv.style.width = "100%";
	buttonDiv.style.background = "#000000";

	this.drawAddStatButton( buttonDiv );
	this.drawAddUnitButton( buttonDiv );
	this.drawRemoveUnitButton( buttonDiv );
	this.drawGroupNameField( buttonDiv );
	this.drawGroupTypeField( buttonDiv );

	// // Append last element to force a reflow
	// var lastElement = document.createElement( 'div' );
	// lastElement.style.clear = "both";
	// buttonDiv.appendChild( lastElement );
	this.forceReflow( buttonDiv );
	this.getDOMElement().appendChild( buttonDiv );

	// Redraw headers
	this.unitHeaders = [];
	if ( this.headerline.length > 0 ) {
		this.drawStatHeaders( this.headerline );
	}
	this.drawMinMaxHeaders();
	this.drawCostHeader();
	this.forceReflow( this.getDOMElement() );

	// Redraw stat lines
	this.unitStats = [];
	this.unitNames = [];
	this.unitMins = [];
	this.unitMaxes = [];
	this.unitCosts = [];
	for ( var i = 0; i < this.statlines.length; i++ ) {
		this.drawUnitName( this.statlines[ i ] );
		this.drawStatLine( this.statlines[ i ] );
		this.drawMinMaxFields( this.unitMinsAndMaxes[ i ] );
		this.drawCostField( this.costs[ i ] );
		this.forceReflow( this.getDOMElement() );
	}

	// Redraw add option group button
	this.drawAddOptionGroup();

	// Redraw all option groups
	this.unitOptionGroups = [];
	for ( var i = 0; i < this.optionGroupViews.length; i++ ) {
		this.drawOptionGroup( this.optionGroupViews[ i ] );
	}
}

// Callback for options
UnitMakerView.prototype.addOptionToOptionGroupView = function( optionGroupView ) {
	this.makerViewController.addOptionToOptionGroupInUnitView( this, optionGroupView );
}

UnitMakerView.prototype.removeOptionFromOptionGroupView = function( optionIndex, optionGroupView ) {
	this.makerViewController.removeOptionFromOptionGroupInUnitView( optionIndex, this, optionGroupView );
}

// Drawing methods
UnitMakerView.prototype.drawAddStatButton = function( parentDiv ) {
	if ( !parentDiv ) {
		parentDiv = this.getDOMElement();
	}

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

	parentDiv.appendChild( addStatButton );
}

UnitMakerView.prototype.drawAddUnitButton = function( parentDiv ) {
	if ( !parentDiv ) {
		parentDiv = this.getDOMElement();
	}

	// Add the "add unit type" button
	var addUnitButton = document.createElement( "input" );
	addUnitButton.type = "button";
	addUnitButton.style.cssFloat = "left";
	addUnitButton.value = "Add Unit";
	addUnitButton.makerView = this;
	addUnitButton.onclick = function( e ) {
		this.makerView.addUnitButtonPressed( e );
	}

	parentDiv.appendChild( addUnitButton );
}

UnitMakerView.prototype.drawRemoveUnitButton = function( parentDiv ) {
	if ( !parentDiv ) {
		parentDiv = this.getDOMElement();
	}

	// Add the "add unit type" button
	var removeUnitButton = document.createElement( "input" );
	removeUnitButton.type = "button";
	removeUnitButton.style.cssFloat = "left";
	removeUnitButton.value = "Remove Unit";
	removeUnitButton.makerView = this;
	removeUnitButton.onclick = function( e ) {
		this.makerView.removeUnitButtonPressed( e );
	}

	parentDiv.appendChild( removeUnitButton );
}

UnitMakerView.prototype.drawGroupNameField = function( parentDiv ) {
	if ( !parentDiv ) {
		parentDiv = this.getDOMElement();
	}

	// Add unit name
	this.groupNameDiv = document.createElement( 'input' );
	this.groupNameDiv.style.color = UNIT_FONT_COLOR;
	this.groupNameDiv.style.cssFloat = "left";
	this.groupNameDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.groupNameDiv.style.width = UNIT_TITLE_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.groupNameDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.groupNameDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.groupNameDiv.style.background = "#333333";
	this.groupNameDiv.setAttribute( 'title', "Enter the unit's name here." );
	this.groupNameDiv.value = this.groupName;
	parentDiv.appendChild( this.groupNameDiv );
}

UnitMakerView.prototype.drawGroupTypeField = function( parentDiv ) {
	if ( !parentDiv ) {
		parentDiv = this.getDOMElement();
	}

	// Add unit name
	this.groupTypeDiv = document.createElement( 'input' );
	this.groupTypeDiv.style.color = UNIT_FONT_COLOR;
	this.groupTypeDiv.style.cssFloat = "left";
	this.groupTypeDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.groupTypeDiv.style.width = UNIT_TITLE_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.groupTypeDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.groupTypeDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.groupTypeDiv.style.background = "#333333";
	this.groupTypeDiv.setAttribute( 'title', "Enter the unit's classification here." );
	this.groupTypeDiv.value = this.groupType;
	parentDiv.appendChild( this.groupTypeDiv );
}

UnitMakerView.prototype.drawAddOptionGroup = function() {
	// Add the "add option group" button
	var addOptionGroupButton = document.createElement( "input" );
	addOptionGroupButton.type = "button";
	addOptionGroupButton.style.cssFloat = "left";
	addOptionGroupButton.value = "Add Option Group";
	addOptionGroupButton.makerView = this;
	addOptionGroupButton.onclick = function( e ) {
		this.makerView.addOptionGroupButtonPressed( e );
	}

	this.domElement.appendChild( addOptionGroupButton );
}

UnitMakerView.prototype.drawStatHeaders = function( headers ) {
	var unitStatPercentage = (100 - UNIT_TITLE_PERCENTAGE - UNIT_MINMAX_PERCENTAGE * 2) / headers.length;

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
		this.unitHeaders.push( headerDiv );
	}

	// // Append last element to force a reflow
	// var lastElement = document.createElement( 'div' );
	// lastElement.style.clear = "both";
	// this.getDOMElement().appendChild( lastElement );
}

UnitMakerView.prototype.drawMinMaxHeaders = function() {
	this.maxDiv = document.createElement( 'div' );
	this.maxDiv.style.color = UNIT_FONT_COLOR;
	this.maxDiv.style.cssFloat = "right";
	this.maxDiv.style.width = UNIT_MINMAX_PERCENTAGE - UNIT_STAT_LEFT_MARGIN - UNIT_STAT_RIGHT_MARGIN + "%";
	this.maxDiv.style.textAlign = "center";
	this.maxDiv.style.marginLeft = "calc(" + UNIT_STAT_LEFT_MARGIN + "% - 1px)";
	this.maxDiv.style.marginRight = "calc(" + UNIT_STAT_RIGHT_MARGIN + "% - 1px)";
	this.maxDiv.style.textAlign = "center";
	this.maxDiv.style.background = "#333333";
	this.maxDiv.innerHTML = "max";

	this.getDOMElement().appendChild( this.maxDiv );
	this.minDiv = document.createElement( 'div' );
	this.minDiv.style.color = UNIT_FONT_COLOR;
	this.minDiv.style.cssFloat = "right";
	this.minDiv.style.width = UNIT_MINMAX_PERCENTAGE - UNIT_STAT_LEFT_MARGIN - UNIT_STAT_RIGHT_MARGIN + "%";
	this.minDiv.style.textAlign = "center";
	this.minDiv.style.marginLeft = "calc(" + UNIT_STAT_LEFT_MARGIN + "% - 1px)";
	this.minDiv.style.marginRight = "calc(" + UNIT_STAT_RIGHT_MARGIN + "% - 1px)";
	this.minDiv.style.textAlign = "center";
	this.minDiv.style.background = "#333333";
	this.minDiv.innerHTML = "min";

	this.getDOMElement().appendChild( this.minDiv );
}

UnitMakerView.prototype.drawCostHeader = function() {
	this.costDiv = document.createElement( 'div' );
	this.costDiv.style.color = UNIT_FONT_COLOR;
	this.costDiv.style.cssFloat = "right";
	this.costDiv.style.width = UNIT_MINMAX_PERCENTAGE - UNIT_STAT_LEFT_MARGIN - UNIT_STAT_RIGHT_MARGIN + "%";
	this.costDiv.style.textAlign = "center";
	this.costDiv.style.marginLeft = "calc(" + UNIT_STAT_LEFT_MARGIN + "% - 1px)";
	this.costDiv.style.marginRight = "calc(" + UNIT_STAT_RIGHT_MARGIN + "% - 1px)";
	this.costDiv.style.textAlign = "center";
	this.costDiv.style.background = "#333333";
	this.costDiv.innerHTML = "cost";
	this.costDiv.title = "Enter the price per model here.";

	this.getDOMElement().appendChild( this.costDiv );
}

UnitMakerView.prototype.drawMinMaxFields = function( minMaxDict ) {
	var maxDiv = document.createElement( 'input' );
	maxDiv.style.color = UNIT_FONT_COLOR;
	maxDiv.style.cssFloat = "right";
	maxDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	maxDiv.style.width = UNIT_MINMAX_PERCENTAGE - UNIT_STAT_LEFT_MARGIN - UNIT_STAT_RIGHT_MARGIN + "%";
	maxDiv.style.textAlign = "center";
	maxDiv.style.marginLeft = "calc(" + UNIT_STAT_LEFT_MARGIN + "% - 2px)";
	maxDiv.style.marginRight = "calc(" + UNIT_STAT_RIGHT_MARGIN + "% - 2px)";
	maxDiv.style.textAlign = "center";
	maxDiv.style.background = "#333333";
	maxDiv.value = minMaxDict.max;

	this.getDOMElement().appendChild( maxDiv );
	this.unitMaxes.push( maxDiv );

	var minDiv = document.createElement( 'input' );
	minDiv.style.color = UNIT_FONT_COLOR;
	minDiv.style.cssFloat = "right";
	minDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
    minDiv.style.width = UNIT_MINMAX_PERCENTAGE - UNIT_STAT_LEFT_MARGIN - UNIT_STAT_RIGHT_MARGIN + "%";
    minDiv.style.textAlign = "center";
	minDiv.style.marginLeft = "calc(" + UNIT_STAT_LEFT_MARGIN + "% - 2px)";
	minDiv.style.marginRight = "calc(" + UNIT_STAT_RIGHT_MARGIN + "% - 2px)";
	minDiv.style.textAlign = "center";
	minDiv.style.background = "#333333";
	minDiv.value = minMaxDict.min;

	this.getDOMElement().appendChild( minDiv );
	this.unitMins.push( minDiv );
}

UnitMakerView.prototype.drawCostField = function( cost ) {
	var costDiv = document.createElement( 'input' );
	costDiv.style.color = UNIT_FONT_COLOR;
	costDiv.style.cssFloat = "right";
	costDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	costDiv.style.width = UNIT_MINMAX_PERCENTAGE - UNIT_STAT_LEFT_MARGIN - UNIT_STAT_RIGHT_MARGIN + "%";
	costDiv.style.textAlign = "center";
	costDiv.style.marginLeft = "calc(" + UNIT_STAT_LEFT_MARGIN + "% - 2px)";
	costDiv.style.marginRight = "calc(" + UNIT_STAT_RIGHT_MARGIN + "% - 2px)";
	costDiv.style.textAlign = "center";
	costDiv.style.background = "#333333";
	costDiv.value = cost;

	this.getDOMElement().appendChild( costDiv );
	this.unitCosts.push( costDiv );
}

UnitMakerView.prototype.drawUnitName = function( statline ) {
	var unitName = statline.name;

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

	// Add to unit names
	this.unitNames.push( nameDiv );
}

UnitMakerView.prototype.drawStatLine = function( statline ) {
	var unitStats = statline.stats;

	// Add stat divs
	var unitStatArray = [];
	var unitStatPercentage = (100 - UNIT_TITLE_PERCENTAGE - UNIT_MINMAX_PERCENTAGE * 2) / unitStats.length;

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

		// Add to unit stat array
		unitStatArray.push( statDiv );
	}
	this.unitStats.push( unitStatArray );

	// // Append last element to force a reflow
	// var lastElement = document.createElement( 'div' );
	// lastElement.style.clear = "both";
	// this.getDOMElement().appendChild( lastElement );
}

UnitMakerView.prototype.drawOptionGroup = function( optionGroupView ) {
	this.getDOMElement().appendChild( optionGroupView.getDOMElement() );
	// optionGroupView.refreshView();

	var optionList = [];
	for ( var i = 0; i < optionGroupView.optionViews.length; i++ ) {
		var optionView = optionGroupView.optionViews[ i ];

		optionList.push( { "name":optionView.nameDiv,
						   "min":optionView.minDiv,
				    	   "max":optionView.maxDiv,
						   "cost":optionView.costDiv 
						 } 
					   );
	}
	this.unitOptionGroups.push( { "name":"",
								  "maxConcurrent":10,
								  "rule": {
								  	"type":optionGroupView.ruleTypeSelector,
								  	"value":optionGroupView.ruleFieldDiv
								  },
								  "options":optionList 
								} 
							  );
}

UnitMakerView.prototype.forceReflow = function( targetDiv ) {
	// Append last element to force a reflow
	var lastElement = document.createElement( 'div' );
	lastElement.style.clear = "both";
	targetDiv.appendChild( lastElement );
}