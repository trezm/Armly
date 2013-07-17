var O_Type = {
	"CHECKBOX" : 0,
	"COUNTER" : 1
};

function Option( name, description, min, max, currentCount, cost ) {
	this.name = name;
	this.description = description;
	this.min = min;
	this.max = max;
	this.currentCount = currentCount;
	this.cost = cost;

	this.disabled = false;
	this.group = null;

	if ( this.min == 0 && this.max == 1 ) {
		this.optionType = O_Type.CHECKBOX;
	} else {
		this.optionType = O_Type.COUNTER;
	}
}

Option.prototype.optionValueChanged = function() {
	this.group.optionChanged( this );
}

Option.prototype.setCount = function( newCount ) {
	var groupMax = this.group.getMaxConcurrent();
	var groupCurrent = 0;

	for ( var i = 0; i < this.group.options.length; i++ ) {
		var option = this.group.options[ i ];
		groupCurrent += option.currentCount;
	}
	groupCurrent += newCount - this.currentCount;

	if ( newCount < this.max + 1 && newCount > this.min - 1 && groupCurrent < groupMax + 1 ) {
		this.currentCount = newCount;
	}
}

Option.prototype.setDisabled = function() {
	this.disabled = true;
};

Option.prototype.setEnabled = function() {
	this.disabled = false;
}