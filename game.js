let currentPlayer = "X";
let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];

function nextPlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}
function move(cellNum) {
    if (checkGameResult() == -1) {
        if (isFree(cellNum)) {
            //The Players Turn
            board[Math.floor(cellNum / 3)][cellNum % 3] = currentPlayer;
            nextPlayer();
            printBoard();

            //The Bots Turn
            if (checkGameResult() == -1) {
                let bestMove = findBestMove();
                console.log("The Bot moves: " + bestMove);
                board[Math.floor(bestMove / 3)][bestMove % 3] = currentPlayer;
                console.log("Current game status:" + checkGameResult());
                nextPlayer();
                printBoard();
            }
            setTimeout(function(){
                switch (checkGameResult()) {
                    case 0: alert('Draw'); break;
                    case 1: alert('Player X Won'); break;
                    case 2: alert('Player O Won'); break;
                }
            },100)
        } else {
            console.log("This cell is Taken! Choose another one!");
        }
    }
    

}
function restart() {
    clearBoard();
    currentPlayer = 'X';
    printBoard();
}
function clearBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = ' ';
        }
    }
}

function printBoard() {
    document.getElementById("cell0").innerHTML = board[0][0];
    document.getElementById("cell1").innerHTML = board[0][1];
    document.getElementById("cell2").innerHTML = board[0][2];

    document.getElementById("cell3").innerHTML = board[1][0];
    document.getElementById("cell4").innerHTML = board[1][1];
    document.getElementById("cell5").innerHTML = board[1][2];

    document.getElementById("cell6").innerHTML = board[2][0];
    document.getElementById("cell7").innerHTML = board[2][1];
    document.getElementById("cell8").innerHTML = board[2][2];
}

function isFree(inputMove) {
    return board[Math.floor(inputMove / 3)][inputMove % 3] == " ";
}

function checkGameResult() {
    if (checkColumn() != 0) {
        return checkColumn();
    } else if (checkRow() != 0) {
        return checkRow();
    } else if (checkDiagonal() != 0) {
        return checkDiagonal();
    } else if (checkDraw()) {
        return 0;
    }
    return -1;
}

function checkColumn() {
    for (let i = 0; i <= 2; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            if (board[i][0] == "X") {
                return 1; //player X Won
            }
            if (board[i][0] == "O") {
                return 2; //player  O Won
            }
        }
    }
    return 0;
}
function checkRow() {
    for (let i = 0; i <= 2; i++) {
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
            if (board[0][i] == "X") {
                return 1; //player X Won
            }
            if (board[0][i] == "O") {
                return 2; //player O Won
            }
        }
    }
    return 0;
}
function checkDiagonal() {
    if (
        (board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
        (board[2][0] == board[1][1] && board[1][1] == board[0][2])
    ) {
        if (board[1][1] == "X") {
            return 1; //player X Won
        }
        if (board[1][1] == "O") {
            return 2; //player O Won
        }
    }
    return 0;
}
function checkDraw() {
    for (let i = 0; i < 9; i++) {
        if (isFree(i)) {
            return false;
        }
    }
    return true;
}

function findBestMove() {
    let bestMove = -1;
    let bestScore = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < 9; i++) {
        let move = i;
        if (isFree(move)) {
            board[Math.floor(move / 3)][move % 3] = "O"; // Assume the bot makes this move
            let score = minimax(
                0,
                Number.MIN_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER,
                false
            );
            board[Math.floor(move / 3)][move % 3] = " "; // Undo the move

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
    }

    return bestMove;
}
function minimax(depth, alpha, beta, isMaximizing) {
    let result = checkGameResult();

    if (result != -1) {
        switch (result) {
            case 0:
                return 0; //Draw
            case 1:
                return -1; // X wins (bad)
            case 2:
                return 1; //O , bot wins (good)
        }
    }
    if (isMaximizing) {
        let bestScore = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < 9; i++) {
            if (isFree(i)) {
                //Checks if the cell is free
                board[Math.floor(i / 3)][i % 3] = "O"; //Bot Move
                let score = minimax(depth + 1, alpha, beta, false);
                board[Math.floor(i / 3)][i % 3] = " "; // Undo the move
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < 9; i++) {
            if (isFree(i)) {
                board[Math.floor(i / 3)][i % 3] = "X"; // Player's move
                let score = minimax(depth + 1, alpha, beta, true);
                board[Math.floor(i / 3)][i % 3] = " "; // Undo the move
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    }
}
