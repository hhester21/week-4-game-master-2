$(document).ready(function() {

	// declaring variables

	// array of crystal images
	crystals = ["assets/images/pink.png",
				"assets/images/blue.png",
				"assets/images/orange.png",
				"assets/images/green.png"];

	// initializing playersScore, wins, losses
	var playerScore = 0;
	var wins = 0;
	var losses = 0;

	// sets wins and loses to 0 on screen
	$("#wins").text(wins);
	$("#losses").text(losses);
	
	// start game by calling functions
	assignCrystals();
	startGame();

	// function to:
	//  1) assign random numbers between 1-12 to crystals
	//  2) send crystal images to #crystals 
	function assignCrystals() {
		
		// array that will store the random number of each crystal
		var numbers = [];

		// makes sure there's only 4 items in numbers[]
		while(numbers.length < 4){

			// get a random number to assign to each crystal
			var randomNumber = Math.floor(Math.random() * 12 + 1);

			// boolean to make sure crystals don't have same value
			var same = false;

			for (var i = 0; i < 4; i++){
				// check if value is equal as value before
				if (numbers[i] == randomNumber) {
					same = true; 
					break
				}
			 }

			// if not same value, assign that value to numbers[numbers.length]
			if (!same) {
				numbers[numbers.length] = randomNumber;
			}
		}

		// prints each crystal's value in the console
		console.log(numbers);		

		// adds the images of the crystals to #crystals
		for (i = 0; i < 4; i++) {
			
			// creates img tag to for crystals
			var crystalImg = $("<img>");

			// assigns attributes to each new crystal
			crystalImg.attr({
				"data-num": numbers[i],
				"src": crystals[i],
				alt: "crystals",
				class: "crystalImg"
			});
			$("#crystals").append(crystalImg);
		}
	}

	// function that:
	// 1) starts the game
	// 2) checks win/lose conditions
	function startGame() {

		// selects the random number between 19 and 120 that player will have to match
		// & updates it on screen
		var numberToMatch = Math.floor(Math.random()*(120 - 19 + 1) + 19);
		$("#matchingNumber").text(numberToMatch);

		// sets playerScore to 0 every time we start a new game
		// & updates it on screen
		playerScore = 0;

		// when a crystal image is clicked, it adds the number of that crystal image
		// to playerScore
		$(".crystalImg").on("click", function(){

			// empties #status
			$("#status").text("");

			// adds the value of the crystal image clicked to previous playerScore
		    // & updates it on screen 
		    playerScore += parseInt($(this).data("num"));
		    $("#yourTotalScore").text(playerScore);

		    // winning condition
		    if (playerScore == numberToMatch) {
		    	$("#status").text("You won! =)");
		    	wins ++;	// adds 1 to wins
		    	$("#wins").text(wins);	// updates number of wins on screen
		    	$("#crystals").empty();	// delete's previous crystals
		        assignCrystals();	// makes new crystals with new values
		        startGame();	 // play again

		    // losing condition
		    } else if (playerScore > numberToMatch) {
		    	$("#status").text("Sorry! You lost! =(");
		        losses ++;	// adds 1 to losses
		        $("#losses").text(losses); // updates nunmber of losses on screen
		        $("#crystals").empty();	// delete's previous crystals
		        assignCrystals();	// makes new crystals with new values
		        startGame();	 // play again
		    }

		});
	}

});