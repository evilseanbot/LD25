var mapX = 1;
var mapY = 1;
var firstTime = true;

function changeMap() {
    for (x in Crafty("*")) {
        Crafty(x).destroy;
    }
}

$(document).ready(function() {

  // Initialize Crafty
  Crafty.init(640, // 640 Pixels Wide
              480  // 480 Pixels Tall
              )
        .background("white");
  Crafty.canvas.init(); // Create a Canvas Element 
  
  Crafty.audio.add({
      bump: ["bump2.wav"]
  });
  
  // This will create entities called hero
  Crafty.sprite(32, 63, "images/pickleTile.png", {
     hero: [0,0]
  }); 
  Crafty.sprite(31, 29, "images/flower.png", {
     flower: [0,0]
  });
  Crafty.sprite(32, "images/characters.png", {
     snailimg: [2,14],
     skelimg: [17,16],
     skelemptyimg: [18, 16]
  });
  

  Crafty.scene("loading", function() {
    Crafty.load(["images/pickleTile.png", "images/flower.png", "ground_tiles.png"], function() {
       Crafty.scene("main"); // Run the main scene      
    });
  });
  
  
  Crafty.scene("main",function() {
    //Crafty.audio.play("song",1, 0.10);        
    if (firstTime) {
        var player = Crafty.e("Player, Persist");
    }

    firstTime = false;   
    
    Crafty.e("TiledLevel").tiledLevel("tiled/warmupmap"+mapX+""+mapY+".json");    
    
    var borders = Crafty.e("Borders");
    
    var textBg = Crafty.e("2D, Canvas, Color") 
        .attr({x: 0, y: 360, h: 120, w:640, alpha: 0.5, z: 600})
        .color("black")
    
    var textBox = Crafty.e("2D, Canvas, Text")
        .attr({x: 50, y:410, z:601})
        .text("hello")
        .textColor("#ffffff")
        .textFont({family: 'Arial', size: "40px"})        
  });
    
  Crafty.scene("loading");
});