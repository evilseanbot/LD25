Crafty.c("DialogBox", {
    on: false,
    init: function() {
        this.background = Crafty.e("2D, Canvas, Color, Persist, Reset")
            .attr({x: 0, y: 400, h: 80, w: 640, z:2000, alpha: 0})
            .color("#4444FF");
            
        this.text = Crafty.e("2D, Canvas, Text, Persist, Reset")
            .attr({x: 20, y: 400, h: 16, w: 640, z:3000, alpha: 0})
            .textColor("#ffffff")

        this.line2 = Crafty.e("2D, Canvas, Text, Persist, Reset")
            .attr({x: 20, y: 460, h: 16, w: 640, z:3000, alpha: 0})
            .textColor("#ffffff")
            
        
        this.bind("KeyDown", function() {
            if (this.on) {
                this.background.attr({alpha: 0});
                this.text.attr({alpha: 0}); 
                this.line2.attr({alpha: 0});                 
                //Crafty("Player")._movement.x = 0;
                //Crafty("Player")._movement.y = 0;
                //Crafty("Player").enableControl();
                this.on = false;
            }
        });

    }

})