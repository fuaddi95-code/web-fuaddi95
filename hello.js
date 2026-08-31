  const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const clickSound = new Audio("data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQQAAAAA");

// DATA 25 BUS LEVEL 15 SESUAI GAMBAR
let buses = [
  {x:20,y:260,w:80,h:35,color:'#FF5252',dir:'right'}, // merah
  {x:110,y:260,w:40,h:35,color:'#448AFF',dir:'down'}, // biru
  {x:200,y:260,w:40,h:35,color:'#FFEB3B',dir:'left'}, // kuning
  {x:290,y:260,w:40,h:35,color:'#9C27B0',dir:'right'}, // ungu
  {x:20,y:300,w:40,h:35,color:'#4CAF50',dir:'up'}, // hijau
  {x:110,y:300,w:120,h:35,color:'#FF9800',dir:'right',text:'4'}, // orange panjang
  {x:240,y:300,w:40,h:35,color:'#795548',dir:'left'}, // coklat
  {x:330,y:300,w:40,h:35,color:'#E91E63',dir:'down'}, // pink
  {x:20,y:340,w:40,h:35,color:'#00BCD4',dir:'right'}, // cyan
  {x:110,y:340,w:40,h:35,color:'#3F51B5',dir:'up'}, // indigo
  {x:200,y:340,w:80,h:35,color:'#FF5722',dir:'left'}, // oranye
  {x:290,y:340,w:40,h:35,color:'#607D8B',dir:'right'}, // abu
  {x:20,y:380,w:40,h:35,color:'#8BC34A',dir:'down'}, // lime
  {x:110,y:380,w:40,h:35,color:'#000',dir:'?',mystery:true}, // hitam misteri
  {x:200,y:380,w:40,h:35,color:'#CDDC39',dir:'left'}, // lemon
  {x:290,y:380,w:80,h:35,color:'#9E9E9E',dir:'right'}, // abu2
  {x:20,y:420,w:40,h:35,color:'#F44336',dir:'up'}, // merah tua
  {x:110,y:420,w:40,h:35,color:'#2196F3',dir:'right'}, // biru muda
  {x:200,y:420,w:40,h:35,color:'#FFC107',dir:'down'}, // amber
  {x:290,y:420,w:40,h:35,color:'#673AB7',dir:'left'}, // deep purple
  {x:20,y:460,w:120,h:35,color:'#009688',dir:'right'}, // teal panjang
  {x:150,y:460,w:40,h:35,color:'#FF9800',dir:'up'}, // orange
  {x:240,y:460,w:40,h:35,color:'#3F51B5',dir:'left'}, // biru
  {x:330,y:460,w:40,h:35,color:'#E91E63',dir:'right'}, // pink
  {x:150,y:500,w:40,h:35,color:'#4CAF50',dir:'down'} // hijau
];

// DATA CROWD
let crowds = [
  {color:'#00E5FF', y:80, speed:1}, {color:'#FF4081', y:100, speed:1.2},
  {color:'#FFD600', y:120, speed:1}, {color:'#2979FF', y:140, speed:1.3},
  {color:'#FF9100', y:160, speed:1}, {color:'#8D6E63', y:180, speed:1.1},
];
let crowdOffset = 0;

function draw(){
  ctx.clearRect(0,0,400,600);

  // 1. CROWD JALAN
  ctx.fillStyle="#fff"; ctx.fillRect(0,0,400,250);
  ctx.fillStyle="red"; ctx.font="bold 22px Arial"; ctx.fillText("HARD LEVEL 1", 120,30);
  crowds.forEach(c=>{
    for(let i=0;i<15;i++){
      ctx.fillStyle=c.color;
      ctx.beginPath();
      ctx.arc(30 + ((i*18 + crowdOffset*c.speed) % 350), c.y, 8, 0, Math.PI*2);
      ctx.fill();
    }
  });
  crowdOffset += 0.5;

  // 2. GRID PARKIR
  ctx.fillStyle="#BDBDBD"; ctx.fillRect(0,250,400,350);
  for(let i=0;i<8;i++) for(let j=0;j<8;j++){
    ctx.strokeStyle="#616161"; ctx.strokeRect(20+j*45, 260+i*40, 40, 35);
  }

  // 3. BUS
  buses.forEach(b=>{
    ctx.fillStyle=b.color;
    ctx.fillRect(b.x,b.y,b.w,b.h);
    ctx.fillStyle="#fff"; ctx.font="bold 18px Arial";
    let arrow = {up:'↑',down:'↓',left:'←',right:'→'}[b.dir] || '?';
    ctx.fillText(arrow, b.x+b.w/2-8, b.y+b.h/2+6);
    if(b.text) {ctx.font="14px Arial"; ctx.fillText(b.text, b.x+5, b.y+15);}
  });

  checkWin();
}
setInterval(draw, 30); // biar crowd jalan

// CEK MENANG
function checkWin(){
  let keluar = buses.filter(b => b.x > 400 || b.x < -b.w || b.y > 600 || b.y < 250);
  if(keluar.length === buses.length){
    alert("🎉 MENANG! Level Selesai!");
    buses = []; // stop game
  }
}

// DRAG + TOUCH
let dragBus=null;
function getPos(e){
  let rect = canvas.getBoundingClientRect();
  return {x: (e.touches?e.touches[0].clientX:e.clientX)-rect.left,
          y: (e.touches?e.touches[0].clientY:e.clientY)-rect.top}
}

canvas.onmousedown = canvas.ontouchstart = e=>{
  let pos = getPos(e);
  dragBus = buses.find(b=>pos.x
