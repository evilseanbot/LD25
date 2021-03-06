  Crafty.c("PlayerControls", {
    _keys: {UP_ARROW: 'up', LEFT_ARROW: 'up', S: 'up', D: 'up'},
    _numKeysDown: 0,
    xFacing: 'Right',
    yFacing: 'Down',
    xKeysFacing: {LEFT_ARROW:'Left', RIGHT_ARROW:'Right'},
    yKeysFacing: {UP_ARROW: 'Up', DOWN_ARROW: 'Down'},
    
    init: function() {
    
    
      for(var k in this._keys) {
        var keyCode = Crafty.keys[k] || k;
        this._keys[keyCode] = this._keys[k];
      }

      for(var k in this.xKeysFacing) {
        var keyCode = Crafty.keys[k] || k;
        this.xKeysFacing[keyCode] = this.xKeysFacing[k];
      }

      for(var k in this.yKeysFacing) {
        var keyCode = Crafty.keys[k] || k;
        this.yKeysFacing[keyCode] = this.yKeysFacing[k];
      }
      
      
      this.bind("KeyDown",function(e) {              
        if (e.key == 90) { // GRAB button
            if (this.holdingObject) {
                this.heldObject.attr({z: 2});
                this.heldObject.removeComponent("Held");
                this.holdingObject = false;
            } else {
               touchedObject = false;
            
               if (this.hit("Pickup") ) {
                   activatedObject = this.hit("Pickup")[0]["obj"];
                   touchedObject = true;
               } else if (this.activeBox.hit("Pickup")[0]["obj"]) {
                   ativatedObject = this.activeBox.hit("Pickup")[0]["obj"];
                   touchedObject = true;
               }
            
              if (touchedObject) {
                
                  if (activatedObject.has("Pickup")) {
                      if (!activatedObject.has("Hidden")) {
                          this.heldObject = activatedObject;
                          this.heldObject.attr({z:1000});
                          this.heldObject.addComponent("Held");
                          this.holdingObject = true;
                      }
                  }
              }
            }
        } else if (e.key == 88) { // DIG action
            if (Crafty("Player").hit(holeType+"Hole") ) {
                Crafty.audio.play("dig");            
                var hole = Crafty("Player").hit(holeType+"Hole")[0]["obj"];
                hole.addComponent(holeType+"CoveredHole");
                hole.removeComponent(holeType+"Hole");
                //this.shake(60);
                
                if (hole.hit("Pickup") ) {
                    var pickup = hole.hit("Pickup")[0]["obj"];
                    
                    if (!pickup.has("Held") ) {
                        pickup.tween({alpha: 0}, 30);
                        pickup.addComponent("Hidden");
                    }
                }                
                
            } else if (Crafty("Player").hit(holeType+"CoveredHole") ) {
                Crafty.audio.play("dig");                                                
                var hole = Crafty("Player").hit(holeType+"CoveredHole")[0]["obj"];
                hole.addComponent(holeType+"Hole");
                hole.removeComponent(holeType+"CoveredHole");                
                //this.shake(60);
                
                if (hole.hit("Pickup") ) {
                    var pickup = hole.hit("Pickup")[0]["obj"];
                    pickup.tween({alpha: 1}, 30);
                        pickup.removeComponent("Hidden");                    
                }                

                
            } else {        
                if (!this.hit("Floor") ) {
                    Crafty.audio.play("dig");          
                    console.log("2D, Canvas, "+ holeType + "Hole, Collision, Tween, Roaming, Persist, Reset");                    
                    var hole = Crafty.e("2D, Canvas, "+ holeType + "Hole, Collision, Tween, Roaming, Persist, Reset")
                      .attr({x: Crafty("Player").x, y: Crafty("Player").y, z: 1, alpha: 0.00})
                      .tween({alpha: 1.00}, 60);
                      
                    //this.shake(60);
                }
                
                
            }
			
			var dust = Crafty.e("ParticleSystem");
			dust.load("testParticle.json");
			dust.attr({x: Crafty("Player").x+32, y: Crafty("Player").y+32, z: Crafty("Player").z});
                    
        } else if (e.key == 67) { // BARK action
            /*if (this.holdingObject) {
                this.heldObject.tween({alpha: 0.00}, 30);
                this.heldObject.addComponent("Hidden");                
                this.heldObject
                
                this.heldObject.timeout(function() {
                    this.attr({x: -5000, y:-5000});                
                }, 30.0*(1000.0/60.0) );
                this.holdingObject = false;
                Crafty.audio.play("eat");
                //this.shake(30);

            } else {*/
                Crafty.audio.play("bark");
            //}
        }
      
        if(this._keys[e.key]) {
          //this._keysPressed = 'down';
          var oldXFacing = this.xFacing;
          var oldYFacing = this.yFacing;
          
          if (this.xKeysFacing[e.key]) {
              this.xFacing = this.xKeysFacing[e.key];                              
          } else if (this.yKeysFacing[e.key]) {
              this.yFacing = this.yKeysFacing[e.key];                              
          }
          
          
          if ((this._numKeysDown == 0) || (oldXFacing != this.xFacing) || (oldYFacing != this.yFacing)) {          
            this.sprite.stop();
            this.sprite.animate('running' + this.yFacing + "" + this.xFacing, 8, -1);
            //this.sprite.animate('PlayerRunning' + this._facing, 30, -1);
          }
          this._numKeysDown++; 
        } 
      });
      
      this.bind("KeyUp",function(e) {
        if(this._keys[e.key]) {
          this._numKeysDown--;
          if (this._numKeysDown == 0) {          
            this.sprite.stop();
            this.sprite.animate('standing' + this.yFacing + "" + this.xFacing, 8, -1);
            //this.sprite.animate('PlayerStanding' + this._facing, 30, -1);
          }
        }
      });
    }
  });