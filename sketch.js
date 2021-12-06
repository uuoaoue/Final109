'use strict';

let state = "title";
let cnv;
let points = 0;
let w;
let h;
let player;
let lives = 5;
let sugarcanes = [];
let monsters = [];
let presents = [];
let playerImg;
let liveObj;
let liveImg;
let sugarCaneImg;
let monsterImg;
let presentImg;
let bg;
let difficulty;

function preload() {
  playerImg = loadImage('assets/santa.png');
  sugarCaneImg = loadImage('assets/candycane.png');
  monsterImg = loadImage('assets/monster.png');
  presentImg = loadImage('assets/present.png');
  liveImg = loadImage('assets/santa1.png');
  bg = loadImage('assets/background.png');

}

function setup() {
  w = windowWidth
  h = windowHeight
  cnv = createCanvas(w, h);
  textFont('Courier');
  player = new Player();
  sugarcanes[0] = new sugarCane();
  monsters[0] = new Monster();
  presents[0] = new Present();
  angleMode(DEGREES); // Change the mode to DEGREES
  imageMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'game':
      game();
      break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
    case 'gameover':
      gameOver();
      cnv.mouseClicked(gameOverMouseClicked);
      break;
    default:
      break;
  }
}
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  } else if (key = ' ') {
    player.direction = 'still'
  }
}
function keyReleased() {
  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)) {
    numberKeysPressed++;

  }
  if (keyIsDown(RIGHT_ARROW)) {
    numberKeysPressed++;
  }
  if (numberKeysPressed == 0) {
    player.direction = ' still';

  }
}
function title() {
  background(220, 100, 200);

  textSize(80);
  textAlign(CENTER);
  text("MY GAME", w / 2, h / 5);
  textSize(30);
  text("click anywhere to start", w / 2, h / 2);

}

function titleMouseClicked() {
  state = "game";
  points = 0;
  // reset all objects
  sugarcanes = []
  monsters = []
  presents = []
  lives = 5;
  liveObj = new Lives(lives);
  difficulty = 0.005;
}

function computeDifficulty() {
  if (points > 0 && points % 10 == 0) {
    difficulty = (points / 10000) + 0.01;
  }
  console.log(difficulty)
}


function game() {
  background(bg);
  imageMode(CORNER);
  computeDifficulty()
  if (random(1) <= difficulty) {
    sugarcanes.push(new sugarCane(random(20, 100)));
  }
  if (random(1) <= difficulty) {
    monsters.push(new Monster(random(40, 70)));
  }
  if (random(1) <= difficulty) {
    presents.push(new Present(random(20, 70)));
  }
  player.display();
  player.move();

  for (let i = 0; i < sugarcanes.length; i++) {
    sugarcanes[i].display();
    sugarcanes[i].move();
  }
  for (let i = 0; i < monsters.length; i++) {
    monsters[i].display();
    monsters[i].move();
  }
  for (let i = 0; i < presents.length; i++) {
    presents[i].display();
    presents[i].move();
  }
  // check collision with sugar canes
  for (let i = sugarcanes.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, sugarcanes[i].x, sugarcanes[i].y) <= (player.r + sugarcanes[i].r) / 2) {
      points++;
      console.log("points =" + points);
      sugarcanes.splice(i, 1);
    } else if (sugarcanes[i].y > h) {
      sugarcanes.splice(i, 1);
      console.log("bye");
    }
  }

  // check collision with presents
  for (let i = presents.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, presents[i].x, presents[i].y) <= (player.r + presents[i].r) / 2) {
      points++;
      console.log("points =" + points);
      presents.splice(i, 1);
    } else if (presents[i].y > h) {
      presents.splice(i, 1);
      console.log("bye");
    }
  }
  // check collision with monsters
  for (let i = monsters.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, monsters[i].x, monsters[i].y) <= (player.r + monsters[i].r) / 2) {
      lives--;
      liveObj.loseLife()
      console.log("lives =" + lives);
      monsters.splice(i, 1);
    } else if (monsters[i].y > h) {
      monsters.splice(i, 1);
      console.log("bye");
    }
  }

  text('Points:' + points, w / 6, h - 30);
  liveObj.display();

  if (lives <= 0) {
    state = 'gameover';
  }
}

function gameOver() {

  background(100, 90, 100);
  textSize(80);
  //  game over
  text('You score: ' + points  + ' points', w / 2, h / 5);
  textSize(30);
  text("click anywhere to restart", w / 2, h / 2);

}

function gameOverMouseClicked() {

  state = 'title';
  points = 0;
}
