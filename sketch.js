var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var enemy;
var form, player, game;
var enemy1,enemy2,enemy3,enemy4,enemies;
 var enemy1_image,enemy2_image,enemy3_image,enemy4_image;
var allEnemies;
var cars, car1, car2, car3, car4;

var space, car1_img, car2_img, car3_img, car4_img;

function preload(){
  space= loadImage("../images/space.png");
  car1_img = loadImage("../images/player1.png");
  car2_img = loadImage("../images/player2.png");
  car3_img = loadImage("../images/player3.png");
  car4_img = loadImage("../images/player4.png");
  enemy1_image = loadImage("../images/enemy1.png");
  enemy2_image = loadImage("../images/enemy2.png");
  enemy3_image = loadImage("../images/enemy3.png");
  enemy4_image = loadImage("../images/enemy4.png");
  ground = loadImage("../images/space1.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight- 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2 && gameState == 0 ){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
