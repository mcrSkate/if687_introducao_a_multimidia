let canvas3;

let mode3_pontos1 = 0, mode3_pontos2 = 0, mode3_wheels1, mode3_wheels2; mode3_acellaration1 = 0, mode3_acellaration2 = 0, mode3_randomAux1 = 0, mode3_randomAux2 = 0;

let mode3_engine;

let mode3_left1, mode3_left2, mode3_right1, mode3_right2, mode3_up, mode3_bottom, mode3_disco1, mode3_disco2, mode3_gol1, mode3_gol2;
let mode3_car1, mode3_car2;
let mode3_carImage1, mode3_carImage2;

let mode3_winner = 0;
let mode3_restartButton;
let mode3_menuButton;
let mode3_isRunning = true;

function modo3_setupGame(){
    mode3_pontos1 = 0;
    mode3_pontos2 = 0;
    mode3_winner = 0;
    mode3_isRunning = true;
    mode3_menuButton = createButton('Voltar ao Menu');
    mode3_menuButton.position(windowWidth/2 - 50, windowHeight/2+120);
    mode3_menuButton.mousePressed(()=>{
        mode3_menuButton.hide()
        mode3_restartButton.hide();
        mode3_isRunning = false
        Engine.clear(mode3_engine)
        setupMenu();
    })
    mode3_menuButton.class('button');
    mode3_menuButton.hide();
    mode3_restartButton = createButton('Reiniciar');
    mode3_restartButton.position(windowWidth/2 - 30, windowHeight/2 + 70);
    mode3_restartButton.mousePressed( () => {
        mode3_menuButton.hide()
        mode3_restartButton.hide()
        mode3_pontos1 = 0;
        mode3_pontos2 = 0;
        mode3_winner = 0;
        modo3_resetPoint();
    });
    mode3_restartButton.class('button');
    mode3_restartButton.hide();
    mode3_randomAux1 = Math.floor(random(10));
    mode3_carImage1 = carImages[mode3_randomAux1];
    mode3_randomAux2 = Math.floor(random(10));
    while(mode3_randomAux2==mode3_randomAux1){
        mode3_randomAux2 = Math.floor(random(10));
    }
    mode3_carImage2 = carImages[mode3_randomAux2];
    canvas3 = createCanvas(windowWidth, windowHeight);
    mode3_wheels1 = 0;
    mode3_wheels2 = 0;
    mode3_engine = Engine.create();

    mode3_engine.world.gravity.y = 0;

    mode3_gol1 = Bodies.rectangle(-20, windowHeight / 2, 1, windowHeight / 3, { isStatic: true, restitution: 0, friction: 1, name: 'mode3_gol1' });
    mode3_gol2 = Bodies.rectangle(windowWidth + 20, windowHeight / 2, 1, windowHeight / 3, { isStatic: true, friction:1, restitution: 0, name: 'mode3_gol2' });
    mode3_left1 = Bodies.rectangle(25, windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//left
    mode3_right1 = Bodies.rectangle(windowWidth - 25, windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//right
    mode3_left2 = Bodies.rectangle(25, 5 * windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//left
    mode3_right2 = Bodies.rectangle(windowWidth - 25, 5 * windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//right
    mode3_up = Bodies.rectangle(windowWidth / 2, 25, windowWidth - 100, 50, { restitution: 0.8, isStatic: true, friction: 0 });//top
    mode3_bottom = Bodies.rectangle(windowWidth / 2, windowHeight - 25, windowWidth - 100, 50, { restitution: 0.8, isStatic: true, friction: 0 });//down
    mode3_disco1 = Bodies.circle(windowWidth / 2, windowHeight / 2, 30, { restitution: 1, frictionAir: 0.005, friction: 0, density: 0.00001, name: 'mode3_disco1', mass: 0.1 });
    mode3_disco2 = Bodies.circle(windowWidth / 2, windowHeight / 2, 30, { restitution: 1, frictionAir: 0.005, friction: 0, density: 0.00001, name: 'mode3_disco2', mass: 0.1 });
    mode3_car1 = Bodies.rectangle(windowWidth - 100, windowHeight / 2, 80, 50, { restitution: 0.5, friction: 0, frictionAir: 0.03, density: 0.002, mass: 5 });
    mode3_car2 = Bodies.rectangle(100, windowHeight / 2, 80, 50, { restitution: 0.5, friction: 0, frictionAir: 0.03, density: 0.002, mass: 5 });
    Composite.add(mode3_engine.world, [mode3_left1, mode3_right1, mode3_left2, mode3_right2, mode3_up, mode3_bottom, mode3_disco1, mode3_disco2, mode3_gol1, mode3_gol2, mode3_car1, mode3_car2]);


    Engine.run(mode3_engine);

    modo3_resetPoint();

    Events.on(mode3_engine, 'collisionStart', function (event) {
        const pairs = event.pairs[0];
        const bodyA = pairs.bodyA;
        const bodyB = pairs.bodyB;
        if (bodyA.name === "mode3_gol1" && bodyB.name === "mode3_disco1") {
            mode3_pontos2++;
            if(mode3_pontos2 == 3){
                mode3_winner = 2;
            }else{
                modo3_resetPoint();
            }    

        } else if (bodyA.name === "mode3_gol2" && bodyB.name === "mode3_disco1") {
            mode3_pontos1++;
            if(mode3_pontos1 == 3){
                mode3_winner = 1;
            }else{
                modo3_resetPoint();
            }    
        } else if (bodyA.name === "mode3_gol1" && bodyB.name === "mode3_disco2") {
            mode3_pontos1++;
            if(mode3_pontos1 == 3){
                mode3_winner = 1;
            }else{
                modo3_resetPoint();
            }    
        } else if (bodyA.name === "mode3_gol2" && bodyB.name === "mode3_disco2") {
            mode3_pontos1++;
            if(mode3_pontos1 == 3){
                mode3_winner = 1;
            }else{
                modo3_resetPoint();
            }    
        }

    });
}

function modo3_resetPoint() { //deixa tudo com estado inicial
    Composite.remove(mode3_engine.world, mode3_disco1);
    mode3_disco1 = Bodies.circle(windowWidth / 2-15, windowHeight / 2, 30, { restitution: 0.8, frictionAir: 0, friction: 0, density: 0.00001, name: 'mode3_disco1', mass: 0.1 });
    Composite.add(mode3_engine.world, mode3_disco1);
    Composite.remove(mode3_engine.world, mode3_disco2);
    mode3_disco2 = Bodies.circle(windowWidth / 2 + 15, windowHeight / 2, 30, { restitution: 0.8, frictionAir: 0, friction: 0, density: 0.00001, name: 'mode3_disco2', mass: 0.1 });
    Composite.add(mode3_engine.world, mode3_disco2);
    Body.setPosition(mode3_car1, { x: windowWidth - 100, y: windowHeight / 2 });
    Body.setVelocity(mode3_car1, { x: 0, y: 0 });
    Body.setPosition(mode3_car2, { x: 100, y: windowHeight / 2 });
    Body.setVelocity(mode3_car2, { x: 0, y: 0 });
    Body.setAngle(mode3_car1, 0);
    Body.setAngle(mode3_car2, 0);
    mode3_wheels1 = 0;
    mode3_wheels2 = 0;
    Body.setAngularVelocity(mode3_disco1, 0);
    Body.setAngularVelocity(mode3_disco2, 0);
}


function modo3_drawGame() {
    if(mode3_isRunning){
        if(mode3_winner == 1){
            fill(255);
            background(255);
            textSize(50);
            text("Jogador 1 venceu", windowWidth/2-200, windowHeight/2-25);
            mode3_restartButton.show();
            mode3_menuButton.show();
        }
        else if(mode3_winner == 2){
            fill(255);
            background(255);
            textSize(50); 
            text("Jogador 2 venceu", windowWidth/2-200, windowHeight/2-25);
            mode3_restartButton.show();
            mode3_menuButton.show();
        }else{
            background(255);
            //verifyPositon();
            noStroke();
            fill(255,0,0);
            drawBody(mode3_gol1);
            drawBody(mode3_gol2);
            drawBody(mode3_left1);
            drawBody(mode3_right1);
            drawBody(mode3_left2);
            drawBody(mode3_right2);
            drawBody(mode3_up);
            drawBody(mode3_bottom);
            
            fill(255);
            drawBody(mode3_disco1);
            drawBody(mode3_disco2);
            fill(255);
            textSize(20)
            text("Jogador 1: " + mode3_pontos1, 30, 30);
            text("Jogador 2: " + mode3_pontos2, windowWidth - 140, 30);
            modo3_mode3_car1Control();
            modo3_mode3_car2Control();
            imageMode(CENTER);
            translate(mode3_car1.position.x, mode3_car1.position.y);//abaixo sao rotacoes e translacoes para poder alinhar a imagem ao movimento do carro, fazendo com que ela sempre rotacione de acordo com o angulo do body
            rotate(mode3_car1.angle+PI);
            image(mode3_carImage1, 0, 0, 85, 55);
            rotate(-mode3_car1.angle-PI);
            translate(-mode3_car1.position.x, -mode3_car1.position.y);
            translate(mode3_car2.position.x, mode3_car2.position.y);
            rotate(mode3_car2.angle);
            image(mode3_carImage2, 0, 0, 85, 55);
            rotate(-mode3_car2.angle);
            translate(-mode3_car2.position.x, -mode3_car2.position.y);
            stroke(255, 0, 0);
            line(mode3_car1.position.x, mode3_car1.position.y, mode3_car1.position.x + 30 * cos(mode3_car1.angle + mode3_wheels1 + PI), mode3_car1.position.y + 30 * sin(mode3_car1.angle + mode3_wheels1 + PI));//mostra a direcao da roda do carro 1
            line(mode3_car2.position.x, mode3_car2.position.y, mode3_car2.position.x + 30 * cos(mode3_car2.angle + mode3_wheels2), mode3_car2.position.y + 30 * sin(mode3_car2.angle + mode3_wheels2));//mostra a direcao da roda do carro 2
            translate(mode3_disco1.position.x, mode3_disco1.position.y);
            rotate(mode3_disco1.angle);
            image(wheel, 0, 0, 60, 60);
            rotate(-mode3_disco1.angle);
            translate(-mode3_disco1.position.x, -mode3_disco1.position.y);
            translate(mode3_disco2.position.x, mode3_disco2.position.y);
            rotate(mode3_disco2.angle);
            image(wheel, 0, 0, 60, 60);
            rotate(-mode3_disco2.angle);
            translate(-mode3_disco2.position.x, -mode3_disco2.position.y);
            if (mode3_car1.speed > 0.01) {//esse if e por cause que tem um bug que a speed nunca zera de verdade, por causa da conversao dos numeros fracionarios, ai e pra não ficar uma notacao cientifica do tipo 4.28487578283723e-25 ou algo do tipo
                text("Px/s: " + Math.round(mode3_car1.speed * 60), windowWidth - 100, windowHeight - 50, 30);
            }
            else {
                text("Px/s: " + 0, windowWidth - 100, windowHeight - 50, 30);//printa isso aqui em vez da notacao cientifica de numeros muito baixos
            }
            if (mode3_car2.speed > 0.01) {//mesma coisa do if acima, mas para o carro 2
                text("Px/s: " + Math.round(mode3_car2.speed * 60), 50, windowHeight - 50, 30);
            }
            else {
                text("Px/s: " + 0, 50, windowHeight - 50, 30);//printa o 0 pro carro 2
            }
        }
    }
}


function modo3_mode3_car1Control() {
    if (keyIsDown(RIGHT_ARROW)) {//movimentacao das rodas do carro
        if (mode3_wheels1 < PI / 6) {
            mode3_wheels1 += PI / 180;
        }
    }
    if (keyIsDown(LEFT_ARROW)) {
        if (mode3_wheels1 > -PI / 6) {
            mode3_wheels1 -= PI / 180;
        }
    }
    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {//serve para dar mais suavidade quando nao ta tendo nem aceleracao nem frenagem
        mode3_car1.frictionAir = 0.1;
        mode3_acellaration1 = 0;
    } else {
        mode3_car1.frictionAir = 0.03;
    }
    if (keyIsDown(UP_ARROW)) { //acelera o carro
        mode3_acellaration1 = -0.1;
        Body.setAngle(mode3_car1, mode3_car1.angle += mode3_wheels1 / 360);
    }
    if (keyIsDown(DOWN_ARROW)) {//freia o carro e, eventualmente, da re
        mode3_acellaration1 = 0.05;
        Body.setAngle(mode3_car1, mode3_car1.angle -= mode3_wheels1 / 360);
    }
    if (mode3_car1.speed < 4) {//limita a velocidade do carro 1, para nao crescer infinitamente
        Body.setVelocity(mode3_car1, { x: mode3_car1.velocity.x + mode3_acellaration1 * cos(mode3_car1.angle + mode3_wheels1), y: mode3_car1.velocity.y + mode3_acellaration1 * sin(mode3_car1.angle + mode3_wheels1) });
    }
    Body.setPosition(mode3_car1, { x: mode3_car1.position.x + mode3_car1.velocity.x, y: mode3_car1.position.y + mode3_car1.velocity.y });//atualiza a posicao do carro de acordo com a velocidade
}

function modo3_mode3_car2Control() {//mesma coisa que encima, so que pro carro 2
    //65 a 68 d 83 s 87 w
    if (keyIsDown(68)) {
        if (mode3_wheels2 < PI / 6) {
            mode3_wheels2 += PI / 180;
        }
    }
    if (keyIsDown(65)) {
        if (mode3_wheels2 > -PI / 6) {
            mode3_wheels2 -= PI / 180;
        }
    }
    if (!keyIsDown(87) && !keyIsDown(83)) {
        mode3_car2.frictionAir = 0.1;
        mode3_acellaration2 = 0;
    } else {
        mode3_car2.frictionAir = 0.03;
    }
    if (keyIsDown(87)) {
        mode3_acellaration2 = 0.1;
        Body.setAngle(mode3_car2, mode3_car2.angle += mode3_wheels2 / 360);
    }
    if (keyIsDown(83)) {
        mode3_acellaration2 = -0.05;
        Body.setAngle(mode3_car2, mode3_car2.angle -= mode3_wheels2 / 360);
    }
    if (mode3_car2.speed < 4) {
        Body.setVelocity(mode3_car2, { x: mode3_car2.velocity.x + mode3_acellaration2 * cos(mode3_car2.angle + mode3_wheels2), y: mode3_car2.velocity.y + mode3_acellaration2 * sin(mode3_car2.angle + mode3_wheels2) });
    }
    Body.setPosition(mode3_car2, { x: mode3_car2.position.x + mode3_car2.velocity.x, y: mode3_car2.position.y + mode3_car2.velocity.y });
}