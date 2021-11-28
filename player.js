class Player {
    constructor() {
        this.r = 60;
        this.x = w / 2;
        this.y = h - this.r;
        this.direction = 'still';
        this.speed = 2;
    }

    display() {
        rect(this.x, this.y, this.r, this.r);
    }
    move() {
        switch (this.direction) {
            case 'still':
                // don't move
                break;
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
            default:
                break;
        }
    }
}