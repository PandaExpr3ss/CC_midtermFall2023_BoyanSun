let wl11, wl12, wl21, w22;
let move;
let wlx, wly;
let fwd, bwd;
let mvx, mvy, mvmag;

function setup(){
  createCanvas(800,800);
  noStroke();
  wlx = 375;
  wly = 375*tan((44.5/180)*PI);
  mvx = 50;
  mvy = height-2*wly;
  mvmag = pow(mvx,2)+pow(mvy,2);
  wl11 = createVector(wlx,wly);
  wl12 = createVector(wlx,height-wly);
  wl21 = createVector(wlx+50,wly);
  wl22 = createVector(wlx+50,height-wly);
  move = createVector(mvx/(sqrt(mvmag)),mvy/(sqrt(mvmag)));
  fwd = false;
  bwd = false;

}

function wall(){
  fill(105);
  beginShape();
  vertex(0,0);
  vertex(wl11.x, wl11.y);
  vertex(wl12.x, wl12.y);
  vertex(0,800);
  endShape();
  beginShape();
  vertex(800,0);
  vertex(wl21.x, wl21.y);
  vertex(wl22.x, wl22.y);
  vertex(800,800);
  endShape();
}

function ground(){
  fill(128);
  beginShape();
  vertex(0,0);
  vertex(wl11.x, wl11.y);
  vertex(wl21.x, wl21.y);
  vertex(800,0);
  endShape();
  beginShape();
  vertex(0,800);
  vertex(wl12.x, wl12.y);
  vertex(wl22.x, wl22.y);
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

function draw(){
  background(80);
  wall();
  ground();
  if(fwd){
    wl11.add(-move.x,-move.y);
    wl12.add(-move.x,move.y);
    wl21.add(move.x,-move.y);
    wl22.add(move.x,move.y);
    print(abs(wl11.y-wl12.y)/abs(wl11.x-wl21.x));
  }
  else if(bwd && abs(wl11.x-wl21.x) >= 15){
    wl11.add(move.x,move.y);
    wl12.add(move.x,-move.y);
    wl21.add(-move.x,move.y);
    wl22.add(-move.x,-move.y);
    print(abs(wl11.y-wl12.y)/abs(wl11.x-wl21.x));
    print(abs(wl11.x-wl21.x));
  }
  

}