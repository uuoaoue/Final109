import TileMap from './TileMap.js';

const tileSize =32;
const velocity =2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio('./assets/gameOver.wav');
const gameWinSound = new Audio('./assets/gameWin.wav')

function gameLoop(){
    tileMap.draw(ctx);
    drawGameEnd();
     
    pacman.draw(ctx,pause(), enemies);
    enemies.forEach(enemy=>enemy.draw(ctx,pause(), pacman));

    // check gameover/gameWin
    GameOver();
    GameWin();
}
function GameOver(){
    if (!gameOver){
        gameOver = isGameOver();
        if(gameOver){
            gameOverSound.play();
        }
    }
}
function GameWin(){
    if (!gameWin){
        gameWin = tileMap.didWin();
    
        if(gameWin){
            gameWinSound.play();

        }
    }
}
function isGameOver(){
    return enemies.some((enemy) => !pacman.powerDotActive && enemy.collideWith(pacman ));
}
function pause(){
    return !pacman.madeFirstMove || gameOver || gameWin;
}
// design game over display
function drawGameEnd(){
    if (gameOver || gameWin){
        let text = '      You Win!';
        if (gameOver){
            text = "    Game Over ";
        }
        ctx.fillStyle="black";
        ctx.fillRect(0,canvas.height/2.5, canvas.width, 100);
        ctx.font = " 72px comic sans MS";
        const gradient = ctx.createLinearGradient( 0,0, canvas.width, 0);
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'lightpink')
        gradient.addColorStop('1.0', 'blue');
        ctx.fillStyle=gradient;
        ctx.fillText(text, 10, canvas.height/1.9)

    }
}
tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000/75);