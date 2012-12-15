Crafty.c("Player", {
    target: "",
    sprite: "",
    activeBox: "",
    heldObject: {},
    holdingObject: false,
    init: function() {
        this.addComponent("2D")
          .addComponent("Canvas")
          .addComponent("Collision")
          .addComponent("SeperateSprite")
          .addComponent("Solid")
          .addComponent("Persist")          
          .attr({x: 400, y:50, h: 64, w: 64, z:100})
          
        this.sprite = Crafty.e("2D, Canvas, SpriteAnimation, dog, Mouse, Persist, SpriteColor")
          .attr({x: 400, y:50, h: 64, w: 64, z:100})      
          //.animate('PlayerRunningdown', 0, 0, 7) //setup  animation
          //.animate('PlayerRunningleft', 0, 1, 7) //setup  animation
          //.animate('PlayerRunningup', 0, 2, 7) //setup  animation
          //.animate('PlayerRunningright', 0, 3, 7) //setup  animation
          
          //.animate('PlayerStandingdown', 0, 0, 0) //setup  animation            
          //.animate('PlayerStandingleft', 0, 1, 0) //setup  animation            
          //.animate('PlayerStandingup', 0, 2, 0) //setup  animation
          //.animate('PlayerStandingright', 0, 3, 0) //setup  animation
             
      
      
             
      this.addComponent("PlayerControls")
          .addComponent("Multiway")
          .multiway(3, {W: -90, S: 90, D:0, A:180})
      
      this.activeBox = Crafty.e("2D, Canvas, Collision, Persist")
          .attr({h: 64, w:64})        
                  
      this.bind("EnterFrame", function() {
        // Scrolling code.
        /*
            Crafty.viewport.scroll('_x', -this.x+320);
            Crafty.viewport.scroll('_y', -this.y+240);
        */  
        
        if (this.holdingObject) {
            this.heldObject.attr({x: this.x, y:this.y});
        }
    
        if (this._facing == "up") {
            this.activeBox.attr({x: this.x, y: this.y-64});
        }
        if (this._facing == "right") {
            this.activeBox.attr({x: this.x+64, y: this.y});
        }
        if (this._facing == "down") {
            this.activeBox.attr({x: this.x, y: this.y+64});
        }
        if (this._facing == "left") {
            this.activeBox.attr({x: this.x-64, y: this.y});
        }
      });
          
      this.addComponent("Collision").bind('Moved', function(from) {      
          if(this.hit('Solid')) {
             this.target = this.hit('Solid')[0]["obj"];
             this.attr({x: from.x, y:from.y});
            // Crafty.audio.play("bump",1, 0.10);
          }
          
          if(this.hit('SouthBorder')) {
              this.attr({y: 0});
              mapY += 1;
              Crafty.scene("main");
          }
          if(this.hit('EastBorder')) {
              this.attr({x: 0});
              mapX += 1;
              Crafty.scene("main");              
          }
          if(this.hit('NorthBorder')) {
              this.attr({y: 447});
              mapY -= 1;
              Crafty.scene("main");              
          }
          if(this.hit('WestBorder')) {
              this.attr({x: 608});
              mapX -= 1;
              Crafty.scene("main");              
          }
          
      });      
      
    }    
});