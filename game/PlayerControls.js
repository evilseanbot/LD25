  Crafty.c("PlayerControls", {
    _keys: {UP_ARROW: 'up', LEFT_ARROW: 'up', S: 'up', D: 'up'},
    _numKeysDown: 0,
    _facing: 'left',
    _keysFacing: {UP_ARROW: 'up', LEFT_ARROW:'left', DOWN_ARROW: 'down', RIGHT_ARROW:'right'},
    
    init: function() {
    
    
      for(var k in this._keys) {
        var keyCode = Crafty.keys[k] || k;
        this._keys[keyCode] = this._keys[k];
      }

      for(var k in this._keysFacing) {
        var keyCode = Crafty.keys[k] || k;
        this._keysFacing[keyCode] = this._keysFacing[k];
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
            if (Crafty("Player").hit("hole") ) {
                Crafty.audio.play("dig");            
                var hole = Crafty("Player").hit("hole")[0]["obj"];
                hole.addComponent("coveredHole");
                hole.removeComponent("hole");
                //this.shake(60);
                
                if (hole.hit("Pickup") ) {
                    var pickup = hole.hit("Pickup")[0]["obj"];
                    
                    if (!pickup.has("Held") ) {
                        pickup.tween({alpha: 0}, 30);
                        pickup.addComponent("Hidden");
                    }
                }                
                
            } else if (Crafty("Player").hit("coveredHole") ) {
                Crafty.audio.play("dig");                                                
                var hole = Crafty("Player").hit("coveredHole")[0]["obj"];
                hole.addComponent("hole");
                hole.removeComponent("CoveredHole");                
                //this.shake(60);
                
                if (hole.hit("Pickup") ) {
                    var pickup = hole.hit("Pickup")[0]["obj"];
                    pickup.tween({alpha: 1}, 30);
                        pickup.removeComponent("Hidden");                    
                }                

                
            } else {        
                if (!this.hit("Floor") ) {
                    Crafty.audio.play("dig");                                    
                    var hole = Crafty.e("2D, Canvas, hole, Collision, Tween, Roaming, Persist")
                      .attr({x: Crafty("Player").x, y: Crafty("Player").y, z: 1, alpha: 0.00})
                      .tween({alpha: 1.00}, 60);
                      
                    //this.shake(60);
                }
                
                
            }
                    
        } else if (e.key == 67) { // BARK action
            if (this.holdingObject) {
                this.heldObject.tween({alpha: 0.00}, 30);
                this.heldObject.addComponent("Hidden");                
                this.heldObject
                
                this.heldObject.timeout(function() {
                    this.attr({x: -5000, y:-5000});                
                }, 30.0*(1000.0/60.0) );
                this.holdingObject = false;
                Crafty.audio.play("eat");
                //this.shake(30);

            } else {
                Crafty.audio.play("bark");
            }
        }
      
        if(this._keys[e.key]) {
          //this._keysPressed = 'down';
          var oldFacing = this._facing;
          this._facing = this._keysFacing[e.key];                              
          if ((this._numKeysDown == 0) || (oldFacing != this._facing)) {          
            this.sprite.stop();
            this.sprite.animate('running', 8, -1);
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
            this.sprite.animate('standing', 8, -1);
            //this.sprite.animate('PlayerStanding' + this._facing, 30, -1);
          }
        }
      });
    }
  });