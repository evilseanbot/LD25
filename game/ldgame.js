var mapX = 0;
var mapY = 0;
var firstTime = true;


$(document).ready(function() {

  Crafty.init(640, 
              480
              )
  Crafty.canvas.init(); // Create a Canvas Element 
    
  // This will create entities called hero
  
  Crafty.sprite(64, 64, "dogwalk.png", {
     dog: [0,0]
  }); 

  Crafty.sprite(64, 64, "panties.png", {
     panties: [0,0]
  }); 

  Crafty.sprite(64, 64, "snowHole.png", {
     hole: [0,0]
  }); 
  
  Crafty.sprite(64, 64, "snowCoveredHole.png", {
     coveredHole: [0,0]
  }); 

  Crafty.sprite(64, 128, "wife.png", {
     wife: [0,0]
  }); 
  
  //Crafty.load("tileset.png");
  
  
  Crafty.audio.add({
      bark: ["bark.wav"],
      eat: ["eat.wav"],
      dig: ["dig.wav"],
      scream: ["scream.wav"]      
  });  
  
  Crafty.scene("loading", function() {
      Crafty.load(["tileset.png"], function() {
          Crafty.scene("main");
      });
  });
  
  Crafty.scene("main",function() {
    if (firstTime) {
        var player = Crafty.e("Player")
            .attr({x: 320, y:240})        

        var panties = Crafty.e("2D, Canvas, panties, Pickup, Tween, Persist")
            .attr({x: 300, y:100, z:2});            
            
    }
    
    Crafty.e("TiledLevel").tiledLevel("winterhouse"+mapX+""+mapY+".json");    

    var borders = Crafty.e("Borders");    
            
    /*
    var particles = Crafty.e("ParticleSystem")
    .attr({x: 50, y: 50, z: 2000}); 
    
    particles.load(particles, "testParticle.json");
    */
    
    if (firstTime) {
        var wife = Crafty.e("2D, Canvas, Wife, SeperateSprite, Multiway")
            .attr({x: 300, y: 700, h: 64, w:64})
            .multiway(3, {});
            
        wife.sprite = Crafty.e("2D, Canvas, wife");
        
        wife.searchBox = Crafty.e("2D, Canvas, Color, Collision")
            .attr({h: 192, w:192, z: 3, alpha: 0.5})
            .color("#ffff00");
        
        wife.bind("EnterFrame", function() {
            this._movement.y = -1;
            this.searchBox.attr({x: this.x-64, y:this.y-192});
            
        });
        
        wife.searchBox.bind("EnterFrame", function() {
            if (this.hit("panties")) {
                if (!this.hit("panties")[0]["obj"].has("hidden")) {
                    Crafty.audio.play("scream");
                    player.destroy();
                    player.sprite.destroy();
                    firstTime = true;
                    Crafty.scene("main");
                }
            }    
        });
    }
            
    firstTime = false;   
   
   });
    
  Crafty.scene("loading");
});