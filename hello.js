const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Tetris Pak Ajat</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #111; color: white; text-align: center; font-family: Arial; margin: 0; padding: 10px; }
    canvas { background: #000; border: 3px solid #0f0; }
    h1 { color: #0f0; }
    .score { font-size: 24px; margin: 10px; }
    button { padding: 15px 25px; margin: 5px; font-size: 18px; background: #0f0; border: none; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>🎮 TETRIS PAK AJAT 🎮</h1>
  <div class="score">Skor: <span id="score">0</span></div>
  <canvas id="tetris" width="300" height="600"></canvas>
  <div>
    <button onclick="move(-1)">⬅️</button>
    <button onclick="rotate()">🔄</button>
    <button onclick="move(1)">➡️</button>
    <button onclick="drop()">⬇️</button>
  </div>
  <p>Keyboard: Panah Kiri/Kanan/Bawah | Spasi: Putar</p>

<script>
const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const grid = 30;
const cols = 10;
const rows = 20;
let board = Array(rows).fill().map(() => Array(cols).fill(0));
let score = 0;

const shapes = [
  [[1,1,1,1]], // I
  [[1,1],[1,1]], // O
  [[1,1,0],[0,1,1]], // Z
  [[0,1,1],[1,1,0]], // S
  [[1,1,1],[0,1,0]], // T
  [[1,1,1],[1,0,0]], // J
  [[1,1,1],[0,0,1]]  // L
];
const colors = ['#00f0f0','#f0f000','#f00000','#00f000','#a000f0','#0000f0','#f0a000'];

let current, x, y;

function newPiece() {
  let r = Math.floor(Math.random() * shapes.length);
  current = shapes[r];
  x = 3;
  y = 0;
  if(collision()) { alert('GAME OVER! Skor: ' + score); board = Array(rows).fill().map(() => Array(cols).fill(0)); score=0; }
}

function collision(nx=x, ny=y, shape=current) {
  for(let i=0; i<shape.length; i++)
    for(let j=0; j<shape[i].length; j++)
      if(shape[i][j] && (board[ny+i]?.[nx+j] !== 0 || ny+i >= rows || nx+j < 0 || nx+j >= cols))
        return true;
  return false;
}

function rotateShape() {
  let rotated = current[0].map((_, i) => current.map(row => row[i]).reverse());
  return rotated;
}

function merge() {
  for(let i=0; i<current.length; i++)
    for(let j=0; j<current[i].length; j++)
      if(current[i][j]) board[y+i][x+j] = colors.indexOf(color)+1;
}

function clearLines() {
  for(let i=rows-1; i>=0; i--) {
    if(board[i].every(cell => cell !== 0)) {
      board.splice(i,1);
      board.unshift(Array(cols).fill(0));
      score += 100;
      document.getElementById('score').innerText = score;
    }
  }
}

let color;
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0; i<rows; i++)
    for(let j=0; j<cols; j++)
      if(board[i][j]) {
        ctx.fillStyle = colors[board[i][j]-1];
        ctx.fillRect(j*grid, i*grid, grid-1, grid-1);
      }
  color = colors[Math.floor(Math.random()*colors.length)];
  ctx.fillStyle = color;
  for(let i=0; i<current.length; i++)
    for(let j=0; j<current[i].length; j++)
      if(current[i][j]) ctx.fillRect((x+j)*grid, (y+i)*grid, grid-1, grid-1);
}

function move(dx) { if(!collision(x+dx, y)) x+=dx; }
function rotate() { let r=rotateShape(); if(!collision(x, y, r)) current=r; }
function drop() { if(!collision(x, y+1)) y++; else { merge(); clearLines(); newPiece(); } }

function gameLoop() { drop(); draw(); }
document.addEventListener('keydown', e => {
  if(e.key==='ArrowLeft') move(-1);
  if(e.key==='ArrowRight') move(1);
  if(e.key==='ArrowDown') drop();
  if(e.key===' ') rotate();
});

newPiece();
setInterval(gameLoop, 500);
draw();
</script>
</body>
</html>
  `);
});

server.listen(3000);
