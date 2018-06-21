// Advanced Trivia Game Javascript Engine

// begin document.ready function
$(document).ready(function() {

    // ====================
    // FIRST COME VARIABLES
    // ====================
    
    // define questions objects
    // each contains the question, possible answers,
    // index of correct answer within possible answers (beginning
    // with 0 index), location of media for correct response, and
    // location of media for incorrect response
    var question0 = {
        question: "What does CMC stand for in Magic the Gathering?",
        answers: ["Card Mana Cost", "Crowd Magic Control", "Cost Mana Counter", "Card Mana Counter"],
        correctAnswer: 0,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }
    
    var question1 = {
        question: "What is Fry's middle initial from Futurama?",
        answers: ["P", "J", "Q", "G"],
        correctAnswer: 1,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }
    
    var question2 = {
        question: "What is the genre of the Cantina Music from Star Wars?",
        answers: ["Baka rock", "Rodian rumba", "Jizz", "Tatooine blues"],
        correctAnswer: 2,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }
    
    var question3 = {
        question: "What TV series are Cylons from?",
        answers: ["Star Trek", "Legion", "Firefly", "Battlestar Galactica"],
        correctAnswer: 3,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }
    
    var question4 = {
        question: "What is the name of the small, furry, gentle, attractive, and slow-moving but rapidly-reproducing invasive species from Star Trek?",
        answers: ["Tribbles", "Glip-Glops", "Mugato", "Horta"],
        correctAnswer: 0,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }
    
    var question5 = {
        question: "What Dimension is the main Rick and Morty from?",
        answers: ["C-132", "Dimension J19ζ7", "Dimension 304-X", "C-137"],
        correctAnswer: 3,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }
    
    var question6 = {
        question: "What is the kekkei genkai of the Uchiha bloodline?",
        answers: ["Byakugan", "Rinnegan", "Sharingan", "Tenseigan"],
        correctAnswer: 2,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }
    
    var question7 = {
        question: "What is the name of the Bounty Hunter TV Show from Cowboy Bebop?",
        answers: ["Bounty Board", "Punch & Judy", "Big Shot", "Cowboy Corral!"],
        correctAnswer: 2,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }

    var question8 = {
        question: 'The Character "Master Hand" is from which video game?',
        answers: ["Metal Gear Solid", "Super Smash Bros", "Marvels Iron Fist", "Playstation Allstars"],
        correctAnswer: 1,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }

    var question9 = {
        question: "Who are the main characters from the movie Princess Mononoke?",
        answers: ["Lady Eboshi & Jogi", "Chihiro & Haku", "Sophie & Howl", "San & Ashitaka"],
        correctAnswer: 3,
        correctMedia: "assets/images/correct.jpg",
        incorrectMedia: "assets/images/incorrect.jpg"
    }
    
    // define array of all the question objects
    var allQuestionsArray = [question0, question1, question2, question3, question4, question5, question6, question7, question8, question9];
    
    // define object containing ongoing game variables 
    var gameVariables = {
        answeredCorrectly: 0,
        answeredIncorrectly: 0,
        unanswered: 0,
        currentQuestion: 0
    }
    
    // =====================
    // SECOND COME FUNCTIONS
    // =====================
    
    // function to reset game variables
    function resetVariables() {
        console.log("resetVariables function reached");
        gameVariables.answeredCorrectly = 0;
        gameVariables.answeredIncorrectly = 0;
        gameVariables.unanswered = 0;
        gameVariables.currentQuestion = 0;
    }
    
    // function that runs a timer countdown
    function startTimer() {
        // set timeout to 31 seconds so display begins with 30 seconds
        // because first display comes after initial interval of 1 sec
        var timeout = 31;
        function run() {
            counter = setInterval(decrement, 1000);
        }
        function decrement() {
            timeout--;
            // $("#timer").show();
            $("#timerDiv").html("<h2>Time Remaining: " + timeout + "</h2>");
    
            if (timeout == 0) {
                // if time runs out, stop the timer, display time's up and ...
                $("#timerDiv").html("&nbsp;");
                clearInterval(counter);
                // ... and also run the timesUp function
                timesUp();
            }
        }
        run();
    }
    
    // playGame function that controls flow of game
    function displayQuestion() {
        console.log("playGame function reached");
    
        // when user is guessing start music playing
        audio = new Audio("assets/sounds/jeopardy-theme-song.mp3");
        audio.play();
    
        // hide startButton and startOverButton and checkAnswer div
        $("#startButton").hide();
        $("#startOverButton").hide();
        $("#checkAnswer").hide();
    
        // check if all questions have been used and if they have then move to
        // final results tabulation
        if (gameVariables.currentQuestion > allQuestionsArray.length-1) {
            finalResults();
        // if they haven't all been used, then play the question
        } else if (gameVariables.currentQuestion <= allQuestionsArray.length) {
    
            // display timer and start it up
            $("#timerDiv").show();
            startTimer();
    
            // set up questionAsked board and show it
            $("#questionAsked").show();
            // populate theQuestion div with the question
            $("#theQuestion").html("<h3>" + allQuestionsArray[gameVariables.currentQuestion].question + "</h3>");
            // populate the text of the four buttons for possible responses
            $("#button0").text(allQuestionsArray[gameVariables.currentQuestion].answers[0]);
            $("#button1").text(allQuestionsArray[gameVariables.currentQuestion].answers[1]);
            $("#button2").text(allQuestionsArray[gameVariables.currentQuestion].answers[2]);
            $("#button3").text(allQuestionsArray[gameVariables.currentQuestion].answers[3]);
        } else {
            console.log("error caught - question counting problem");
        }
    }
    
    // function to run when player selects an answer
    function checkSelection() {
        console.log("check selection function reached");
        
        // hide the questionAsked board and stop the timer
        $("#questionAsked").hide();
        clearInterval(counter);
        $("#timerDiv").html("&nbsp;");
    
        // if answer was right
        if (userGuess.data("value") == allQuestionsArray[gameVariables.currentQuestion].correctAnswer) {
            console.log(userGuess.data("value"));
            console.log("correct");
            // run the correctAnswer function
            correctAnswer();
        }
        // else if answer was wrong
        else {
            console.log(userGuess.data("value"));
            console.log("incorrect");
            // run the incorrectAnswer function
            incorrectAnswer();
        }
    
    }
    
    // function that is run when player has selected the right answer
    function correctAnswer() {
        console.log("correctAnswer function reached");
    
        // hide the questionAsked Board and display the checkAnswer board
        $("#questionAsked").hide();
        $("#checkAnswer").show();
    
        // increment answeredCorrectly which holds running tally of correct
        // guesses, and then display the results
        gameVariables.answeredCorrectly++;
        $("#checkAnswer").html("<h2><p>Correct!</p></h2><img src='" + allQuestionsArray[gameVariables.currentQuestion].correctMedia + "' alt='correct'>");
        console.log(gameVariables);
    
        // wait 5 seconds to show gif and also increase currentQuestion by 1 so
        // that next round the subsequent question is played,
        // then resume playing the game
        gameVariables.currentQuestion++;
        setTimeout (function() {
            displayQuestion();
        }, 5000);
    }
    
    // function that is run when player has selected the wrong answer
    function incorrectAnswer() {
        console.log("incorrectAnswer function reached");
    
        // hide the questionAsked Board and display the checkAnswer board
        $("#questionAsked").hide();
        $("#checkAnswer").show();
    
        // increment answeredIncorrectly which holds running tally of wrong
        // guesses, and then display the results
        gameVariables.answeredIncorrectly++;
        $("#checkAnswer").html("<h2><p>Incorrect!</p><p>Correct answer was: " + allQuestionsArray[gameVariables.currentQuestion].answers[allQuestionsArray[gameVariables.currentQuestion].correctAnswer] + "</p></h2><img src='" + allQuestionsArray[gameVariables.currentQuestion].incorrectMedia + "' alt='incorrect'>");
        console.log(gameVariables);
    
        // wait 5 seconds to show gif and also increase currentQuestion by 1 so
        // that next round the subsequent question is played,
        // then resume playing the game
        gameVariables.currentQuestion++;
        setTimeout (function() {
            displayQuestion();
        }, 5000);
    }
    
    // function that is run if user fails to guess within time
    function timesUp() {
        console.log("timesUp function reached");
        
        // hide the questionAsked Board and display the checkAnswer board
        $("#questionAsked").hide();
        $("#checkAnswer").show();
    
        // increment unanswered questions then display the results
        gameVariables.unanswered++;
        $("#checkAnswer").html("<h2><p>Time's up!</p><p>Correct answer was: " + allQuestionsArray[gameVariables.currentQuestion].answers[allQuestionsArray[gameVariables.currentQuestion].correctAnswer] + "</p></h2><img src='assets/images/unanswered.gif' alt='unanswered'>");
        console.log(gameVariables);
    
        // wait 5 seconds to show gif and also increase currentQuestion by 1 so
        // that next round the subsequent question is played,
        // then resume playing the game
        gameVariables.currentQuestion++;
        setTimeout (function() {
            displayQuestion();
        }, 5000);
    }
    
    function finalResults() {
        console.log("finalResults function reached");
    
        // show the checkAnswer div as that is where we will put results
        // and also show the startOverButton and hide the timerDiv
        $("#timerDiv").hide();
        $("#checkAnswer").show();
        $("#startOverButton").show();
    
        // populate results in checkAnswer div
        console.log(gameVariables);
        $("#checkAnswer").html("<h2><p>All done! Here's how you did!</p><p>Correct: " + gameVariables.answeredCorrectly + "</p><p>Incorrect: " + gameVariables.answeredIncorrectly + "</p><p>Unanswered: " + gameVariables.unanswered + "</p></h2>");
    }
    
    // ===================
    // THIRD COMES THE APP
    // ===================
    
    // begin by resetting variables
    resetVariables();
    
    $("#startButton").on("click", function() {
        resetVariables();
        displayQuestion();
    });
    
    $("#startOverButton").on("click", function() {
        resetVariables();
        audio.pause();
        displayQuestion();
    });
    
    $(".options").on("click", function() {
        userGuess = $(this);
        audio.pause();
        checkSelection();
    });
    
    // end document.ready function
    });