//var mapX = 1;
//var mapY = 1;
var firstTime = true;


$(document).ready(function() {

  Crafty.init(640, 
              480
              )
        .background("#ddffdd");
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
  
  
  
  Crafty.scene("loading", function() {
      Crafty.scene("main");
  });
  
  Crafty.scene("main",function() {
    if (firstTime) {
        var player = Crafty.e("Player")
            .attr({x: 320, y:240, h:64, w:64})        
    }
    
    
    panties = Crafty.e("2D, Canvas, panties, Pickup, Tween")
        .attr({x: 100, y:100});
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
    
    //var particles = Crafty.e("ParticleSystem");
    
    //particles.load("testParticle.json");

        
    firstTime = false;   
   
   });
    
  Crafty.scene("loading");
});