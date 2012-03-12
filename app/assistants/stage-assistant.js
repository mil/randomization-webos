//Global Var Accessor
application = this;
realRandom = 1;


/* Global Reusable Functions */
application = {
	generateRandomNumbers: function(numberCount, lowerBound, upperBound, noDuplicates, outputType ) {
		/*
			Amount of numbers to generate,
			Lower Bound,
			Upperbound,
			Output Type (0 - number, 1 - series, 2 - coin, 3 - lottery)
		*/
		if (realRandom) {
			/* Real Random */
			
			var returnArray = new Array();
		
			//Random.org Results
			this.request = new Ajax.Request(
				'http://www.random.org/integers',
				{
					//AJAX Setup
					method:'get',
					evalJSON: 'false',
					parameters: {
					num: numberCount,
					min: lowerBound,
					max: upperBound,
					col: 1,
					base: 10,
						format: "plain",
						rnd: "new"
				},
					
					/* SUCCESS of Generating Random Number from .ORG */
					onSuccess:  function(event) {
						
						//Parse generated values					
						var returnArray = [];
						var parser = new DOMParser();
						var response = event.responseText;
						returnArray = response.split("\n");
						
						var returnString = "";
						
						switch (outputType) {
							case 0:
								//Number - only ever will return single number w/o comma
								returnString = returnArray[0];
							break;
						
							case 1:
								//Series
								
								var noComma = 1;												
								for(var i=0; i<returnArray.length-1; i++) {
									if (noComma) {
										returnString = returnArray[i];
									} else {
										returnString = returnString + ", " + returnArray[i];
									}
									noComma = 0;
								}	
							break;
						
							case 2:
								//Coin
								var tailsCounter = 0;
								var headsCounter = 0;
								
								var flipVisuals = '<div id="coin-container">';
								for(var i=0; i<returnArray.length-1; i++) {
									if (returnArray[i] == 1) {
										//Heads
										headsCounter++;
										flipVisuals = flipVisuals + '<div class="coin-flip-heads"></div>';		
									} else {
										//Tails
										tailsCounter++;
										flipVisuals = flipVisuals + '<div class="coin-flip-tails"></div>';
									}
								}
								
								returnString = 'Heads: ' + headsCounter + "<br/>Tails: " + tailsCounter + flipVisuals + "</div>";
								
								
							break;
						
							case 3:
							//Lottery
							returnString = "lottery";
							break;
						
						}
						
						
						/* Update HTML */
						$('numberResult').innerHTML = returnString;
						$('timeStamp').innerHTML = application.generateTimestamp();
						$('resultsArea').className += " visible";
				
						//Deactivate Generate Button
						self.controller.get('generateButton').mojo.deactivate(0);
						
						return "success!";
					},
					
					onFailure:  function() {
						
						/* Show Fail in Number Result Spot */
						$("numberResult").innerHTML = "Error";
						
						//Bad Connection or out of bounds
						self.controller.showAlertDialog({   
							title: "Error: Failed to Generate",
							message: "Check your bounds and check your internet connection",
							choices:[    
								 {label: "OK", value:"", type:'dismiss'}    
							]
						});
						
						
						return "failure";
					}
				}
			);
			
		} else {
		//PSUEDO RANDOM
		
			var returnArray = [];
			
			//Use Psuedo Random
			for (i=1;i<=numberCount;i++) {
				returnArray.push(
					Math.floor( (Math.random() * (upperBound-lowerBound+1)) + lowerBound )
				)
			}
			
			return returnArray;
		}

		
		return 0;		
	},
	generateTimestamp: function() {
		/*
			Generate a Timestamp and format it as HTML we can swap in
			NOTE: Maybe I should just make it return the values and then swap them in, more code in assistants but cleaner and more flexible in a way?
		*/
		
		var time = new Date();
		
		var ap = "AM";
		var hour = time.getHours();
		if (hour   > 11) { ap = "PM";        }
		if (hour   > 12) { hour = hour - 12; }
		if (hour   == 0) { hour = 12;        }
		
		var year = 1900 + time.getYear();
		
		var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
		return (
			"Generated:<br/>" +
			hour + ":" + time.getMinutes() + ap + " " + time.getSeconds() + "s<br/>" +
			months[time.getMonth()] + " " + time.getDate() + ", " + year
		);
		
	},
	resetScene: function(event) {
		//Clear Button
		$("resultsArea").className = "palm-group";
		$("timeStamp").innerHTML = "";
		$("numberResult").innerHTML = "";
	
		this.controller.getSceneScroller().mojo.scrollTo(0,0, true);

	}

};

function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}

/* Model for Top Menu */
menuModel = {
	visible: true,
	items: [
		{},
		menu = {
			items:[
				{ label: $L('Num'), command: "GenerateNumber", toggleCmd: "GenerateNumber" },
				{ label: $L('Series'), command: "GenerateSeries", toggleCmd: "GenerateSeries" },
				{ label: $L('Coin'), command: "GenerateCoin", toggleCmd: "GenerateCoin" },
				{ label: $L('Lotto'), command: "GenerateTicket", toggleCmd: "GenerateTicket" }
			],
			toggleCmd: "GenerateNumber",
			checkEnabled: true

		},
		{}
	]
};

 


appMenuModel = {
    items: [
        {label: "About", command: 'About', shortcut: 'a'}
    ]
};
 

StageAssistant.prototype.setup = function() {
	/* On start show the connections screen */
	this.controller.pushScene("GenerateNumber");
};

StageAssistant.prototype.handleCommand = function(event) {
	if(event.type == Mojo.Event.command) {
		
		var currentScene = Mojo.Controller.stageController.activeScene().sceneName;
		var futureScene = event.command;
		if (futureScene == 'About') {
			this.controller.pushScene('About');
		}
		//Ensure scene not already active
		if (currentScene != futureScene) {
			this.controller.swapScene(futureScene);
		}
	} else if (event.type == Mojo.Event.back) {
		//Back Gesture
		//this.controller.popScene();

    }
		
};



StageAssistant.prototype.clearButtonPressed = function(event) {
	//Clear Button
	$("resultsArea").className = "palm-group";
	$("timeStamp").innerHTML = "";
	$("numberResult").innerHTML = "";

	this.controller.getSceneScroller().mojo.scrollTo(0,0);
	
};
