UNIT_MAKER_CONTAINER_WIDTH = 80;

function MakerViewController( domElement ) {
	this.domElement = domElement;

	this.unitGroups = [];
	this.unitMakerViews = [];
	this.unitOptionGroups = [];
}

MakerViewController.prototype.loadDOM = function() {
	// Add in the button to add a unit view
	var addUnitGroupButton = document.createElement( 'input' );
	addUnitGroupButton.type = "button";
	addUnitGroupButton.style.cssFloat = "right";
	addUnitGroupButton.value = "+";
	addUnitGroupButton.style.className = "increase_button";
	addUnitGroupButton.makerViewController = this;
	addUnitGroupButton.onclick = function( e ) {
		this.makerViewController.addUnitGroupButtonClicked( e );
	};

	// Add in the save button
	var saveListButton = document.createElement( "input" );
	saveListButton.type = "button";
	saveListButton.style.cssFloat = "right";
	saveListButton.value = "Save";
	saveListButton.makerViewController = this;
	saveListButton.onclick = function( e ) {
		this.makerViewController.saveCurrentListButtonClicked( e );
	}

	// Add the username and list name fields
	this.userNameDiv = document.createElement( 'input' );
	this.userNameDiv.style.color = UNIT_FONT_COLOR;
	this.userNameDiv.style.cssFloat = "left";
	this.userNameDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.userNameDiv.style.width = UNIT_TITLE_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.userNameDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.userNameDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.userNameDiv.style.background = "#333333";
	this.userNameDiv.style.marginBottom = "10px";
	this.userNameDiv.setAttribute( 'title', "Enter the unit's name here." );
	this.userNameDiv.value = "";

	this.listNameDiv = document.createElement( 'input' );
	this.listNameDiv.style.color = UNIT_FONT_COLOR;
	this.listNameDiv.style.cssFloat = "left";
	this.listNameDiv.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.listNameDiv.style.width = UNIT_TITLE_PERCENTAGE - 2 * GENERAL_BUFFER + "%"
	this.listNameDiv.style.marginLeft = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.listNameDiv.style.marginRight = "calc(" + GENERAL_BUFFER + " - 1px)";
	this.listNameDiv.style.background = "#333333";
	this.listNameDiv.style.marginBottom = "10px";	
	this.listNameDiv.setAttribute( 'title', "Enter this list's name here." );
	this.listNameDiv.value = "";
	
	this.domElement.appendChild( this.userNameDiv );
	this.domElement.appendChild( this.listNameDiv );

	this.domElement.appendChild( addUnitGroupButton );
	this.domElement.appendChild( saveListButton );

	this.domElement.controller = this;
	this.domElement.onkeyup = function() {
		this.controller.updateGroupsBasedOnDOM();
	}

	return this.domElement;
};

// Callback methods for adding stuff and helper methods
MakerViewController.prototype.addStatToUnitView = function( unitMakerView, statHeader ) {
	if ( !statHeader ) {
		statHeader = "?";
	}

	// Get the group index
	var groupIndex = -1;
	for ( var i = 0; i < this.unitMakerViews.length; i++ ) {
		if ( this.unitMakerViews[ i ] == unitMakerView ) {
			groupIndex = i;
			break;
		}
	}

	// Add the stat line to the model, as well as all of the units in the group
	var unitGroup = this.unitGroups[ groupIndex ];
	var unitMakerView = this.unitMakerViews[ groupIndex ];
	unitGroup.statHeaders.push( statHeader );

	// Add the columns to the view
	unitMakerView.addStatHeaders( [statHeader] );

	unitMakerView.refreshView();
}

MakerViewController.prototype.addUnitToUnitView = function( unitMakerView, unit ) {
	if ( !unit ) {
		unit = new Unit( "???", [0,0,0,0,0,0,0,0,"-"], [], 0, 10, 5, 5 );
	}

	// Get the group index
	var groupIndex = -1;
	for ( var i = 0; i < this.unitMakerViews.length; i++ ) {
		if ( this.unitMakerViews[ i ] == unitMakerView ) {
			groupIndex = i;
			break;
		}
	}

	// Get the proper unit group and maker view
	var unitGroup = this.unitGroups[ groupIndex ];
	var unitMakerView = this.unitMakerViews[ groupIndex ];		
	unitGroup.units.push( unit );

	// Add the unit to the view
	this.addUnit( unit, unitMakerView );

	// Refresh the view
	unitMakerView.refreshView();
}

MakerViewController.prototype.removeUnitFromUnitView = function( unitMakerView ) {
	// Get the group index
	var groupIndex = -1;
	for ( var i = 0; i < this.unitMakerViews.length; i++ ) {
		if ( this.unitMakerViews[ i ] == unitMakerView ) {
			groupIndex = i;
			break;
		}
	}

	// Get the proper unit group and maker view
	var unitGroup = this.unitGroups[ groupIndex ];
	var unitMakerView = this.unitMakerViews[ groupIndex ];		
	var unit = unitGroup.units[ unitGroup.units.length - 1 ];

	unitGroup.removeUnit( unit );

	// Add the unit to the view
	this.removeUnit( unit, unitMakerView );

	// Refresh the view
	unitMakerView.refreshView();
}

MakerViewController.prototype.addOptionGroupToUnitView = function( unitMakerView, optionGroup ) {
	if ( !optionGroup ) {
		optionGroup = new OptionGroup( "???", 1, [] );
	}

	// Get the group index
	var groupIndex = -1;
	for ( var i = 0; i < this.unitMakerViews.length; i++ ) {
		if ( this.unitMakerViews[ i ] == unitMakerView ) {
			groupIndex = i;
			break;
		}
	}

	// Get the proper unit group and maker view
	var unitGroup = this.unitGroups[ groupIndex ];
	var unitMakerView = this.unitMakerViews[ groupIndex ];

	this.addOptionGroup( optionGroup, unitMakerView );
	unitGroup.units[ 0 ].addOptionGroup( optionGroup );

	// console.log( "Unit Group:" );
	// console.log( unitGroup );

	unitMakerView.refreshView();	
}

MakerViewController.prototype.addOptionToOptionGroupInUnitView = function( unitMakerView, optionGroupView, option ) {
	if ( !option ) {
		// name, description, min, max, currentCount, cost
		option = new Option( "???", "", 0, 1, 0, 0 );
	}

	// Get the group index
	var groupIndex = -1;
	for ( var i = 0; i < this.unitMakerViews.length; i++ ) {
		if ( this.unitMakerViews[ i ] == unitMakerView ) {
			groupIndex = i;
			break;
		}
	}

	// Get the proper unit group and maker view
	var unitGroup = this.unitGroups[ groupIndex ];
	var unitMakerView = this.unitMakerViews[ groupIndex ];

	// Get the option group index
	var optionGroupIndex = -1;
	for ( var i = 0; i < unitMakerView.optionGroupViews.length; i++ ) {
		if ( unitMakerView.optionGroupViews[ i ] == optionGroupView ) {
			optionGroupIndex = i;
			break;
		}
	}

	unitGroup.units[ 0 ].options[ optionGroupIndex ].addOption( option );
	this.addOptionToOptionGroup( option, optionGroupView );

	unitMakerView.refreshView();
}

MakerViewController.prototype.removeOptionFromOptionGroupInUnitView = function( optionIndex, unitMakerView, optionGroupView ) {
	// Get the group index
	var groupIndex = -1;
	for ( var i = 0; i < this.unitMakerViews.length; i++ ) {
		if ( this.unitMakerViews[ i ] == unitMakerView ) {
			groupIndex = i;
			break;
		}
	}

	// Get the proper unit group and maker view
	var unitGroup = this.unitGroups[ groupIndex ];
	var unitMakerView = this.unitMakerViews[ groupIndex ];

	// Get the option group index
	var optionGroupIndex = -1;
	for ( var i = 0; i < unitMakerView.optionGroupViews.length; i++ ) {
		if ( unitMakerView.optionGroupViews[ i ] == optionGroupView ) {
			optionGroupIndex = i;
			break;
		}
	}

	var optionGroup = unitGroup.units[ 0 ].options[ optionGroupIndex ];
	optionGroup.removeOptionAtIndex( optionIndex );
}

MakerViewController.prototype.addUnitGroupButtonClicked = function( e ) {
	// Sync current choices
	this.updateGroupsBasedOnDOM();

	// var firewarrior = new Unit( "Fire Warrior", [2,3,3,3,1,2,1,7,"4+"], [], 6, 12, 12, 12 );
	var defaultUnit = new Unit( "???", [0,0,0,0,0,0,0,0,"-"], [], 0, 10, 5, 5 );
	var unitGroup = new UnitGroup( [defaultUnit], ["WS","BS","S","T","W","I","A","Ld","Sv"], "???", "Troop" );

	this.addUnitGroup( unitGroup );
}

MakerViewController.prototype.addUnitGroup = function( unitGroup ) {
	var unitMakerView = new UnitMakerView( this );
	unitMakerView.addStatHeaders( unitGroup.statHeaders );

	this.unitGroups.push( unitGroup );
	this.unitMakerViews.push( unitMakerView );

	for ( var i = 0; i < unitGroup.units.length; i++ ) {
		this.addUnit( unitGroup.units[ i ], unitMakerView );
	}

	unitMakerView.refreshView();
}

MakerViewController.prototype.addUnit = function( unit, unitMakerView ) {
	unitMakerView.addStatLine( unit );
	unitMakerView.addMinMax( { min: unit.minSize, max: unit.maxSize } );
	unitMakerView.addCost( unit.cost );

	var unitMakerViewDOMElement = unitMakerView.getDOMElement();
	unitMakerViewDOMElement.style.cssFloat = "left";
	unitMakerViewDOMElement.style.width = UNIT_MAKER_CONTAINER_WIDTH + "%";

	this.domElement.appendChild( unitMakerViewDOMElement );
};

MakerViewController.prototype.removeUnit = function( unit, unitMakerView ) {
	unitMakerView.removeStatLine();
	unitMakerView.removeMinMax();

	var unitMakerViewDOMElement = unitMakerView.getDOMElement();
	unitMakerViewDOMElement.style.cssFloat = "left";
	unitMakerViewDOMElement.style.width = UNIT_MAKER_CONTAINER_WIDTH + "%";

	this.domElement.appendChild( unitMakerViewDOMElement );
}

MakerViewController.prototype.addOptionGroup = function( optionGroup, unitMakerView ) {
	unitMakerView.addOptionGroup( optionGroup );
};

MakerViewController.prototype.addOptionToOptionGroup = function( option, optionGroupView ) {
	optionGroupView.addOption( option );
	optionGroupView.refreshView();
}

// Callback methods for changing names/stats/headers
MakerViewController.prototype.nameChangedAtIndex = function( index ) {

}

MakerViewController.prototype.statChangedAtIndex = function( index ) {

}

MakerViewController.prototype.headerChangedAtIndex = function( index ) {
	
}

// Saving methods
MakerViewController.prototype.updateGroupsBasedOnDOM = function() {
	for ( var i = 0; i < this.unitMakerViews.length; i++ ) {
		var unitMakerView = this.unitMakerViews[ i ];
		var unitGroup = this.unitGroups[ i ];

		// Update group name
		unitGroup.groupName = unitMakerView.groupNameDiv.value;
		unitMakerView.groupName = unitGroup.groupName;

		// Update group type
		unitGroup.groupType = unitMakerView.groupTypeDiv.value;
		unitMakerView.groupType = unitGroup.groupType;

		// Update unit group headers
		var updatedHeaders = [];
		for ( var j = unitMakerView.unitHeaders.length - 1; j > -1; j-- ) {
			updatedHeaders.push( unitMakerView.unitHeaders[ j ].value );
		}
		unitGroup.statHeaders = updatedHeaders;
		unitMakerView.headerLine = unitGroup.statHeaders;

		// Update unit names
		var alteredNames = []
		for ( var j = 0; j < unitMakerView.unitNames.length; j++ ) {
			if ( unitGroup.units[ j ] != undefined ) {
				unitGroup.units[ j ].name = unitMakerView.unitNames[ j ].value;
				alteredNames.push([ unitGroup.units[ j ].name ]);
			}
		}
		unitMakerView.statlines[ 'name' ] = alteredStatLines;

		// Update unit min/maxes
		var alteredMins = [];
		for ( var j = 0; j < unitMakerView.unitMins.length; j++ ) {
			if ( unitGroup.units[ j ] != undefined ) {
				unitGroup.units[ j ].minSize = unitMakerView.unitMins[ j ].value;
				unitGroup.units[ j ].maxSize = unitMakerView.unitMaxes[ j ].value;

				alteredMins.push( { "min":unitGroup.units[ j ].minSize,
									"max":unitGroup.units[ j ].maxSize } );
			}
		}
		unitMakerView.unitMinsAndMaxes = alteredMins;

		// Update unit costs
		var alteredCosts = [];
		for ( var j = 0; j < unitMakerView.unitCosts.length; j++ ) {
			if ( unitGroup.units[ j ] != undefined ) {
				unitGroup.units[ j ].cost = unitMakerView.unitCosts[ j ].value;

				alteredCosts.push( unitGroup.units[ j ].cost );
			}
		}
		unitMakerView.costs = alteredCosts;

		// Update unit stats
		var alteredStatLines = []
		for ( var j = 0; j < unitMakerView.unitNames.length; j++ ) {
			var unitStatLine = unitMakerView.unitStats[ j ];
			var newUnitStats = [];
			alteredStatLines.push( [] );
			for ( var k = unitStatLine.length - 1; k > -1; k-- ) {
				newUnitStats.push( unitStatLine[ k ].value );
				alteredStatLines[ j ].push( unitStatLine[ k ].value );
			}

			unitGroup.units[ j ].stats = newUnitStats;
		}
		unitMakerView.statlines[ 'stats' ] = alteredStatLines;

		// // Update option groups
		// for ( var j = 0; j < unitMakerView.unitOptionGroups.length; j++ ) {
		// 	// Get the option group and update it
		// 	var optionGroup = unitGroup.units[ 0 ].options[ j ];
		// 	var optionGroupViews = unitMakerView.unitOptionGroups[ j ];	

		// 	console.log( optionGroupViews );

		// 	optionGroup.rule = { "name":optionGroupViews.rule.type.options[ optionGroupViews.rule.type.selectedIndex ].value,
		// 						 "value":optionGroupViews.rule.value.value };
		// 	optionGroup.name = optionGroupViews.name;
		// 	optionGroup.maxConcurrent = optionGroupViews.maxConcurrent;

		// 	// Update the options
		// 	for ( var k = 0; k < optionGroup.options.length; k++ ) {
		// 		var option = optionGroup.options[ k ];
		// 		option.name = optionGroupViews.options[ k ].name.value;
		// 		option.min =  optionGroupViews.options[ k ].min.value;
		// 		option.max =  optionGroupViews.options[ k ].max.value;
		// 		option.cost = optionGroupViews.options[ k ].cost.value;
		// 	}
		// }

		// Update option groups
		for ( var j = 0; j < unitMakerView.unitOptionGroups.length; j++ ) {
			// Get the option group and update it
			var optionGroup = unitGroup.units[ 0 ].options[ j ];
			var optionGroupView = unitMakerView.optionGroupViews[ j ];

			optionGroup.rule = { "name":optionGroupView.ruleTypeSelector.options[ optionGroupView.ruleTypeSelector.selectedIndex ].value,
								 "value":optionGroupView.ruleFieldDiv.value };
			optionGroupView.ruleIndex = optionGroupView.ruleTypeSelector.selectedIndex;
			optionGroupView.ruleValue = optionGroupView.ruleFieldDiv.value;

			optionGroup.name = optionGroupView.groupNameDiv.value;
			optionGroupView.groupName = optionGroup.name;

			optionGroup.maxConcurrent = optionGroupView.maxConcurrentDiv.value;
			optionGroupView.maxConcurrent = optionGroup.maxConcurrent;

			// Update the options
			for ( var k = 0; k < optionGroup.options.length; k++ ) {
				var option = optionGroup.options[ k ];
				option.name = optionGroupView.optionViews[ k ].nameDiv.value;
				option.min =  optionGroupView.optionViews[ k ].minDiv.value;
				option.max =  optionGroupView.optionViews[ k ].maxDiv.value;
				option.cost = optionGroupView.optionViews[ k ].costDiv.value;

				optionGroupView.optionViews[ k ].optionName = option.name;
				optionGroupView.optionViews[ k ].min = option.min;
				optionGroupView.optionViews[ k ].max = option.max;
				optionGroupView.optionViews[ k ].cost = option.cost;
			}
		}
	}
}

MakerViewController.prototype.saveCurrentListButtonClicked = function( e ) {
	// Make sure everything is synced
	this.updateGroupsBasedOnDOM();

	var unitGroupList = [];
	for ( var i = 0; i < this.unitGroups.length; i++ ) {
		unitGroupList.push( this.unitGroups[ i ].toJSON() );
	}

	console.log( "Saved list: " );
	console.log( unitGroupList );

	var currentTime = new Date();
	var packetForExport = {
		user:this.userNameDiv.value,
		list:{
			list:unitGroupList,
			created_at:currentTime.toString(),
			list_name:this.listNameDiv.value,
			list_type:"army_book"
		}
	};

	// Set all current unit sizes to the minimum size
	for ( i = 0; i < unitGroupList.length; i++ ) {
		var unitGroup = unitGroupList[ i ];

		for ( j = 0; j < unitGroup.units.length; j++ ) {
			unitGroup.units[ j ].currentSize = unitGroup.units[ j ].minSize;
		}
	}

	console.log( packetForExport );
	$.post( '/armylist', packetForExport );
}