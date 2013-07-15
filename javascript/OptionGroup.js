function OptionGroup( name, maxConcurrent, options ) {
	this.name = name;
	this.maxConcurrent = maxConcurrent;
	this.options = options;

	// Set all of the options to know their proper group
	for ( var i = 0; i < options.length; i++ ) {
		var option = options[ i ];
		option.group = this;
	}
}

OptionGroup.prototype.addOption = function( option ) {
	this.options.push( option );
};

OptionGroup.prototype.optionChanged = function( option ) {
	if ( option.optionType == O_Type.CHECKBOX ) {
		for ( var i = 0; i < this.options.length; i++ ) {
			if ( this.options[ i ] != option ) {
				this.options[ i ].setDisabled();
			}
		}
	}
};