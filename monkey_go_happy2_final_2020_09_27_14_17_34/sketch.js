var bannanaimage,obstacleimage,obstaclegroup,bannanagroup;
var background1,score;
var ground;
var score=0;
var player;
var gamestate;
var play,end;
  function preload() {
    backImage=loadImage("jungle.jpg")
    player_running= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
    bannanaimage=loadImage("banana.png");
    obstacleimage=loadImage("stone.png");
 
    
 }

  function setup() {
    gamestate="play";
    createCanvas(400, 400);
    background1=createSprite(camera.position.x,200,400,400);
    background1.addImage("background1", backImage);
    background1.x=background1.width/2;
    
    ground = createSprite(camera.position.x,400,800,10);
    player=createSprite(100,340,100,100);
    player.addAnimation("player",player_running);
    player.scale=0.10;
    bannanagroup = new Group();
    stonegroup = new Group();
   
  }

  function draw() {
   ground.visible=false;
    if(background1.x<-100){
      background1.x=200;
    }
    ground.x=camera.position.x;
    background1.x=camera.position.x;
    camera.position.x=player.x;
    if(gamestate==="play"){
      bannana();
      stone();
    }
  
    if(player.scale<=0.3){
     // End();
    }
      stonegroup.setColliderEach("circle",0,0,30);
   if (keyDown("space") && player.y > 320) {
          player.velocityY=-12;
        }
    if(player.isTouching (stonegroup)){
       //stonegroup.setLifetimeEach(-1);
      //stonegroup.velocityX=0;
          stonegroup.destroyEach;
       End();    
       }
   
     player.velocityY = player.velocityY + 0.8;
   // player.collide(stonegroup)
    player.collide(ground);
   
    if(gamestate==="end"){
      background("red");
      background1.x=-900;
      background1.y=900;
      background1.velocityX=0;
      fill("black")
      text("Game Over",200,200);
      bannanagroup.velocityX=0;
      stonegroup.velocityX=0;
    }
    if(player.isTouching(bannanagroup)){
     bannanagroup.destroyEach();
      score=score+2;
    }
    switch(score){
       case  10: player.scale=0.12;
        break;
       case  10: player.scale=0.14;
        break;
       case  10:player.scale=0.16;
        break;
       case  10:player.scale=0.18;
        break;
      default: break;
    }
    if(score===20){
      text("Game Over",200,200)
      player.destroy();
   
      background("black")
     
      camera.position.x=200;
    }
    drawSprites();
    
    
    stroke("white");
    textSize(20);
    fill("white")
    text("Score: "+ score, camera.position.x+100,20);
  } 
 function bannana (){
      var rand = random(250,300);
      if (World.frameCount%100===0) {
        var bannanas = createSprite(player.x,rand,20,20);
        bannanas.addImage(bannanaimage);
        bannanas.velocityX=-4;
        bannanas.lifetime=100;
        bannanagroup.add(bannanas);
        bannanas.scale=0.05;
      }
    }
  function stone(){
      if (World.frameCount%120===0) {
        var  Stone = createSprite(player.x,370);
        Stone.addImage(obstacleimage);
        Stone.scale=0.15;       
        Stone.velocityX=-5;
        Stone.lifetime=100
        stonegroup.add(Stone);
      
      }
    }

    function End(){
      gamestate="end";
      player.destroy();
   
     
    }
      
