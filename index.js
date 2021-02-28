const d = document.getElementById('debug');

const canvas = document.getElementById("screen")
const grid = document.getElementById("grid")

var c = canvas.getContext('2d');
var cg = grid.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
grid.width = window.innerWidth;
grid.height = window.innerHeight;


// F = M*A
// Fp = Fg * sin (angle)


const len = 500;
const radius = 50;
const gravity = 1;
let angle = Math.PI/4;
let angleV = 0;
let angleA = 0;

function drawGrid() {

    for (let i = 0; i < canvas.width; i+= 30){
        for (let j = 0; j < canvas.height; j+= 30) {
            cg.strokeStyle = '#dbdbdb';
            cg.strokeRect(i,j,30,30);
            cg.closePath();
        }
    }
    
    cg.beginPath();
    cg.fillStyle = '#b5b5b560';
    cg.arc(canvas.width/2, 0, radius*10, 0, Math.PI);
    

    cg.fill();    
}


function draw() {

    var origin = {
        x : canvas.width/2,
        y : 0
    }
    var bob = {
        x : len * Math.sin(angle) + origin.x,
        y : len * Math.cos(angle) + origin.y
    }

    let force = gravity * Math.sin(angle);
    
    angleA = (-1 * force)/len;
    angleV += angleA;
    angle += angleV;

    c.clearRect(0, 0, canvas.width, canvas.height);

    c.beginPath()
    c.moveTo(origin.x, origin.y);
    c.lineTo(bob.x,bob.y);
    c.stroke();
    c.closePath();    
    c.arc(bob.x, bob.y, radius, 0, Math.PI*2);
    c.fillStyle = 'blue';
    c.fill();
    
    d.innerText = `AngleA: ${angleA.toFixed(3)}, angleV: ${angleV.toFixed(2)}, Angle: ${angle.toFixed(2)}`;
    requestAnimationFrame(draw);
}

drawGrid();
draw();