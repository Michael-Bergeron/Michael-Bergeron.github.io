
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
  var mode = "";
  var gameContinue = 0;

  var snake;


  var config = {
    apiKey: "AIzaSyDfRdkrrnWc7-cO3QzN_aLzud6i5LzTo0o",
    authDomain: "snake-f0160.firebaseapp.com",
    databaseURL: "https://snake-f0160.firebaseio.com",
    projectId: "snake-f0160",
    storageBucket: "snake-f0160.appspot.com",
    messagingSenderId: "173916570863"
  };

  firebase.initializeApp(config);
  var db = firebase.firestore();

db.collection('scores').get().then((querySnapshot) => {
      console.log(scores)
  });


  function Snake () {
    this.y = 100;
    this.x = 100;
    this.ySpeed = 0;
    this.xSpeed = scale;
    this.tail = [ {x: 70, y: 100}, {x: 80, y: 100}, {x: 90, y: 100}, {x: 100, y: 100}];

    this.draw = function() {
      var color = document.getElementById('color')
      var snakeColor = color.options[color.selectedIndex].value;
      ctx.fillStyle = snakeColor;

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
         gameContinue = 0;
         return null;
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
         gameContinue = 0;
         break;
         return null;
       }
     }
     if (snake.x == apple.x && snake.y == apple.y){
       apple.location();
       apple.draw();
       score += scoreIncrease;
       scoreUpdate.innerHTML = 'Score: ' + score;
       total++;
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

function gameOptions() {
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
  if (document.getElementById('walls').checked){
    scoreIncrease++;
  }
}

 function start() {
   gameOptions();
   snake = new Snake();
   apple = new Apple();
   apple.location();

   var snakeInterval = setInterval(function(){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     apple.draw();
     snake.update();
     if (gameContinue === 0){
       clearInterval(snakeInterval);
       window.alert(`Your score was ${score}`);
       score = 0;
       total = 4;
       this.x = 100;
       this.y = 100;
       this.xSpeed = scale;
       this.ySpeed = 0;
       this.tail = [ {x: 70, y: 100}, {x: 80, y: 100}, {x: 90, y: 100}, {x: 100, y: 100}];
     }
     snake.draw();}, speed);
     snakeInterval;
}

window.addEventListener('click', function click(e){
  scoreUpdate.innerHTML = 'Score: ' + score;
  gameContinue = 1;
  if (e.target === startGame){
    start();
}
})

fetch('https://us-central1-snake-game-1bf7b.cloudfunctions.net/top15scores')
  .then(res => res.json())
  .then(data => leaderboardBuild(data));

function leaderboardBuild(arr){
    var leaderboard = document.getElementById("leaderboard");
    for(i=0; i< arr.length; i++){
        var columnDiv = document.createElement("div");
        leaderboard.append(columnDiv);
        leaderboard.children[i].setAttribute("id","column-" + (i+1));
        for(j=0; j<arr[i].length; j++){
            var rowSpan = document.createElement("Span");
            var columnSet = document.getElementById("column-" + (i+1));
            columnSet.append(rowSpan);
            columnSet.children[j].setAttribute("id", "span" + (((i+1)*10) + (j+1)));
            var rowSet = document.getElementById("span" + (((i+1)*10) + (j+1)));
            rowSet.innerHTML = arr[i][j];
            rowSet.classList.add("score-block");
        }
    }
}

window.addEventListener('keydown', function keyPush(e){
    switch(e.keyCode){
      case 37:
        e.preventDefault();
        snake.xSpeed = -scale * 1;
        snake.ySpeed = 0;
        break;
      case 38:
        e.preventDefault();
        snake.xSpeed = 0;
        snake.ySpeed = 1 * -scale;
        break;
       case 39:
        e.preventDefault();
         snake.xSpeed = 1 * scale;
         snake.ySpeed = 0;
         break;
       case 40:
        e.preventDefault();
         snake.xSpeed = 0;
         snake.ySpeed = 1 * scale;
         break;
    }
  })
