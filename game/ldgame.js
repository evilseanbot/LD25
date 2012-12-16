//var mapX = 1;
//var mapY = 1;
var firstTime = true;


$(document).ready(function() {

  Crafty.init(640, 
              480
              )
        .background("#bbffbb");
  Crafty.canvas.init(); // Create a Canvas Element 
    
  // This will create entities called hero
  
  Crafty.sprite(64, 64, "dog.png", {
     dog: [0,0]
  }); 

  Crafty.sprite(64, 64, "panties.png", {
     panties: [0,0]
  }); 

  Crafty.sprite(64, 64, "hole.png", {
     hole: [0,0]
  }); 
  
  Crafty.sprite(64, 64, "CoveredHole.png", {
     coveredHole: [0,0]
  }); 

  Crafty.sprite(64, 128, "wife.png", {
     wife: [0,0]
  }); 
  
  
  
  Crafty.audio.add({
      bark: ["bark.wav"],
      eat: ["eat.wav"],
      dig: ["dig.wav"]
  });  
  
  Crafty.scene("loading", function() {
      Crafty.scene("main");
  });
  
  Crafty.scene("main",function() {
    if (firstTime) {
        var player = Crafty.e("Player")
            .attr({x: 320, y:240, h:64, w:64})        
    }
    
    
    panties = Crafty.e("2D, Canvas, panties, Pickup, Tween")
        .attr({x: 300, y:100});
    /*
    gameScreen = Crafty.e("2D, Canvas, Mouse")
        .attr({x: 0, y:0, h: 640, w:480});
        
    gameScreen.rolling = false;
    gameScreen.stillCounter = 0;
    gameScreen.mouseShakesThisSecond = 0;    
    gameScreen.mouseShakesLastSecond = 0;
    gameScreen.frameOfSecond = 0;
    gameScreen.mouseMovingLeft = true;
    gameScreen.oldMouseX = 0;
        
    gameScreen.bind('MouseMove', function(e)  {
        this.rolling = true;
        this.mouseMovesThisSecond++;
        
        if (this.oldMouseX > e.x) {
            if (!this.mouseMovingLeft)
                this.mouseShakesThisSecond++;
        
            this.mouseMovingLeft = true;
        } else if (this.oldMouseX < e.x) {
            if (this.mouseMovingLeft)
                this.mouseShakesThisSecond++;
        
            this.mouseMovingLeft = false;
        }
        
        gameScreen.oldMouseX = e.x;
        
        
    });
    
    gameScreen.bind('EnterFrame', function() {
        this.rolling = false;
        
        if (!this.rolling) {
            this.stillCounter++;
            
            if (this.stillCounter > 60) {
                this.stillCounter = 0;
            }
        } else {
            this.stillCounter = 0;
        }
        
        this.frameOfSecond++;
        
        if (this.frameOfSecond > 60) {
            this.frameOfSecond = 0;
            this.mouseShakesLastSecond = this.mouseShakesThisSecond;
            this.mouseShakesThisSecond = 0;
            
            if (this.mouseShakesLastSecond > 7) {
                //Crafty("Player").sprite.spriteColor("red");
            } else {
                //Crafty("Player").sprite.spriteColor("black");
            }
        }                
    });
    */
    
    /*
    var particles = Crafty.e("ParticleSystem")
    .attr({x: 50, y: 50, z: 2000}); 
    
    particles.load(particles, "testParticle.json");
    */
    
    var wife = Crafty.e("2D, Canvas, Wife, SeperateSprite, Multiway")
        .attr({x: 300, y: 700, h: 64, w:64})
        .multiway(3, {});
        
    wife.sprite = Crafty.e("2D, Canvas, wife");
    
    wife.searchBox = Crafty.e("2D, Canvas, Color, Collision")
        .attr({h: 192, w:192})
        .color("#ffff00");
    
    wife.bind("EnterFrame", function() {
        this._movement.y = -1;
        this.searchBox.attr({x: this.x-64, y:this.y-192});
        
    });
    
    wife.searchBox.bind("EnterFrame", function() {
        if (this.hit("panties")) {
            player.destroy();
            Crafty.scene("main");
        }    
    });
            
    firstTime = false;   
   
   });
    
  Crafty.scene("loading");
});