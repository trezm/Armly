var Rules = {
	"NORMAL" : "NORMAL",
	"ONEINX" : "ONEINX",
	"ALLORNOTHING" : "ALLORNOTHING"
}

function OptionGroup( name, maxConcurrent, options, rule ) {
	this.name = name;
	this.maxConcurrent = maxConcurrent;
	this.options = options;

	rule ? this.rule = rule : this.rule = { "type" : Rules.NORMAL, "value" : 0 };

	// Set all of the options to know their proper group
	for ( var i = 0; i < options.length; i++ ) {
		var option = options[ i ];
		option.group = this;

		// Must set up the options correctly.
		if ( this.rule.type == Rules.ALLORNOTHING ) {
			option.optionType = O_Type.CHECKBOX;
		}
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

OptionGroup.prototype.setUnit = function( unit ) {
	this.unit = unit;

	// Properly modify the option maxes
	if ( this.rule.type == Rules.ALLORNOTHING ) {
		this.maxConcurrent = this.unit.maxSize;
		for ( var i = 0; i < this.options.length; i++ ) {
			this.options[ i ].max = this.unit.maxSize;
		}
	}
};

OptionGroup.prototype.getMaxConcurrent = function() {
	if ( this.rule.type == Rules.NORMAL ) {
		return this.maxConcurrent;
	} else if ( this.rule.type == Rules.ONEINX ) {
		return Math.floor( this.unit.currentSize / this.rule.value );
	} else if ( this.rule.type == Rules.ALLORNOTHING ) {
		return this.unit.currentSize;
	}
};

OptionGroup.prototype.toJSON = function() {
	var optionList = []
	for ( var i = 0; i < this.options.length; i++ ) {
		optionList.push( this.options[ i ].toJSON() );
	}

	return {
		"name":this.name,
		"maxConcurrent":this.maxConcurrent,
		"rule":this.rule,
		"options":optionList
	}
}