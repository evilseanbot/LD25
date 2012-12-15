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
        if (e.key == 90) {
            if (Crafty("Player").holdingObject) {
                Crafty("Player").heldObject.attr({z: 0});
                Crafty("Player").holdingObject = false;
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
                
                  if (activatedObject.has("panties")) {
                      Crafty("Player").heldObject = activatedObject;
                      Crafty("Player").heldObject.attr({z:1000});
                      Crafty("Player").holdingObject = true;
                  }
              }
            }
        } else if (e.key == 88) {
            if (Crafty("Player").hit("hole") ) {
                var hole = Crafty("Player").hit("hole")[0]["obj"];
                hole.addComponent("coveredHole");
                hole.removeComponent("hole");
                
                if (hole.hit("panties") ) {
                    var panties = hole.hit("panties")[0]["obj"];
                    panties.tween({alpha: 0}, 30);
                }                
                
            } else if (Crafty("Player").hit("coveredHole") ) {
                var hole = Crafty("Player").hit("coveredHole")[0]["obj"];
                hole.addComponent("hole");
                hole.removeComponent("CoveredHole");                
                
                if (hole.hit("panties") ) {
                    var panties = hole.hit("panties")[0]["obj"];
                    panties.tween({alpha: 1}, 30);
                }                

                
            } else {        
              var hole = Crafty.e("2D, Canvas, hole, Collision, Tween")
                .attr({x: Crafty("Player").x, y: Crafty("Player").y, z: -1, alpha: 0.00})
                .tween({alpha: 1.00}, 60);
                
                
            }
            
        }
      
        if(this._keys[e.key]) {
          //this._keysPressed = 'down';
          var oldFacing = this._facing;
          this._facing = this._keysFacing[e.key];                              
          if ((this._numKeysDown == 0) || (oldFacing != this._facing)) {          
            //this.sprite.stop();
            //this.sprite.animate('PlayerRunning' + this._facing, 30, -1);
          }
          this._numKeysDown++; 
        } 
      });
      
      this.bind("KeyUp",function(e) {
        if(this._keys[e.key]) {
          this._numKeysDown--;
          if (this._numKeysDown == 0) {          
            //this.sprite.stop();
            //this.sprite.animate('PlayerStanding' + this._facing, 30, -1);
          }
        }
      });
    }
  });