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

    Crafty.sprite(64, 128, "ron.png", {
     ron: [0,0]
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
        mapX = 1;
        mapY = 2;
    
        var player = Crafty.e("Player, Reset")
            .attr({x: 320, y:240})        

        var panties = Crafty.e("2D, Canvas, Evidence, panties, Pickup, Tween, Persist, Roaming, Reset")
            .attr({x: (8*64)+(0*640), y:(4*64)+(1*480), z:2});    

        var shirt = Crafty.e("2D, Canvas, Evidence, shirt, Pickup, Tween, Persist, Roaming, Reset")
            .attr({x: (8*64)+(0*640), y:(6*64)+(1*480), z:2});    
            
            
        var ron = Crafty.e("2D, Canvas, SeperateSprite, Persist, Roaming, Reset")
            .attr({x: (7*64)+(0*640), y:(5*64)+(1*480), z:2, h:64, w:64})
          
        ron.sprite = Crafty.e("2D, Canvas, ron, Persist, Roaming, Reset");
          
       panties.attr({x: panties.x - (mapX*640), y: panties.y - (mapY * 480)});
       shirt.attr({x: shirt.x - (mapX*640), y: shirt.y - (mapY * 480)});           
       ron.attr({x: ron.x - (mapX*640), y: ron.y - (mapY * 480)});           
            
        var readout = Crafty.e("Readout, Reset");

        var screenTint = Crafty.e("2D, Canvas, Color, ScreenTint, Tween, Persist, Reset")
            .attr({x: 0, y:0, h:480, w:640, alpha: 0.00, z:4000})
            .color("black");        
            
        var dialogBox = Crafty.e("DialogBox, Reset");
     
        var scenario = Crafty.e("2D, Canvas, Persist, Reset");

        scenario.event = 0;
        
        scenario.bind("EnterFrame", function() {
            if (this.event == 0) {
                if (mapX == 0) {
                    if (mapY == 1) {
                        Crafty("DialogBox").on = true;
                        Crafty("DialogBox").background.attr({alpha:1});
                        Crafty("DialogBox").text.attr({alpha:1});
                        //Crafty("DialogBox").line2.attr({alpha:1});                        
                        Crafty("DialogBox").text.text("JON: WE'RE GONNA BE IN TROUBLE WITH RACHEL IF WE DON'T HIDE THIS STUFF.");
                        //Crafty("DialogBox").line2.text("YOU HAVE TO HELP ME HIDE THIS STUFF BEFORE RACHEL SEES IT.");
                        //Crafty("Player").disableControl();
                        this.event++;
                        
                        this.timeout(function() {
                            var wife = Crafty.e("Searcher, Reset")
                                .attr({x: (4*64)+(0*640), y:(6*64)+(2*480), z:2});                        
                            wife.attr({x: wife.x - (mapX*640), y: wife.y - (mapY * 480)});           
                        }, 60*(1000/60));
                        
                    }
                }
            }
        });
        
    }
    
    Crafty.e("TiledLevel").tiledLevel("winterhouse"+mapX+""+mapY+".json");    

    var borders = Crafty.e("Borders, Reset");    
    
            
    /*
    var particles = Crafty.e("ParticleSystem")
    .attr({x: 50, y: 50, z: 2000}); 
    
    particles.load(particles, "testParticle.json");
    */
                
    firstTime = false;   
   
   });
    
  Crafty.scene("loading");
});