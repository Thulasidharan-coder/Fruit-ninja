var sword,sword_Image;
var fruit1,fruit2,fruit3,fruit4; 
var fruitgroup;
var r;
var bomb,bombA;
var fruitGroup,EnemyGroup;
var score;
var gameover,gameoverImage;

var PLAY=1;
var END=0;

var gameState=1;

var gameoversound,knifeSwooshSound;

function preload(){
  
 sword_Image=loadImage("sword.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
 
  bombA=loadAnimation("alien1.png","alien2.png");
 gameoverImage=loadImage("gameover.png");
  gameoversound=loadSound("gameover.mp3");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3")
  
}

function setup(){
  createCanvas(600, 600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(sword_Image);
  sword.scale=0.7;
  
 
  sword.setCollider("rectangle",0,0,sword.width,sword.height);
  sword.debug=false;
  
  EnemyGroup=createGroup();
  fruitGroup=createGroup();
  score = 0;
}

function draw(){
 background("lightpink");
   text("Score: "+ score, 500,50);
  
  if (gameState === PLAY) {
    sword.y = World.mouseY
    sword.x = World.mouseX

    fruits();
    Enemy();

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
     knifeSwooshSound.play();
      score = score + 1;
    }

    if (sword.isTouching(EnemyGroup)) {
      gameState = END;
    gameoversound.play();
    }
  } else if (gameState === END) {
    sword.addImage(gameoverImage);
    sword.x = 300;
    sword.y = 300;
    sword.scale=2;
    
    EnemyGroup.destroyEach();
    fruitGroup.destroyEach();
  }
  
   
    
    
    
    
    
    
  
  drawSprites();
}

function fruits(){
  
  if(World.frameCount%80==0){
    
    
    fruit=createSprite(600,200,20,20)
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);
    }else if(r == 2){
      fruit.addImage(fruit2);
    }else if(r == 3){
      fruit.addImage(fruit3);
    }else  {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
  
    fruitGroup.add(fruit)
  }
   
  
}

function Enemy(){
  if(frameCount % 200===0){
    bomb=createSprite(600,200,20,20);
    bomb.addAnimation("bombimage",bombA);
    bomb.y=Math.round(random(100,500));
    bomb.velocityX=-8;
    bomb.setLifetime=50;
    
    EnemyGroup.add(bomb);
  }
}