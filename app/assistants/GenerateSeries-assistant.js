function GenerateSeriesAssistant() {
}

GenerateSeriesAssistant.prototype.setup = function() {
 	this.controller.setupWidget(
    	Mojo.Menu.viewMenu,
	undefined,
	menuModel
    );
	
	/* Main Menu */
	this.controller.setupWidget(
		Mojo.Menu.appMenu,
		{},
		appMenuModel
	); 
    
	this.duplicatesModel = { value: false, disabled: false };
    this.controller.setupWidget("allowDuplicates",
        this.attributes = {
            trueLabel: "Allow",
            falseLabel: "Disallow" 
        },
        this.duplicatesModel
    );
    
    this.seriesSizeModel = { value: 5, disabled: false}
    this.controller.setupWidget("seriesSize",
        this.attributes = {
            label: '\0',
            modelProperty: 'value',
            min: 1,
            max: 20
        },
        this.seriesSizeModel
    );
    self = this;
    
    	
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
	Mojo.Event.listen(this.controller.get("generateButton"),Mojo.Event.tap, this.generateButtonPressed); 


	//Clear Button
	this.controller.setupWidget("resetButton",
		this.attributes = {},
		this.model = {
			label : "Reset",
			disabled: false
		}
	);
	Mojo.Event.listen(this.controller.get("resetButton"),Mojo.Event.tap, application.resetScene); 
  
    
};


//Bounds Fields Changed
GenerateSeriesAssistant.prototype.fieldChanged = function(event) {
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
GenerateSeriesAssistant.prototype.sliderChanged = function(event) {
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



GenerateSeriesAssistant.prototype.generateButtonPressed = function(event) {
    //If Generate Button
	document.getElementById('resultsArea').className += " visible";
		
	//Generate
	application.generateRandomNumbers(
		self.seriesSizeModel.value,
		self.lowerBoundModel.value,
		self.upperBoundModel.value,
		1,
		1
	);
		
	//Timestamp
	document.getElementById('timeStamp').innerHTML = application.generateTimestamp();

};



GenerateSeriesAssistant.prototype.activate = function(event) {
    
	//SDK acting up - sholdnt be nessacary
	self.controller.get('lowerBoundField').mojo.setValue(0);

	
	
};

GenerateSeriesAssistant.prototype.deactivate = function(event) {
};

GenerateSeriesAssistant.prototype.cleanup = function(event) {
};
