Crafty.c("DialogBox", {
    on: false,
    init: function() {
        this.background = Crafty.e("2D, Canvas, Color, Persist, Reset")
            .attr({x: 0, y: 400, h: 0, w: 0, z:2000, alpha: 0})
            .color("#4444FF");
            
        this.text = Crafty.e("2D, Canvas, Persist, Reset")
            .attr({x: 120, y: 380, h: 100, w: 400, z:6000, alpha: 0})
        
        this.bind("KeyDown", function() {
            if (this.on) {
                this.background.attr({alpha: 0});
                this.text.attr({alpha: 0}); 
                //Crafty("Player")._movement.x = 0;
                //Crafty("Player")._movement.y = 0;
                //Crafty("Player").enableControl();
                this.on = false;
            }
        });

    }

})