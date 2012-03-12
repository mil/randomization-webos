function GenerateTicketAssistant() {
}

GenerateTicketAssistant.prototype.setup = function() {

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
    
    
    this.controller.setupWidget("customLottery",
        this.attributes = {
            trueLabel: "Custom",
            falseLabel: "Presets" 
        },
        this.model = {
            value: false,
            disabled: false
        }
    );

    this.controller.setupWidget("lottery",
        this.attributes = {
            choices: [
                {label: "Mega Bucks Plus", value: 1},
                {label: "New Jersey Cash 5", value: 2},
                {label: "New York Lotto", value: 3}
            ],
            labelPlacement: Mojo.Widget.labelPlacementLeft,
            label: "Lottery"
        },
        this.model = {
            value: 3,
            disabled: false
        }
    );     

	//Generate Buton
	this.controller.setupWidget("generateButton",
		this.attributes = {
			type: Mojo.Widget.activityButton
		},
		this.model = {
		    label : "Generate",
		    disabled: true
		}
	);

	//Clear Button
	this.controller.setupWidget("resetButton",
		this.attributes = {},
		this.model = {
			label : "Reset",
			disabled: true
		}
	);
	
	Mojo.Event.listen(this.controller.get("resetButton"),Mojo.Event.tap, application.resetScene); 
};

GenerateTicketAssistant.prototype.activate = function(event) {
};

GenerateTicketAssistant.prototype.deactivate = function(event) {
};

GenerateTicketAssistant.prototype.cleanup = function(event) {
};
