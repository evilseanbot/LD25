Crafty.c("Searcher", {
    routineCounter: 0,
    stopped: false,
    init: function() {
        this.addComponent("2D")
            .addComponent("Canvas")
            .addComponent("SeperateSprite")
            .addComponent("Multiway")
            .addComponent("Roaming")
            .addComponent("Persist")
            .attr({h: 64, w:64})
            .multiway(3, {});
            
            this._movement.y = -1;
            
        this.sprite = Crafty.e("2D, Canvas, wife, Roaming, Persist, Reset");
        
        this.searchBox = Crafty.e("2D, Canvas, Color, Collision, Roaming, Persist, Reset")
            .attr({h: 192, w:192, z: 3, alpha: 0.5})
            .color("#ffff00");
        
        this.bind("EnterFrame", function() {
            this.searchBox.attr({x: this.x-64, y:this.y-192});
            
            
            if (!this.stopped) {
                this.routineCounter++;
                
                if (this.routineCounter > 60*10) {
                    this.routineCounter = 0;
                } else if (this.routineCounter > 60*5) {
                    this._movement.y = 3;
                } else {
                    this._movement.y = -3;
                }
            }
        });
                
        this.bind("EnterFrame", function() {
            if (this.stopped && Crafty("DialogBox").on == false) {
                 Crafty("ScreenTint").tween({alpha:1.00}, 60);
                 this.timeout(function() {
                     reset()
                 }, 60*(1000/30));
                 this.stopped = false;

            }
        
        
            if (this.searchBox.hit("Evidence")) {
                if (!this.searchBox.hit("Evidence")[0]["obj"].has("Hidden")) {
                    if (!this.stopped) {
                        this._movement.y = 0;
                        this.stopped = true;
                        Crafty.audio.stop();
                        Crafty.audio.play("scream");
                        Crafty("DialogBox").on = true;
                        Crafty("DialogBox").background.attr({alpha:1});
                        Crafty("DialogBox").text.attr({alpha:1});
                        if (level == 1) {
                            Crafty("DialogBox").text.addComponent("pantyMsg");
                        } else if (level == 3) {
                            Crafty("DialogBox").text.addComponent("corpseMsg");
                        }
                    }
                }
            }    
        });
    }
});