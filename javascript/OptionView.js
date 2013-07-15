var OPTION_COLOR = "#777777";

function OptionView( option, optionColor ) {
	this.option = option;
	this.optionColor = optionColor ? optionColor : OPTION_COLOR;
	this.selector;

	if ( this.option.min == 0 && this.option.max == 1 ) {
		var container = document.createElement( 'div' );

		var checkbox = document.createElement( 'input' );
		checkbox.style.cssFloat = "left";
		checkbox.type = "checkbox";
		checkbox.optionView = this;
		checkbox.onchange = function( e ) {
			this.optionView.updateOption();
			// this.checked ? this.optionView.setEnabled() : this.optionView.setDisabled();
		}

		var name = document.createElement( 'div' );
		name.style.color = this.optionColor;
		// name.style.cssFloat = "left";
		name.innerHTML = this.option.name;

		container.appendChild( checkbox );
		container.appendChild( name );

		this.domElement = container;
		this.selector = checkbox;
	}

	this.updateOption();
}

OptionView.prototype.updateOption = function() {
	if ( this.option.optionType == O_Type.CHECKBOX ) {
		if ( this.selector.checked ) {
			this.option.currentCount = 1;
		} else {
			this.option.currentCount = 0;			
		}
	}

	this.onOptionUpdate( this, this.option );
};

OptionView.prototype.onOptionUpdate = function( optionView, option ) {};

OptionView.prototype.setDisabled = function() {
	this.container.disabled = true;
};

OptionView.prototype.setEnabled = function() {
	this.container.disabled = false;
};