let wl11, wl12, wl21, wl22;
let move;
let wlx, wly;
let fwd, bwd;
let mvx, mvy, mvmag;
let speed;
let figpos, figsz;
let step;
let stl, str;
let stcount;
let light1, light2, light3, light4;
let lightpos;
let lightdist = [280, 170, 100, 60];
let lightlist = [];
let lightmove = [];
let lightspeed;
let shake;
let shkx = [];
let shky = [];
let filter;
let cnt;
let sumx, sumy;
let h1, the1, l1, alpha1;
let h2, the2, l2, alpha2;
let fade = 75;
let rdm;

function setup(){
  createCanvas(800,800);
  noStroke();
  rectMode(CENTER);
  wlx = 375; //wall cords and movement
  wly = 375*tan((44.5/180)*PI);
  mvx = 50;
  mvy = height-2*wly;
  mvmag = pow(mvx,2)+pow(mvy,2);
  wl11 = createVector(wlx,wly);
  wl12 = createVector(wlx,height-wly);
  wl21 = createVector(wlx+50,wly);
  wl22 = createVector(wlx+50,height-wly);
  speed = 0.2;
  move = createVector(mvx/(sqrt(mvmag))*speed,mvy/(sqrt(mvmag))*speed);
  fwd = false;
  bwd = false;
  figpos = createVector(400,400); //figure
  figsz = 1;
  stl = true; //walking effect
  str = false;
  stcount = 0;
  lightpos = createVector(400,400); //light
  
  for(let i = 0; i < 4; i++){
    lightlist[i] = new light(0, lightdist[i], lightpos);
    //light1 = new light(0, 280, lightpos);
    //light2 = new light(0, 170, lightpos);
    //light3 = new light(0, 100, lightpos);
    //light4 = new light(0, 60, lightpos);
  }
  for(let i = 0; i < 4; i++){
    lightmove[i] = lightdist[i]/lightdist[0];
    //light1 = new light(0, 280, lightpos);
    //light2 = new light(0, 170, lightpos);
    //light3 = new light(0, 100, lightpos);
    //light4 = new light(0, 60, lightpos);
  }
  //print(lightmove);
  lightspeed = 0.025;
  shake = createVector(0, 0); //shake
  cnt = 0;
  sumx = 0;
  sumy = 0;
  for(i = 0; i < 100; i += 4){ //make arrays that terms sum up to 0
    cnt = i;
    for(j = 0; j < 3; j++){
        shkx[cnt] = random(-0.02, 0.02);
        sumx += shkx[cnt];
        cnt ++;
    }
    shkx[cnt] = -sumx;
    sumx += shkx[cnt];
  }
  //print(sumx)
  for(i = 0; i < 100; i += 4){
    cnt = i;
    for(j = 0; j < 3; j++){
        shky[cnt] = random(-0.02, 0.02);
        sumy += shky[cnt];
        cnt ++;
    }
    shky[cnt] = -sumy;
    sumy += shky[cnt];
  }
  //print(sumy);
  filter = 0.07;
}

class light{ //class for lights
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

function calcl(lily,pos){ //calculate size of light
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

function wall(upl,downl,upr,downr){ //draw wall
  fill(105);
  beginShape();
  vertex(0,0);
  vertex(upl.x, upl.y);
  vertex(downl.x, downl.y);
  vertex(0,800);
  endShape();
  beginShape();
  vertex(800,0);
  vertex(upr.x, upr.y);
  vertex(downr.x, downr.y);
  vertex(800,800);
  endShape();
}

function ground(upl,upr,downl,downr){ //draw ground and ceiling
  fill(128);
  beginShape();
  vertex(0,0);
  vertex(upl.x, upl.y);
  vertex(upr.x, upr.y);
  vertex(800,0);
  endShape();
  beginShape();
  vertex(0,800);
  vertex(downl.x, downl.y);
  vertex(downr.x, downr.y);
  vertex(800,800);
  endShape();
}

function keyPressed(){
  if(key == 'w'){
    fwd = true;
  }
  else if(key == 's'){
    bwd = true;
  }
}

function keyReleased(){
  if(key == 'w'){
    fwd = false;
  }
  else if(key == 's'){
    bwd = false;
  }
}

function figure(x,y,size){ //draw figure
  push();
  translate(x,y);
  rotate(0.1);
  fill(0);
  ellipse(-6.5*size,-20*size,2.5*size,8*size); //ear
  ellipse(1.1*size,-20*size,2*size,8*size);
  fill(80);
  rect(-6.5*size,-22*size,3*size,4*size);
  rect(1.1*size,-22*size,3*size,5*size);

  fill(0);
  ellipse(-3*size,-24*size,8*size,2.5*size); //hat
  ellipse(-3*size,-20*size,16*size,5*size);
  rect(-3*size,-21.5*size,8*size,5*size);
  rotate(-0.1);
  
  ellipse(-1*size,-17*size,8*size,11.5*size); //head

  beginShape(); //body
  vertex(2.5*size,-16*size); //rightside
  vertex(4*size,-11*size);
  vertex(10.3*size,-7*size);
  vertex(10.6*size,-3*size);
  vertex(12*size,4*size);
  vertex(9.5*size,12.5*size);
  vertex(10*size,18*size);
  vertex(8*size,32*size); //leg
  vertex(0,32*size);
  vertex(0,20*size);
  vertex(-1.5*size,32*size);
  vertex(-10*size,32*size);
  vertex(-9.5*size,20*size); //leftside
  vertex(-10*size,13*size);
  vertex(-9*size,6*size);
  vertex(-10*size,-2*size);
  vertex(-9.7*size,-3*size);
  vertex(-10*size,-5*size);
  vertex(-9*size,-8*size);
  vertex(-5*size,-10*size);
  endShape();

  fill(255);
  rect(0,-3.5*size,(50/14)*size,0.65*size); //cross
  rect(0,-2.9*size,0.65*size,(800-2*wly)/14*size);
  rect(0,-3.5*size,(50/14)*size,0.65*size); //doubler
  rect(0,-2.9*size,0.65*size,(800-2*wly)/14*size);

  circle(-2.8*size,-18*size,1.5*size); //eyes
  circle(1*size,-17.8*size,1.5*size);
  
  pop();

}

/* //to figure out the vertex of the figure, no longer needed
function mouseMoved(){ 
  push();
  translate(400,400);
  print(mouseX-400, mouseY-400);
  pop();
}
*/

function walk(stepsize){ //walking effect
  step = createVector(stepsize,stepsize);
  if(stl){
    if(frameCount % 5 == 0){
      if(stcount < 5){
        wl11.add(-step.x,-step.y);
        wl12.add(-step.x,-step.y);
        wl21.add(-step.x,-step.y);
        wl22.add(-step.x,-step.y);
        figpos.add(-step.x,-step.y);
        lightpos.add(-step.x,-step.y);
      }
      else if(stcount < 10){
        wl11.add(-step.x,step.y);
        wl12.add(-step.x,step.y);
        wl21.add(-step.x,step.y);
        wl22.add(-step.x,step.y);
        figpos.add(-step.x,step.y);
        lightpos.add(-step.x,step.y);
      }
      else if(stcount < 15){
        wl11.add(step.x,-step.y);
        wl12.add(step.x,-step.y);
        wl21.add(step.x,-step.y);
        wl22.add(step.x,-step.y);
        figpos.add(step.x,-step.y);
        lightpos.add(step.x,-step.y);
      }
      else if(stcount < 20){
        wl11.add(step.x,step.y);
        wl12.add(step.x,step.y);
        wl21.add(step.x,step.y);
        wl22.add(step.x,step.y);
        figpos.add(step.x,step.y);
        lightpos.add(step.x,step.y);
      }
      else{
        stcount = -1;
        stl = false;
        str = true;
      }
      stcount++;
    }
  }
  if(str){
    if(frameCount % 5 == 0){
      if(stcount < 5){
        wl11.add(step.x,-step.y);
        wl12.add(step.x,-step.y);
        wl21.add(step.x,-step.y);
        wl22.add(step.x,-step.y);
        figpos.add(step.x,-step.y);
        lightpos.add(step.x,-step.y);
      }
      else if(stcount < 10){
        wl11.add(step.x,step.y);
        wl12.add(step.x,step.y);
        wl21.add(step.x,step.y);
        wl22.add(step.x,step.y);
        figpos.add(step.x,step.y);
        lightpos.add(step.x,step.y);
      }
      else if(stcount < 15){
        wl11.add(-step.x,-step.y);
        wl12.add(-step.x,-step.y);
        wl21.add(-step.x,-step.y);
        wl22.add(-step.x,-step.y);
        figpos.add(-step.x,-step.y);
        lightpos.add(-step.x,-step.y);
      }
      else if(stcount < 20){
        wl11.add(-step.x,step.y);
        wl12.add(-step.x,step.y);
        wl21.add(-step.x,step.y);
        wl22.add(-step.x,step.y);
        figpos.add(-step.x,step.y);
        lightpos.add(-step.x,step.y);
      }
      else{
        stcount = -1;
        stl = true;
        str = false;
      }
      stcount++;
    }
  }
}

function sanity(sx, sy){ //shaking and red filter effect
  if(frameCount % 5 == 0){
    if(cnt < shkx.length){
      shake.x = shkx[cnt];
      shake.y = shky[cnt];
    }
    else{
      cnt = -1;
      shake.x = 0;
      shake.y = 0;
    }
    wl11.add(shake.x*sx,shake.y*sy);
    wl12.add(shake.x*sx,shake.y*sy);
    wl21.add(shake.x*sx,shake.y*sy);
    wl22.add(shake.x*sx,shake.y*sy);
    figpos.add(shake.x*sx,shake.y*sy);
    lightpos.add(shake.x*sx,shake.y*sy);
    fill(255,0,0,filter*sy*2);
    rect(400,400,800,800);
    //print(shake.x);
    //print(shake.y);
    cnt ++;
    //print(cnt);
  }
  fill(255,0,0,filter*sy);
  rect(400,400,800,800);
}

function draw(){
  background(80);
  figure(figpos.x,figpos.y,figsz);
  wall(wl11,wl12,wl21,wl22);
  ground(wl11,wl21,wl12,wl22);

  for(let i = 0; i < 4; i++){
    lightlist[i].flicker();
  }

  sanity(abs(wl11.x-wl21.x),abs(wl11.y-wl12.y));

  if(fwd){
    wl11.add(-move.x,-move.y);
    wl12.add(-move.x,move.y);
    wl21.add(move.x,-move.y);
    wl22.add(move.x,move.y);
    //print(abs(wl11.y-wl12.y)/abs(wl11.x-wl21.x));
    figsz = abs(wl11.x-wl21.x)/50;
    if(abs(wl11.x-wl21.x) > 55){
      for(let i = 0; i < 4; i++){
        lightdist[i] = lightdist[i] + (figpos.y - wl11.y)*lightmove[i]*lightspeed;
        lightlist[i].update(lightdist[i]);
      }
    }
    else if(abs(wl11.x-wl21.x) > 35){
      for(let i = 0; i < 4; i++){
        lightdist[i] = lightdist[i] + (figpos.y - wl11.y)*lightmove[i]*lightspeed*2;
        lightlist[i].update(lightdist[i]);
      }
    }
    else{
      for(let i = 0; i < 4; i++){
        lightdist[i] = lightdist[i] + (figpos.y - wl11.y)*lightmove[i]*lightspeed*3;
        lightlist[i].update(lightdist[i]);
      }
    }
    
    walk(2);
  }
  else if(bwd && abs(wl11.x-wl21.x) >= 15){
    wl11.add(move.x,move.y);
    wl12.add(move.x,-move.y);
    wl21.add(-move.x,move.y);
    wl22.add(-move.x,-move.y);
    //print(abs(wl11.y-wl12.y)/abs(wl11.x-wl21.x));
    //print(abs(wl11.x-wl21.x));
    figsz = abs(wl11.x-wl21.x)/50;
    if(abs(wl11.x-wl21.x) > 55){
      for(let i = 0; i < 4; i++){
        lightdist[i] = lightdist[i] - (figpos.y - wl11.y)*lightmove[i]*lightspeed;
        lightlist[i].update(lightdist[i]);
      }
    }
    else if(abs(wl11.x-wl21.x) > 35){
      for(let i = 0; i < 4; i++){
        lightdist[i] = lightdist[i] - (figpos.y - wl11.y)*lightmove[i]*lightspeed*2;
        lightlist[i].update(lightdist[i]);
      }
    }
    else{
      for(let i = 0; i < 4; i++){
        lightdist[i] = lightdist[i] - (figpos.y - wl11.y)*lightmove[i]*lightspeed*3;
        lightlist[i].update(lightdist[i]);
      }
    }
    walk(2);
  }
}