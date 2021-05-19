var towerImg, tower, doorImg, door, doorGrp, climber, climberImg, climberGrp, ghost, ghostImg, invisible, invisibleGrp, spookySound;

var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas (600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
  
  doorGrp = new Group();
  climberGrp = new Group();
  invisibleGrp = new Group();
}

function draw(){
  background(0);
  
  if (gameState === "play"){
    
    spookySound.loop();
    
    if (tower.y>400){
       tower.y = 300;
    }

    if (keyDown ("left_arrow")){
       ghost.x = ghost.x-3;
    }
    if (keyDown ("right_arrow")){
       ghost.x = ghost.x+3;
    }
    if (keyDown ("space")){
       ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY+0.8; 
    
    spawnDoors()
      
    if (climberGrp.isTouching(ghost)){
       ghost.velocityY = 0;
    }
  
    if (invisibleGrp.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState = "end";
    }
    
    
  
    drawSprites();
  }
  
    if (gameState === "end"){
       stroke("red");
       fill("yellow");
       textSize(40);
       text("GAME OVER", 230, 250);
    }
  
}

function spawnDoors(){
  if (frameCount % 240 === 0){
     door = createSprite(200, -50);
     door.addImage("door", doorImg);
     
     climber = createSprite(200, 10);
     climber.addImage("climber", climberImg);
     
     invisible = createSprite(200, 15);
     invisible.width = climber.width;
     invisible.height = 2;
     
     
     door.x = Math.round(random(120, 400));
     door.velocityY = 1;
     
     climber.x = door.x;
    climber.velocityY = 1;
    invisible.x = door.x;
    invisible.velocityY = 1;
     
      ghost.depth = door.depth;       
      ghost.depth+= 1;
     
     door.lifetime = 800;
     climber.lifetime = 800;
     
     invisible.lifetime = 800; 
     invisible.debug = true;
     invisibleGrp.add(invisible);
     
     doorGrp.add(door);
     climberGrp.add(climber);
  }
  
}