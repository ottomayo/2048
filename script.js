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

function keyDownHandler(e) {
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

            ctx.beginPath();
            ctx.fillStyle = game.colours.lightBrown;
            ctx.roundRect(x_val, y_val, game.tileWidth, game.tileWidth, 5).fill();
            ctx.closePath();             
        })
    })

}

function mainLoop() {
    drawBoard();
}

document.addEventListener("keydown", keyDownHandler);
setInterval(mainLoop, 12);
