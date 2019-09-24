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
    this._attr.height = height;
    this._attr.width = width;
    this._attr.speed = 4;
    this._attr.ballX = 0.5 * this._attr.width;
    this._attr.ballY = 0.5 * this._attr.height;
    this._attr.paddleUser = 0;
    this._attr.paddleComputer = 0;
    this._attr.h = 0;
    this._attr.w = 0;
    this.init();
    document.getElementById(container).appendChild(this._ele.svg);
  }
  //called at the begining or after restart
  init() {
    var str = "fill:#ff1100;stroke-width:1;stroke:#000000";
    this._attr.h = this._attr.height * 0.02 < 15 ? 15 : this._attr.height * 0.02;
    this._attr.w = this._attr.width * 0.1 < 80 ? 80 : this._attr.width * 0.1;
    this._ele.svg.setAttribute("height", this._attr.height);
    this._ele.svg.setAttribute("width", this._attr.width);
    this._ele.svg.setAttribute("style", "background-image:linear-gradient(to right,#f35539,#f39c39,#f7b264)")
    this._ele.paddle1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    this._ele.paddle2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    this._ele.ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
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


  }
  _pause() {
    this._flags.isPause = true;
  }
  _play() {
    this._flags.isPause = false;
    if (!this._flags.reqFrame) {
      this._flags.reqFrame = true;
      requestAnimationFrame(() => this._moveball());
    }

  }
  _moveball() {
    if (!this._flags.isPause) {
      this._flags.reqFrame = false;
      //current position update and store
      let rect = this._ele.paddle2.getBoundingClientRect();
      if (this._attr.ballY <= this._attr.h || this._attr.ballY >= this._attr.height - this._attr.h) {
        //console.log(rect, this._attr.ballX);
        if (this._attr.ballX <= rect.x || this._attr.ballX >= rect.x + rect.width) {
          this._flags.isPause = true;
        }
        this._attr.speed *= -1;
      }

      this._attr.ballY += this._attr.speed;
      this._ele.ball.setAttribute("cx", this._attr.ballX);
      this._ele.ball.setAttribute("cy", this._attr.ballY);
      if (!this._flags.reqFrame) {
        this._flags.reqFrame = true;
        requestAnimationFrame(() => this._moveball())
      }
    }
  }


  _moveComputersPaddle() {

  }
  _moveUserPaddle() {


  }


}