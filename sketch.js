var startGame = false;
var gameIsRunning = false;
var chosenMode = 0;

function setup()
{
  if (startGame == false)
  {
    setupMenu()
  }
  else if(chosenMode == 1)
  {
    modo1_setupGame();
  }else if(chosenMode == 2){
    modo2_setupGame();
  }

}

function draw()
{
  if (startGame) {
    setup()
    if(chosenMode == 1){
      modo1_drawGame()
    }
    if(chosenMode == 2){
      modo2_drawGame()
    }
    gameIsRunning = true
  }
  if(gameIsRunning)
  {
    startGame = false;
    if(chosenMode == 1){
      modo1_drawGame()
    }
    if(chosenMode == 2){
      modo2_drawGame()
    }
  }
}
