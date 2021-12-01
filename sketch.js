'use strict';

let state = "title";
let cnv;
let points = 0;
let w = 600;
let h = 600;
let player;
let sugarcanes = [];
let monsters = [];
let playerImg;
let sugarCaneImg;
let monsterImg;
let bg;

function preload(){
  playerImg = loadImage('assets/santa.png');
  sugarCaneImg = loadImage('assets/candycane.png');
  monsterImg = loadImage('assets/monster.png');
  bg = loadImage('assets/background.png');

}

function setup() {
  cnv = createCanvas(w, h);
  textFont('Courier');
  player = new Player();
  sugarcanes[0] = new sugarCane();
  monsters [0]= new Monster();
imageMode(CENTER);
rectMode(CENTER);
}

function draw() {
  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
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
function keyReleased(){
  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)){
    numberKeysPressed ++;

  }
  if (keyIsDown(RIGHT_ARROW)){
    numberKeysPressed ++;
  }
  if (numberKeysPressed == 0){
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
  console.log("canvas is clicked ");
  state = "level 1";

}

function level1() {
  background(bg);
  imageMode(CORNER);

  if (random(1) <= 0.01) {
    sugarcanes.push(new sugarCane());
  }
  if (random(1) <= 0.015) {
    monsters.push(new Monster());
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
  // check collision with sugar canes
  for (let i = sugarcanes.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, sugarcanes[i].x, sugarcanes[i].y) <= (player.r + sugarcanes[i].r) / 2) {
      points++;
      console.log("points =" + points);
      sugarcanes.splice(i, 1);
    } else if(sugarcanes[i].y > h){
      sugarcanes.splice(i,1);
      console.log("bye");
    }
  }
    // check collision with monsters
    for (let i = monsters.length - 1; i >= 0; i--) {
      if (dist(player.x, player.y, monsters[i].x, monsters[i].y) <= (player.r + monsters[i].r) / 2) {
        points--;
        console.log("points =" + points);
        monsters.splice(i, 1);
      } else if(monsters[i].y > h){
        monsters.splice(i,1);
        console.log("bye");
      }
    }

  text('Points:' + points, w / 6, h - 30);
 if (points >=10){
   state = 'you win'; 
 } else if (points <= -1){
   state = 'gameover';
 }
}


function level1MouseClicked() {
  points++;
  console.log("points =" + points);
  if (points >= 10) {
    state = 'you win'
  }
}

function youWin() {
  background(255, 90, 100);
  textSize(80);
  text('You Win', w / 2, h / 5);
  textSize(30);
  text("click anywhere to restart", w / 2, h / 2);


}

function youWinMouseClicked() {
  state = 'title';
  points = 0;
}
function gameOver(){
  background(100, 90, 100);
  textSize(80);
  text('Suckers', w / 2, h / 5);
  textSize(30);
  text("click anywhere to restart", w / 2, h / 2);

}

function gameOverMouseClicked(){
  state = 'title';
  points = 0;
}