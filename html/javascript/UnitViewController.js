function UnitViewController( unitGroup, headers, defaultDOMElement ) {
	this.unitGroup = unitGroup;
	this.headers = headers;
	this.contentView = defaultDOMElement;
}

UnitViewController.prototype.loadDOM = function() {
	// Load the unit view
	this.unitView = new UnitView( this.contentView, this.headers, this.unitGroup.units, this );
	this.unitView.addDomElements();

	this.recalculatePoints();

	// Create the options view controller
	// First put a default div in to move everything over
	var allOptions = [];
	for ( var i = 0; i < this.unitGroup.units.length; i++ ) {
		allOptions = allOptions.concat( this.unitGroup.units[ i ].options );
	}

	this.optionViewController = new OptionViewController( allOptions, this );
	this.contentView.appendChild( this.optionViewController.getDOMElement() );
};

UnitViewController.prototype.recalculatePoints = function() {
	this.unitCost = 0;
	this.unitSize = 0;
	// Calculate the default unit costs
	for ( var i = 0; i < this.unitGroup.units.length; i++ ) {
		this.unitCost += this.unitGroup.units[ i ].currentSize * this.unitGroup.units[ i ].cost;
		this.unitSize += this.unitGroup.units[ i ].currentSize;
	}

	// Include unit option costs
	var allOptions = [];
	for ( var i = 0; i < this.unitGroup.units.length; i++ ) {
		allOptions = allOptions.concat( this.unitGroup.units[ i ].options );
	}

	// console.log( "===Options===" );
	for ( var i = 0; i < allOptions.length; i++ ) {
		var optionGroup = allOptions[ i ];

		for ( var j = 0; j < optionGroup.options.length; j++ ) {
			var option = optionGroup.options[ j ];

			// console.log( "Unit option: " + option.name + " (" + option.currentCount + ")" );

			this.unitCost += option.currentCount * option.cost;
		}
	}

	this.unitView.setUnitCost( this.unitCost );
	this.unitView.refreshUnitSize();
};

UnitViewController.prototype.increaseUnitSize = function( unit ) {
	unit.setUnitSize( unit.currentSize + 1 );

	this.recalculatePoints();
};

UnitViewController.prototype.decreaseUnitSize = function( unit ) {
	unit.setUnitSize( unit.currentSize - 1 );

	this.recalculatePoints();
};