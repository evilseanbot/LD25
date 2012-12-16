Crafty.c("Border", {
   movePersistObjects: function(xMove, yMove) {       
       for (i in Crafty("Roaming")) {
                  
           if (!isNaN(i)) {               
               var realIndex = Crafty("Roaming")[i];
               
               var object = Crafty(realIndex);
               
               if (!object.has("Held")) {
                   object.attr({x: object.x+xMove, y: object.y+yMove});
               }
               
           }
       }
   },
   init: function() {
   
   }
});

  Crafty.c("Borders", {
    init: function() {

        var southBorder = Crafty.e("2D, Canvas, Collision, Color, SouthBorder, Border")
            .attr({x: 0, y: 480, h: 20, w: 640, z:200})
            .color("red");
            
        var eastBorder = Crafty.e("2D, Canvas, Collision, Color, EastBorder, Border")
            .attr({x: 640, y: 0, h: 480, w: 20, z:200})
            .color("red");

        var northBorder = Crafty.e("2D, Canvas, Collision, Color, NorthBorder, Border")
            .attr({x: 0, y: -20, h: 20, w: 640, z:200})
            .color("red");

        var westBorder = Crafty.e("2D, Canvas, Collision, Color, WestBorder, Border")
            .attr({x: -20, y: 0, h: 480, w: 10, z:200})
            .color("blue");
            
            
        southBorder.addComponent("Collision").bind('EnterFrame', function(from) {
            if (this.hit('Player')) {
                this.movePersistObjects(0, -480);
                Crafty("Player").attr({y: 20});
                mapY += 1;
                Crafty.scene("main");                
            }
        });
        
        eastBorder.addComponent("Collision").bind('EnterFrame', function(from) {
            if (this.hit('Player')) {
                this.movePersistObjects(-640, 0);            
                Crafty("Player").attr({x: 20});
                mapX += 1;
                Crafty.scene("main");                                
            }
        });
     
        northBorder.addComponent("Collision").bind('EnterFrame', function(from) {
            if (this.hit('Player')) {
                this.movePersistObjects(0, 480);
                Crafty("Player").attr({y: 420});
                mapY -= 1;
                Crafty.scene("main");                                                
            }
        });

        westBorder.addComponent("Collision").bind('EnterFrame', function(from) {
            if (this.hit('Player')) {
                this.movePersistObjects(640, 0);            
                Crafty("Player").attr({x: 580});
                mapX -= 1;
                Crafty.scene("main");                                                
            }
        });
    }
});