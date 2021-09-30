var bg
var runner, runnerimg, logimg, lpuddle, lpuddleimg, hearts, heartsimg, branches, branchimg1, branchimg2, stoneimg, lava, lava2,lava3 ,lavaimg, obstacle;
var gO, goimg, screen
var gameState="start"
var stepsGroup;
var obstaclesGroup;
function preload(){
   bg=loadImage("volcano2.jpg");
   logimg=loadImage("log.png");
   lpuddleimg=loadImage("lava puddle.png");
   heartsimg=loadImage("heart.png");
   branchimg1=loadImage("branch1.png");
   branchimg2=loadImage("branch2.png");
   stoneimg=loadImage("stone.png")
   runnerimg=loadAnimation("running_girl 1.png", "running_girl 2.png", "running_girl 3.png", "running girl 4.png")
   lavaimg=loadImage("lava.jpg")
   goimg=loadImage("game over.png");
   screen=loadImage("screen.png");
  
}
function setup() {
  createCanvas(1500,900);
  edges=createEdgeSprites();
  
  lava=createSprite(300, 880, 1500, 20);
  lava.addImage(lavaimg)
  lava2=createSprite(880, 880, 1500, 20);
  lava2.addImage(lavaimg);
  lava3=createSprite(1380, 880, 1500, 20);
  lava3.addImage(lavaimg);
  runner=createSprite(90, 760, 30, 30);
  runner.addAnimation("running girl", runnerimg);
  runner.scale=0.5
  gO=createSprite(700, 500, 50, 50);
  gO.addImage(goimg);
  gO.scale=1

  stepsGroup=new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  background(bg); 
  if(gameState==="start"){
    background(screen);
    fill ("black");
    textSize(40)
    text ("Press space to jump",570, 160);
    text ("Dont fall into the lava or touch the branches", 440, 220);
    text ("If you do, you will lose a heart. You have 3 hearts in total",430, 280);
    text ("If all hearts are lost, you lose the game", 450, 360)
    text("you can collect hearts if you lose one", 500, 420);
    text("press 'm' to play", 565, 700)
    lava.visible = false;
    lava2.visible = false;
    lava3.visible = false;
    runner.visible = false;
    gO.visible = false;
    stepsGroup.destroyEach();
    obstaclesGroup.destroyEach();

    if(keyDown("m")){
      gameState="play";
    }
    
   } 
   runner.collide(edges[3]);
   runner.velocityY=runner.velocityY+0.8
   if(runner.isTouching(stepsGroup)){
    runner.velocityY=0;
  }

   if(gameState==="play"){
    background(bg); 
    if(keyDown("space")&& runner.y>=692){
      runner.velocityY=-20
    }
    
    console.log(runner);

    lava.visible = true;
    lava2.visible = true;
    lava3.visible = true;
    runner.visible = true;
    gO.visible = false;

    spawnBranches();
    spawnSteps();
    spawnHearts();

    if(runner.isTouching(obstaclesGroup)){
      gameState="end"
    }
   }

   if (gameState==="end"){
      gO.visible=true
      stepsGroup.setVelocityXEach(0)
      obstaclesGroup.setVelocityXEach(0);
      text("press 'r' to restart", 1000, 700);


      if(keyDown("r")){
        gameState="play"
        stepsGroup.destroyEach();
        obstaclesGroup.destroyEach();
      }
   }

   drawSprites();

}

function spawnBranches(){
  if(frameCount%200===0){
    var branches=createSprite(1500, random(780, 890), 10,10);
    var rand=Math.round(random(1, 2));
    branches.velocity.x=-5
    switch(rand){
      case 1:branches.addImage(branchimg1);
             break;
      case 2:branches.addImage(branchimg2);
             break; 
      case 3:branches.addImage(lpuddleimg)             
    }
    branches.scale=0.3
    branches.lifetime=1000;
    obstaclesGroup.add(branches);
  }
}


function spawnSteps(){
  if(frameCount%130===0){
    var obstacle=createSprite(1500, random(800, 850), 50, 50);
    obstacle.velocity.x=-5
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1 :obstacle.addImage(logimg);
              break;
      case 2:obstacle.addImage(stoneimg)  ;  
              break;    
     }
     obstacle.scale = 0.3;
    obstacle.lifetime = 1000;
    stepsGroup.add(obstacle);
    }
  }

  function spawnHearts(){
    if(frameCount%700===0){
      var hearts=createSprite(1500, 600, 10,10);
      hearts.addImage(heartsimg);
      hearts.scale=0.04
      hearts.velocity.x=-5;
      hearts.lfetime=1000
    }
  }

