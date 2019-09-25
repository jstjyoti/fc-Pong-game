class Game {
  constructor(container, height, width) {
    //create svg  with paddle and ball 
    this.container = container;
    this._ele = {};
    this._ele.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._flags = {};
    this._attr = {};
    this._flags.reqFrame = false;
    this._flags.isPause = false;
    this._flags.reqFrame_play=false;
    this._flags.reqFrame_paddle=false;
    this._attr.reqFrame_user=false;
    this._attr.height = height;
    this._attr.width = width;
    this._attr.speed = 4;
    this._attr.level=1;
    this._attr.score=0;
    this._attr.ballX = 0.5 * this._attr.width;
    this._attr.ballY = 0.5 * this._attr.height;
    this._attr.paddleUser = (0.5 * this._attr.width - (this._attr.w / 2));
    this._attr.paddleComputer = (0.5 * this._attr.width - (this._attr.w / 2)) ;
    this._attr.h = 0;
    this._attr.w = 0;
    this._attr.xShift=0;
    this.init();
    document.getElementById(container).appendChild(this._ele.svg);
  }
  //called at the begining or after restart
  init() {
    var str = "fill:#ff1100;stroke-width:1;stroke:#000000";
    this._attr.h = this._attr.height * 0.01 < 15 ? 15 : this._attr.height * 0.01;
    this._attr.w = this._attr.width * 0.1 < 80 ? 80 : this._attr.width * 0.1;
    this._ele.svg.setAttribute("height", this._attr.height);
    this._ele.svg.setAttribute("width", this._attr.width);
    this._ele.svg.setAttribute("style", "background-image:linear-gradient(to right,#f35539,#f39c39,#f7b264)")
    if(!this._ele.paddle1)
      this._ele.paddle1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    if(!this._ele.paddle2)
      this._ele.paddle2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    if(!this._ele.ball)
      this._ele.ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this._ele.paddle1.setAttribute("height", this._attr.h);
    this._ele.paddle2.setAttribute("height", this._attr.h);
    this._ele.paddle1.setAttribute("width", this._attr.w);
    this._ele.paddle2.setAttribute("width", this._attr.w);
    this._ele.paddle1.setAttribute("x", (0.5 * this._attr.width - (this._attr.w / 2)));
    this._ele.paddle1.setAttribute("y", 0);
    this._ele.paddle2.setAttribute("x", (0.5 * this._attr.width - (this._attr.w / 2)));
    this._ele.paddle2.setAttribute("y", (this._attr.height - this._attr.h));
    this._ele.ball.setAttribute("cx", 0.5 * this._attr.width);
    this._ele.ball.setAttribute("cy", 0.5 * this._attr.height);
    this._ele.ball.setAttribute("r", 10);
    this._ele.paddle1.setAttribute("style", str);
    this._ele.paddle2.setAttribute("style", str);
    this._ele.ball.setAttribute("fill", "#000");
    this._ele.svg.appendChild(this._ele.ball);
    this._ele.svg.appendChild(this._ele.paddle1);
    this._ele.svg.appendChild(this._ele.paddle2);
    
    //this._moveComputersPaddle();

  }
  pause() {
    this._flags.isPause = true;
  }
  play() {
    this._flags.reqFrame_play=false;
    this._flags.isPause = false;
   
    this._moveball();
    }
  }
  _islevelUP()
  {
    
    if(this._attr.score> ((this._attr.level*10) % 50))
    {
      this._attr.speed += 2;
      this._attr.level += 1;
      if(this._attr.level>=5){
        this.pause();
        this._attr.level=1;
        document.getElementById("level-end").setAttribute("style","display:block");
      }
    
    }
  }
  _reset(){

    this._flags.reqFrame = false;
    this._attr.speed = 4;
    this._attr.score=0;
    this._attr.level=1;
    this._attr.ballX = 0.5 * this._attr.width;
    this._attr.ballY = 0.5 * this._attr.height;
    this._attr.paddleUser = (0.5 * this._attr.width - (this._attr.w / 2));
    this._attr.paddleComputer = (0.5 * this._attr.width - (this._attr.w / 2)) ;
    this._attr.h = this._attr.height * 0.02 < 15 ? 15 : this._attr.height * 0.02;
    this._attr.w = this._attr.width * 0.1 < 80 ? 80 : this._attr.width * 0.1;
    this._attr.xShift=0;
    this._ele.paddle1.setAttribute("x", (0.5 * this._attr.width - (this._attr.w / 2)));
    this._ele.paddle1.setAttribute("y", 0);
    this._ele.paddle2.setAttribute("x", (0.5 * this._attr.width - (this._attr.w / 2)));
    this._ele.paddle2.setAttribute("y", (this._attr.height - this._attr.h));
    
  }
  _moveball(){
    let s=this._attr.score;
    if (!this._flags.isPause) {
      this._flags.reqFrame = false;
      //current position update and store
      let rect1 = this._ele.paddle1.getBBox();
      let rect2 = this._ele.paddle2.getBBox();
      //if changing position getting struck at the top
      if (this._attr.ballY <= this._attr.h || this._attr.ballY >= this._attr.height - this._attr.h) {
        //console.log(rect1, this._attr.ballX);
        if ((this._attr.ballX <= rect1.x || this._attr.ballX >= rect1.x + rect1.width && this._attr.ballY<=this._attr.h)||(this._attr.ballX <= rect2.x || this._attr.ballX >= rect2.x + rect2.width && this._attr.ballY>this._attr.height - this._attr.h)){
          this._flags.isPause = true;
            s= this._attr.score;
            document.getElementById('banner').getElementsByTagName("h1")[0].style.diplay="none;"
            document.getElementById('banner').innerHTML +="<h1>OOPS You Lost Control!!!</h1>"
            document.getElementById('banner').style.display='flex';
            
            this._reset();
        }else{
          if(0.5*this._attr.height < this._attr.ballY){
            this._attr.xShift += (this._attr.ballX - rect2.x - rect2.width / 2) * (0.05);
          }else{
            this._attr.xShift += (this._attr.ballX - rect1.x - rect1.width / 2) * (0.05);
          }
        }
        //if offset equal
        if(this._attr.ballY >= this._attr.height - this._attr.h){
          this._attr.score += 1;
          this._islevelUP();
          
        }
        
        this._attr.speed *= -1;
      }

      if(this._attr.ballX <= 10 || this._attr.ballX >= this._attr.width - 10){
        this._attr.xShift *= -1;
      }
      
      this._attr.ballY += this._attr.speed;
      this._attr.ballX += (this._attr.xShift || 0);
      this._ele.ball.setAttribute("cx", this._attr.ballX);
      this._ele.ball.setAttribute("cy", this._attr.ballY);
      
      if (!this._flags.reqFrame) {
        this._flags.reqFrame = true;
        requestAnimationFrame(() => this._moveball());
      }
    }
    return s;
  }

  _moveComputersPaddle() {

    this._flags.reqFrame_paddle=false;
    if(!this._flags.isPause){

      this._attr.paddleComputer +=((this._attr.h)*(this._attr.xShift/this._attr.speed))-(this._attr.w*Math.random());
      this._ele.paddle1.setAttribute("x",this._attr.paddleComputer);
      if(!this._flags.reqFrame_paddle)
      {
        this._flags.reqFrame_paddle=true;
        requestAnimationFrame(()=>this._moveComputersPaddle());
      }

    }
  }
  _moveUserPaddle() {
    this._attr.reqFrame_user=false;
    document.addEventListener('keydown', function (e) {
      if (+e.keyCode == 37) { // left arrow key
        this._attr.paddleUser += -5;
      }
      if (+e.keyCode == 39) { // right arrow  Key
        this._attr.paddleUser += 5;
      }

    });
    this._ele.paddle2.setAttribute("x",this._attr.paddleUser);
  }

}