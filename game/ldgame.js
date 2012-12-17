var mapX = 1;
var mapY = 2;
var firstTime = true;
var gameOn =  true;
level = 1;
var holeType = "snow";

function reset() {
    Crafty("Reset").destroy();
    Crafty.audio.stop();            
    firstTime = true;
    Crafty.scene("main");
}

function setLevel2() {
    Crafty("Reset").destroy();
    Crafty.audio.stop();            
    firstTime = true;
    Crafty.scene("loadLevel2");
}

function setEnd() {
    Crafty("Reset").destroy();
    Crafty.audio.stop();            
    firstTime = true;
    Crafty.scene("ending");
}


function nextSlide(moviePlayer) {
          Crafty("ScreenTint").tween({alpha:0.00}, 60);
        
          
          if (moviePlayer.slide > 3 && level == 5) {
              moviePlayer.slide = 5;
              moviePlayer.removeComponent("opening"+moviePlayer.slide-2);              
              moviePlayer.removeComponent("opening"+moviePlayer.slide-1);
              moviePlayer.addComponent("opening"+moviePlayer.slide);                                  
          } else if (moviePlayer.slide > 4) {
              Crafty.scene("loading");
          } else {
              moviePlayer.removeComponent("opening"+moviePlayer.slide-1);
              moviePlayer.addComponent("opening"+moviePlayer.slide);                              
          }

}

$(document).ready(function() {

  Crafty.init(640, 
              480
              )
  Crafty.canvas.init(); 

  Crafty.sprite(640, 480, "Opening1.png", {
     opening1: [0,0]
  }); 
  
  Crafty.sprite(640, 480, "Opening2.png", {
     opening2: [0,0]
  }); 

  Crafty.sprite(640, 480, "Opening3.png", {
     opening3: [0,0]
  }); 

  Crafty.sprite(640, 480, "Opening4.png", {
     opening4: [0,0]
  }); 

  Crafty.sprite(640, 480, "Opening5.png", {
     opening5: [0,0]
  }); 
  
  
  Crafty.sprite(640, 480, "dreamBlur.png", {
     dreamBlur: [0,0]
  }); 

  
  Crafty.sprite(640, 80, "adultryHideText.png", {
     adultryMsg: [0,0]
  }); 

    Crafty.sprite(640, 80, "pantyExplosionText.png", {
     pantyMsg: [0,0]
  }); 

  Crafty.sprite(640, 80, "jonfreaks.png", {
     jonFreaksMsg: [0,0]
  }); 

    Crafty.sprite(640, 80, "corpsediscovery.png", {
     corpseMsg: [0,0]
  }); 
  

  
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
     snowHole: [0,0]
  }); 
  
  Crafty.sprite(64, 64, "snowCoveredHole.png", {
     snowCoveredHole: [0,0]
  }); 

  Crafty.sprite(64, 64, "darkHole.png", {
     darkHole: [0,0]
  }); 
  
  Crafty.sprite(64, 64, "darkCoveredHole.png", {
     darkCoveredHole: [0,0]
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
      Crafty.load(["tileset.png"], function() {
          Crafty.scene("intro");
      });
  });  
  
  Crafty.scene("loadLevel2", function() {
      Crafty.load(["nighttileset.png"], function() {
          Crafty.scene("main");
      });
  });
  
  Crafty.scene("intro", function() {
        Crafty.audio.play("happySong", -1);  
  
     var screenTint = Crafty.e("2D, Canvas, Color, ScreenTint, Tween")
            .attr({x: 0, y:0, h:480, w:640, alpha: 0.00, z:4000})
            .color("black");        
  
      var moviePlayer = Crafty.e("2D, Canvas, opening1");
      
      moviePlayer.slide = 1;
      moviePlayer.bind("KeyDown", function() {
          console.log(this.slide);
      
          this.slide++;
          Crafty("ScreenTint").tween({alpha:1.00}, 60);
          this.timeout(function () {
              nextSlide(this)
          }, 60*(1000/60));      
      });
  });

  Crafty.scene("ending", function() {
        Crafty.audio.play("happySong", -1);    
  
     var screenTint = Crafty.e("2D, Canvas, Color, ScreenTint, Tween")
            .attr({x: 0, y:0, h:480, w:640, alpha: 0.00, z:4000})
            .color("black");        
  
      var moviePlayer = Crafty.e("2D, Canvas, opening2");
      
      moviePlayer.slide = 2;
      moviePlayer.bind("KeyDown", function() {
          console.log(this.slide);
      
          this.slide++;
          Crafty("ScreenTint").tween({alpha:1.00}, 60);
          this.timeout(function () {
              nextSlide(this)
          }, 60*(1000/60));      
      });
  });
  
  
  
  Crafty.scene("main",function() {
  
    if (firstTime) {
        mapX = 1;
        mapY = 2;
    
        gameOn = true;            

        if (level == 1) {    
            
            holeType = "snow";
            
            var panties = Crafty.e("2D, Canvas, Evidence, panties, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (8*64)+(0*640), y:(4*64)+(1*480), z:2});    

            var shirt = Crafty.e("2D, Canvas, Evidence, shirt, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (8*64)+(0*640), y:(6*64)+(1*480), z:2});    
                
                
            var ron = Crafty.e("2D, Canvas, SeperateSprite, Persist, Roaming, Reset")
                .attr({x: (7*64)+(0*640), y:(5*64)+(1*480), z:2, h:64, w:64})
              
            ron.sprite = Crafty.e("2D, Canvas, ron, Persist, Roaming, Reset");

            var pepper = Crafty.e("2D, Canvas, SeperateSprite, Persist, Roaming, Reset")
                .attr({x: (6*64)+(0*640), y:(4*64)+(1*480), z:2, h:64, w:64})
              
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
                            Crafty.audio.stop();
                            Crafty.audio.play("tenseSong", -1);                        
                            Crafty("DialogBox").on = true;
                            Crafty("DialogBox").background.attr({alpha:1});
                            Crafty("DialogBox").text.attr({alpha:1});
                            Crafty("DialogBox").text.addComponent("adultryMsg");
                            this.event++;                        
                        }
                    }
                } else if (this.event == 1) {
                    if (Crafty("DialogBox").on == false) {
                        this.event++;
                         Crafty("DialogBox").text.removeComponent("adultryMsg");                        
                    }
                } else if (this.event == 2) {
                    var wife = Crafty.e("Searcher, Reset")
                        .attr({x: (4*64)+(0*640), y:(4*64)+(2*480), z:2});                        
                    wife.attr({x: wife.x - (mapX*640), y: wife.y - (mapY * 480)});           
                    this.event++;                
                }
            });

            
        } else if (level == 2) {
            mapX = 0;
            mapY = 0;

            holeType = "snow";

            
           var dreamBlur = Crafty.e("2D, Canvas, dreamBlur, Persist, Reset")
                  .attr({z:4000});

            var panties = Crafty.e("2D, Canvas, Evidence, panties, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (8*64)+(2*640), y:(4*64)+(2*480), z:2});    

            var ron = Crafty.e("2D, Canvas, SeperateSprite, Persist, Roaming, Reset")
                .attr({x: (4*64)+(0*640), y:(2*64)+(2*480), z:2, h:64, w:64})
            ron.sprite = Crafty.e("2D, Canvas, ron, Persist, Roaming, Reset");
                
                
            panties.attr({x: panties.x - (mapX*640), y: panties.y - (mapY * 480)});
            ron.attr({x: ron.x - (mapX*640), y: ron.y - (mapY * 480)});           

            var scenario = Crafty.e("2D, Canvas, Persist, Reset");

            scenario.event = 0;            
            
            scenario.bind("EnterFrame", function() {
                if (this.event == 0) {
                    if (mapX == 0) {
                        if (mapY == 2) {
                            Crafty("DialogBox").on = true;
                            Crafty("DialogBox").background.attr({alpha:1});
                            Crafty("DialogBox").text.attr({alpha:1});
                            Crafty("DialogBox").text.addComponent("adultryMsg");
                            this.event++;                        
                        }
                    }
                } else if (this.event == 1) {
                    if (Crafty("DialogBox").on == false) {
                        this.event++;
                         Crafty("DialogBox").text.removeComponent("adultryMsg");                        
                    }
                } else if (this.event == 2) {
                    level = 3;
                    this.timeout(function() {
                        setLevel2();
                    }, 120*(1000/60));
                    Crafty("ScreenTint").tween({alpha:1.00}, 120);                    
                    this.event++;
                }
            });

            
            

        } else if (level == 3) {
                    holeType = "dark";

        
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
                            Crafty("DialogBox").text.addComponent("jonFreaksMsg");
                            Crafty("DialogBox").text.attr({alpha:1});
                            this.event++;                        
                        }
                    }
                } else if (this.event == 1) {
                    Crafty("ScreenTint").attr({alpha: 0.00});
                    Crafty("ScreenTint").color("black");                                            
                    if (Crafty("DialogBox").on == false) {
                        Crafty("DialogBox").text.removeComponent("jonFreaksMsg");                    
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
                        .attr({x: (4*64)+(0*640), y:(4*64)+(2*480), z:2});                        
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
            
        
        } else if (level == 4) {
            mapX = 0;
            mapY = 0;
            
           holeType = "dark";
            
           var dreamBlur = Crafty.e("2D, Canvas, dreamBlur, Persist, Reset")
                  .attr({z:4000});

            var panties = Crafty.e("2D, Canvas, Evidence, panties, Pickup, Tween, Persist, Roaming, Reset")
                .attr({x: (8*64)+(2*640), y:(4*64)+(2*480), z:2});    

            var ron = Crafty.e("2D, Canvas, SeperateSprite, Persist, Roaming, Reset")
                .attr({x: (4*64)+(0*640), y:(3*64)+(2*480), z:2, h:64, w:64})
            ron.sprite = Crafty.e("2D, Canvas, ron, Persist, Roaming, Reset");
                
                
            panties.attr({x: panties.x - (mapX*640), y: panties.y - (mapY * 480)});
            ron.attr({x: ron.x - (mapX*640), y: ron.y - (mapY * 480)});           

            var scenario = Crafty.e("2D, Canvas, Persist, Reset");

            scenario.event = 0;            
            
            scenario.bind("EnterFrame", function() {
                if (this.event == 0) {
                    if (mapX == 0) {
                        if (mapY == 2) {
                            Crafty("DialogBox").on = true;
                            Crafty("DialogBox").background.attr({alpha:1});
                            Crafty("DialogBox").text.attr({alpha:1});
                            Crafty("DialogBox").text.addComponent("adultryMsg");
                            this.event++;                        
                        }
                    }
                } else if (this.event == 1) {
                    if (Crafty("DialogBox").on == false) {
                        this.event++;
                         Crafty("DialogBox").text.removeComponent("adultryMsg");                        
                    }
                } else if (this.event == 2) {
                    level = 5;
                    this.timeout(function() {
                        setEnd();
                    }, 120*(1000/60));
                    Crafty("ScreenTint").tween({alpha:1.00}, 120);                    
                    this.event++;
                }
            });
        }
         
        
        var player = Crafty.e("Player, Reset")
           .attr({x: 320, y:240})       

        
        var readout = Crafty.e("Readout, Reset");

        var screenTint = Crafty.e("2D, Canvas, Color, ScreenTint, Tween, Persist, Reset")
            .attr({x: 0, y:0, h:480, w:640, alpha: 1.00, z:4000})
            .color("white");

        screenTint.tween({alpha: 0.00}, 120);
            
        var dialogBox = Crafty.e("DialogBox, Reset");
     
        
        Crafty.audio.play("happySong", -1);
        
    }
    
    if (level == 1) {
        Crafty.e("TiledLevel").tiledLevel("winterhouse"+mapX+""+mapY+".json");    
    } else if (level == 2) {
        Crafty.e("TiledLevel").tiledLevel("winterdream"+mapY+".json");                
    } else if (level == 3) {
        Crafty.e("TiledLevel").tiledLevel("nighthouse"+mapX+""+mapY+".json");        
    } else if (level == 4) {
        Crafty.e("TiledLevel").tiledLevel("nightdream"+mapY+".json");        
    }
        
    var borders = Crafty.e("Borders, Reset");    
                
    /*
    var particles = Crafty.e("ParticleSystem")
    .attr({x: 50, y: 50, z: 2000}); 
    
    particles.load(particles, "testParticle.json");
    */
                
    firstTime = false;   
   
   });
    
  Crafty.scene("intro");
});