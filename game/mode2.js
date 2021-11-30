let canvas2;

let mode2_pontos1 = 0, mode2_pontos2 = 0, mode2_wheels1, mode2_wheels2; mode2_acellaration1 = 0, mode2_acellaration2 = 0, mode2_randomAux1 = 0, mode2_randomAux2 = 0;

let mode2_engine;

let mode2_left1, mode2_left2, mode2_right1, mode2_right2, mode2_up, mode2_bottom, mode2_disco, mode2_gol1, mode2_gol2;
let mode2_car1, mode2_car2;
let mode2_carImage1, mode2_carImage2;
let mode2_winner = 0;
let modo2_restartButton;
let mode2_menuButton;
let mode2_isRunning = true;

function modo2_setupGame(){
    mode2_pontos1 = 0;
    mode2_pontos2 = 0;
    mode2_winner = 0;
    mode2_isRunning = true;
    mode2_menuButton = createButton('Voltar ao Menu');
    mode2_menuButton.position(windowWidth/2 - 50, windowHeight/2+120);
    mode2_menuButton.mousePressed(()=>{
        mode2_menuButton.hide()
        modo2_restartButton.hide();
        mode2_isRunning = false
        Engine.clear(mode2_engine)
        setupMenu();
    })
    mode2_menuButton.class('button');
    mode2_menuButton.hide();
    modo2_restartButton = createButton('Reiniciar');
    modo2_restartButton.position(windowWidth/2 - 30, windowHeight/2 + 70);
    modo2_restartButton.mousePressed( () => {
        modo2_restartButton.hide()
        mode2_menuButton.hide()
        mode2_pontos1 = 0;
        mode2_pontos2 = 0;
        mode2_winner = 0;
        modo2_resetPoint();
    });
    modo2_restartButton.class('button');
    modo2_restartButton.hide();
    mode2_randomAux1 = Math.floor(random(10));
    mode2_carImage1 = carImages[mode2_randomAux1];
    mode2_randomAux2 = Math.floor(random(10));
    while(mode2_randomAux2==mode2_randomAux1){
        mode2_randomAux2 = Math.floor(random(10));
    }
    mode2_carImage2 = carImages[mode2_randomAux2];
    canvas2 = createCanvas(windowWidth, windowHeight);
    mode2_wheels1 = 0;
    mode2_wheels2 = 0;
    mode2_engine = Engine.create();

    mode2_engine.world.gravity.y = 0;

    mode2_gol1 = Bodies.rectangle(-20, windowHeight / 2, 1, windowHeight / 3, { isStatic: true, restitution: 0, friction: 1, name: 'mode2_gol1' });
    mode2_gol2 = Bodies.rectangle(windowWidth + 20, windowHeight / 2, 1, windowHeight / 3, { isStatic: true, friction:1, restitution: 0, name: 'mode2_gol2' });
    mode2_left1 = Bodies.rectangle(25, windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//left
    mode2_right1 = Bodies.rectangle(windowWidth - 25, windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//right
    mode2_left2 = Bodies.rectangle(25, 5 * windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//left
    mode2_right2 = Bodies.rectangle(windowWidth - 25, 5 * windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//right
    mode2_up = Bodies.rectangle(windowWidth / 2, 25, windowWidth - 100, 50, { restitution: 0.8, isStatic: true, friction: 0 });//top
    mode2_bottom = Bodies.rectangle(windowWidth / 2, windowHeight - 25, windowWidth - 100, 50, { restitution: 0.8, isStatic: true, friction: 0 });//down
    mode2_disco = Bodies.circle(windowWidth / 2, windowHeight / 2, 30, { restitution: 1, frictionAir: 0.005, friction: 0, density: 0.00001, name: 'mode2_disco', mass: 0.1 });
    mode2_car1 = Bodies.rectangle(windowWidth - 100, windowHeight / 2, 80, 50, { restitution: 0.5, friction: 0, frictionAir: 0.03, density: 0.002, mass: 5 });
    mode2_car2 = Bodies.rectangle(100, windowHeight / 2, 80, 50, { restitution: 0.5, friction: 0, frictionAir: 0.03, density: 0.002, mass: 5 });
    mode2_obstaculo1 = Bodies.circle(windowWidth/4, windowHeight/4, 40, {restitution: 0.8, isStatic: true, friction: 0});
    mode2_obstaculo2 = Bodies.circle(windowWidth/4, 3*windowHeight/4, 40, {restitution: 0.8, isStatic: true, friction: 0});
    mode2_obstaculo3 = Bodies.circle(3*windowWidth/4, windowHeight/4, 40, {restitution: 0.8, isStatic: true, friction: 0});
    mode2_obstaculo4 = Bodies.circle(3*windowWidth/4, 3*windowHeight/4, 40, {restitution: 0.8, isStatic: true, friction: 0});
    Composite.add(mode2_engine.world, [mode2_left1, mode2_right1, mode2_left2, mode2_right2, mode2_up, mode2_bottom, mode2_disco, mode2_gol1, mode2_gol2, mode2_car1, mode2_car2, mode2_obstaculo1, mode2_obstaculo2, mode2_obstaculo3, mode2_obstaculo4]);


    Engine.run(mode2_engine);

    Events.on(mode2_engine, 'collisionStart', function (event) {
        const pairs = event.pairs[0];
        const bodyA = pairs.bodyA;
        const bodyB = pairs.bodyB;
        if (bodyA.name === "mode2_gol1" && bodyB.name === "mode2_disco") {
            mode2_pontos2++;
            if(mode2_pontos2 == 3){
                mode2_winner = 2;
            }else{
                modo2_resetPoint();
            }     

        } else if (bodyA.name === "mode2_gol2" && bodyB.name === "mode2_disco") {
            mode2_pontos1++;
            if(mode2_pontos1 == 3){
                mode2_winner = 1;
            }else{
                modo2_resetPoint();
            }   
        }

    });
}

function modo2_resetPoint() { //deixa tudo com estado inicial
    Composite.remove(mode2_engine.world, mode2_disco);
    mode2_disco = Bodies.circle(windowWidth / 2, windowHeight / 2, 30, { restitution: 0.8, frictionAir: 0, friction: 0, density: 0.00001, name: 'mode2_disco', mass: 0.1 });
    Composite.add(mode2_engine.world, mode2_disco);
    Body.setPosition(mode2_car1, { x: windowWidth - 100, y: windowHeight / 2 });
    Body.setVelocity(mode2_car1, { x: 0, y: 0 });
    Body.setPosition(mode2_car2, { x: 100, y: windowHeight / 2 });
    Body.setVelocity(mode2_car2, { x: 0, y: 0 });
    Body.setAngle(mode2_car1, 0);
    Body.setAngle(mode2_car2, 0);
    mode2_wheels1 = 0;
    mode2_wheels2 = 0;
    Body.setAngularVelocity(mode2_disco, 0);
}


function modo2_drawGame() {
    if(mode2_isRunning){
        if(mode2_winner == 1){
            fill(255);
            background(255);
            textSize(50);
            text("Jogador 1 venceu", windowWidth/2-200, windowHeight/2-25);
            modo2_restartButton.show();
            mode2_menuButton.show();
        }
        else if(mode2_winner == 2){
            fill(255);
            background(255);
            textSize(50); 
            text("Jogador 2 venceu", windowWidth/2-200, windowHeight/2-25);
            modo2_restartButton.show();
            mode2_menuButton.show();
        }else{
            background(255);
            //verifyPositon();
            noStroke();
            fill(0,0,255);
            drawBody(mode2_gol1);
            drawBody(mode2_gol2);
            drawBody(mode2_left1);
            drawBody(mode2_right1);
            drawBody(mode2_left2);
            drawBody(mode2_right2);
            drawBody(mode2_up);
            drawBody(mode2_bottom);
            
            fill(255);
            drawBody(mode2_disco);
            stroke(0,255,0);
            fill(0,255,0);
            drawBody(mode2_obstaculo1);
            drawBody(mode2_obstaculo2);
            drawBody(mode2_obstaculo3);
            drawBody(mode2_obstaculo4);
            fill(255);
            textSize(20)
            text("Jogador 1: " + mode2_pontos1, 30, 30);
            text("Jogador 2: " + mode2_pontos2, windowWidth - 140, 30);
            modo2_mode2_car1Control();
            modo2_mode2_car2Control();
            imageMode(CENTER);
            translate(mode2_car1.position.x, mode2_car1.position.y);//abaixo sao rotacoes e translacoes para poder alinhar a imagem ao movimento do carro, fazendo com que ela sempre rotacione de acordo com o angulo do body
            rotate(mode2_car1.angle+PI);
            image(mode2_carImage1, 0, 0, 85, 55);
            rotate(-mode2_car1.angle-PI);
            translate(-mode2_car1.position.x, -mode2_car1.position.y);
            translate(mode2_car2.position.x, mode2_car2.position.y);
            rotate(mode2_car2.angle);
            image(mode2_carImage2, 0, 0, 85, 55);
            rotate(-mode2_car2.angle);
            translate(-mode2_car2.position.x, -mode2_car2.position.y);
            stroke(0);
            line(mode2_car1.position.x, mode2_car1.position.y, mode2_car1.position.x + 30 * cos(mode2_car1.angle + mode2_wheels1 + PI), mode2_car1.position.y + 30 * sin(mode2_car1.angle + mode2_wheels1 + PI));//mostra a direcao da roda do carro 1
            line(mode2_car2.position.x, mode2_car2.position.y, mode2_car2.position.x + 30 * cos(mode2_car2.angle + mode2_wheels2), mode2_car2.position.y + 30 * sin(mode2_car2.angle + mode2_wheels2));//mostra a direcao da roda do carro 2
            translate(mode2_disco.position.x, mode2_disco.position.y);
            rotate(mode2_disco.angle);
            image(wheel, 0, 0, 60, 60);
            rotate(-mode2_disco.angle);
            translate(-mode2_disco.position.x, -mode2_disco.position.y);
            if (mode2_car1.speed > 0.01) {//esse if e por cause que tem um bug que a speed nunca zera de verdade, por causa da conversao dos numeros fracionarios, ai e pra não ficar uma notacao cientifica do tipo 4.28487578283723e-25 ou algo do tipo
                text("Px/s: " + Math.round(mode2_car1.speed * 60), windowWidth - 100, windowHeight - 50, 30);
            }
            else {
                text("Px/s: " + 0, windowWidth - 100, windowHeight - 50, 30);//printa isso aqui em vez da notacao cientifica de numeros muito baixos
            }
            if (mode2_car2.speed > 0.01) {//mesma coisa do if acima, mas para o carro 2
                text("Px/s: " + Math.round(mode2_car2.speed * 60), 50, windowHeight - 50, 30);
            }
            else {
                text("Px/s: " + 0, 50, windowHeight - 50, 30);//printa o 0 pro carro 2
            }
        }
    }
}


function modo2_mode2_car1Control() {
    if (keyIsDown(RIGHT_ARROW)) {//movimentacao das rodas do carro
        if (mode2_wheels1 < PI / 6) {
            mode2_wheels1 += PI / 180;
        }
    }
    if (keyIsDown(LEFT_ARROW)) {
        if (mode2_wheels1 > -PI / 6) {
            mode2_wheels1 -= PI / 180;
        }
    }
    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {//serve para dar mais suavidade quando nao ta tendo nem aceleracao nem frenagem
        mode2_car1.frictionAir = 0.1;
        mode2_acellaration1 = 0;
    } else {
        mode2_car1.frictionAir = 0.03;
    }
    if (keyIsDown(UP_ARROW)) { //acelera o carro
        mode2_acellaration1 = -0.1;
        Body.setAngle(mode2_car1, mode2_car1.angle += mode2_wheels1 / 360);
    }
    if (keyIsDown(DOWN_ARROW)) {//freia o carro e, eventualmente, da re
        mode2_acellaration1 = 0.05;
        Body.setAngle(mode2_car1, mode2_car1.angle -= mode2_wheels1 / 360);
    }
    if (mode2_car1.speed < 4) {//limita a velocidade do carro 1, para nao crescer infinitamente
        Body.setVelocity(mode2_car1, { x: mode2_car1.velocity.x + mode2_acellaration1 * cos(mode2_car1.angle + mode2_wheels1), y: mode2_car1.velocity.y + mode2_acellaration1 * sin(mode2_car1.angle + mode2_wheels1) });
    }
    Body.setPosition(mode2_car1, { x: mode2_car1.position.x + mode2_car1.velocity.x, y: mode2_car1.position.y + mode2_car1.velocity.y });//atualiza a posicao do carro de acordo com a velocidade
}

function modo2_mode2_car2Control() {//mesma coisa que encima, so que pro carro 2
    //65 a 68 d 83 s 87 w
    if (keyIsDown(68)) {
        if (mode2_wheels2 < PI / 6) {
            mode2_wheels2 += PI / 180;
        }
    }
    if (keyIsDown(65)) {
        if (mode2_wheels2 > -PI / 6) {
            mode2_wheels2 -= PI / 180;
        }
    }
    if (!keyIsDown(87) && !keyIsDown(83)) {
        mode2_car2.frictionAir = 0.1;
        mode2_acellaration2 = 0;
    } else {
        mode2_car2.frictionAir = 0.03;
    }
    if (keyIsDown(87)) {
        mode2_acellaration2 = 0.1;
        Body.setAngle(mode2_car2, mode2_car2.angle += mode2_wheels2 / 360);
    }
    if (keyIsDown(83)) {
        mode2_acellaration2 = -0.05;
        Body.setAngle(mode2_car2, mode2_car2.angle -= mode2_wheels2 / 360);
    }
    if (mode2_car2.speed < 4) {
        Body.setVelocity(mode2_car2, { x: mode2_car2.velocity.x + mode2_acellaration2 * cos(mode2_car2.angle + mode2_wheels2), y: mode2_car2.velocity.y + mode2_acellaration2 * sin(mode2_car2.angle + mode2_wheels2) });
    }
    Body.setPosition(mode2_car2, { x: mode2_car2.position.x + mode2_car2.velocity.x, y: mode2_car2.position.y + mode2_car2.velocity.y });
}