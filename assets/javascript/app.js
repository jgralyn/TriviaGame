var triviaQuestions = [{
	question: "In what year was Jay-Z's debut album released?",
	answerList: ["1991", "1996", "1995", "2000"],
	answer: 1
},{
	question: "Which was of these was not a nickname for the Notorious BIG?",
	answerList: ["Frank White", "BIg Poppa", "Slim", "Biggie"],
	answer: 2
},{
	question: "Who is the first female rapper to go platinum?",
	answerList: ["Foxy Brown", "Lil Kim", "Nicki Minaj", "Da Brat"],
	answer: 3
},{
	question: "Who was the mentor and former boss to Bad Boy founder Sean P-Diddy Combs?",
	answerList: ["Suge Knight", "Russel Simmons", "Jermaine Dupri", "Andre Harrell"],
	answer: 3
},{
	question: "Who was the fourth (silent) member of A Tribe Called Quest?",
	answerList: ["Nas", "Jarobi", "Dres", "Treach"],
	answer: 1
},{
	question: "What was the name of the legendary NY hip hop radio station in the 90s",
	answerList: ["103 Jamz", "B103", "Hot 97", "Power 92"],
	answer: 2
},{
	question: "Which of these artists DO NOT admit to using a ghost writer to write their lyrics?",
	answerList: ["Eazy-E", "Dr. Dre", "P-Diddy", "Pharrell"],
	answer: 3
},{
	question: "Who was record executive from Texas who started Rap-A-Lot records and helped pioneer the sound of Southern rap?",
	answerList: ["Suge Knight", "Jermaine Dupri", "Master P", "J-Prince"],
	answer: 3
},{
	question: "What was the name of the legendary Memphis rap duo?",
	answerList: ["8-Ball & MJG", "Three 6 Mafia", "Do or Die", "Ghetto Boyz"],
	answer: 0
},{
	question: "Which legendary rock group did was featured on Run DMC's hit Rock this Way?",
	answerList: ["Led Zeplin", "Bon Jovi", "Aerosmith", "Guns and Roses"],
	answer: 2
},{
	question: "What was the name of the rap group Tupac was a member of before going solo?",
	answerList: ["Jungle Brothers", "Digital Underground", "Crucial Conflict", "Pharcyde"],
	answer: 1
},{
	question: "What is the real name of the Texas rapper with the stage name of Scarface?",
	answerList: ["Perry Miller", "Andre Benjamin", "Brad Jordan", "Eric Sermon"],
	answer: 2
},{
	question: "Who was the NY gangstar suspected of being behind the Quad Studio shooting of Tupac Shakur?",
	answerList: ["Hatian Jack", "Big Meech", "Freeway Ricky", "Larry Hoover"],
	answer: 0
},{
	question: "What is the name of Westcoast rapper/producer who had beef with fellow Compton rapper Mc Eiht?",
	answerList: ["The Game", "Battlecat", "Daz Dillinger", "DJ Quick"],
	answer: 3
},{
	question: "'How many official members are in the Wu-Tang Clan?",
	answerList: ["5", "7", "11", "9"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}