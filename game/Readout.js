Crafty.c("Readout", {
    backround: {},
    init: function() {
        this.addComponent("Persist");
        
        this.background = Crafty.e("2D, Canvas, Color, Persist")
            .attr({x: 0, y: 0, h: 32, w: 640, z:2000})
            .color("#ffffff");
            
        console.log("Created readout");
        
        this.zAction = Crafty.e("2D, Canvas, Text, Persist")
            .attr({x: 20, y: 0, h: 16, w: 200, z:3000})
            .text("Z: Pick up (Nothing)")
            .textColor("#888888");

        this.xAction = Crafty.e("2D, Canvas, Text, Persist")
            .attr({x: 220, y: 0, h: 16, w: 200, z:3000})
            .text("X: Dig")
            .textColor("#000000");

        this.cAction = Crafty.e("2D, Canvas, Text, Persist")
            .attr({x: 420, y: 0, h: 16, w: 200, z:3000})
            .text("C: Bark")
            .textColor("#000000");
            
         this.bind("EnterFrame", function() {
             var player = Crafty("Player");
         
             if (player.holdingObject) {
                 this.zAction.text("Z: Drop item");
                 this.zAction.textColor("#000000")
             } else if (player.hit("Pickup")) {
                 var pickup = player.hit("Pickup")[0]["obj"];
                 
                 if (!pickup.has("hidden")) {
                     this.zAction.text("Z: Pick up item");
                     this.zAction.textColor("#000000")                     
                 } else {
                     this.zAction.text("Z: Pick up item (Nothing)");
                     this.zAction.textColor("#888888")                                      
                 }             
             } else {
                     this.zAction.text("Z: Pick up item (Nothing)");
                     this.zAction.textColor("#888888")                                      
             
             }
             
             if (player.hit("Floor")) {
                 this.xAction.text("X: Dig (Go outside)");
                 this.xAction.textColor("#888888")                                                   
             } else if (player.hit("hole")) {
                 this.xAction.text("X: Cover hole");
                 this.xAction.textColor("#000000")                                                                
             } else if (player.hit("coveredHole")) {
                 this.xAction.text("X: Dig up hole");
                 this.xAction.textColor("#000000")                                                                             
             } else {
                 this.xAction.text("X: Dig");
                 this.xAction.textColor("#000000")                                                                             
             }
             
             if (player.holdingObject) {
                 this.cAction.text("C: Eat");
                 this.cAction.textColor("#000000")                                                   
             } else {
                 this.cAction.text("C: Bark");
                 this.cAction.textColor("#000000")                                                   
             }
             
         });
            
    }
});