let h1, the1, l1, alpha1;
let h2, the2, l2, alpha2;
let fade = 75;
let rdm;

class light{
    constructor(x,y,pos){
        this.x = x;
        this.y = -y;
        this.pos = pos;
        this.s = y/280;
        this.fade = fade;
        this.rdm = rdm;
    }

    display(){
        if(-this.y < 850){
            //fade = 75;
            push()
            translate(this.pos.x,this.pos.y);
            this.l = calcl(this.y,this.pos);
            fill(240,230,140);
            ellipse(this.x, this.y, 180*this.s, 50*this.s);
            fill(240,230,140,75);
            arc(0, -this.y, this.l2*2, this.l/180*50, 0, PI/2);
            arc(0, -this.y, this.l1*2, this.l/180*50, PI/2, PI);
            this.l1 = l1;
            this.l2 = l2;
            beginShape();
            vertex(-(this.x+(180*this.s/2)),this.y);
            vertex(-this.l1,-this.y);
            vertex(this.l2,-this.y);
            vertex(this.x+(180*this.s/2),this.y);
            endShape();
            pop();
        }
        else{
            if(this.fade <= 75){
                fill(240,230,140,this.fade);
                rect(400,400,800,800);
                if(fwd){
                    this.fade--;
                }
                else if(bwd){
                    this.fade++;
                }
            }
            else{
                this.fade = 75;
                fill(240,230,140,this.fade);
                rect(400,400,800,800);
            }
            //print(this.fade);
        }
    }

    off(){
        push()
        translate(this.pos.x,this.pos.y);
        fill(50);
        ellipse(this.x, this.y, 180*this.s, 50*this.s);
        pop();
    }

    flicker(){
        if(frameCount % 10 == 0){
            this.rdm = random(0, 1);
        }
        if(this.rdm < 0.9){
            this.display();
        }
        else{
            this.off();
        }
    }

    update(y){
        this.y = -y;
        this.s = y/280;
        //print(lightdist);
    }
}

function calcl(lily,pos){
    alpha1 = atan(abs(800-wl12.y)/abs(wl12.x))
    the1 = PI/2 - alpha1;
    h1 = pos.x/tan(the1);
    l1 = tan(the1)*(h1-((800-pos.y)+lily));
    alpha2 = atan(abs(800-wl22.y)/abs(800-wl22.x))
    the2 = PI/2 - alpha2;
    h2 = (800-pos.x)/tan(the2);
    l2 = tan(the2)*(h2-((800-pos.y)+lily));
    return l1+l2;
}