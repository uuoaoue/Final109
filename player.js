
class Player {
    constructor() {
        this.r = 100;
        this.x = w / 2;
        this.y = h - this.r -50;
        this.direction = 'still';
        this.speed = 10;
        this.isLeft = true;
    }

    display() {
        if (this.isLeft) {
            image(playerImg, this.x, this.y, this.r, this.r);        
        } else {
            push();
            scale(-1, 1)            
            image(playerImg, -this.x, this.y, -this.r, this.r);        
            pop()
        }
            
        
    }
    move() {
        switch (this.direction) {
            case 'still':
                // don't move
                break;
            case 'left':
                this.isLeft = true;
                if (this.x - this.r/6 > 0) {
                    this.x -= this.speed;
                }
                break;
            case 'right':
                this.isLeft = false;
                if (this.x < w - this.r ) {
                    this.x += this.speed;
                }
                break;
            default:
                break;
        }
    }
}