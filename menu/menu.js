var startButton

var Engine = Matter.Engine,
    Render = Matter.Render,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Sleeping = Matter.Sleeping;

var drawBody = Helpers.drawBody;
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


function setupMenu()
{
    createCanvas(windowWidth, windowHeight);
    background(100,100,100);
    modo1 = createButton('Modo Padrão');
    modo1.position(windowWidth/2 - 40,300);
    modo1.mousePressed(modo1Start);
    modo1.class('button');
    modo2 = createButton('Modo com Obstáculos');
    modo2.position(windowWidth/2 - 70,360);
    modo2.mousePressed(modo2Start);
    modo2.class('button');

}

function drawMenu()
{
    
}

function modo1Start()
{
    modo1.hide();
    modo2.hide();
    startGame = true;
    chosenMode = 1;
}

function modo2Start()
{
    modo1.hide();
    modo2.hide();
    startGame = true;
    chosenMode = 2;
}