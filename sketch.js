//sketch principal

var startGame = false;
var gameIsRunning = false;
var chosenMode = 0;
var carImages = [], wheel, backgroundImagem;

function preload() {
  carImages[0] = loadImage('./assets/grey.png');
  carImages[1] = loadImage('./assets/light_blue.png');
  carImages[2] = loadImage('./assets/beige.png');
  carImages[3] = loadImage('./assets/green.png');
  carImages[4] = loadImage('./assets/orange.png');
  carImages[5] = loadImage('./assets/pink.png');
  carImages[6] = loadImage('./assets/blue.png');
  carImages[7] = loadImage('./assets/purple.png');
  carImages[8] = loadImage('./assets/red.png');
  carImages[9] = loadImage('./assets/yellow.png');
  wheel = loadImage('./assets/wheel.png');
  backgroundImagem = loadImage('./assets/gelo.jpg');
}

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
  } else if(chosenMode == 3){
    modo3_setupGame();
  }
  
}


//draw principal
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
    if(chosenMode == 3){
      modo3_drawGame()
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
    if(chosenMode == 3){
      modo3_drawGame()
    }
  }
}
