OPTION_NAME_PERCENTAGE = 20;
OPTION_FIELD_PERCENTAGE = 5;
OPTION_FONT_COLOR = "#FFFFFF";

function OptionMakerView( makerViewController, optionGroupMakerView ) {
	this.makerViewController = makerViewController;
	this.optionGroupMakerView = optionGroupMakerView;
	this.min = 0;
	this.max = 0;
	this.optionName = "";
	this.cost = 0;
}

OptionMakerView.prototype.getDOMElement = function() {
	if ( this.domElement ) {
		return this.domElement;
	}

	this.domElement = document.createElement( 'div' );
	this.domElement.style.cssFloat = "right";
	return this.domElement;
};

// Drawing methods
// Overall refresh
OptionMakerView.prototype.refreshView = function() {
	// Clear all of the children
	this.domElement.innerHTML = '';

	// Draw all of the fields
	this.drawFields();
	this.drawDeleteButton();
}

// Draw the fields
OptionMakerView.prototype.drawFields = function() {
	// Add option name
	this.nameDiv = document.createElement( 'input' );
	this.nameDiv.style.color = OPTION_FONT_COLOR;
	this.nameDiv.style.cssFloat = "left";
	this.nameDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.nameDiv.style.width = OPTION_NAME_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.nameDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.nameDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.nameDiv.style.background = "#333333";
	this.nameDiv.value = this.optionName;
	this.nameDiv.setAttribute( 'title', "Option Name" );
	this.getDOMElement().appendChild( this.nameDiv );

	// Draw the min
	this.minDiv = document.createElement( 'input' );
	this.minDiv.style.color = OPTION_FONT_COLOR;
	this.minDiv.style.cssFloat = "left";
	this.minDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.minDiv.style.width = OPTION_FIELD_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.minDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.minDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.minDiv.style.background = "#333333";
	this.minDiv.value = this.min;
	this.minDiv.setAttribute( 'title', "Option Minimum" );
	this.getDOMElement().appendChild( this.minDiv );

	// Draw the max
	this.maxDiv = document.createElement( 'input' );
	this.maxDiv.style.color = OPTION_FONT_COLOR;
	this.maxDiv.style.cssFloat = "left";
	this.maxDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.maxDiv.style.width = OPTION_FIELD_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.maxDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.maxDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.maxDiv.style.background = "#333333";
	this.maxDiv.value = this.max;
	this.maxDiv.setAttribute( 'title', "Option Maximum" );
	this.getDOMElement().appendChild( this.maxDiv );

	// Draw the cost
	this.costDiv = document.createElement( 'input' );
	this.costDiv.style.color = OPTION_FONT_COLOR;
	this.costDiv.style.cssFloat = "left";
	this.costDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.costDiv.style.width = OPTION_FIELD_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.costDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.costDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.costDiv.style.background = "#333333";
	this.costDiv.value = this.cost;
	this.costDiv.setAttribute( 'title', "Option Cost" );
	this.getDOMElement().appendChild( this.costDiv );

	// Append last element to force a reflow
	var lastElement = document.createElement( 'div' );
	lastElement.style.clear = "both";
	this.getDOMElement().appendChild( lastElement );
}

OptionMakerView.prototype.drawDeleteButton = function() {
	this.removeOptionButton = document.createElement( 'input' );
	this.removeOptionButton.type = "button";
	this.removeOptionButton.style.cssFloat = "right";
	this.removeOptionButton.value = "-";
	this.removeOptionButton.style.className = "increase_button";
	this.removeOptionButton.makerView = this;
	this.removeOptionButton.onclick = function( e ) {
		this.makerView.removeOptionButtonPressed( e );
	};

	this.getDOMElement().appendChild( this.removeOptionButton );
}

// Button methods
OptionMakerView.prototype.removeOptionButtonPressed = function( e ) {
	this.optionGroupMakerView.removeOption( this );
}