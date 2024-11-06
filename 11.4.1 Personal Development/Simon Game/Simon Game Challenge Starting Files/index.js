var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false
var level = 1;

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    animateChosenColor(randomChosenColour);
    playSound(randomChosenColour);
}
// Started the game by pressing 'e'
$(document).on("keydown",function(event){
    switch (event.key) {
        case "e":
            if (started === false) {
                nextSequence();
                $("h1").text("Level " + level);
                started = true;    
            } 
            break;
    
        default:
            break;
    }
});

// 
$(".btn").on("click",function(){
    if(started === true){
        if (userClickedPattern.length !== gamePattern.length){
            var userChosenColor = $(this).attr("id");
            console.log(userChosenColor + " is your chosen color");
            userClickedPattern.push(userChosenColor);
            animateChosenColor(userChosenColor);
            playSound(userChosenColor);
            // quickCheck
            if(userClickedPattern.length === gamePattern.length){
            setTimeout(checkAnswers,1000,level);
            }
        }
    }
});

function playSound(nameOfSound){
    var audio = new Audio('./sounds/'+nameOfSound+'.mp3');
    audio.play();
}
function animateChosenColor(chosenColor){
    $("#"+chosenColor).fadeOut(100).fadeIn(100);
}

function checkAnswers(level){
    for (var i = 0; i<gamePattern.length;i++){
        if(userClickedPattern[i] === gamePattern[i]){
            console.log("Win in level " + level);
            level = level + 1;
            $("h1").text("Level " + level);

        }else{
            $("h1").text("Gameover, press E key to restart the game");
            gamePattern = [];
            userClickedPattern = [];
            started = false;
            var wrongSound = new Audio('./sounds/wrong.mp3');
            wrongSound.play();
            $("body").toggleClass("game-over");
            setTimeout(function(){
                $("body").toggleClass("game-over");
            },100);
        }
    }
    nextSequence();
    userClickedPattern = [];
}