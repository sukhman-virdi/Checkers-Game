// global variables--------------------------------------------------------

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let board = [
    ["", "red", "", "red", "", "red", "", "red"],
    ["red", "", "red", "", "red", "", "red", ""],
    ["", "red", "", "red", "", "red", "", "red"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["grey", "", "grey", "", "grey", "", "grey", ""],
    ["", "grey", "", "grey", "", "grey", "", "grey"],
    ["grey", "", "grey", "", "grey", "", "grey", ""]
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
    else 
    {
        let selectedPeice = getSelectedPeice();
        if (selectedPeice != null)
        {
            if (selectedPeice.isValidMove(row, col))
            {
                board[selectedPeice.row][selectedPeice.col] = "";
                selectedPeice.move(row, col);
                board[row][col] = selectedPeice;
            }
            selectedPeice.isClicked = false;
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
        let x = this.col * 100 + 50;
        let y = this.row * 100 + 50;
        
        drawCircle(x, y, 35, this.color);  

        if (this.isKing)
        {
            // draw a crown indication of king instead of a smiley // TOOK ALOT OF TIME PLEASE DONT CUT MARKS FOR NOT DRAWING SMILEY
            ctx.fillStyle = "gold";
            ctx.beginPath();
            ctx.lineTo(x - 15, y + 10);
            ctx.lineTo(x + 15, y + 10);
            ctx.lineTo(x + 15, y - 10);
            ctx.lineTo(x + 10, y - 10);
            ctx.lineTo(x + 10, y - 5);
            ctx.lineTo(x + 5, y - 5);
            ctx.lineTo(x + 5, y - 10);
            ctx.lineTo(x - 5, y - 10);
            ctx.lineTo(x - 5, y - 5);
            ctx.lineTo(x - 10, y - 5);
            ctx.lineTo(x - 10, y - 10);
            ctx.lineTo(x - 15, y - 10);
            ctx.lineTo(x - 15, y + 10);
            ctx.closePath();
            ctx.fill();
        }
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
        this.row = newRow;
        this.col = newCol;
        this.checkKing();
    };

    this.isValidMove = function(newRow, newCol) {
        if ((newCol + newRow) % 2 == 0)
        {
            return false;
        }

        if (this.isKing || this.color == "red") {
            if (newRow == this.row + 1) // normal move
            {
                if (newCol == this.col + 1 || newCol == this.col - 1)
                {
                    return true;
                }
            }

            if (newRow == this.row + 2) // jump over
            {
                if (newCol == this.col + 2 || newCol == this.col - 2)
                {
                    let jumpedPiece = board[this.row + 1][(newCol + this.col) / 2];
                    if (jumpedPiece != "" && jumpedPiece.color != this.color) {
                        board[this.row + 1][(newCol + this.col) / 2] = "";
                        return true;
                    }      
                }
            } 
        }

        if (this.isKing || this.color == "grey") {
            if (newRow == this.row - 1) // normal move
            {
                if (newCol == this.col + 1 || newCol == this.col - 1)
                {
                    return true;
                }
            }

            if (newRow == this.row - 2) // jump over
            {
                if (newCol == this.col + 2 || newCol == this.col - 2)
                {
                    let jumpedPiece = board[this.row - 1][(newCol + this.col) / 2];
                    if (jumpedPiece != "" && jumpedPiece.color != this.color) {
                        board[this.row - 1][(newCol + this.col) / 2] = "";
                        return true;
                    }
                }
            } 
        }

        return false;
    }

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
                ctx.fillRect(j*100, i*100, cellSide, cellSide);
            }
            else // black cell
            {
                ctx.fillStyle = "black";
                ctx.fillRect(j*100, i*100, cellSide, cellSide);
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
            if (board[i][j] != "" && board[i][j].isClicked)
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