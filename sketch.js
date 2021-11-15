var startGame = false;
var gameIsRunning = false;

function setup()
{
  if (startGame == false)
  {
    setupMenu()
  }
  else 
  {
    setupGame()
  }

}

function draw()
{
  if (startGame) {
    setup()
    drawGame()
    gameIsRunning = true
  }
  if(gameIsRunning)
  {
    startGame = false;
    drawGame()
  }
}
