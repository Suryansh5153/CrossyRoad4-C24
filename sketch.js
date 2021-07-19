var grid = 50;
var width = 1366;
var carGroup1,logGroup1;
var grassHeight = 100;
PLAY = 1;
WIN = 0;
var gameState = 1;
var carImage1,carImage2 , logImage, playerImage, cityImage;
var school;
function preload()
{
  carImage1=loadImage("car1.png");
  carImage2=loadImage("car2.png");
  playerImage=loadImage("Player-03.png");
  logImage=loadImage("log2.png");
  cityImage=loadImage("city1.png");
}

function setup() {
  createCanvas(1366,700);

  city=createSprite(width/2,-1600);
  city.addAnimation("City View",cityImage);

  carGroup1 = createGroup();
  logGroup1 = createGroup();

  //Grasses where player can rest
  for(var i=0;i<6;i++){
    var bottomGrass1 = createSprite(683,height-50-(i*400),width,grassHeight);
    if(i%2===0)//adding road
    {
      var road= createSprite(683,height-150-(i*400)-grassHeight,width,300)
      road.shapeColor="black";
    }
    bottomGrass1.shapeColor="grey";
  }

   //To create rows of car
   for(var i = 0; i<40; i++){
     cars = new Car(2);
     carGroup1.add(cars.spt);
   }

   //To create rows of log
   for(var i = 0; i<40; i++){
    logs = new Log(-3.5);
    logGroup1.add(logs.spt);
   }

    for(i=1;i<logGroup1.length;i++){
      if(logGroup1[i].x<0)
      {
        logGroup1[i].x=width;
      }
    }

    player = new Player(width/2,height-25);

 }

function draw() {
  background("skyblue");

  translate(0,-player.spt.y+height-150);

  if(gameState === 1){
  for(i=1;i<carGroup1.length;i++){
    if(carGroup1[i].x<0)
    {
      carGroup1[i].x=width;
    }
    if(carGroup1[i].x>1366)
    {
      carGroup1[i].x=0;
    }
  }
 
  for(i=1;i<logGroup1.length;i++){
    if(logGroup1[i].x<0)
    {
      logGroup1[i].x=width;
    }
  }

  if(carGroup1.isTouching(player.spt)){
    player.spt.x = width/2;
    player.spt.y = height-75;
  }

  if(logGroup1.isTouching(player.spt)){
    player.spt.x= player.spt.x-3;
  }else if((player.spt.y > height-1550 && player.spt.y < height-1300) ||
           (player.spt.y < height-500 && player.spt.y > height-850) ||
           (player.spt.y>height) ||
           (player.spt.x>width)){
            player.spt.x = width/2;
            player.spt.y = height-75;
           }

  if(city.isTouching(player.spt)){
    gameState = 0;
  }

  movement();
  }

  drawSprites();

  if(gameState === 0){
    stroke("Green");
    fill("Green");
    textSize(40);
    text("Congratulations! You Made It.",width/2-250,-1700);
    carGroup1.destroyEach();
    logGroup1.destroyEach();
  }
}

function movement(){
  if(keyDown("left")){
    player.motion(-2,0);
  }
  if(keyDown("right")){
    player.motion(2,0);
  }
  if(keyDown("up")){
    player.motion(0,-2);
  }
  if(keyDown("down")){
    player.motion(0,2);
  }
}