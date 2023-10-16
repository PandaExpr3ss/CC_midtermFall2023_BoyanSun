let x,y;


function setup(){
  createCanvas(800,800);
  x = width/2;
  y = height/2;
}

function draw(){
  background(0);
  x = map(mouseX,0,width,350,450); //map remaps and returns a number, in this case remap mouseX from (0,width) to (350,450)
  fill(127);
  stroke(240,220,27);
  strokeWeight(4);
  ellipse(x,y,40,40);
  print(x);
  

}