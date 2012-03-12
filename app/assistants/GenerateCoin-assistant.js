function GenerateCoinAssistant() {
}

GenerateCoinAssistant.prototype.setup = function() {
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

	
    this.flipsModel = {
		value: 5
	};
	
    this.controller.setupWidget("flips",
        this.attributes = {
            label: '\0',
            modelProperty: 'value',
            min: 1,
            max: 20
        },
        this.flipsModel
    );

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
	Mojo.Event.listen(this.controller.get("generateButton"),Mojo.Event.tap, this.buttonPressed); 

	//Clear Button
	this.controller.setupWidget("resetButton",
		this.attributes = {},
		this.model = {
			label : "Reset",
			disabled: false
		}
	);
	Mojo.Event.listen(this.controller.get("resetButton"),Mojo.Event.tap, application.resetScene); 

	self = this;

};

GenerateCoinAssistant.prototype.activate = function(event) {

};

GenerateCoinAssistant.prototype.deactivate = function(event) {
};

GenerateCoinAssistant.prototype.cleanup = function(event) {
};

GenerateCoinAssistant.prototype.buttonPressed = function(event) {
    //If Generate Button
	//StageAssistant.generateRandomNumbers(1,5,0,100,"coin");
	document.getElementById('resultsArea').className += " visible";
	
	
	//Generate the Numbers
	application.generateRandomNumbers(
		self.flipsModel.value,
		1,
		2,
		0,
		2
	);
	
	document.getElementById('timeStamp').innerHTML = application.generateTimestamp();

};
