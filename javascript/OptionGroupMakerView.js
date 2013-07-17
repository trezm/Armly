function OptionGroupMakerView( optionGroup ) {
	this.optionGroup = optionGroup;
}

OptionGroupMakerView.prototype.getDOMElement = function() {
	if ( this.domElement ) {
		return this.domElement;
	}

	this.domElement = document.createElement( 'div' );

	return this.domElement;
};