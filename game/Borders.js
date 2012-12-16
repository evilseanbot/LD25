  Crafty.c("Borders", {
    init: function() {

        var southBorder = Crafty.e("2D, Canvas, Collision, Color, SouthBorder")
            .attr({x: 0, y: 480, h: 20, w: 640, z:200})
            .color("red");
            
        var eastBorder = Crafty.e("2D, Canvas, Collision, Color, EastBorder")
            .attr({x: 640, y: 0, h: 480, w: 20, z:200})
            .color("red");

        var northBorder = Crafty.e("2D, Canvas, Collision, Color, NorthBorder")
            .attr({x: 0, y: -20, h: 20, w: 640, z:200})
            .color("red");

        var westBorder = Crafty.e("2D, Canvas, Collision, Color, WestBorder")
            .attr({x: -20, y: 0, h: 480, w: 10, z:200})
            .color("blue");
            
            
        southBorder.addComponent("Collision").bind('Moved', function(from) {
            if (this.hit('Player')) {
            }
        });
        
        eastBorder.addComponent("Collision").bind('Moved', function(from) {
            if (this.hit('Player')) {
            }
        });
     
        northBorder.addComponent("Collision").bind('Moved', function(from) {
            if (this.hit('Player')) {
            }
        });

        westBorder.addComponent("Collision").bind('Moved', function(from) {
            if (this.hit('Player')) {
            }
        });
    }
});