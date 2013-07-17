var UNIT_BORDER_COLOR = "#FFFFFF";
var UNIT_FONT_COLOR = "#FFFFFF";

function UnitMakerView( unit ) {
	this.unit = unit;
}

UnitMakerView.prototype.getDOMElement = function() {
	if ( this.domElement ) {
		return this.domElement;
	}

	this.domElement = document.createElement( 'div' );
	this.domElement.style.marginBottom = "10px";
	this.domElement.style.border = "1px solid " + UNIT_BORDER_COLOR;
	this.domElement.style.color = UNIT_FONT_COLOR;
	this.domElement.innerHTML = "Hello world!";

	return this.domElement;
};