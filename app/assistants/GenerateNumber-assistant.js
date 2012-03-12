function GenerateNumberAssistant() {
}

GenerateNumberAssistant.prototype.setup = function() {
	self = this;
	this.controller.setupWidget( Mojo.Menu.viewMenu, {}, menuModel ); 
	this.controller.setupWidget( Mojo.Menu.appMenu, {}, appMenuModel ); 
	
	
	// >> LOWER BOUNDS
	
	//Lower Bound Slider
	this.lowerBoundModel = { value: 0 };
	this.controller.setupWidget(
	    'lowerBoundSlider',
	    this.attributes = {
			maxValue: 1000,
			minValue: 0,
			updateInterval: 0.1,
			round: true
	    },
	    this.lowerBoundModel
	);
    

	//Lower Bound Texfield
	this.controller.setupWidget("lowerBoundField",
		this.attributes = {
			multiline: false,
			enterSubmits: false,	
			maxLength: 5,
			changeOnKeyPress: true,
			modifierState: Mojo.Widget.numLock,
			charsAllow: function( charCode ) {
				return(
					( charCode >= 48 && charCode <= 57)
				);
			}
		},
		this.lowerBoundModel
	);
    
	//Listen for Updates on Lowerbound Slider & Text Field
	this.controller.listen('lowerBoundSlider', Mojo.Event.propertyChange, this.sliderChanged);
	this.controller.listen('lowerBoundField', Mojo.Event.propertyChange, this.fieldChanged);

	// << LOWER BOUNDS
 
	
	
	
	
	// >> UPPER BOUNDS
	
	//Upper Bound Slider
	this.upperBoundModel = { value: 1000 };
	this.controller.setupWidget('upperBoundSlider',
		this.attributes = {
			minValue: 0,
			maxValue: 1000,
			updateInterval: 0.1,
			round: true
		},
		this.upperBoundModel
	);
	
	//Lower Bound Texfield
	this.controller.setupWidget("upperBoundField",
		this.attributes = {
			multiline: false,
			enterSubmits: false,
			changeOnKeyPress: true,
			focus: true,
			modifierState: Mojo.Widget.numLock,
			charsAllow: function( charCode ) {
				return(
					( charCode >= 48 && charCode <= 57)
				);
			}
		},
		this.upperBoundModel
	);

	//Listen for Updates on Lowerbound Slider
	this.controller.listen('upperBoundSlider',Mojo.Event.propertyChange, this.sliderChanged);
	this.controller.listen('upperBoundField',Mojo.Event.propertyChange, this.fieldChanged);

	// << UPPER BOUNDS


	// >> BUTTONS
	
	//Generate Buton
	this.controller.setupWidget("generateButton",
		this.attributes = {
			type: Mojo.Widget.activityButton
		},
		this.model = {
		    label : "Generate",
		    disabled: false
		}
	);
	

	//Clear Button
	this.controller.setupWidget("resetButton",
		this.attributes = {},
		this.model = {
			label : "Reset",
			disabled: false
		}
	);
	
	
	Mojo.Event.listen(this.controller.get("generateButton"),Mojo.Event.tap, this.buttonPressed); 
	Mojo.Event.listen(this.controller.get("resetButton"),Mojo.Event.tap, application.resetScene); 

	
	// << BUTTONS

};

GenerateNumberAssistant.prototype.activate = function(event) {
	//SDK acting up - sholdnt be nessacary
	self.controller.get('lowerBoundField').mojo.setValue(0);

	
};

GenerateNumberAssistant.prototype.deactivate = function(event) {
};

GenerateNumberAssistant.prototype.cleanup = function(event) {
};


//Bounds Fields Changed
GenerateNumberAssistant.prototype.fieldChanged = function(event) {
	switch(event.target.id) {
		case "lowerBoundField":
			self.controller.modelChanged(self.lowerBoundModel, self);
			
			//Technically this shouldn't be nessacary, SDK isn't cooperating though
			if (!self.controller.get('lowerBoundField').mojo.getValue()) {
				self.controller.get('lowerBoundField').mojo.setValue(0);
			}
		break;
		case "upperBoundField":
			self.controller.modelChanged(self.upperBoundModel, self);
			
			//Technically this shouldn't be nessacary, SDK isn't cooperating though
			if (!self.controller.get('upperBoundField').mojo.getValue()) {
				self.controller.get('upperBoundField').mojo.setValue(0);
			}
		break;
		default:
			//Shouldn't be possible
	}
};

//Bounds Sliders Changed
GenerateNumberAssistant.prototype.sliderChanged = function(event) {
	switch(event.target.id) {
		case "lowerBoundSlider":
			self.controller.get('lowerBoundField').mojo.focus();
			self.controller.modelChanged(self.lowerBoundModel, self);
			
			//Technically this shouldn't be nessacary, SDK isn't cooperating though
			if (!self.controller.get('lowerBoundField').mojo.getValue()) {
				self.controller.get('lowerBoundField').mojo.setValue(0);
			}
			
		break;
		
		case "upperBoundSlider":
			self.controller.get('upperBoundField').mojo.focus();
			self.controller.modelChanged(self.upperBoundModel, self);
			
			//Technically this shouldn't be nessacary, SDK isn't cooperating though
			if (!self.controller.get('upperBoundField').mojo.getValue()) {
				self.controller.get('upperBoundField').mojo.setValue(0);
			}
		break;
		default:
		//Shouldn't be possible
	}

};

//A Button was Pressed
GenerateNumberAssistant.prototype.buttonPressed = function(event) {
    //If Generate Button	
	application.generateRandomNumbers(
		1,
		self.lowerBoundModel.value,
		self.upperBoundModel.value,
		0,
		0
	);

};
