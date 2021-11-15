var button

function setupMenu()
{
    createCanvas(height,width);
    button = createButton('Start Game');
    button.position(0, 0);
    button.mousePressed(gameStart);
}

function drawMenu()
{
    
}

function gameStart()
{
    button.hide();
    startGame = true;
}