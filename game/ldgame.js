var mapX = 1;
var mapY = 2;
var firstTime = true;
var gameOn =  true;


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
            .attr({x: (8*64)+(0*640), y:(4*64)+(1*480), z:2});    

        var shirt = Crafty.e("2D, Canvas, Evidence, shirt, Pickup, Tween, Persist, Roaming")
            .attr({x: (8*64)+(0*640), y:(6*64)+(1*480), z:2});    
            
        var wife = Crafty.e("Searcher")
            .attr({x: (4*64)+(0*640), y:(6*64)+(2*480), z:2});
            
       panties.attr({x: panties.x - (mapX*640), y: panties.y - (mapY * 480)});
       shirt.attr({x: shirt.x - (mapX*640), y: shirt.y - (mapY * 480)});           
       wife.attr({x: wife.x - (mapX*640), y: wife.y - (mapY * 480)});           
            
        var readout = Crafty.e("Readout");

    var screenTint = Crafty.e("2D, Canvas, Color, ScreenTint, Tween, Persist")
        .attr({x: 0, y:0, h:480, w:640, alpha: 0.00, z:4000})
        .color("black");        
        
        
    }
    

    
    Crafty.e("TiledLevel").tiledLevel("winterhouse"+mapX+""+mapY+".json");    

    var borders = Crafty.e("Borders");    
    
            
    /*
    var particles = Crafty.e("ParticleSystem")
    .attr({x: 50, y: 50, z: 2000}); 
    
    particles.load(particles, "testParticle.json");
    */
                
    firstTime = false;   
   
   });
    
  Crafty.scene("loading");
});