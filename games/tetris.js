const CANVAS = document.getElementById("tetrisCanvas");
const CTX = CANVAS.getContext("2d");
const WIDTH = 10;
const HEIGHT = 20;
const SIZE = 30;

let shape;
let board;

const tetrominos = [
    [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [1,0,0],
      [1,1,1],
      [0,0,0],
    ],
    [
      [0,0,1],
      [1,1,1],
      [0,0,0],
    ],
    [
      [1,1],
      [1,1],
    ],
    [
      [0,1,1],
      [1,1,0],
      [0,0,0],
    ],
    [
      [1,1,0],
      [0,1,1],
      [0,0,0],
    ],
    [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ]
];

CTX.canvas.width = WIDTH * SIZE;
CTX.canvas.height = HEIGHT * SIZE;

CTX.scale(SIZE, SIZE);

CTX.fillStyle = 'cyan';

class Block {
    constructor(matrix) {
        this.x = WIDTH / 2 - Math.floor(matrix.length / 2);
        this.y = -1
        this.matrix = matrix;
    }
    move() {
        this.y += 1;
    }
    draw() {
        CTX.fillStyle = "#00FFFF";
        let x = this.x;
        let y = this.y;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == 1) {
                    CTX.fillRect(x, y, 1, 1)
                }
                x += 1;
            }
            x = this.x;
            y += 1
        }
    }
    check(board) {
        let lowest = 0;
        for (let i = this.matrix.length - 1; i >= 0; i--) {
            console.log(this.matrix[i].length);
            for (let j = 0; j < this.matrix[i].length; j++) {
                console.log("hi");
                if (this.matrix[i][j] == 1) {
                    if (j > lowest) lowest = j;
                    if (board.matrix[this.y + i + 1][this.x + j]) return false
                }
            }
        }
        if (this.y + lowest >= HEIGHT - 1) return false
        return true;
    }
    moveLeft(board) {
        let leftest = this.matrix[0].length - 1;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == 1 && j < leftest) {
                    leftest = j;
                }
            }
        }
        if (this.x + leftest > 0) {
            this.x--;
            CTX.clearRect(0, 0, WIDTH, HEIGHT);
            this.draw();
            board.draw();
        }
    }   
    moveRight(board) {
        let rightest = 0;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = this.matrix[i].length - 1; j >= 0; j--) {
                if (this.matrix[i][j] == 1 && j > rightest) {
                    rightest = j + 1;
                    console.log(rightest);
                }
            }
        }
        if (this.x + rightest < WIDTH) {
            this.x++;
            CTX.clearRect(0, 0, WIDTH, HEIGHT);
            this.draw();
            board.draw();
        }
    }
    rotate(board) {
        this.matrix = this.matrix[0].map((val, index) => this.matrix.map(row => row[index]).reverse())
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        this.draw();
        board.draw();
    }
}

class Board {
    constructor() {
        this.matrix = [];
        for (let i = 0; i < HEIGHT; i++) {
            this.matrix.push([]);
            for (let j = 0; j < WIDTH; j++) {
                this.matrix[i].push(0);
            }
        }
    }
    draw() {
        CTX.fillStyle = "#00FFFF"
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == 1) {
                    CTX.fillRect(j , i, 1, 1)
                }
            }
        }
    }
    add(shape) {
        for (let i = 0; i < shape.matrix.length; i++) {
            for (let j = 0; j < shape.matrix[i].length; j++) {
                if (shape.matrix[i][j] == 1) {
                    this.matrix[shape.y + i][shape.x + j] = 1;
                }
            }
        }
    }
}

function init() {
    shape = new Block(tetrominos[Math.floor(Math.random() * tetrominos.length)]);
    board = new Board();
    board.matrix[18][5] = 1;
    let loop = setInterval(() => {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        shape.draw();
        board.draw();
        if (shape.check(board)) {
            shape.move();    
        } else {
            board.add(shape);
            let newShape = new Block(tetrominos[Math.floor(Math.random() * tetrominos.length)]);
            if (!newShape.check(board)) {
                clearInterval(loop);
                CTX.fillStyle = "red";
                CTX.font = "30px Arial";
                CTX.fillText("Game Over", WIDTH / 2 - 50, HEIGHT / 2);
            } else {
                shape = newShape;
            }
        }
    }, 250);
}

init();

document.addEventListener('keydown', function(event) {
    if (event.key === 'a' || event.key === 'A') {
        shape.moveLeft(board);
    }
    if (event.key === 'd' || event.key === 'D') {
        shape.moveRight(board);
    }
    if (event.key === 'w' || event.key === 'W') {
        shape.rotate(board);
    }
})