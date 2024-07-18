// global variables--------------------------------------------------------

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let board = [
    ["", "red", "", "red", "", "red", "", "red"],
    ["red", "", "red", "", "red", "", "red", ""],
    ["", "red", "", "red", "", "red", "", "red"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["gray", "", "gray", "", "gray", "", "gray", ""],
    ["", "gray", "", "gray", "", "gray", "", "gray"],
    ["gray", "", "gray", "", "gray", "", "gray", ""]
];

// event handlers-----------------------------------------------------------
generateBoard(); // change color to Peice objects
drawBoard(); // draw background of board
drawPeices(); // draw peices of red and grey

canvas.onclick = function (event) {
    let x = event.offsetX;
    let y = event.offsetY;

    let row = Math.floor(y / 100);
    let col = Math.floor(x / 100);

    if (board[row][col] != "")
    {
        let selectedPeice = getSelectedPeice();
        if (selectedPeice != null)
        {
            selectedPeice.isClicked = false;
        }
        else 
        {
            board[row][col].isClicked = !board[row][col].isClicked;
        }
    } 
    drawBoard();
    drawPeices();
}

// Constructors---------------------------------------------------------------
function Peice(row, col, color, isClicked, isKing)
{
    this.row = row;
    this.col = col;
    this.color = color;
    this.isClicked = isClicked;
    this.isKing = isKing;

    this.draw = function () {
        let x = col * 100 + 50;
        let y = row * 100 + 50;
        
        drawCircle(x, y, 35, this.color);  
    };

    this.checkKing = function () {
        if (this.color == "red" && this.row == 7)
        {
            this.isKing = true;
        }

        if (this.color == "grey" && this.row == 0)
        {
            this.isKing = true;
        }
    };

    this.move = function (newRow, newCol) {

    };
}

// functions--------------------------------------------------------
function drawBoard() 
{
    let rows = 8;
    let cols = 8;

    let cellSide = 100;

    for (let i = 0; i < rows; i++) 
    {
        for (let j = 0; j < cols; j++)
        {
            if ((i + j) % 2 == 0) // draw white cell
            {
                ctx.fillStyle = "white";
                ctx.fillRect(i*100, j*100, cellSide, cellSide);
            }
            else // black cell
            {
                ctx.fillStyle = "black";
                ctx.fillRect(i*100, j*100, cellSide, cellSide);
            }
        }   
    }
}

function drawPeices()
{
    let rows = board.length;
    let cols = board[0].length;

    for (let i = 0; i < rows; i++) 
    {
        for (let j = 0; j < cols; j++)
        {
            let peice = board[i][j];
            if (peice != "")
            {
                if (peice.isClicked)
                {
                    let x = j * 100 + 50;
                    let y = i * 100 + 50;
                    
                    drawCircle(x, y, 40, "yellow");  
                }
                peice.draw();            
            }          
        }
    }
}

function getSelectedPeice()
{
    let rows = board.length;
    let cols = board[0].length;

    for (let i = 0; i < rows; i++) 
    {
        for (let j = 0; j < cols; j++)
        {
            if (board[i][j].isClicked)
            {
                return board[i][j];          
            }          
        }
    }

    return null;
}

// Helper Functions----------------------------------------------
function generateBoard()
{
    for (let i = 0; i < 8; i++)
    {
        for (let j = 0; j < 8; j++)
        {
            if (board[i][j] != "")
            {
                board[i][j] = new Peice(i, j, board[i][j], false, false);
            }
        }  
    }
}

function drawCircle(x, y, r, color)
{
    ctx.fillStyle = color;
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
}