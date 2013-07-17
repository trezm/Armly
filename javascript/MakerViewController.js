function MakerViewController( domElement ) {
	this.domElement = domElement;

	this.units = [];
}

MakerViewController.prototype.loadDOM = function() {
	// Add in the button to add a unit view
	var addUnitButton = document.createElement( 'input' );
	addUnitButton.type = "button";
	addUnitButton.style.cssFloat = "right";
	addUnitButton.value = "+";
	addUnitButton.style.className = "increase_button";
	addUnitButton.makerViewController = this;
	addUnitButton.onclick = function( e ) {
		this.makerViewController.addUnit( e );
	};

	this.domElement.appendChild( addUnitButton );

	return this.domElement;
};

MakerViewController.prototype.addUnit = function( e ) {
	var unit = new Unit( "Fire Warrior", [2,3,3,3,1,2,1,7,"4+"], [], 6, 12, 12, 12 );
	this.units.push( unit );

	var unitMakerView = new UnitMakerView( unit );
	var unitMakerViewDOMElement = unitMakerView.getDOMElement();

	console.log( this.domElement );
	this.domElement.appendChild( unitMakerViewDOMElement );
};