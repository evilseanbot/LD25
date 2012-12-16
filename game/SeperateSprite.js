Crafty.c("SeperateSprite", {
    sprite: 0,
    init: function() {
      this.bind("EnterFrame", function() {
        this.attr({z: 100+this.y});      
        this.sprite.attr({x: this.x, y:this.y- (this.sprite.h - this.h), z: this.z});
      });
    }
});