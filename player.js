
class Player {
    constructor() {
        this.r = 100;
        this.x = w / 2;
        this.y = h - this.r -50;
        this.direction = 'still';
        this.speed = 10;
    }

    display() {
        // image(playerImg, this.x, this.y, this.r, this.r);        
        ellipse(this.x,this.y,this.r)
    }
    move() {
        switch (this.direction) {
            case 'still':
                // don't move
                break;
            case 'left':
                if (this.x - this.r/6 > 0) {
                    this.x -= this.speed;
                }
                break;
            case 'right':
                if (this.x < w - this.r ) {
                    this.x += this.speed;
                }
                break;
            default:
                break;
        }
    }
}