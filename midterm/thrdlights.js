let thrdrdm;

class thrdlight{
    constructor(x,y,pos,code){
        this.x = -x;
        this.y = y;
        this.pos = pos;
        this.thrdrdm = thrdrdm;
        this.code = code;
    }

    display(){
        push()
        translate(this.pos.x,this.pos.y);
        fill(240,230,140);
        rect(this.x, this.y, 25, 3);
        fill(240,230,140,75);
        beginShape();
        vertex(this.x, this.y+3);
        vertex(this.x - 20, this.y + 126);
        vertex(this.x + 45, this.y + 126);
        vertex(this.x + 25, this.y+3);
        endShape();
        
        pop();
        //print(this.fade);
    }

    off(){
        push()
        translate(this.pos.x,this.pos.y);
        fill(0);
        rect(this.x, this.y, 25, 3);
        pop();
    }

    flicker(){
        if(frameCount % 10 == 0){
            this.thrdrdm = random(0, 1);
        }
        if(this.thrdrdm < 0.9){
            this.display();
            onoff[this.code] = true;
        }
        else{
            this.off();
            onoff[this.code] = false;
        }
    }

    update(pos){
        this.pos = pos;
        //print(lightdist);
    }
}