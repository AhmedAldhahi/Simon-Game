// let buttonColours = ["red","blue","green","yellow"];
// let userClickedPattern = [];
// let gamePattern = [];
// let level = 0;
// function nextSequence(){
//     userClickedPattern = [];
//     level++;
//     $("h1").text("level " + level.toString());
//     var randomNumber = Math.floor(Math.random() * 3) + 1;
//     let randomChosenColor = buttonColours[randomNumber];
//     gamePattern.push(randomChosenColor);
//     $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
//     playSound(randomChosenColor);
//
// }
//
// $(".btn").click(function (){
//     let userChosenColour = $(this).attr("id");
//     userClickedPattern.push(userChosenColour);
//     playSound(userChosenColour);
//     animatePress(userChosenColour);
//     checkAnswer(userChosenColour.length-1);
// });
// function checkAnswer(currentLevel){
//
//     // let mistake = false;
//     // for(let i = 0;i<gamePattern.length;i++)
//     // {
//     //     if(userClickedPattern[i] !== gamePattern[i]){
//     //         console.log("Wrong fool")
//     //         mistake = true
//     //     }
//     // }
//     // if (mistake !== true){
//     //     setTimeout(function (){
//     //         userClickedPattern = [];
//     //         nextSequence()
//     //
//     //     },100)
//
//     //}
//     if(gamePattern[currentLevel] === gamePattern[currentLevel]){
//         console.log("success");
//         if(userClickedPattern.length === gamePattern.length){
//             setTimeout(function (){
//                 nextSequence();
//             },1000);
//         }
//     }
//     else{
//         console.log("wrong");
//     }
//
// }
// function playSound(name){
//     var audio = new Audio("sounds/"+name+".mp3")
//     audio.play();
// }
// function animatePress(currentColour){
//     let color = $("#" + currentColour);
//     color.addClass("pressed");
//
//     setTimeout(function (){
//         color.removeClass("pressed");
//     },100);
//
//     //color.delay(100).removeClass("pressed");
// }
// let hasStarted = false;
// $(document).keypress(function (event){
//     if(hasStarted === false){
//         nextSequence();
//         hasStarted = true;
//     }
// });
//
//

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern.length-1);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});



//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function nextSequence() {

    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function startOver(){
    level = 0;
    gamePattern = [];
    $(document).keypress(function (){
        nextSequence();
    })
}

