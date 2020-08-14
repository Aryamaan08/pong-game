// Variables
let p1;
let p2;
let b;


// Functions
function setup() {
    createCanvas(600, 400);
    p1 = new Paddle(0, height / 2 - 50, 25, 100);
    p2 = new Paddle(width - 25, height / 2 - 50, 25, 100);
    b = new Ball(width / 2, height / 2, 35);
    // frameRate(10);
}

function draw() {
    background(0);
    p1.py = b.by;
    p1.show();
    p2.show();
    p2.update(mouseY - 50);
    if (b.bx - b.bd <= width) {
        b.update();
    }
    b.show();
    if (isTouching(b, p2) || isTouching(b, p1)) {
        b.velocity *= -1;
    }
}

function isTouching(circle, rect) {
    if (rect == p2 && circle.bx + circle.bd / 2 >= rect.px && circle.by + circle.bd / 2 >= rect.py && circle.by - circle.bd / 2 <= rect.py + rect.ph) {
        return true;
    } else if (rect == p1 && circle.bx - circle.bd / 2 <= rect.pw && circle.by + circle.bd / 2 >= rect.py && circle.by - circle.bd / 2 <= rect.py + rect.ph) {
        return true;
    }
    return false;
}

// Classes
class Paddle {
    constructor(x, y, w, h) {
        fill(255);
        this.px = x;
        this.py = y;
        this.pw = w;
        this.ph = h;
    }

    update(newY) {
        this.py = newY;
    }

    show() {
        rect(this.px, this.py, this.pw, this.ph);
    }
}

class Ball {
    constructor(x, y, d) {
        this.bx = x;
        this.by = y;
        this.bd = d;
        this.direction = random(360);
        this.velocity = 5;
        this.rand = random(5);
        // this.outOfScreen = false;
        // rotate(this.direction);
    }

    update() {
        this.bx += this.velocity;
        this.by += sin(this.direction) + cos(this.direction) + this.rand;
        if (this.by <= 0 || this.by >= height) {
            this.direction *= -1;
            this.velocity *= -1;
            // this.y -= 10;
            // this.x -= 10;
            this.rand = random(5);
        } 
        if (this.bx > width) {
            this.bx = width / 2;
            this.by = height / 2;
            // this.outOfScreen = false;
        }
    }

    show() {
        ellipse(this.bx, this.by, this.bd);
    }
}
