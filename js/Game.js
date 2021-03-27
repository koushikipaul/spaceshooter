class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.scale = 0.5;

    car2 = createSprite(300,200);
    car2.scale = 0.5;
    car2.addImage("car2",car2_img);
    enemy1 = createSprite(100,width*1/3);
    enemy1.addImage("enemy1",enemy1_image);
    enemy2 = createSprite(100,width*2/3);
    enemy2.addImage("enemy2",enemy2_image);
    enemy2.scale= 0.3;
    enemy1.scale = 0.3;
    cars = [car1, car2];
    enemies = [enemy1,enemy2];
  }

  play(){
    form.hide();
    this.spawnEnemies();
    Player.getPlayerInfo();
    Enemy.getInfo();
    if(allPlayers !== undefined){
      background(rgb(0,0,0));
      var m = player.y/height;
      if(player.y<height && player.y>0)
      image(space, 0,-height*1,width, height*2);
      image(space, 0,-height*3,width, height*2);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = allPlayers[plr].x;
        //use data form the database to display the cars in y direction
        y = allPlayers[plr].y;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y-300;
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(allPlayers !== undefined){
      
      
      //var display_position = 100;
      
      //index of the array
      var index1 = 0;

      //x and y position of the cars
      var xe = 175 ;
      var ye;
      console.log(allEnemies);
      for(var ene in allEnemies){
        //add 1 to the index for every loop
        index1 = index1 + 1 ;

        //position the cars a little away from each other in x direction
        xe= allEnemies[ene].x;
        //use data form the database to display the cars in y direction
        ye = allEnemies[ene].y;
        enemies[index1-1].x = xe;
        enemies[index1-1].y = ye;
        console.log(enemies[index1-1].y);
        
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
     enemy.y=player.y-500;
     enemy.x +=enemy.velocityX;
     if(enemy.x>width   || enemy.x<0){
        enemy.velocityX = enemy.velocityX*(-1);
     }
  
    enemy.update();
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=10
      player.update();
     
        }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.x +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.x -=10
      player.update();
    }
    if(keyIsDown(32) && player.index !== null){
      var bullet = new Myobject(player.x,player.y,5,10);
      bullet.velocityY = -10;
      bullet.velocityX = 0;
      player.bullets.push(bullet);
            player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
    }
   for(var i = 0;i<player.bullets.length;i++){
     player.bullets[i].display();

   }
  this.spawnEnemies();

    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
  spawnEnemies(){
    if(!enemy ){
        enemy = new Enemy;
        enemy.x=player.index*1/3*width;
        enemy.y=player.index*1/3*width;
      if(frameCount%200==0){
        var ebullet = new Myobject(enemy.x,enemy.y,5,10);
        ebullet.velocityY = 10;
        ebullet.velocityX = 0;
      enemy.bullets.push(ebullet);
      }
     }
}
}