var startButton

function setupMenu()
{
    createCanvas(windowWidth, windowHeight);
    background(100,100,100);
    startButton = createButton('Start Game');
    startButton.position(windowWidth/2 - 40,300);
    startButton.mousePressed(gameStart);
    startButton.class('button');

}

function drawMenu()
{
    
}

function gameStart()
{
    startButton.hide();
    startGame = true;
}