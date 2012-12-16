gameScreen = Crafty.e("2D, Canvas, Mouse")
        .attr({x: 0, y:0, h: 640, w:480});
        
    gameScreen.rolling = false;
    gameScreen.stillCounter = 0;
    gameScreen.mouseShakesThisSecond = 0;    
    gameScreen.mouseShakesLastSecond = 0;
    gameScreen.frameOfSecond = 0;
    gameScreen.mouseMovingLeft = true;
    gameScreen.oldMouseX = 0;
        
    gameScreen.bind('MouseMove', function(e)  {
        this.rolling = true;
        this.mouseMovesThisSecond++;
        
        if (this.oldMouseX > e.x) {
            if (!this.mouseMovingLeft)
                this.mouseShakesThisSecond++;
        
            this.mouseMovingLeft = true;
        } else if (this.oldMouseX < e.x) {
            if (this.mouseMovingLeft)
                this.mouseShakesThisSecond++;
        
            this.mouseMovingLeft = false;
        }
        
        gameScreen.oldMouseX = e.x;
        
        
    });
    
    gameScreen.bind('EnterFrame', function() {
        this.rolling = false;
        
        if (!this.rolling) {
            this.stillCounter++;
            
            if (this.stillCounter > 60) {
                this.stillCounter = 0;
            }
        } else {
            this.stillCounter = 0;
        }
        
        this.frameOfSecond++;
        
        if (this.frameOfSecond > 60) {
            this.frameOfSecond = 0;
            this.mouseShakesLastSecond = this.mouseShakesThisSecond;
            this.mouseShakesThisSecond = 0;
            
            if (this.mouseShakesLastSecond > 7) {
                //Crafty("Player").sprite.spriteColor("red");
            } else {
                //Crafty("Player").sprite.spriteColor("black");
            }
        }                
    });