UNIT_MAKER_CONTAINER_WIDTH = 80;

function MakerViewController( domElement ) {
	this.domElement = domElement;

	this.unitGroups = [];
	this.unitMakerViews = [];
}

MakerViewController.prototype.loadDOM = function() {
	// Add in the button to add a unit view
	var addUnitButton = document.createElement( 'input' );
	addUnitButton.type = "button";
	addUnitButton.style.cssFloat = "right";
	addUnitButton.value = "+";
	addUnitButton.style.className = "increase_button";
	addUnitButton.makerViewController = this;
	addUnitButton.onclick = function( e ) {
		this.makerViewController.addUnitGroup( e );
	};

	// Add in the save button
	var saveListButton = document.createElement( "input" );
	saveListButton.type = "button";
	saveListButton.style.cssFloat = "right";
	saveListButton.value = "Save";
	saveListButton.makerViewController = this;
	saveListButton.onclick = function( e ) {
		this.makerViewController.saveCurrentList( e );
	}

	this.domElement.appendChild( addUnitButton );
	this.domElement.appendChild( saveListButton );

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
	var unitGroup = this.unitGroups[ i ];
	var unitMakerView = this.unitMakerViews[ i ];
	unitGroup.statHeaders.push( statHeader );

	// Add the columns to the view
	unitMakerView.addStatHeaders( [statHeader] );

	unitMakerView.refreshView();
}

MakerViewController.prototype.addUnitGroup = function( e ) {
	var firewarrior = new Unit( "Fire Warrior", [2,3,3,3,1,2,1,7,"4+"], [], 6, 12, 12, 12 );
	var shasui = new Unit( "Shas'ui", [2,3,3,3,1,2,2,8,"4+"], [], 0, 1, 12, 12 );
	var unitGroup = new UnitGroup( [firewarrior, shasui], ["WS","BS","S","T","W","I","A","Ld","Sv"] )

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

	var unitMakerViewDOMElement = unitMakerView.getDOMElement();
	unitMakerViewDOMElement.style.cssFloat = "left";
	unitMakerViewDOMElement.style.width = UNIT_MAKER_CONTAINER_WIDTH + "%";

	this.domElement.appendChild( unitMakerViewDOMElement );
};

// Callback methods for changing names/stats/headers
MakerViewController.prototype.nameChangedAtIndex = function( index ) {

}

MakerViewController.prototype.statChangedAtIndex = function( index ) {

}

MakerViewController.prototype.headerChangedAtIndex = function( index ) {
	
}

// Saving methods
MakerViewController.prototype.saveCurrentList = function( e ) {
	var unitGroupList = [];
	for ( var i = 0; i < this.unitGroups.length; i++ ) {
		unitGroupList.push( this.unitGroups[ i ].toJSON() );
	}

	console.log( "Saved list: " );
	console.log( unitGroupList );
}