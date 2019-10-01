var strike_counter = 0;
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
    this._flags.isPlaying = false;
    this._flags.reqPaddle = false;
    //this._attr.reqFrame_user = false;
    this._attr.height = height;
    this._attr.width = width;
    this._attr.speed = 4;
    this._attr.level = 1;
    this._attr.score = 0;
    this._attr.ballX = 0.5 * this._attr.width;
    this._attr.ballY = 0.5 * this._attr.height;
    this._attr.h = this._attr.height * 0.01 < 15 ? 15 : this._attr.height * 0.01;
    this._attr.w = this._attr.width * 0.1 < 80 ? 80 : this._attr.width * 0.1;
    this._attr.paddleUser = (0.5 * this._attr.width - (this._attr.w / 2));
    this._attr.paddleComputer = (0.5 * this._attr.width - (this._attr.w / 2));

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
      score: this._attr.score,
      level: this._attr.level,
      speed: this._attr.speed
    };
  }
  //called at the begining or after restart
  init() {
    var str = "fill:#ff1100;stroke-width:1;stroke:#000000";

    this._ele.svg.setAttribute("height", this._attr.height);
    this._ele.svg.setAttribute("width", this._attr.width);
    this._ele.svg.setAttribute("style", "background-color:#f39c39")
    if (!this._ele.paddle1)
      this._ele.paddle1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    if (!this._ele.paddle2)
      this._ele.paddle2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    if (!this._ele.ball)
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
    this._flags.isPlaying = false;
    //this._moveComputersPaddle();

  }
  pause() {
    this._flags.isPause = true;
    this._flags.isPlaying = false;
  }
  play() {

    this._flags.isPause = false;
    if (!this._flags.isPlaying) {
      this._flags.isPlaying = true;
      this._moveball();
      this._moveComputersPaddle()

    }
  }
  _islevelUP() {
    
    document.getElementById('score-txt').innerHTML = this._attr.score;
    if (this._attr.score >= ((this._attr.level * 10) % 50)) {
      this._attr.speed += 0.3;
      this._attr.level += 1;
      
      if(this._attr.level<5){
        this.pause();
        document.getElementById("level-up").setAttribute("style","display:flex");
        document.getElementById('level-txt').innerHTML = this._attr.level;

      }
      else if (this._attr.level >= 5) {
        this.pause();
        this._attr.level = 1;
        document.getElementById("level-end").setAttribute("style", "display:flex");
        document.getElementById('level-txt').innerHTML = this._attr.level;
      }

    }
  }
  _reset() {
    this._flags.isPlaying = false;
    this._flags.reqFrame = false;
    this._attr.speed = 4;
    this._attr.score = 0;
    this._attr.level = 1;
    this._attr.ballX = 0.5 * this._attr.width;
    this._attr.ballY = 0.5 * this._attr.height;
    this._attr.paddleUser = (0.5 * this._attr.width - (this._attr.w / 2));
    this._attr.paddleComputer = (0.5 * this._attr.width - (this._attr.w / 2));

    this._attr.xShift = 0;
    document.getElementById('level-txt').innerHTML = this._attr.level;
    document.getElementById('score-txt').innerHTML = this._attr.score;
    this._ele.paddle1.setAttribute("x", (0.5 * this._attr.width - (this._attr.w / 2)));
    this._ele.paddle1.setAttribute("y", 0);
    this._ele.paddle2.setAttribute("x", (0.5 * this._attr.width - (this._attr.w / 2)));
    this._ele.paddle2.setAttribute("y", (this._attr.height - this._attr.h));

  }
  _moveball() {

    this._flags.isPlaying = true;
    let s = this._attr.score;
    if (!this._flags.isPause) {
      this._flags.reqFrame = false;
      //current position update and store
      let rect1 = this._ele.paddle1.getBBox();
      let rect2 = this._ele.paddle2.getBBox();
      //if changing position getting struck at the top
      if (this._attr.ballY<= this._attr.h+10 || this._attr.ballY >= this._attr.height - this._attr.h - 10) {
        //console.log(rect1, this._attr.ballX);
        if (((this._attr.ballX <= rect1.x || this._attr.ballX >= rect1.x + rect1.width) && this._attr.ballY <= this._attr.h + 10) || ((this._attr.ballX+10 <= rect2.x || this._attr.ballX >= rect2.x + rect2.width+10) && this._attr.ballY > this._attr.height - this._attr.h - 10)) {
          this._flags.isPause = true;
          s = this._attr.score;

          document.getElementById('banner').style.display = 'flex';

          this._reset();
        } else {
          if (0.5 * this._attr.height < this._attr.ballY) {
            this._attr.xShift += (this._attr.ballX - rect2.x - rect2.width / 2) * (0.05);
          } else {
            this._attr.xShift += (this._attr.ballX - rect1.x - rect1.width / 2) * (0.05);
          }
        }
        //if offset equal
        if (this._attr.ballY+10 >= this._attr.height - this._attr.h) {
          this._attr.score += 1;

          this._islevelUP();

        }

        this._attr.speed *= -1;
      }

      if (this._attr.ballX <= 10 || this._attr.ballX >= this._attr.width - 10) {
        this._attr.xShift *= -1;
      }

      this._attr.ballY += this._attr.speed;
      this._attr.ballX += (this._attr.xShift || 10);
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
    
    this._flags.isPlaying = true;
    this._flags.reqPaddle=false;
    if (!this._flags.isPause) {
      
      if( (this._attr.speed<0)&&((this._attr.paddleComputer + this._attr.w) < this._attr.ballX || this._attr.paddleComputer > this._attr.ballX)) {
        this._attr.paddleComputer = this._attr.ballX - this._attr.w / 2;
        strike_counter = 0;
        if (this._attr.paddleComputer < 0) {
          this._attr.paddleComputer = 2;
        } 
        else if (this._attr.paddleComputer + this._attr.w >= this._attr.width) {
          this._attr.paddleComputer = this._attr.width - this._attr.w+2;
        }
        this._ele.paddle1.setAttribute("x", this._attr.paddleComputer);
      }
      if (strike_counter >= 2) {
        strike_counter = 0;
        this._attr.paddleComputer = this._attr.ballX - this._attr.w / 2 + 10;
        this._ele.paddle1.setAttribute("x", this._attr.paddleComputer);
      }
      strike_counter++;
      if(!this._flags.reqPaddle){
        this._flags.reqPaddle=true;
        requestAnimationFrame(() => this._moveComputersPaddle());
      }

    }
  }
  moveUserPaddle(shift) {
    //this._flags.reqFrame_user = false;
      
      this._attr.paddleUser += shift;
      if (this._attr.paddleUser < 0) {
        this._attr.paddleUser = 0;
      } else if (this._attr.paddleUser + this._attr.w > this._attr.width) {
        this._attr.paddleUser = this._attr.width - this._attr.w;
      }
      
      this._ele.paddle2.setAttribute("x", this._attr.paddleUser);
    }
  
}