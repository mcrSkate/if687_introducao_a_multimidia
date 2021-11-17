const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var isGamePaused = false;

var canvas;

var pontos1 = 0, pontos2 = 0, wheel, wheels1, wheels2; acellaration1 = 0, acellaration2 = 0, randomAux1 = 0, randomAux2 = 0;
const drawBody = Helpers.drawBody;
var engine;
var carImages = [];
var left1, left2, right1, right2, up, bottom, disco, gol1, gol2;
var car1, car2;
var carImage1, carImage2;

var pauseButton;

function setupGame() {
    randomAux1 = Math.floor(random(10));
    carImage1 = carImages[randomAux1];
    randomAux2 = Math.floor(random(10));
    while(randomAux2==randomAux1){
        randomAux2 = Math.floor(random(10));
    }
    carImage2 = carImages[randomAux2];
    canvas = createCanvas(windowWidth, windowHeight);
    wheels1 = 0;
    wheels2 = 0;
    engine = Engine.create();

    engine.world.gravity.y = 0;

    gol1 = Bodies.rectangle(-20, windowHeight / 2, 1, windowHeight / 3, { isStatic: true, restitution: 1, name: 'gol1' });
    gol2 = Bodies.rectangle(windowWidth + 20, windowHeight / 2, 1, windowHeight / 3, { isStatic: true, restitution: 1, name: 'gol2' });
    left1 = Bodies.rectangle(25, windowHeight / 6, 50, windowHeight / 3, { restitution: 1, isStatic: true, friction: 0 });//left
    right1 = Bodies.rectangle(windowWidth - 25, windowHeight / 6, 50, windowHeight / 3, { restitution: 1, isStatic: true, friction: 0 });//right
    left2 = Bodies.rectangle(25, 5 * windowHeight / 6, 50, windowHeight / 3, { restitution: 1, isStatic: true, friction: 0 });//left
    right2 = Bodies.rectangle(windowWidth - 25, 5 * windowHeight / 6, 50, windowHeight / 3, { restitution: 1, isStatic: true, friction: 0 });//right
    up = Bodies.rectangle(windowWidth / 2, 25, windowWidth - 100, 50, { restitution: 1, isStatic: true, friction: 0 });//top
    bottom = Bodies.rectangle(windowWidth / 2, windowHeight - 25, windowWidth - 100, 50, { restitution: 1, isStatic: true, friction: 0 });//down
    disco = Bodies.circle(windowWidth / 2, windowHeight / 2, 50, { restitution: 1, frictionAir: 0, friction: 0, density: 0.00001, name: 'disco', mass: 0.1 });
    car1 = Bodies.rectangle(windowWidth - 100, windowHeight / 2, 80, 50, { restitution: 0.5, friction: 0, frictionAir: 0.03, density: 0.002, mass: 5 });
    car2 = Bodies.rectangle(100, windowHeight / 2, 80, 50, { restitution: 0.5, friction: 0, frictionAir: 0.03, density: 0.002, mass: 5 });
    World.add(engine.world, [left1, right1, left2, right2, up, bottom, disco, gol1, gol2, car1, car2]);


    let mouse = Mouse.create(canvas.elt);
    let mouseParams = {
        mouse: mouse,
        constraint: { stiffness: 0.05, angularStiffness: 0 }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);

    Engine.run(engine);

    Events.on(engine, 'collisionStart', function (event) {
        const pairs = event.pairs[0];
        const bodyA = pairs.bodyA;
        const bodyB = pairs.bodyB;
        if (bodyA.name === "gol1" && bodyB.name === "disco") {
            pontos2++;
            resetPoint();

        } else if (bodyA.name === "gol2" && bodyB.name === "disco") {
            pontos1++;
            resetPoint();
        }

    });

    pauseButton = createButton('❙❙');
    pauseButton.position(windowWidth/2 - 10 ,8);
    pauseButton.mousePressed(pauseGame);
    pauseButton.class('button');
}

function resetPoint() { //deixa tudo com estado inicial
    Body.setPosition(disco, { x: windowWidth / 2, y: windowHeight / 2 });
    Body.setVelocity(disco, { x: 0, y: 0 });
    Body.setPosition(car1, { x: windowWidth - 100, y: windowHeight / 2 });
    Body.setVelocity(car1, { x: 0, y: 0 });
    Body.setPosition(car2, { x: 100, y: windowHeight / 2 });
    Body.setVelocity(car2, { x: 0, y: 0 });
    Body.setAngle(car1, 0);
    Body.setAngle(car2, 0);
    Body.setAngle(disco, 0);
    wheels1 = 0;
    wheels2 = 0;
    Body.setAngularVelocity(disco, 0);
}

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
}

function drawGame() {
   if (isGamePaused == false)
   {
    background(255);
    //verifyPositon();
    stroke(0);
    fill(0);
    drawBody(gol1);
    drawBody(gol2);
    drawBody(left1);
    drawBody(right1);
    drawBody(left2);
    drawBody(right2);
    drawBody(up);
    drawBody(bottom);
    drawBody(disco);
    fill(255);
    textSize(20)
    text(pontos1, 30, 30);
    text(pontos2, windowWidth - 40, 30);
    checkCar1Control();
    checkCar2Control();
    imageMode(CENTER);
    translate(car1.position.x, car1.position.y);//abaixo sao rotacoes e translacoes para poder alinhar a imagem ao movimento do carro, fazendo com que ela sempre rotacione de acordo com o angulo do body
    rotate(car1.angle+PI);
    image(carImage1, 0, 0, 85, 55);
    rotate(-car1.angle-PI);
    translate(-car1.position.x, -car1.position.y);
    translate(car2.position.x, car2.position.y);
    rotate(car2.angle);
    image(carImage2, 0, 0, 85, 55);
    rotate(-car2.angle);
    translate(-car2.position.x, -car2.position.y);
    line(car1.position.x, car1.position.y, car1.position.x + car1.velocity.x * 10, car1.position.y + car1.velocity.y * 10);//mostra o vetor velocidade do carro 1
    line(car2.position.x, car2.position.y, car2.position.x + car2.velocity.x * 10, car2.position.y + car2.velocity.y * 10);//mostra o vetor velocidade do carro 2
    stroke(255, 0, 0);
    line(car1.position.x, car1.position.y, car1.position.x + 30 * cos(car1.angle + wheels1 + PI), car1.position.y + 30 * sin(car1.angle + wheels1 + PI));//mostra a direcao da roda do carro 1
    line(car2.position.x, car2.position.y, car2.position.x + 30 * cos(car2.angle + wheels2), car2.position.y + 30 * sin(car2.angle + wheels2));//mostra a direcao da roda do carro 2
    translate(disco.position.x, disco.position.y);
    rotate(disco.angle);
    image(wheel, 0, 0, 100, 100);
    rotate(-disco.angle);
    translate(-disco.position.x, -disco.position.y);
    if (car1.speed > 0.01) {//esse if e por cause que tem um bug que a speed nunca zera de verdade, por causa da conversao dos numeros fracionarios, ai e pra não ficar uma notacao cientifica do tipo 4.28487578283723e-25 ou algo do tipo
        text(Math.round(car1.speed * 60), windowWidth - 50, windowHeight - 30, 30);
    }
    else {
        text(0, windowWidth - 50, windowHeight - 30, 30);//printa isso aqui em vez da notacao cientifica de numeros muito baixos
    }
    if (car2.speed > 0.01) {//mesma coisa do if acima, mas para o carro 2
        text(Math.round(car2.speed * 60), 50, windowHeight - 30, 30);
    }
    else {
        text(0, 50, windowHeight - 30, 30);//printa o 0 pro carro 2
    }
   }
}


function checkCar1Control() {
    if (keyIsDown(RIGHT_ARROW)) {//movimentacao das rodas do carro
        if (wheels1 < PI / 6) {
            wheels1 += PI / 180;
        }
    }
    if (keyIsDown(LEFT_ARROW)) {
        if (wheels1 > -PI / 6) {
            wheels1 -= PI / 180;
        }
    }
    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {//serve para dar mais suavidade quando nao ta tendo nem aceleracao nem frenagem
        car1.frictionAir = 0.1;
        acellaration1 = 0;
    } else {
        car1.frictionAir = 0.03;
    }
    if (keyIsDown(UP_ARROW)) { //acelera o carro
        acellaration1 = -0.1;
        Body.setAngle(car1, car1.angle += wheels1 / 360);
    }
    if (keyIsDown(DOWN_ARROW)) {//freia o carro e, eventualmente, da re
        acellaration1 = 0.05;
        Body.setAngle(car1, car1.angle -= wheels1 / 360);
    }
    if (car1.speed < 4) {//limita a velocidade do carro 1, para nao crescer infinitamente
        Body.setVelocity(car1, { x: car1.velocity.x + acellaration1 * cos(car1.angle + wheels1), y: car1.velocity.y + acellaration1 * sin(car1.angle + wheels1) });
    }
    Body.setPosition(car1, { x: car1.position.x + car1.velocity.x, y: car1.position.y + car1.velocity.y });//atualiza a posicao do carro de acordo com a velocidade
}

function checkCar2Control() {//mesma coisa que encima, so que pro carro 2
    //65 a 68 d 83 s 87 w
    if (keyIsDown(68)) {
        if (wheels2 < PI / 6) {
            wheels2 += PI / 180;
        }
    }
    if (keyIsDown(65)) {
        if (wheels2 > -PI / 6) {
            wheels2 -= PI / 180;
        }
    }
    if (!keyIsDown(87) && !keyIsDown(83)) {
        car2.frictionAir = 0.1;
        acellaration2 = 0;
    } else {
        car2.frictionAir = 0.03;
    }
    if (keyIsDown(87)) {
        acellaration2 = 0.1;
        Body.setAngle(car2, car2.angle += wheels2 / 360);
    }
    if (keyIsDown(83)) {
        acellaration2 = -0.05;
        Body.setAngle(car2, car2.angle -= wheels2 / 360);
    }
    if (car2.speed < 4) {
        Body.setVelocity(car2, { x: car2.velocity.x + acellaration2 * cos(car2.angle + wheels2), y: car2.velocity.y + acellaration2 * sin(car2.angle + wheels2) });
    }
    Body.setPosition(car2, { x: car2.position.x + car2.velocity.x, y: car2.position.y + car2.velocity.y });


    //rascunhos
    /*if (keyIsDown(87)) {
      Body.setVelocity(car2, {x:min(3,car2.velocity.x+(0.1*cos(car2.angle))), y:min(3,car2.velocity.y+(0.1*sin(car2.angle)))});
      if (keyIsDown(65)) {
        Body.setAngle(car2, car2.angle-PI/60);
      }
      if (keyIsDown(68)) {
        Body.setAngle(car2, car2.angle+PI/60);
      }
    }
    if (keyIsDown(83)) {
      Body.setVelocity(car2, {x:max(-0.2,car2.velocity.x-(0.1*cos(car2.angle))), y:max(-0.2,car2.velocity.y-(0.1*sin(car2.angle)))})
      if (keyIsDown(65)) {
        Body.setAngle(car2, car2.angle+PI/180);
      }
      if (keyIsDown(68)) {
        Body.setAngle(car2, car2.angle-PI/180);
      }
    }
    Body.setPosition(car2, {x:car2.position.x+car2.velocity.x, y:car2.position.y+car2.velocity.y});*/
}


function pauseGame()
{
    if (isGamePaused == false)
    {
        isGamePaused = true;
        filter(BLUR, 2);
        pauseButton.html('►');
    }
    else 
    {
        isGamePaused = false;
        pauseButton.html('❙❙');
    }
    
}