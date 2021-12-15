//Variáveis

let canvas1;
let pontos1 = 0, pontos2 = 0, wheels1, wheels2; acellaration1 = 0, acellaration2 = 0, randomAux1 = 0, randomAux2 = 0;
let engine;
let left1, left2, right1, right2, up, bottom, disco, gol1, gol2;
let car1, car2;
let carImage1, carImage2;
let winner = 0;
let restartButton;
let menuButton;
let isRunning = true;

//Função para setar o modo de jogo padrão inicialmente
function modo1_setupGame(){
    pontos1 = 0;
    pontos2 = 0;
    winner = 0;
    isRunning = true;

    menuButton = createButton('Voltar ao Menu'); //Botão para voltar ao menu
    menuButton.position(windowWidth/2 - 50, windowHeight/2+120);
    menuButton.mousePressed(()=>{
        menuButton.hide()
        restartButton.hide();
        isRunning = false
        Engine.clear(engine)
        setupMenu();
    })
    menuButton.class('button');
    menuButton.hide();

    restartButton = createButton('Reiniciar'); //Botão para reiniciar o modo atual
    restartButton.position(windowWidth/2 - 30, windowHeight/2 + 70);
    restartButton.mousePressed( () => {
        menuButton.hide()
        restartButton.hide()
        pontos1 = 0;
        pontos2 = 0;
        winner = 0;
        modo1_resetPoint();
    });
    restartButton.class('button');
    restartButton.hide();
    
    //escolhendo as imagens aleatórias para os carros
    randomAux1 = Math.floor(random(10));
    carImage1 = carImages[randomAux1];
    randomAux2 = Math.floor(random(10));
    while(randomAux2==randomAux1){
        randomAux2 = Math.floor(random(10));
    }
    carImage2 = carImages[randomAux2];
    canvas1 = createCanvas(windowWidth, windowHeight);
    wheels1 = 0;
    wheels2 = 0;
    engine = Engine.create();

    engine.world.gravity.y = 0; //setando gravidade do mundo

    //criando os bodies de cada estrutura do mundo
    gol1 = Bodies.rectangle(-20, windowHeight / 2, 1, windowHeight / 3, { isStatic: true, restitution: 0, friction: 1, name: 'gol1' });
    gol2 = Bodies.rectangle(windowWidth + 20, windowHeight / 2, 1, windowHeight / 3, { isStatic: true, friction:1, restitution: 0, name: 'gol2' });
    left1 = Bodies.rectangle(25, windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//left
    right1 = Bodies.rectangle(windowWidth - 25, windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//right
    left2 = Bodies.rectangle(25, 5 * windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//left
    right2 = Bodies.rectangle(windowWidth - 25, 5 * windowHeight / 6, 50, windowHeight / 3, { restitution: 0.8, isStatic: true, friction: 0 });//right
    up = Bodies.rectangle(windowWidth / 2, 25, windowWidth - 100, 50, { restitution: 0.8, isStatic: true, friction: 0 });//top
    bottom = Bodies.rectangle(windowWidth / 2, windowHeight - 25, windowWidth - 100, 50, { restitution: 0.8, isStatic: true, friction: 0 });//down
    disco = Bodies.circle(windowWidth / 2, windowHeight / 2, 30, { restitution: 1, frictionAir: 0.005, friction: 0, density: 0.00001, name: 'disco', mass: 0.1 });
    car1 = Bodies.rectangle(windowWidth - 100, windowHeight / 2, 80, 50, { restitution: 0.5, friction: 0, frictionAir: 0.03, density: 0.002, mass: 5 });
    car2 = Bodies.rectangle(100, windowHeight / 2, 80, 50, { restitution: 0.5, friction: 0, frictionAir: 0.03, density: 0.002, mass: 5 });
    Composite.add(engine.world, [left1, right1, left2, right2, up, bottom, disco, gol1, gol2, car1, car2]); //adicionando os bodies criados à composição do mundo

    Engine.run(engine); //Startando a engine

    modo1_resetPoint(); //Setando as variáveis das estruturas para o começo

    Events.on(engine, 'collisionStart', function (event) {  //Evento para verificar o gol
        const pairs = event.pairs[0];
        const bodyA = pairs.bodyA;
        const bodyB = pairs.bodyB;
        if (bodyA.name === "gol1" && bodyB.name === "disco") {
            pontos2++;
            if(pontos2 == 3){
                winner = 2;
            }else{
                modo1_resetPoint();
            }    

        } else if (bodyA.name === "gol2" && bodyB.name === "disco") {
            pontos1++;
            if(pontos1 == 3){
                winner = 1;
            }else{
                modo1_resetPoint();
            }    
        }

    });
}

function modo1_resetPoint() { //deixa tudo com estado inicial
    Composite.remove(engine.world, disco);
    disco = Bodies.circle(windowWidth / 2, windowHeight / 2, 30, { restitution: 0.8, frictionAir: 0, friction: 0, density: 0.00001, name: 'disco', mass: 0.1 });
    Composite.add(engine.world, disco);
    Body.setPosition(car1, { x: windowWidth - 100, y: windowHeight / 2 });
    Body.setVelocity(car1, { x: 0, y: 0 });
    Body.setPosition(car2, { x: 100, y: windowHeight / 2 });
    Body.setVelocity(car2, { x: 0, y: 0 });
    Body.setAngle(car1, 0);
    Body.setAngle(car2, 0);
    wheels1 = 0;
    wheels2 = 0;
    Body.setAngularVelocity(disco, 0);
}


function modo1_drawGame() { //Desenha as estruturas e imagens do modo padrão, também desenha o menu ao final do jogo
    if(isRunning){
        if(winner == 1){
            fill(0);
            stroke(0);
            imageMode(CORNER)
            background(backgroundImagem);
            textSize(50);
            text("Jogador 1 venceu", windowWidth/2-200, windowHeight/2-25);
            restartButton.show();
            menuButton.show();
        }
        else if(winner == 2){
            fill(0);
            stroke(0);
            imageMode(CORNER)
            background(backgroundImagem);
            textSize(50); 
            text("Jogador 2 venceu", windowWidth/2-200, windowHeight/2-25);
            restartButton.show();
            menuButton.show();
        }else{
            background(255);
            //verifyPositon();
            noStroke();
            fill(255,0,0);
            drawBody(gol1);
            drawBody(gol2);
            drawBody(left1);
            drawBody(right1);
            drawBody(left2);
            drawBody(right2);
            drawBody(up);
            drawBody(bottom);
            
            fill(255);
            drawBody(disco);
            fill(255);
            textSize(20)
            text("Jogador 1: " + pontos1, 30, 30);
            text("Jogador 2: " + pontos2, windowWidth - 140, 30);
            modo1_car1Control();
            modo1_car2Control();

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
            stroke(255, 0, 0);
            line(car1.position.x, car1.position.y, car1.position.x + 30 * cos(car1.angle + wheels1 + PI), car1.position.y + 30 * sin(car1.angle + wheels1 + PI));//mostra a direcao da roda do carro 1
            line(car2.position.x, car2.position.y, car2.position.x + 30 * cos(car2.angle + wheels2), car2.position.y + 30 * sin(car2.angle + wheels2));//mostra a direcao da roda do carro 2
            translate(disco.position.x, disco.position.y);
            rotate(disco.angle);
            image(wheel, 0, 0, 60, 60);
            rotate(-disco.angle);
            translate(-disco.position.x, -disco.position.y);

            if (car1.speed > 0.01) {//esse if e por cause que tem um bug que a speed nunca zera de verdade, por causa da conversao dos numeros fracionarios, ai e pra não ficar uma notacao cientifica do tipo 4.28487578283723e-25 ou algo do tipo
                text("Px/s: " + Math.round(car1.speed * 60), windowWidth - 100, windowHeight - 50, 30);
            }
            else {
                text("Px/s: " + 0, windowWidth - 100, windowHeight - 50, 30);//printa isso aqui em vez da notacao cientifica de numeros muito baixos
            }
            if (car2.speed > 0.01) {//mesma coisa do if acima, mas para o carro 2
                text("Px/s: " + Math.round(car2.speed * 60), 50, windowHeight - 50, 30);
            }
            else {
                text("Px/s: " + 0, 50, windowHeight - 50, 30);//printa o 0 pro carro 2
            }
        }
    }
}


function modo1_car1Control() {
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

function modo1_car2Control() {//mesma coisa que encima, so que pro carro 2
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
}