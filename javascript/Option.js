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

Option.prototype.setDisabled = function() {
	this.disabled = true;
};

Option.prototype.setEnabled = function() {
	this.disabled = false;
}