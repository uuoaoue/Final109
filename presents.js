
class Present{
    constructor(_size){
        this.r = _size;
        this.x =  random(0+ this.r, w-this.r);
        this.y = 0 - this.r;
        this.speed = 3;
    }

    display(){
        image(presentImg, this.x, this.y, this.r, this.r)
    }
    move(){
        this.y += this.speed;
      
    }
}