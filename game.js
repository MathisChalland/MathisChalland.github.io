let startingPlayer = "X";
let currentPlayer = "X";
let board = [
    [" ", " ", " ", " "],
    [" ", " ", " ", " "],
    [" ", " ", " ", " "],
    [" ", " ", " ", " "]];
let bot = true;
let play4x4 = false;
let boardCellNum = 9;
let gcNum = 3;


function switchTo4x4() {
    if (play4x4) { switchTo3x3(); }
    else {
        play4x4 = true;
        boardCellNum = 16;
        gcNum = 4;
        document.getElementById('board').classList.remove('small');
        document.getElementById('board').classList.add('large');
        restart();
        //alert('You swiched to 4x4');
    }
}

function switchTo3x3() {
    play4x4 = false;
    boardCellNum = 9;
    gcNum = 3;
    document.getElementById('board').classList.remove('large');
    document.getElementById('board').classList.add('small');
    restart();
   // alert('You swiched to 3x3');
}


function nextPlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}
async function move(cellNum) {
    if (checkGameResult() == -1) {
        playerMove(cellNum);
    }

    if (bot == true && checkGameResult() == -1) {
        await delay(300);
        botMove();
    }
    if (checkGameResult != -1) {
        await delay(150);
        gameStatusAlert();
    }
}
function playerMove(cellNum) {
    if (isFree(cellNum)) {
        board[Math.floor(cellNum / gcNum)][cellNum % gcNum] = currentPlayer;
        printBoard();
        nextPlayer();
    } else {
        alert('That cell is Taken! Choose another one!')
    }
}

function botMove() {
    if (checkGameResult() == -1) {
        let bestMove = findBestMove();
        board[Math.floor(bestMove / gcNum)][bestMove % gcNum] = currentPlayer;
        printBoard();
        nextPlayer();
    }
}

function firstBotMove() {
    const good3x3 = [0, 2, 6, 8, 2];
    const good4x4 = [0, 3, 12, 15, 3];
    let randNum = Math.floor(Math.random() * 4);

    if (play4x4 == false) {
        board[Math.floor(good3x3[randNum] / gcNum)][good3x3[randNum] % gcNum] = currentPlayer;
    } else {
        board[Math.floor(good4x4[randNum] / gcNum)][good4x4[randNum] % gcNum] = currentPlayer;
    }
    printBoard();
    nextPlayer();

}

function toggleBot() {
    if (bot) {
        bot = false;
       // alert('You disabled the bot!');
    }
    else {
        bot = true;
        //alert('You enabled the bot!');
    }
}

function switchStartingPlayer() {
    if (startingPlayer == 'X') {
        startingPlayer = 'O';
        //alert('You are no longer starting first!');
    } else {
        startingPlayer = 'X';
       // alert('You are now starting first again!')
    }
}

function gameStatusAlert() {
    switch (checkGameResult()) {
        case 0:
            alert("Draw");
            break;
        case 1:
            alert("Player X Won");
            break;
        case 2:
            alert("Player O Won");
            break;
    }
}
function restart() {
    clearBoard();
    currentPlayer = startingPlayer;
    printBoard();
    if (startingPlayer == 'O' && bot) {
        firstBotMove();
    }
}
function clearBoard() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            board[i][j] = " ";
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printBoard() {
    if (play4x4 == false) { printBoard3x3() }
    else {
        printBoard4x4();
    }
}

function printBoard3x3() {
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
function printBoard4x4() {
    document.getElementById("cell0").innerHTML = board[0][0];
    document.getElementById("cell1").innerHTML = board[0][1];
    document.getElementById("cell2").innerHTML = board[0][2];
    document.getElementById("cell3").innerHTML = board[0][3];

    document.getElementById("cell4").innerHTML = board[1][0];
    document.getElementById("cell5").innerHTML = board[1][1];
    document.getElementById("cell6").innerHTML = board[1][2];
    document.getElementById("cell7").innerHTML = board[1][3];

    document.getElementById("cell8").innerHTML = board[2][0];
    document.getElementById("cell9").innerHTML = board[2][1];
    document.getElementById("cell10").innerHTML = board[2][2];
    document.getElementById("cell11").innerHTML = board[2][3];

    document.getElementById("cell12").innerHTML = board[3][0];
    document.getElementById("cell13").innerHTML = board[3][1];
    document.getElementById("cell14").innerHTML = board[3][2];
    document.getElementById("cell15").innerHTML = board[3][3];
}
function isFree(inputMove) {
    return board[Math.floor(inputMove / gcNum)][inputMove % gcNum] == " ";
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
    if (play4x4 == false) {
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
    }
    else { //if 4x4 Mode is activated
        for (let i = 0; i <= 3; i++) {
            if ((board[i][0] == board[i][1] && board[i][1] == board[i][2]) && (board[i][1] == board[i][2] && board[i][2] == board[i][3])) {
                if (board[i][1] == 'X') {
                    return 1; //player 1
                }
                if (board[i][1] == 'O') {
                    return 2; //player  2
                }
            }
        }
    }
    return 0;
}
function checkRow() {
    if (play4x4 == false) {
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
    }
    else {
        for (let i = 0; i <= 3; i++) {
            if ((board[0][i] == board[1][i] && board[1][i] == board[2][i]) && (board[1][i] == board[2][i] && board[2][i] == board[3][i])) {
                if (board[1][i] == 'X') {
                    return 1; //player 1 bzw X
                }
                if (board[1][i] == 'O') {
                    return 2; //player 2 bzw. O
                }
            }
        }
    }
    return 0;
}
function checkDiagonal() {
    if (play4x4 == false) {
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
    }
    else {
        if ((board[1][1] == board[2][2] && (board[0][0] == board[1][1] || board[3][3] == board[1][1]))) {
            if (board[1][1] == 'X') {
                return 1; //player 1
            }
            if (board[1][1] == 'O') {
                return 2; //player 2
            }
        }
        if ((board[1][2] == board[2][1] && (board[0][3] == board[1][2] || board[3][0] == board[1][2]))) {
            if (board[1][2] == 'X') {
                return 1; //player 1
            }
            if (board[1][2] == 'O') {
                return 2; //player 2
            }
        }

        if (board[1][0] == board[2][1] && board[2][1] == board[3][2]) {
            if (board[1][0] == 'X') {
                return 1; //player 1
            }
            if (board[1][0] == 'O') {
                return 2; //player 2
            }
        }
        if (board[0][1] == board[1][2] && board[1][2] == board[2][3]) {
            if (board[0][1] == 'X') {
                return 1; //player 1
            }
            if (board[0][1] == 'O') {
                return 2; //player 2
            }
        }
        if (board[1][3] == board[2][2] && board[2][2] == board[3][1]) {
            if (board[1][3] == 'X') {
                return 1; //player 1
            }
            if (board[1][3] == 'O') {
                return 2; //player 2
            }
        }
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
            if (board[0][2] == 'X') {
                return 1; //player 1
            }
            if (board[0][2] == 'O') {
                return 2; //player 2
            }
        }
    }
    return 0;
}
function checkDraw() {
    for (let i = 0; i < boardCellNum; i++) {
        if (isFree(i)) {
            return false;
        }
    }

    return true;
}

function findBestMove() {
    let bestMove = -1;
    let bestScore = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < boardCellNum; i++) {
        let move = i;
        if (isFree(move)) {
            board[Math.floor(move / gcNum)][move % gcNum] = "O"; // Assume the bot makes this move
            let score = minimax(
                0,
                Number.MIN_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER,
                false
            );
            board[Math.floor(move / gcNum)][move % gcNum] = " "; // Undo the move

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
        for (let i = 0; i < boardCellNum; i++) {
            if (isFree(i)) {
                //Checks if the cell is free
                board[Math.floor(i / gcNum)][i % gcNum] = "O"; //Bot Move
                let score = minimax(depth + 1, alpha, beta, false);
                board[Math.floor(i / gcNum)][i % gcNum] = " "; // Undo the move
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
        for (let i = 0; i < boardCellNum; i++) {
            if (isFree(i)) {
                board[Math.floor(i / gcNum)][i % gcNum] = "X"; // Player's move
                let score = minimax(depth + 1, alpha, beta, true);
                board[Math.floor(i / gcNum)][i % gcNum] = " "; // Undo the move
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

function showNotification() {
    var banner = document.getElementById('notificationBanner');
    banner.style.display = 'block';
    banner.classList.remove('hidden');
    
    // Banner nach 3 Sekunden automatisch verstecken
    setTimeout(function() {
      banner.classList.add('hidden');
      // Optional: Verstecke das Banner vollständig nach dem Ausblenden
     // setTimeout(function() {
      //  banner.style.display = 'none';
     // }, 500); // Warte die Dauer der Ausblendanimation ab
    }, 1000);
  }
  
  // Beispiel: Zeige das Banner, wenn eine Einstellung geändert wird
  document.getElementById('toggleBot').addEventListener('change', showNotification);
  document.getElementById('startFirst').addEventListener('change', showNotification);
  document.getElementById('swapMode').addEventListener('change', showNotification);