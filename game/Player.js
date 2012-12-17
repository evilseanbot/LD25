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
          .addComponent("Shaker")           
          .attr({x: 400, y:50, h: 60, w: 60, z:100})
          
        this.sprite = Crafty.e("2D, Canvas, SpriteAnimation, dog, Mouse, Persist, SpriteColor, Reset")
          .attr({x: 400, y:50, h: 64, w: 64, z:100})      
          //.animate("running", 0, 0, 3)
          .animate("standingDownRight", 0, 0, 0)
          .animate("standingDownLeft", 0, 1, 0)
          .animate("standingUpRight", 0, 2, 0)
          .animate("standingUpLeft", 0, 3, 0)          
          
          .animate('runningDownRight', 0, 0, 3)
          .animate('runningDownLeft', 0, 1, 3)
          .animate('runningUpRight', 0, 2, 3)
          .animate('runningUpLeft', 0, 3, 3)
          
          //.animate('PlayerRunningleft', 0, 1, 7) //setup  animation
          //.animate('PlayerRunningup', 0, 2, 7) //setup  animation
          //.animate('PlayerRunningright', 0, 3, 7) //setup  animation
          
          //.animate('PlayerStandingdown', 0, 0, 0) //setup  animation            
          //.animate('PlayerStandingleft', 0, 1, 0) //setup  animation            
          //.animate('PlayerStandingup', 0, 2, 0) //setup  animation
          //.animate('PlayerStandingright', 0, 3, 0) //setup  animation      
             
      this.addComponent("PlayerControls")
          .addComponent("Multiway")
          .multiway(5, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW:0, LEFT_ARROW:180})
      
      this.activeBox = Crafty.e("2D, Canvas, Collision, Persist, Reset")
          .attr({h: 64, w:64})        
      
      function checkWin() {
          var unhiddenEvidence = 0;
      
          for (i in Crafty("Evidence")) {
              if (!isNaN(i)) {
                  var realIndex = Crafty("Evidence")[i];
                  if (!Crafty(realIndex).has("Hidden")) {
                      unhiddenEvidence++;
                  }
                  
              }
          }
                    
          if (unhiddenEvidence == 0) {
              if (gameOn) {
                  Crafty("ScreenTint").tween({alpha:1.00}, 120);
              }
              gameOn = false;
          }
      }

      
      this.bind("EnterFrame", function() {
        // Scrolling code.
        /*
            Crafty.viewport.scroll('_x', -this.x+320);
            Crafty.viewport.scroll('_y', -this.y+240);
        */  
        
        if (this.holdingObject) {
            var xOffset;
            var zOffset;
        
            if (this.xFacing == "Left") {
                xOffset = -12;
            } else if (this.xFacing == "Right") {
                xOffset = 12;
            }
            
            if (this.yFacing == "Up") {
                zOffset = 3;
            } else if (this.yFacing == "Down") {
                zOffset = 1000;
            }
                        
            this.heldObject.attr({x: this.x+xOffset, y:this.y-12, z:zOffset});
        }
    
        if (this.xFacing == "up") {
            this.activeBox.attr({x: this.x, y: this.y-64});
        }
        if (this.xFacing == "right") {
            this.activeBox.attr({x: this.x+64, y: this.y});
        }
        if (this.xFacing == "down") {
            this.activeBox.attr({x: this.x, y: this.y+64});
        }
        if (this.xFacing == "left") {
            this.activeBox.attr({x: this.x-64, y: this.y});
        }
        
        checkWin();
        
      });
          
      this.addComponent("Collision").bind('Moved', function(from) {      
          if(this.hit('Solid')) {
             this.target = this.hit('Solid')[0]["obj"];
             this.attr({x: from.x, y:from.y});
            // Crafty.audio.play("bump",1, 0.10);
          }
          /*
          if(this.hit('SouthBorder')) {
          }
          if(this.hit('EastBorder')) {
              this.attr({x: 20});
              mapX += 1;
              Crafty.scene("main");              
          }
          if(this.hit('NorthBorder')) {
              this.attr({y: 420});
              mapY -= 1;
              Crafty.scene("main");              
          }
          if(this.hit('WestBorder')) {
              this.attr({x: 580});
              mapX -= 1;
              Crafty.scene("main");              
          }
          */
          
      });      
            
    }    
});