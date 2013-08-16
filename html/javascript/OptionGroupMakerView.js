OPTION_GROUP_PERCENTAGE = 80;
OPTION_BUFFER = 4;
OPTION_GROUP_BORDER_COLOR = "#FFFFFF";
OPTION_RULE_FIELD_PERCENTAGE = 10;

function OptionGroupMakerView( makerViewController, unitMakerView ) {
	this.makerViewController = makerViewController;
	this.unitMakerView = unitMakerView;
	this.optionViews = [];
	this.groupName = "Option Group Name";
	this.maxConcurrent = 0
	this.ruleValue = 0;
	this.ruleIndex = 0;
}

OptionGroupMakerView.prototype.getDOMElement = function() {
	if ( this.domElement ) {
		return this.domElement;
	}

	this.domElement = document.createElement( 'div' );
	this.domElement.style.cssFloat = "right";
	this.domElement.style.width = OPTION_GROUP_PERCENTAGE + "%";
	this.domElement.style.margin = OPTION_BUFFER + "px " + OPTION_BUFFER + "px " + OPTION_BUFFER + "px 0px";
	this.domElement.style.border = "1px solid " + OPTION_GROUP_BORDER_COLOR;

	this.refreshView();

	return this.domElement;
};

// Button methods
OptionGroupMakerView.prototype.addOptionButtonPressed = function( e ) {
	this.unitMakerView.addOptionToOptionGroupView( this );
}

OptionGroupMakerView.prototype.ruleSelectorChanged = function( e ) {
	console.log( "Rule selector changed: " + this.shouldRuleFieldBeDisabled() );

	this.ruleFieldDiv.disabled = this.shouldRuleFieldBeDisabled();
}

// Draw methods
// Refresh
OptionGroupMakerView.prototype.refreshView = function() {
	// Clear all of the children
	this.domElement.innerHTML = '';

	// Draw the buttons
	this.drawAddOptionButton();
	this.drawGroupNameField();
	this.drawRuleTypeSelector();
	this.drawRuleTypeField();
	this.drawMaxConcurrentField();

	// Redraw all options
	for ( var i = 0; i < this.optionViews.length; i++ ) {
		this.drawOptionView( this.optionViews[ i ] );
	}
}

OptionGroupMakerView.prototype.drawOptionView = function( optionView ) {
	this.getDOMElement().appendChild( optionView.getDOMElement() );
	optionView.refreshView();
}

OptionGroupMakerView.prototype.drawAddOptionButton = function() {
	// Add Stat button
	this.addOptionButton = document.createElement( 'input' );
	this.addOptionButton.type = "button";
	this.addOptionButton.style.cssFloat = "left";
	this.addOptionButton.value = "Add Option";
	this.addOptionButton.style.className = "increase_button";
	this.addOptionButton.makerView = this;
	this.addOptionButton.onclick = function( e ) {
		this.makerView.addOptionButtonPressed( e );
	};

	this.getDOMElement().appendChild( this.addOptionButton );
}

OptionGroupMakerView.prototype.drawRuleTypeSelector = function() {
	this.ruleTypeSelector = document.createElement( 'select' );
	this.ruleTypeSelector.style.cssFloat = "left";
	this.ruleTypeSelector.makerView = this;
	this.ruleTypeSelector.onchange = function( e ) {
		this.makerView.ruleSelectorChanged( e );
	};

	// Add the options to the rule type selector
	for ( var k in Rules ) {
		var option = document.createElement( 'option' );
		option.textContent = Rules[ k ];

		this.ruleTypeSelector.appendChild( option );
	}

	this.ruleTypeSelector.selectedIndex = this.ruleIndex;
	this.getDOMElement().appendChild( this.ruleTypeSelector );
}

OptionGroupMakerView.prototype.drawRuleTypeField = function() {
	// Draw input field
	this.ruleFieldDiv = document.createElement( 'input' );
	this.ruleFieldDiv.style.color = OPTION_FONT_COLOR;
	this.ruleFieldDiv.style.cssFloat = "left";
	this.ruleFieldDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.ruleFieldDiv.style.width = OPTION_RULE_FIELD_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.ruleFieldDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.ruleFieldDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.ruleFieldDiv.style.background = "#333333";
	this.ruleFieldDiv.value = this.ruleValue;
	this.ruleFieldDiv.setAttribute( 'title', "Rule Value" );
	this.ruleFieldDiv.disabled = this.shouldRuleFieldBeDisabled();
	this.getDOMElement().appendChild( this.ruleFieldDiv );
}

OptionGroupMakerView.prototype.drawMaxConcurrentField = function() {
	// Draw input field
	this.maxConcurrentDiv = document.createElement( 'input' );
	this.maxConcurrentDiv.style.color = OPTION_FONT_COLOR;
	this.maxConcurrentDiv.style.cssFloat = "left";
	this.maxConcurrentDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.maxConcurrentDiv.style.width = OPTION_RULE_FIELD_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.maxConcurrentDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.maxConcurrentDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.maxConcurrentDiv.style.background = "#333333";
	this.maxConcurrentDiv.value = this.maxConcurrent;
	this.maxConcurrentDiv.setAttribute( 'title', "Option Group Maximum" );
	this.getDOMElement().appendChild( this.maxConcurrentDiv );
}

OptionGroupMakerView.prototype.drawGroupNameField = function() {
	// Draw input field
	this.groupNameDiv = document.createElement( 'input' );
	this.groupNameDiv.style.color = OPTION_FONT_COLOR;
	this.groupNameDiv.style.cssFloat = "left";
	this.groupNameDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.groupNameDiv.style.width = OPTION_RULE_FIELD_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.groupNameDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.groupNameDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.groupNameDiv.style.background = "#333333";
	this.groupNameDiv.value = this.groupName;
	this.groupNameDiv.setAttribute( 'title', "Option Maximum" );
	this.getDOMElement().appendChild( this.groupNameDiv );
}

// Check whether value field should be enabled/disabled
OptionGroupMakerView.prototype.shouldRuleFieldBeDisabled = function() {
	if ( this.ruleTypeSelector.selectedIndex == 1 ) {
		return null;
	} else {
		this.ruleFieldDiv.value = "";
		return 'disabled';
	}
}

// Getter/Setter methods
OptionGroupMakerView.prototype.addOption = function( option ) {
	var optionView = new OptionMakerView( this.makerViewMakerController, this );
	optionView.min = option.min;
	optionView.max = option.max;
	optionView.optionName = option.name;
	optionView.cost = option.cost;

	this.optionViews.push( optionView );
}

OptionGroupMakerView.prototype.removeOption = function( optionView ) {
	var optionIndex = -1;
	for ( var i = 0; i < this.optionViews.length; i++ ) {
		if ( this.optionViews[ i ] == optionView ) {
			this.optionViews.splice( i, 1 );
			optionIndex = i;
			break;
		}
	}

	this.unitMakerView.removeOptionFromOptionGroupView( optionIndex, this );
	this.refreshView();
}
