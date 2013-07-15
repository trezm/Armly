function UnitViewController( units, headers, defaultDOMElement ) {
	this.units = units;
	this.headers = headers;
	this.contentView = defaultDOMElement;
}

UnitViewController.prototype.loadDOM = function() {
	// Load the unit view
	this.unitView = new UnitView( this.contentView, this.headers, this.units );
	this.unitView.addDomElements();

	this.recalculatePoints();

	// Create the options view controller
	// First put a default div in to move everything over
	var allOptions = [];
	for ( var i = 0; i < this.units.length; i++ ) {
		allOptions = allOptions.concat( this.units[ i ].options );
	}

	this.optionViewController = new OptionViewController( allOptions, this );
	this.contentView.appendChild( this.optionViewController.getDOMElement() );
};

UnitViewController.prototype.recalculatePoints = function() {
	this.unitCost = 0;
	this.unitSize = 0;
	// Calculate the default unit costs
	for ( var i = 0; i < this.units.length; i++ ) {
		this.unitCost += this.units[ i ].currentSize * this.units[ i ].cost;
		this.unitSize += this.units[ i ].currentSize;
	}

	// Include unit option costs
	var allOptions = [];
	for ( var i = 0; i < this.units.length; i++ ) {
		allOptions = allOptions.concat( this.units[ i ].options );
	}

	for ( var i = 0; i < allOptions.length; i++ ) {
		var optionGroup = allOptions[ i ];

		for ( var j = 0; j < optionGroup.options.length; j++ ) {
			var option = optionGroup.options[ j ];

			this.unitCost += option.currentCount * option.cost;
		}
	}

	this.unitView.setUnitCost( this.unitCost );
};