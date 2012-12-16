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
  
  Crafty.sprite(64, 64, "shirt.png", {
     shirt: [0,0]
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

        var panties = Crafty.e("2D, Canvas, Evidence, panties, Pickup, Tween, Persist, Roaming")
            .attr({x: 300, y:100, z:2});    

        var shirt = Crafty.e("2D, Canvas, Evidence, shirt, Pickup, Tween, Persist, Roaming")
            .attr({x: 400, y:200, z:2});    
           
            
        var readout = Crafty.e("Readout");
            
    }
    
    Crafty.e("TiledLevel").tiledLevel("winterhouse"+mapX+""+mapY+".json");    

    var borders = Crafty.e("Borders");    
            
    /*
    var particles = Crafty.e("ParticleSystem")
    .attr({x: 50, y: 50, z: 2000}); 
    
    particles.load(particles, "testParticle.json");
    */
    
    if (firstTime) {
        var wife = Crafty.e("2D, Canvas, Wife, SeperateSprite, Multiway, Roaming, Persist")
            .attr({x: 300, y: 700, h: 64, w:64})
            .multiway(3, {});
            
        wife.sprite = Crafty.e("2D, Canvas, wife, Roaming, Persist");
        
        wife.searchBox = Crafty.e("2D, Canvas, Color, Collision, Roaming, Persist")
            .attr({h: 192, w:192, z: 3, alpha: 0.5})
            .color("#ffff00");
        
        wife.bind("EnterFrame", function() {
            this._movement.y = -1;
            this.searchBox.attr({x: this.x-64, y:this.y-192});
            
        });
        
        wife.searchBox.bind("EnterFrame", function() {
            if (this.hit("Evidence")) {
                if (!this.hit("Evidence")[0]["obj"].has("hidden")) {
                    Crafty.audio.play("scream");
                    player.sprite.destroy();
                    player.destroy();
                    wife.searchBox.destroy();
                    wife.sprite.destroy();
                    Crafty("Roaming").destroy();
                    
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