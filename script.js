var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}
//ineteracting with the circles with mouse
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

//resposiveness of canvas
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
function circle(x, y, r, dx, dy, rgb) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.rgb = rgb;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);

        c.fillStyle = rgb;
        c.fill();

    }

    this.update = function () {
        if (((this.x + this.r) > (innerWidth)) || ((this.x - this.r) < 0)) {
            this.dx = -this.dx;
        }
        if (((this.y + this.r) > (innerHeight)) || ((this.y - this.r) < 0)) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity with the circles

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.r < 40) {
                this.r += 5;
            }

        } else if (this.r >= 10) {
            this.r -= 1;
        }

        this.draw();
    }
}
var A = [];
for (var i = 0; i <= 800; i++) {
    var x = (Math.random() * (innerWidth - r * 2)) + r;
    var y = (Math.random() * (innerHeight - r * 2)) + r;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    // var r = (Math.random() * 50) + 5;
    var r = 10;
    var rgb = getcolor();
    A.push(new circle(x, y, r, dx, dy, rgb));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var j = 0; j < A.length; j++) {
        A[j].update();
    }
}
animate(); 

//generating Random colors
function getcolor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    return rgb;
}