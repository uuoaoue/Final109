
class Monster{
    constructor(){
        this.r = 70;
        this.x = random(w);
        this.y = 0 - this.r;
        this.speed = 2;

    }

    display(){
        image(monsterImg, this.x, this.y, this.r, this.r)
    }
    move(){
        this.y += this.speed;
      
    }
}