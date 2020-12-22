let canvas = document.getElementById("game_canvas");
let ctx = canvas.getContext("2d");

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) { r = w / 2; }
    if (h < 2 * r) { r = h / 2; }
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

function write(text, colour, font, x, y) {
    ctx.font = font;
    ctx.fillStyle = colour;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(text, x, y);
}

canvas.width = 600;
canvas.height = 600;

let game = {};
game.board = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
];
game.columns = function() {
    let cols = [[], [], [], []];
    game.board.forEach(function(row, index) {
        for(let i = 0; i < 4; i++) {
            cols[i].push(row[i]);
        }
    })
    return cols;
}
game.rows = function() {
    return game.board;
}

game.colours = {
    lightBrown: "rgb(205,193,180)",
    darkBrown: "rgb(187,173,160)",
};

// game.tileWidth = 107;
// game.gapWidth = (canvas.width - game.tileWidth*4) / 5;

game.gapWidth = 17;
game.tileWidth = (canvas.width - game.gapWidth*5) / 4;

game.goLeft = function() {
    let rows = game.rows();
    rows.forEach(function(row) {
        //
        
    })
}

game.newTile = function() {
    let availableSquares = [];
    game.board.forEach(function(row, row_num) {
        row.forEach(function(square, col_num) {
            if(square === 0) {
                availableSquares.push([row_num, col_num]);
            }
        })
    })

    let selectedSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    let new_num = 2;
    if(Math.random() <= 0.1) { new_num = 4; }

    console.log(selectedSquare);

    game.board[selectedSquare[0]][selectedSquare[1]] = new_num;
    console.log(game.board);
}

function drawTile(x, y, colour, text) {
    ctx.beginPath();
    ctx.fillStyle = colour;
    ctx.roundRect(x, y, game.tileWidth, game.tileWidth, 5).fill();
    ctx.closePath();

    ctx.beginPath();
    write(text, 'black', '60px Arial', x+65, y+40);
}

function drawBoard() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = game.colours.darkBrown;
    ctx.roundRect(0, 0, canvas.width, canvas.height, 5).fill();
    ctx.closePath();

    let x_val;
    let y_val;

    game.board.forEach(function(row, row_num) {
        row.forEach(function(tile, col_num) {
            x_val = (game.tileWidth * row_num) + (game.gapWidth * (row_num + 1));
            y_val = (game.tileWidth * col_num) + (game.gapWidth * (col_num + 1));

            drawTile(x_val, y_val, game.colours.lightBrown, '');          
        })
    })

}

function keyDownHandler(e) {
    drawBoard();

    if(e.key == 'ArrowLeft') { 
        console.log('left'); 
        game.goLeft(); 
    }
    if(e.key == 'ArrowRight') { 
        console.log('right'); 
        game.goLeft(); 
    }
    if(e.key == 'ArrowUp') { 
        console.log('up'); 
        game.goLeft(); 
    }
    if(e.key == 'ArrowDown') { 
        console.log('down'); 
        game.goLeft(); 
    }

    if(e.key == 'n') {
        game.newTile();
    }
}

function drawTiles() {
    let x_val;
    let y_val;

    game.board.forEach(function(row, row_num) {
        row.forEach(function(tile, col_num) {
            x_val = (game.tileWidth * row_num) + (game.gapWidth * (row_num + 1));
            y_val = (game.tileWidth * col_num) + (game.gapWidth * (col_num + 1));

            if(game.board[row_num][col_num] !== 0) {
                drawTile(x_val, y_val, 'white', game.board[row_num][col_num]);
            }
        })
    })
}

game.newTile();

function updateScreen() {
    drawBoard();
    drawTiles();
}

document.addEventListener("keydown", keyDownHandler);
setInterval(updateScreen, 12);
