let centerX = 0;
let centerY = 0;
const pi = Math.PI;
const radius = 50;
const abs = Math.abs;
const cout = console.log;
let max = Math.max;
let min = Math.min;
let circleAnimation;
let start = false;
let poss =[];
console.log("connected");
window.onload = () => {
  canvas = document.getElementById("main");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  centerX = 100;
  centerY = 100;
  let a = new area(ctx , centerX , centerY);
  let b = new area(ctx , centerX +200 , centerY);
  let c = new area(ctx , centerX , centerY + 200);
  poss = [[0 , 0] , [200 ,0] , [0 , 200]];
  let all = [a , b, c];
  let frame  = new animateAll(ctx , all);
  frame.startAnimation(0);
};

const mouse = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class area {
  #ctx;
  #x;
  #y;

  constructor(ctx ,x, y) {
    this.#ctx = ctx;
    this.lastTime = 0;
    this.interval = 16;
    this.timer = 0;
    this.#x =x;
    this.#y =y;
  }
  changeCenter( r , theta){
    this.#x = r*Math.cos(theta);
    this.#y = r*Math.sin(theta);
    if(theta>=2*pi)theta =0;
  }


  drawCircle(cx, cy, cx2, cy2, rad) {
    // this.#ctx.clearRect(0, 0, canvas.width, canvas.height);
    // cout("working..");

    this.#ctx.beginPath();
    this.#ctx.arc(this.#x, this.#y, radius, 0, Math.PI * 2);
    this.#ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.#ctx.fill();
    this.#ctx.strokeStyle = "black";
    this.#ctx.lineWidth = 2;
    this.#ctx.stroke();


    let base_angle1 = min(Math.atan((cy - mouse.y) / (cx - mouse.x)) ,pi/2);
    let base_angle2 = min(Math.atan((cy2 - mouse.y) / (cx2 - mouse.x)) , pi/2);
    let dif = base_angle2 - base_angle1;
    if (mouse.x > this.#x && abs(dif) < pi/2) {
      this.drawCakeSlice(
        mouse.x,
        mouse.y,
        1500,
        pi + base_angle1,
        pi + base_angle2,
        "white",
        false
      );
    }
    else if(mouse.x < this.#x && abs(dif) < pi/2){
        this.drawCakeSlice(
            mouse.x,
            mouse.y,
            1500,
             base_angle1,
             base_angle2,
            "white",
            false
          );
    }
    else{
        if(mouse.y > cy){
        this.drawCakeSlice(
            mouse.x,
            mouse.y,
            1500,
             base_angle1-pi,
             base_angle2,
            "white",
            false
          );
        }
        else{
            this.drawCakeSlice(
                mouse.x,
                mouse.y,
                1500,
                 base_angle1,
                 base_angle2-pi,
                "white",
                false
              );
        }
        // if()
    }
    
    //cover

    this.#coverWhite(cx,cy ,cx2 ,cy2);

  }
  //cx this.#x
  #drawLine(cx, cy) {
    let pointx1 = 0;
    let pointx2 = 0;
    let pointy1 = 0;
    let pointy2 = 0;

    let tab = this.#findTangentPoints(this.#x, this.#y, 50, mouse.x, mouse.y);
    pointx1 = tab[0];
    pointy1 = tab[1];
    pointx2 = tab[2];
    pointy2 = tab[3];

    this.drawCircle(pointx1, pointy1, pointx2, pointy2, 5);
  }
  #tangent(x1, y1, x2, y2) {
    this.#ctx.beginPath();
    this.#ctx.moveTo(x1, y1);
    this.#ctx.lineTo(x2, y2);
    this.#ctx.strokeStyle = "red";
    this.#ctx.lineWidth = 1;
    this.#ctx.stroke();
}

#findTangentPoints(x1, y1, r, x2, y2) {
    let d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    
    let theta = Math.atan2(y2 - y1, x2 - x1);
    let alpha = Math.acos(r / d);
    
    let xT1 = x1 + r * Math.cos(theta + alpha);
    let yT1 = y1 + r * Math.sin(theta + alpha);
    
    let xT2 = x1 + r * Math.cos(theta - alpha);
    let yT2 = y1 + r * Math.sin(theta - alpha);
    
    return [xT1, yT1, xT2, yT2];
}
drawCakeSlice(cx, cy, radius, startAngle, endAngle, color ,dir = true) {
    ctx.beginPath();
    ctx.moveTo(cx, cy); 
    ctx.arc(cx, cy, radius, startAngle, endAngle ,dir);
    ctx.closePath(); 
    this.#ctx.fillStyle = "rgba(0 ,0,0 , 0.4)";
    ctx.fill();
    ctx.strokeStyle = "brown"; 
    ctx.lineWidth = 0.1;
    ctx.stroke();
}

chut(){
  cout("chut");
}
#coverWhite(cx1, cy1 ,cx2 ,cy2){
    this.#ctx.beginPath();
    this.#ctx.moveTo(mouse.x ,mouse.y);
    this.#ctx.lineTo(cx1 ,cy1);
    this.#ctx.lineTo(cx2 ,cy2);
    this.#ctx.lineTo(mouse.x ,mouse.y);
    this.#ctx.strokeStyle = "blue";
    this.#ctx.lineWidth = 0.1;
    this.#ctx.fillStyle = "rgba(255 ,255,255 , 0.2)";
    ctx.fill();
    this.#ctx.stroke();


}
  animate(timeStamp) {
    this.#drawLine(this.#x, this.#y);
  }
}

//functions 


class animateAll{
  #ctx;
  #arr;
  theta;
  constructor(ctx , arr){
    this.#ctx = ctx;
    this.#arr =arr;
  }
  startAnimation(timeStamp){
    this.#ctx.clearRect(0, 0, canvas.width, canvas.height);
    let i =0;
    this.#arr.forEach(ele => {
      theta++;
      this.changeCenter(50*i , theta + 20*i);
      this.animate(0);
    });
    requestAnimationFrame(this.startAnimation.bind(this))
  }
}

// what is a circle -> has center, radius