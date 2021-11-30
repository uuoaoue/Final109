
class Coin{
    constructor(){
        this.r = 30;
        this.x = random(w);
        this.y = 0 - this.r;
    }

    display(){
        image(candyImg, this.x, this.y, this.r, this.r)
    }
    move(){
        this.y ++;
    }
}