var OPTION_COLOR = "#777777";

function OptionView( option, optionColor ) {
	this.option = option;
	this.optionColor = optionColor ? optionColor : OPTION_COLOR;
	this.selector;

	var container = document.createElement( 'div' );
	if ( this.option.optionType == O_Type.CHECKBOX ) {
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

		this.selector = checkbox;
	} else if ( this.option.optionType == O_Type.COUNTER ) {
		var inc = document.createElement( 'input' );
		inc.style.cssFloat = "left";
		inc.type = "button";
		inc.optionView = this;
		inc.value = "Increase";
		inc.onclick = function( e ) {
			this.optionView.increaseOption( e );
		}

		var dec = document.createElement( 'input' );
		dec.style.cssFloat = "left";
		dec.type = "button";
		dec.optionView = this;
		dec.value = "Decrease";
		dec.onclick = function( e ) {
			this.optionView.decreaseOption( e );
		}

		var count = document.createElement( 'div' );
		count.style.marginLeft = "10px";
		count.style.marginRight = "10px";
		count.style.cssFloat = "left";
		count.style.color = this.optionColor;
		count.innerHTML = this.option.currentCount + "x ";

		var name = document.createElement( 'div' );
		name.style.color = this.optionColor;
		name.innerHTML = this.option.name;

		container.appendChild( inc );
		container.appendChild( dec );
		container.appendChild( count );
		container.appendChild( name );
		container.style.marginTop = "10px";
		container.style.marginBottom = "10px";

		this.selector = count;
	}

	this.domElement = container;
}

OptionView.prototype.increaseOption = function( e ) {
	this.onOptionUpdate( this, this.option, {"increase" : true} );
};

OptionView.prototype.decreaseOption = function( e ) {
	this.onOptionUpdate( this, this.option, {"increase" : false} );
}

OptionView.prototype.updateOption = function( flags ) {
	this.onOptionUpdate( this, this.option, flags );
};

OptionView.prototype.onOptionUpdate = function( optionView, option ) {};

OptionView.prototype.setDisabled = function() {
	this.container.disabled = true;
};

OptionView.prototype.setEnabled = function() {
	this.container.disabled = false;
};