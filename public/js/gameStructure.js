class root{
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

  isThereCollision(){
    
  }

}
class paddle extends root{
  constructor(container){
    super();
  }
  movePaddle(offset)
  {

  }


}

class ball extends root{
  constructor(container){
    super();
  }
  moveBall(){
    if(this.isThereCollision())
    {
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
  }

}

