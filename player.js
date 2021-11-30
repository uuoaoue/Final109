
class Player {
    constructor() {
        this.r = 60;
        this.x = w / 2;
        this.y = h - this.r;
        this.direction = 'still';
        this.speed = 5;
    }

    display() {
        image(playerImg, this.x, this.y, this.r, this.r);
    }
    move() {
        switch (this.direction) {
            case 'still':
                // don't move
                break;
            case 'down':
                if (this.y < h - this.r) {
                    this.y += this.speed;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.speed;
                }
                break;

            case 'left':
                if (this.x > 0) {
                    this.x -= this.speed;
                }
                break;
            case 'right':
                if (this.x < w - this.r) {
                    this.x += this.speed;
                }
                break;
            default:
                break;
        }
    }
}