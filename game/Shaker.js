Crafty.c("Shaker", {
    shakeCounter: 0,
    timeToShake: 0,
    shakeUp: true,
    shaking: false,
    shake: function(shakeTime) {
        this.timeToShake = shakeTime;
        this.shaking = true;
        
//        this.removeComponent("Multiway");
//        this.addComponent("Multiway");
        this.multiway(0, {});
    },
    init: function() {
        this.bind("EnterFrame", function() {
            if (this.shaking) {
                this.shakeCounter++;
                this.sprite.stop();

                if (this.shakeUp) {
                    this.shakeUp = false;
                    this._movement.y = -4;
                    //this.attr({y: this.y-4});
                } else {
                    this.shakeUp = true;
                    this._movement.y = 4;
 //                   this.attr({y: this.y+4});                
                }
                
                if (this.shakeCounter > this.timeToShake) {
                    this.shaking = false;
                    this.shakeCounter = 0;
                    this.multiway(5, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW:0, LEFT_ARROW:180});
                    this._movement.y = 0;
                }                
                
                
            }
        });
        
    }
});