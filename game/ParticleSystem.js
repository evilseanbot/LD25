Crafty.c("Particle", {
    timeToLive: 60,
    lifeTime: 0.00,
    init: function() {    
      this.bind("EnterFrame", function() {
        this.lifeTime++;                
        
        if (this.lifeTime > this.timeToLive) {
          this.destroy();
        }

        var delta = (this.AngleEnd - this.AngleStart) / this.timeToLive;         
        this.AngleCurrent += delta;

        var delta = (this.SpeedEnd - this.SpeedStart) / this.timeToLive;         
        this.SpeedCurrent += delta;
        
        var radToDegrees = 57.2957795;
        this._movement.x = Math.cos(this.AngleCurrent/radToDegrees)*this.SpeedCurrent;
        this._movement.y = Math.sin(this.AngleCurrent/radToDegrees)*this.SpeedCurrent;
        
        
      });      
    }
});

Crafty.c("ParticleSystem", {
    timeToLive: 60.0,
    lifeTime: 0,
    color: "#000000",
    mutables: ["Height", "Alpha", "X", "Y", "Angle", "Speed"], 
    
    width: 1,
    emitsPerSecond: 60,
    framesSinceEmit: 0,
    particleTimeToLive: 60,
    load: function(src) {
/*        $.getJSON('testParticle.json', function(data) {
              alert("Loaded the json");
              alert(data["Height"]);
        })
        .success(function() { alert("success") })
        .complete(function() { alert("complete") })
        .error(function() {
            console.log("error " + textStatus);
            console.log("incoming Text " + jqXHR.responseText);        
        });*/
        $.ajax({
            url: 'testParticle.json',
            dataType: 'json',
            success: function( data ) {
              alert( "SUCCESS:  " + data );
            },
            error: function( data ) {
              alert( "ERROR:  ");
              for (i in data) {
                  console.log(i + ": " +data[i]);
              }
            }
          });        
        
    },
    init: function()  {
      this.addComponent("2D")
        .addComponent("Canvas")
        
      for (i in this.mutables) {
          this[this.mutables[i]] = {};
      }              

      function createParticle(entity) {
          var particle = Crafty.e("2D, Canvas, Multiway, Particle, Color, Tween")
          .attr({x: entity.X.factoryCurrent, 
              y:entity.Y.factoryCurrent, 
              z:entity.z, 
              h:entity.Height.factoryCurrent, 
              w:entity.Height.factoryCurrent, 
              alpha: entity.Alpha.factoryCurrent})
          .multiway(1, {})
          .color(entity.color);

          particle.timeToLive = entity.particleTimeToLive;
          
          particle.tween({alpha: realParticleEnd(entity.Alpha), 
              h: realParticleEnd(entity.Height), 
              w: realParticleEnd(entity.Height), 
              x: realParticleEnd(entity.X),
              y: realParticleEnd(entity.Y)}, parseInt(particle.timeToLive) );                    
                    
          particle.AngleStart = entity.Angle.factoryCurrent;
          particle.AngleCurrent = particle.AngleStart;          
          particle.AngleEnd = entity.Angle.factoryCurrent + entity.Angle.particleEnd;
                    
          particle.SpeedStart = entity.Speed.factoryCurrent;
          particle.SpeedCurrent = particle.SpeedStart;          
          particle.SpeedEnd = entity.Speed.factoryCurrent + entity.Speed.particleEnd;
       }      
       
      function updateMutable(entity, mutable) {
          var delta = (mutable.factoryEnd - mutable.factoryStart) / entity.timeToLive;         
          mutable.factoryCurrent += delta;
      }
      
      function realParticleEnd(mutable) {
          return mutable.factoryCurrent + mutable.particleEnd;
      }
                
      this.bind("EnterFrame", function() {
          this.lifeTime++;        
          if (this.lifeTime > this.timeToLive) {
            this.destroy();
          }
                    
          for (i in this.mutables) {
              updateMutable(this, this[this.mutables[i]]);
          }                    
                    
          this.framesSinceEmit++;
          
          if (this.framesSinceEmit > (60.0 / this.emitsPerSecond) ) {
              createParticle(this);
              this.framesSinceEmit = 0;
          }          
      });      
    }
});