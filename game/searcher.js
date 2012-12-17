Crafty.c("Searcher", {
    routineCounter: 0,
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
            
        this.sprite = Crafty.e("2D, Canvas, wife, Roaming, Persist");
        
        this.searchBox = Crafty.e("2D, Canvas, Color, Collision, Roaming, Persist")
            .attr({h: 192, w:192, z: 3, alpha: 0.5})
            .color("#ffff00");
        
        this.bind("EnterFrame", function() {
            this.searchBox.attr({x: this.x-64, y:this.y-192});
            
            this.routineCounter++;
            
            if (this.routineCounter > 60*10) {
                this.routineCounter = 0;
            } else if (this.routineCounter > 60*5) {
                this._movement.y = 3;
            } else {
                this._movement.y = -3;
            }
        });
        
        
        
        this.searchBox.bind("EnterFrame", function() {
            if (this.hit("Evidence")) {
                if (!this.hit("Evidence")[0]["obj"].has("hidden")) {
                    Crafty.audio.play("scream");
                    Crafty("Player").sprite.destroy();
                    Crafty("Player").destroy();
                    this.searchBox.destroy();
                    this.sprite.destroy();
                    Crafty("Roaming").destroy();
                    
                    firstTime = true;
                    Crafty.scene("main");
                }
            }    
        });
    }
});