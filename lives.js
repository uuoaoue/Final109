
class Lives{
    constructor(_numberOfLive){
        this.x = 10;
        this.y = 20;
        this.width = 40;
        this.height = 40;
        this.numberOfLives = _numberOfLive;
        this.liveSpacing = 10;
    }

    display() {    
        for (let i = 0; i < this.numberOfLives; ++i) {
            image(liveImg, this.x + this.width * i + this.liveSpacing, this.y, this.width, this.height)
        }        
    }

    loseLife() {
        --this.numberOfLives;
    }
    
}