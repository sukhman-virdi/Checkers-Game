// global variables

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let checkersBoard = [
    ["", "red", "", "red", "", "red", "", "red"],
    ["red", "", "red", "", "red", "", "red", ""],
    ["", "red", "", "red", "", "red", "", "red"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["gray", "", "gray", "", "gray", "", "gray", ""],
    ["", "gray", "", "gray", "", "gray", "", "gray"],
    ["gray", "", "gray", "", "gray", "", "gray", ""]
];

// event handlers
drawBoard();
drawPeices();

canvas.onclick = function (event) {
    let x = event.offsetX;
    let y = event.offsetY;

    let row = Math.floor(y / 100);
    let col = Math.floor(x / 100);

    alert(checkersBoard[row][col]);    
}

// functions
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
    let rows = checkersBoard.length;
    let cols = checkersBoard[0].length;

    for (let i = 0; i < rows; i++) 
    {
        for (let j = 0; j < cols; j++)
        {
            if (checkersBoard[i][j] != "")
            {
                let x = j * 100 + 50;
                let y = i * 100 + 50;
                let color = checkersBoard[i][j];
                
                drawCircle(x, y, 35, color);   
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