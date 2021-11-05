var Engine = Matter.Engine, 
    Render = Matter.Render, 
    World = Matter.World, 
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;


var arena = new Arena();
var engine = Engine.create();

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  World.add(engine.world, arena.getBodies());
  Engine.run(engine);
}

function draw() {
  background(220);
  
}
