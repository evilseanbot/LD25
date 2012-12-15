  Crafty.c("PlayerControls", {
    _keys: {W: 'up', A: 'up', S: 'up', D: 'up'},
    _numKeysDown: 0,
    _facing: 'left',
    _keysFacing: {W: 'up', A:'left', S: 'down', D:'right'},
    
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
              activatedObject = this.activeBox.hit("Pickup")[0]["obj"];
              if (activatedObject.has("panties")) {
                  Crafty("Player").heldObject = activatedObject;
                  Crafty("Player").heldObject.attr({z:1000});
                  Crafty("Player").holdingObject = true;
              } 
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