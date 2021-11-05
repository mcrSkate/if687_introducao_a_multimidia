const Engine = Matter.Engine, 
    Render = Matter.Render, 
    World = Matter.World, 
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;


//var arena = new Arena();

const drawBody = Helpers.drawBody;
var engine;

var left,right,up,bottom, disco;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  engine.world.gravity.y = 0;

  
  left = Bodies.rectangle(5,windowHeight/2,10,windowHeight, {restitution: 1, isStatic: true, friction: 0});//left
  right = Bodies.rectangle(windowWidth-5, windowHeight/2, 10, windowHeight, {restitution: 1, isStatic: true, friction: 0});//right
  up = Bodies.rectangle(windowWidth/2,5,windowWidth-20,10, {restitution: 1, isStatic: true, friction: 0});//top
  bottom = Bodies.rectangle(windowWidth/2,windowHeight-5,windowWidth-20,10, {restitution: 1, isStatic: true, friction: 0});//down
  disco = Bodies.circle(windowWidth/2,windowHeight/2,50, {restitution: 1, friction: 0});
  World.add(engine.world, [left,right,up,bottom,disco]);

  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05, angularStiffness: 0 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  Engine.run(engine);
  
}

function draw() {
  background(255);
  stroke(0);
  fill(0);
  
  drawBody(left);
  drawBody(right);
  drawBody(up);
  drawBody(bottom);
  drawBody(disco);
  
}
