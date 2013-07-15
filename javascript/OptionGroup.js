function OptionGroup( name, maxConcurrent, options ) {
	this.name = name;
	this.maxConcurrent = maxConcurrent;
	this.options = options;
}

OptionGroup.prototype.addOption = function( option ) {
	this.options.push( option );
};

OptionGroup.prototype.optionChanged = function( option ) {
	console.log( "Option changed!" );

	if ( option.optionType == O_Type.CHECKBOX ) {
		for ( var i = 0; i < this.options.length; i++ ) {
			if ( this.options[ i ] != option ) {
				this.options[ i ].setDisabled();
			}
		}
	}
};