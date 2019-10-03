
class Root{
  constructor(conatiner,properties){
    //createElementNS svg element
    //set properties of svg
    //properties of root are height, width, fill, stroke parent conatiner

  this.container = container;
  this._ele = {};
  this._ele.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  this._flags = {};
  this._attr = {};
  this._flags.reqFrame = false;
  this._flags.isPause = false;
  this._flags.isPlaying = false;
  this._flags.reqFrame_paddle = false;
  this._attr.reqFrame_user = false;
  this._attr.height = height;
  this._attr.width = width;
  this._attr.speed = 4;
  this._attr.level = 1;
  this._attr.score = 0;
  this._attr.ballX = 0.5 *this._attr.width;
  this._attr.ballY = 0.5 *this._attr.height;
  this._attr.h =this._attr.height * 0.01 < 15 ? 15 :this._attr.height * 0.01;
  this._attr.w =this._attr.width * 0.1 < 80 ? 80 :this._attr.width * 0.1;
  this._attr.paddleUser = (0.5 *this._attr.width -(this._attr.w / 2));
  this._attr.paddleComputer = (0.5 *this._attr.width - (this._attr.w / 2));

  this._attr.xShift = 0;
  this.init();
    document.getElementById(container).appendChild(this._ele.svg);
  }

  setStats(score, level, speed){
  this._attr.score = score;
  this._attr.level = level;
  this._attr.speed = speed;
  }

  getStats(){
    return {
      score:this._attr.score,
      level:this._attr.level,
      speed:this._attr.speed
    };
  }
  //called at the begining or after restart
  init() {
    

  this._ele.svg.setAttribute("height",this._attr.height);
  this._ele.svg.setAttribute("width",this._attr.width);
  this._ele.svg.setAttribute("style", "background-color:#f39c39")
  
  this._flags.isPlaying = false;
  }
  pause() {
  this._flags.isPause = true;
  this._flags.isPlaying = false;
  }
  play() {
  this._flags.isPause = false;
    if (this._flags.isPlaying) {
    this._flags.isPlaying = true;
    this._moveball();
    this._moveComputersPaddle();
    }
  }
  _islevelUP() 
  { 
    document.getElementById('score-txt').innerHTML =this._attr.score;
    if ((this._attr.score >= (this._attr.level * 10) % 50)) {

    this._attr.speed += 0.3;
    this._attr.level += 1;

      if(this._attr.level<5){
      this.pause();
        document.getElementById("level-up").setAttribute("style","display:flex");
        document.getElementById('level-txt').innerHTML =this._attr.level;
      }
      else if (this._attr.level >= 5) {
      this.pause();
      this._attr.level = 1;
        document.getElementById("level-end").setAttribute("style", "display:flex");
        document.getElementById('level-txt').innerHTML =this._attr.level;
      }
    }
  }
  _reset() {
  this._flags.isPlaying = false;
  this._flags.reqFrame = false;
  this._attr.speed = 4;
  this._attr.score = 0;
  this._attr.level = 1;
  this._attr.ballX = 0.5 *this._attr.width;
  this._attr.ballY = 0.5 *this._attr.height;
  this._attr.paddleUser = (0.5 *this._attr.width - (this._attr.w / 2));
  this._attr.paddleComputer = (0.5 *this._attr.width - (this._attr.w / 2));
  this._attr.xShift = 0;
    document.getElementById('level-txt').innerHTML =this._attr.level;
    document.getElementById('score-txt').innerHTML =this._attr.score;
  this._ele.paddle1.setAttribute("x", (0.5 *this._attr.width - (this._attr.w / 2)));
  this._ele.paddle1.setAttribute("y", 0);
  this._ele.paddle2.setAttribute("x", (0.5 *this._attr.width - (this._attr.w / 2)));
  this._ele.paddle2.setAttribute("y", (this._attr.height -this._attr.h));
  }
  isThereCollision(){
  this._flags.isPlaying = true;
    let s =this._attr.score;
    if (this._flags.isPause) {
    this._flags.reqFrame = false;
      //current position update and store
      let rect1 =this._ele.paddle1.getBBox();
      let rect2 =this._ele.paddle2.getBBox();
      //if changing position getting struck at the top
      if (this._attr.ballY<=this._attr.h+10 ||this._attr.ballY >=this._attr.height -this._attr.h - 10) {
        //console.log(rect1,this._attr.ballX);
        if ((((this._attr.ballX <= rect1.x ||this._attr.ballX >= rect1.x + rect1.width) &&this._attr.ballY <=this._attr.h + 10) || (this._attr.ballX+10 <= rect2.x ||this._attr.ballX >= rect2.x + rect2.width+10) &&this._attr.ballY >this._attr.height -this._attr.h - 10)) {
        this._flags.isPause = true;
          s =this._attr.score;

          document.getElementById('banner').style.display = 'flex';

        this._reset();
        } 
        else {
          if (0.5 *this._attr.height <this._attr.ballY) {
            this._attr.xShift += this._attr.ballX - rect2.x - (rect2.width / 2) * (0.05);
          } else {
          this._attr.xShift += this._attr.ballX - rect1.x - (rect1.width / 2) * (0.05);
          }
        }
        //if offset equal
        if (this._attr.ballY+10 >=this._attr.height -this._attr.h) {
        this._attr.score += 1;
        this._islevelUP();
        }
        return true;
      }
      return false;
    }
    return false;
  }

}
class Paddle extends Root{
  constructor( ){
    var str = "fill:#ff1100;stroke-width:1;stroke:#000000";
    if (super._ele.paddle1)
      super._ele.paddle1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    super._ele.paddle1.setAttribute("height",super._attr.h);
    super._ele.paddle1.setAttribute("width",super._attr.w);
    if (super._ele.paddle2)
        super._ele.paddle2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    super._ele.paddle2.setAttribute("height",super._attr.h);
    super._ele.paddle2.setAttribute("width",super._attr.w);
    super._ele.paddle1.setAttribute("style", str);
    super._ele.paddle2.setAttribute("style", str);
    
    super._ele.svg.appendChild(super._ele.paddle1);
    super._ele.svg.appendChild(super._ele.paddle2);

  }
  movePaddle(paddle,shift)
  {
    super._flags.isPlaying=true;
    super._attr.paddleUser += shift;
    if (super._attr.paddleUser < 0) {
    super._attr.paddleUser = 0;
    } else if (super._attr.paddleUser +super._attr.w >super._attr.width) {
      super._attr.paddleUser =super._attr.width -super._attr.w;
    }
  paddle.setAttribute("x",super._attr.paddleUser);
  }
}

class Ball extends Root{
  constructor( ){
  super();
  if (super._ele.ball)
    super._ele.ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  super._ele.ball.setAttribute("cx",0.5*super._attr.width);
  super._ele.ball.setAttribute("cy", 0.5 *super._attr.height);
  super._ele.ball.setAttribute("r", 10);
  super._ele.ball.setAttribute("fill", "#000");
  super._ele.svg.appendChild(super._ele.ball);


  super._ele.svg.appendChild(ball);
  }
  moveBall(){
    if(super.isThereCollision())
    {

      super._attr.speed *= -1;
    

      if (super._attr.ballX <= 10 ||super._attr.ballX >=super._attr.width - 10) {
        super._attr.xShift *= -1;
     }
      super._attr.ballY +=super._attr.speed;
      super._attr.ballX +=(super._attr.xShift || 0);
      super._ele.ball.setAttribute("cx",super._attr.ballX);
      super._ele.ball.setAttribute("cy",super._attr.ballY);

    if (super._flags.reqFrame) {
    super._flags.reqFrame = true;
      requestAnimationFrame(() =>this._moveball());
    }
    return s;//score of level
    }
  }
}
class AutomoveBall extends Paddle{
  automatePaddle(){
        
    
    //this._flags.reqPaddle=false;
    if (!super._flags.isPause) {
      
      if( (super._attr.speed<0)&&(((super._attr.paddleComputer + super._attr.w) < super._attr.ballX )|| (super._attr.paddleComputer > super._attr.ballX))){
        let targetShift = (super._attr.ballX - super._attr.w / 2) - super._attr.paddleComputer;
        //console.log(targetShift);
        super._attr.paddleComputer += targetShift<0 ? -Math.min(Math.abs(targetShift), 10) : Math.min(Math.abs(targetShift), 10);
          strike_counter = 0;
        if (super._attr.paddleComputer < 0) {
          super._attr.paddleComputer = 10;
        } 
        else if (super._attr.paddleComputer + super._attr.w >= super._attr.width) {
          super._attr.paddleComputer = super._attr.width - super._attr.w+10;
        }
        //console.log(super._attr.ballY);
        //super._ele.paddle1.setAttribute("x", super._attr.paddleComputer);
      }
      //}
      if ((super._attr.speed<0)&& (strike_counter >= 2)){
        strike_counter = 0;
       // super._attr.paddleComputer = super._attr.ballX - super._attr.w / 2 + 10;
        let targetShift =  (super._attr.ballX - super._attr.w / 2) - super._attr.paddleComputer;
        //console.log(targetShift);
        super._attr.paddleComputer += targetShift<0 ? 0-Math.min(Math.abs(targetShift), 10) : Math.min(Math.abs(targetShift), 10);
       // super._ele.paddle1.setAttribute("x", super._attr.paddleComputer);
         //console.log(super._attr.ballY);
      }
      strike_counter++;
        requestAnimationFrame(() => super.movePaddle(super._ele.paddle1,super._attr.paddleComputer));
        // console.log(super._attr.ballY);

    }
    //calculation of offset
    //positive for right movement and negative for left movement
    //done in game.js in move Computer paddle

    super.movePaddle(super._ele.paddle1,offset);
  }
}

class userPaddle extends Paddle{
  moveUserPaddle(offset){
    super.movePaddle(super._ele.paddle2,offset);
  }
}

//
