var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern=[]
var userClickedPattern=[];
var started=false;
var level = 0;
function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor((Math.random()*4))
  var randomChoosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
  console.log(gamePattern);
}
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").on("click",function(event){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animationPress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
function playSound(name){
  var selectedAudio="sounds/"+name+".mp3";
  var audio = new Audio(selectedAudio);
  audio.play();
}
function animationPress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
            $("#"+currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      console.log("sucess");
      if(currentLevel === gamePattern.length-1){
        nextSequence();
        setTimeout(function(){
          userClickedPattern=[];
        },100);
      }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  started=false;
}
