class Enemy {
    constructor(){
      this.index = null;
      this.x = 0;
      this.y =0 ;
    
      this.bullets = [];
    }
  
   
  
    update(){
      var playerIndex = "enemies/enemy" + this.index;
      database.ref(playerIndex).set({
       
      x:this.x,
      y:this.y,
      bullets:this.bullets
      });
    }
    static getPlayerInfo(){
        var playerInfoRef = database.ref('enemies');
        playerInfoRef.on("value",(data)=>{
          allEnemies = data.val();
        })
      }
   
    
  }
  