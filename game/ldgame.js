var mapX = 1;
var mapY = 2;
var firstTime = true;
var gameOn =  true;
level = 1;

function reset() {
    Crafty("Reset").destroy();
    Crafty.audio.stop();            
    firstTime = true;
    Crafty.scene("main");
}


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

  Crafty.sprite(64, 64, "ear.png", {
     ear: [0,0]
  }); 

    Crafty.sprite(64, 64, "hand.png", {
     hand: [0,0]
  }); 

    Crafty.sprite(64, 64, "leg.png", {
     leg: [0,0]
  }); 

  
  Crafty.sprite(64, 64, "shirt.png", {
     shirt: [0,0]
  }); 

  Crafty.sprite(64, 128, "ron.png", {
     ron: [0,0]
  }); 

  Crafty.sprite(64, 128, "pepper.png", {
     pepper: [0,0]
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

  Crafty.sprite(64, 128, "police.png", {
     police: [0,0]
  });   

  
  Crafty.audio.add({
      bark: ["bark.wav"],
      eat: ["eat.wav"],
      dig: ["dig.wav"],
      scream: ["scream.wav"],      
      happySong: ["MainTheme.wav"],
      tenseSong: ["HidingStuff.wav"]
  });  
  
  Crafty.scene("loading", function() {
      Crafty.load(["nighttileset.png", "tileset.png"], function() {
          Crafty.scene("main");
      });
  });
  
  Crafty.scene("main",function() {
  
    if (firstTime) {
        mapX = 1;
        mapY = 2;
    
        gameOn = true;            

        if (level == 1) {    
            
            var panties = Crafty.e("2D, Canvas, Evidence, panties, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (8*64)+(0*640), y:(4*64)+(1*480), z:2});    

            var shirt = Crafty.e("2D, Canvas, Evidence, shirt, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (8*64)+(0*640), y:(6*64)+(1*480), z:2});    
                
                
            var ron = Crafty.e("2D, Canvas, SeperateSprite, Persist, Roaming, Reset")
                .attr({x: (7*64)+(0*640), y:(5*64)+(1*480), z:2, h:64, w:64})
              
            ron.sprite = Crafty.e("2D, Canvas, ron, Persist, Roaming, Reset");

            var pepper = Crafty.e("2D, Canvas, SeperateSprite, Persist, Roaming, Reset")
                .attr({x: (6*64)+(0*640), y:(5*64)+(1*480), z:2, h:64, w:64})
              
            pepper.sprite = Crafty.e("2D, Canvas, pepper, Persist, Roaming, Reset");
            
            
            panties.attr({x: panties.x - (mapX*640), y: panties.y - (mapY * 480)});
            shirt.attr({x: shirt.x - (mapX*640), y: shirt.y - (mapY * 480)});           
            ron.attr({x: ron.x - (mapX*640), y: ron.y - (mapY * 480)});           
            pepper.attr({x: pepper.x - (mapX*640), y: pepper.y - (mapY * 480)});           

            
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
                        }
                    }
                } else if (this.event == 1) {
                    if (Crafty("DialogBox").on == false) {
                        this.event++;
                    }
                } else if (this.event == 2) {
                    var wife = Crafty.e("Searcher, Reset")
                        .attr({x: (4*64)+(0*640), y:(6*64)+(2*480), z:2});                        
                    wife.attr({x: wife.x - (mapX*640), y: wife.y - (mapY * 480)});           
                    Crafty.audio.stop();
                    Crafty.audio.play("tenseSong", -1);
                    this.event++;                
                }
            });

            
        } else if (level == 2) {
            var ear = Crafty.e("2D, Canvas, Evidence, ear, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (8*64)+(1*640), y:(5*64)+(2*480), z:2});    

            var hand1 = Crafty.e("2D, Canvas, Evidence, hand, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (5*64)+(2*640), y:(2*64)+(1*480), z:2});    

            var leg2 = Crafty.e("2D, Canvas, Evidence, leg, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (8*64)+(2*640), y:(6*64)+(1*480), z:2});    

            var ron = Crafty.e("2D, Canvas, SeperateSprite, Persist, Roaming, Reset")
                .attr({x: (1*64)+(2*640), y:(3*64)+(1*480), z:2, h:64, w:64})
              
            ron.sprite = Crafty.e("2D, Canvas, ron, Persist, Roaming, Reset");
                
                
            ear.attr({x: ear.x - (mapX*640), y: ear.y - (mapY * 480)});
            hand1.attr({x: hand1.x - (mapX*640), y: hand1.y - (mapY * 480)});
            leg2.attr({x: leg2.x - (mapX*640), y: leg2.y - (mapY * 480)});
            ron.attr({x: ron.x - (mapX*640), y: ron.y - (mapY * 480)});           
            
            var scenario = Crafty.e("2D, Canvas, Persist, Reset");

            scenario.event = 0;
            
            scenario.bind("EnterFrame", function() {
                if (this.event == 0) {
                    if (mapX == 2) {
                        if (mapY == 1) {
                            Crafty("ScreenTint").attr({alpha: 0.5});
                            Crafty("ScreenTint").color("red");                            
                            Crafty.audio.stop();
                            Crafty.audio.play("tenseSong", -1);                            
                            Crafty("DialogBox").on = true;
                            Crafty("DialogBox").background.attr({alpha:1});
                            Crafty("DialogBox").text.attr({alpha:1});
                            Crafty("DialogBox").text.text("JON: I JUST COULDNT STOP MYSELF. WHAT ARE WE GOING TO DO!?!.");
                            this.event++;                        
                        }
                    }
                } else if (this.event == 1) {
                    Crafty("ScreenTint").attr({alpha: 0.00});
                    Crafty("ScreenTint").color("black");                                            
                    if (Crafty("DialogBox").on == false) {
                        this.event++;
                    }
                } else if (this.event == 2) {

            var hand2 = Crafty.e("2D, Canvas, Evidence, hand, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (2*64)+(1*640), y:(2*64)+(1*480), z:2});    

            var leg1 = Crafty.e("2D, Canvas, Evidence, leg, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (7*64)+(0*640), y:(6*64)+(1*480), z:2});    

            hand2.attr({x: hand2.x - (mapX*640), y: hand2.y - (mapY * 480)});
            leg1.attr({x: leg1.x - (mapX*640), y: leg1.y - (mapY * 480)});
                

                    var wife = Crafty.e("Searcher, Reset")
                        .attr({x: (4*64)+(0*640), y:(6*64)+(2*480), z:2});                        
                    wife.attr({x: wife.x - (mapX*640), y: wife.y - (mapY * 480)});           
                    Crafty.audio.stop();
                    Crafty.audio.play("tenseSong", -1);
                    this.event++;                
                    
                    var police = Crafty.e("Searcher, Reset")
                        .attr({x: (5*64)+(2*640), y:(5*64)+(2*480), z:2});                        
                    police.attr({x: police.x - (mapX*640), y: police.y - (mapY * 480)});           
                    police.sprite.removeComponent("wife");
                    police.sprite.addComponent("police");                    
                    this.event++;                
                }
            });
            
        
        }
        
        var player = Crafty.e("Player, Reset")
           .attr({x: 320, y:240})       

        
        var readout = Crafty.e("Readout, Reset");

        var screenTint = Crafty.e("2D, Canvas, Color, ScreenTint, Tween, Persist, Reset")
            .attr({x: 0, y:0, h:480, w:640, alpha: 0.00, z:4000})
            .color("black");        
            
        var dialogBox = Crafty.e("DialogBox, Reset");
     
        
        Crafty.audio.play("happySong", -1);
        
    }
    
    if (level == 1) {
        console.log("Level is 1!");
        Crafty.e("TiledLevel").tiledLevel("winterhouse"+mapX+""+mapY+".json");    
    } else if (level == 2) {
        console.log("Level is 2!");    
        Crafty.e("TiledLevel").tiledLevel("nighthouse"+mapX+""+mapY+".json");        
    }
        
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