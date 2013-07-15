function OptionViewController( optionGroups, unitViewController ) {
	this.optionGroups = optionGroups;
	this.unitViewController = unitViewController;

	// The option map represents the relationships between the option
	// and their respective views.
	this.optionMap = [];
};

OptionViewController.prototype.getDOMElement = function() {
	var optionContainer = document.createElement( "div" );

	for ( var i = 0; i < this.optionGroups.length; i++ ) {
		var optionGroup = this.optionGroups[ i ];
		for ( var j = 0; j < optionGroup.options.length; j++ ) {
			var option = optionGroup.options[ j ];

			var optionView = new OptionView( option );
			optionView.controller = this;
			optionView.onOptionUpdate = this.optionUpdated;

			optionContainer.appendChild( optionView.domElement );
			var identifier = option.group.name + ":" + option.name;
			this.optionMap.push( { "name" : identifier, "relationship" : { "view" : optionView, "model" : option } } );
		}
	}

	console.log( optionContainer );
	return optionContainer;
};

OptionViewController.prototype.optionUpdated = function( optionView, option ) {
	// Find the option group
	var optionGroup = option.group;

	// Find all other options in the option group and disable them.
	for ( var i = 0; i < optionGroup.options.length; i++ ) {
		var i_option = optionGroup.options[ i ];

		if ( i_option != option ) {
			// console.log( this.controller.optionMap );

			var relationship;
			// Find the option relation
			for ( var j = 0; j < optionView.controller.optionMap.length; j++ ) {
				var possibleMatch = optionView.controller.optionMap[ j ];

				var name = i_option.group.name + ":" + i_option.name;
				if ( possibleMatch.name == name ) {
					var relationship = possibleMatch;
					break;
				}
			}

			// Set up the view stuff
			var otherOptionView = relationship.relationship.view;
			otherOptionView.selector.disabled = optionView.selector.checked;

		} else {
			// Alter the option model
			if ( optionView.selector.checked ) {
				i_option.currentCount = 1;
			} else {
				i_option.currentCount = 0;
			}
		}
	}

	optionView.controller.unitViewController.recalculatePoints();
};
