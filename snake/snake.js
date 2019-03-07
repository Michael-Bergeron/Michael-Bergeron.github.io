
  const canvas = document.querySelector('.canvas');
  const startGame = document.getElementById('start');
  const scoreUpdate = document.getElementById('score');
  var ctx = canvas.getContext('2d');
  var scale = 20;
  var speed = 200;
  var rows = canvas.width/scale;
  var rows = canvas.height/scale;
  var scoreIncrease;
  var score = 0;
  var total = 4;
  var mode = ""

  var snake;

  function Snake () {
    this.y = 100;
    this.x = 100;
    this.ySpeed = 0;
    this.xSpeed = scale;
    this.tail = [ {x: 70, y: 100}, {x: 80, y: 100}, {x: 90, y: 100}, {x: 100, y: 100}];

    this.draw = function() {
     ctx.fillStyle = '#FFFFFF';

     for (k = 0; k < this.tail.length; k++){
       ctx.fillRect(this.tail[k].x, this.tail[k].y, scale, scale);
     }
     ctx.fillRect(this.x, this.y, scale, scale);
   }
    this.update = function(){
      for (i = 0; i<this.tail.length - 1; i++){
        this.tail[i] = this.tail[i+1];
     }

     this.tail[total-1] = { x: this.x, y: this.y};

     this.x += this.xSpeed;
     this.y += this.ySpeed;

     if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
       if (document.getElementById('walls').checked){
         score = 0;
         scoreUpdate.innerHTML = 'Score: ' + score;
         this.x = 100;
         this.y = 100;
         this.xSpeed = scale;
         this.ySpeed = 0;
         this.tail = [ {x: 70, y: 100}, {x: 80, y: 100}, {x: 90, y: 100}, {x: 100, y: 100}];
       }
     }
     if (this.x >= canvas.width && document.getElementById('noWalls').checked){
       this.x = 0;
     }
     else if(this.x < 0 && document.getElementById('noWalls').checked){
       this.x = canvas.width- 20;
     }
     else if(this.y >= canvas.height && document.getElementById('noWalls').checked){
       this.y = 0;
     }
     else if(this.y < 0 && document.getElementById('noWalls').checked){
       this.y = canvas.height-20;
     }
     for (let m = 0; m<this.tail.length; m++){
       if (this.x === this.tail[m].x && this.y === this.tail[m].y){
         score = 0;
         scoreUpdate.innerHTML = 'Score: ' + score;
         this.x = 100;
         this.y = 100;
         this.xSpeed = scale;
         this.ySpeed = 0;
         this.tail = [ {x: 70, y: 100}, {x: 80, y: 100}, {x: 90, y: 100}, {x: 100, y: 100}];
       }
     }
     if (snake.x == apple.x && snake.y == apple.y){
       apple.location();
       apple.draw();
       score += scoreIncrease;
       scoreUpdate.innerHTML = 'Score: ' + score;
       speed = speed / 2;
       total++;
       console.log(speed)
     }
   }

  }

  function Apple() {
    this.x;
    this.y;

    this.location = function() {
      this.x = (Math.floor(Math.random() * rows - 1)+1) * scale;
      this.y = (Math.floor(Math.random() * rows - 1)+1) * scale;
    }
    this.draw = function() {
     ctx.fillStyle = 'red';
     ctx.fillRect(this.x, this.y, scale, scale);
   }
  }

 function start() {
   if (document.getElementById('pickSlow').checked){
     speed = 200;
     scoreIncrease = 1;
   }
   else if(document.getElementById('pickFast').checked){
     speed = 50;
     scoreIncrease = 3;
   }
   else if(document.getElementById('pickNormal').checked){
     speed = 100;
     scoreIncrease = 2;
   }
   snake = new Snake();
   apple = new Apple();
   apple.location();

   setInterval(() => {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     apple.draw();
     snake.update();
     snake.draw();

   }, speed)
 };

window.addEventListener('click', function click(e){
  console.log(e.target)
  if (e.target === startGame){
    start();
}
})


window.addEventListener('keydown', function keyPush(e){
    switch(e.keyCode){
      case 37:
        snake.xSpeed = -scale * 1;
        snake.ySpeed = 0;
        break;
      case 38:
        snake.xSpeed = 0;
        snake.ySpeed = 1 * -scale;
        break;
       case 39:
         snake.xSpeed = 1 * scale;
         snake.ySpeed = 0;
         break;
       case 40:
         snake.xSpeed = 0;
         snake.ySpeed = 1 * scale;
         break;
    }
  })
