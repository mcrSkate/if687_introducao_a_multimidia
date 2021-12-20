//var startButton

//Setando alias para módulos do Matter.js
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

var canvasMenu;

function setupMenu()
{
    //criando os botões e informações no menu
    imageMode(CORNER);
    createCanvas(windowWidth, windowHeight);
    backgroundImagem.resize(windowWidth,windowHeight);
    background(backgroundImagem);
    textSize(100);
    strokeWeight(8);
    stroke(0,0,255);
    fill(255);
    text("Car Hockey", windowWidth/2 - 270, 200);
    modo1 = createButton('Modo Padrão');
    modo1.position(windowWidth/2 - 70,300);
    modo1.mousePressed(modo1Start);
    modo1.class('button');
    modo2 = createButton('Modo com Obstáculos');
    modo2.position(windowWidth/2 - 100,360);
    modo2.mousePressed(modo2Start);
    modo2.class('button');
    modo3 = createButton('Modo com 2 discos');
    modo3.position(windowWidth/2 - 90,420);
    modo3.mousePressed(modo3Start);
    modo3.class('button');
    
}
/*
function drawMenu()
{
    
}
*/
function modo1Start() //função para startar o modo 1
{
    modo1.hide();
    modo2.hide();
    modo3.hide();
    startGame = true;
    chosenMode = 1;
}

function modo2Start() //função para startar o modo 2
{
    modo1.hide();
    modo2.hide();
    modo3.hide();
    startGame = true;
    chosenMode = 2;
}

function modo3Start() //função para startar o modo 2
{
    modo1.hide();
    modo2.hide();
    modo3.hide();
    startGame = true;
    chosenMode = 3;
}