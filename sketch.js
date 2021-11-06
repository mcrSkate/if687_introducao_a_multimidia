const Engine = Matter.Engine, 
    Render = Matter.Render, 
    World = Matter.World, 
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;


//var arena = new Arena();
var pontos1 = 0, pontos2 = 0;

const drawBody = Helpers.drawBody;
var engine;

var left1,left2,right1,right2,up,bottom,disco,gol1,gol2;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  engine.world.gravity.y = 0;

  gol1 = Bodies.rectangle(-75,windowHeight/2,1,windowHeight/3, {isStatic:true, isSensor:true, restitution:1, name:'gol1'});
  gol2 = Bodies.rectangle(windowWidth+75,windowHeight/2,1,windowHeight/3, {isStatic:true, isSensor:true, restitution:1, name:'gol2'});
  left1 = Bodies.rectangle(5,windowHeight/6,10,windowHeight/3, {restitution: 1, isStatic: true, friction: 0});//left
  right1 = Bodies.rectangle(windowWidth-5, windowHeight/6, 10, windowHeight/3, {restitution: 1, isStatic: true, friction: 0});//right
  left2 = Bodies.rectangle(5,5*windowHeight/6,10,windowHeight/3, {restitution: 1, isStatic: true, friction: 0});//left
  right2 = Bodies.rectangle(windowWidth-5, 5*windowHeight/6, 10, windowHeight/3, {restitution: 1, isStatic: true, friction: 0});//right
  up = Bodies.rectangle(windowWidth/2,5,windowWidth-20,10, {restitution: 1, isStatic: true, friction: 0});//top
  bottom = Bodies.rectangle(windowWidth/2,windowHeight-5,windowWidth-20,10, {restitution: 1, isStatic: true, friction: 0});//down
  disco = Bodies.circle(windowWidth/2,windowHeight/2,50, {restitution: 1, friction: 0});
  World.add(engine.world, [left1,right1,left2,right2,up,bottom,disco,gol1,gol2]);

  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05, angularStiffness: 0 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  Engine.run(engine);

  Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.name === "gol1") {
      pontos2++;
      Body.setPosition(disco,{x:windowWidth/2,y:windowHeight/2});
      Body.setVelocity(disco,{x:0,y:0});
    }else if(bodyA.name==="gol2"){
      pontos1++;
      Body.setPosition(disco,{x:windowWidth/2,y:windowHeight/2});
      Body.setVelocity(disco,{x:0,y:0});
    }
    
  });
}


function verifyPositon(){
  if(disco.x<5){
    pontos2++;
  }
  if(disco.x>windowWidth-5){
    pontos1++;
  }
}

function draw() {
  background(255);
  verifyPositon();
  stroke(0);
  fill(0);
  textSize(20)
  text(pontos1, 100, 100);
  text(pontos2,windowWidth-100, 100);
  drawBody(gol1);
  drawBody(gol2);
  drawBody(left1);
  drawBody(right1);
  drawBody(left2);
  drawBody(right2);
  drawBody(up);
  drawBody(bottom);
  drawBody(disco);
  
}
