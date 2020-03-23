(function () {
  var lightTitle = 'Bunny ❤ Sunny'
  var darkTitle  = 'Bunny \u2007 Sunny'
  var isLight = true

  setInterval(function () {
    document.title = isLight ? lightTitle : darkTitle
    isLight = !isLight
  }, 600)
})()

function typewriter (el) {
  var str = el.innerHTML, progress = 0, timer;
  el.innerHTML = '';
  el.style.display = 'block';
  timer = setInterval(function() {
    var current = str.substr(progress, 1);
    if (current == '<') {
      progress = str.indexOf('>', progress) + 1;
    } else {
      ++progress;
    }
    el.innerHTML = str.substring(0, progress) + (progress & 1 ? '_' : '');
    if (progress >= str.length) {
      clearInterval(timer);
    }
  }, 100);
}

function $ (id) {
  return window.document.getElementById(id);
}

class Love
{
    constructor(board)
    {
        this.board = board;
        this.init();
    }
    init() 
    {
        this.maxScale = (Math.random() * 3.2 + 1.2) * this.board.w / 521;
        this.curScale = 1.2 * this.board.w / 521;
        this.x = Math.floor(Math.random() * this.board.w - 40);
        this.y = Math.floor(this.board.h - Math.random() * 200);
        this.ColR = Math.floor(Math.random() * 255);
        this.ColG = Math.floor(Math.random() * 255);
        this.ColB = Math.floor(Math.random() * 255);
        this.alpha = Math.random() * 0.2 + 0.8;
        this.vector = Math.random() * 2 + 1.2;
    }
    draw()
    {
        if(this.alpha < 0.01) this.init();
        if(this.curScale < this.maxScale) this.curScale += 0.3;
        const x = this.x;
        const y = this.y;
        const s = this.curScale;
        const ctx = this.board.context; 
        ctx.fillStyle = "rgba(" + this.ColR + "," + this.ColG + "," + this.ColB + "," + this.alpha + ")";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgb(" + this.ColR + "," + this.ColG + "," + this.ColB + ")";
        ctx.beginPath();
        ctx.bezierCurveTo( x + 2.5*s, y + 2.5*s, x + 2.0*s, y, x, y );
        ctx.bezierCurveTo( x - 3.0*s, y, x - 3.0*s, y + 3.5*s,x - 3.0*s,y + 3.5*s );
        ctx.bezierCurveTo( x - 3.0*s, y + 5.5*s, x - 1.0*s, y + 7.7*s, x + 2.5*s, y + 9.5*s );
        ctx.bezierCurveTo( x + 6.0*s, y + 7.7*s, x + 8.0*s, y + 5.5*s, x + 8.0*s, y + 3.5*s );
        ctx.bezierCurveTo( x + 8.0*s, y + 3.5*s, x + 8.0*s, y, x + 5.0*s, y );
        ctx.bezierCurveTo( x + 3.5*s, y, x + 2.5*s, y + 2.5*s, x + 2.5*s, y + 2.5*s );
        ctx.fill();
        ctx.closePath();
        this.y -= this.vector;
        this.alpha -= (this.vector / this.board.h);
    }
}

class Board
{
    constructor(Shape)
    {
        this.Shape = Shape;
        this.shapes = [];
        const canvas = document.getElementById("cavs");
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        canvas.setAttribute("width", this.w);
        canvas.setAttribute("height", this.h);
        this.context = canvas.getContext("2d");
    }
    create()
    {
        for (let i = 0; i < this.w / 59; i++)
        {
            this.shapes.push(new this.Shape(this));
        }
    }
    draw()
    {
        this.context.clearRect(0, 0, this.w, this.h);
        for (let key in this.shapes)
        {
            this.shapes[key].draw();
        }
        window.requestAnimationFrame(this.draw.bind(this));       
    }
    run()
    {
        this.create();
        this.draw();
    }
}

