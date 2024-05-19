const gameBoard = () => {
    const board = ["", "", "", "", "", "", "", "", ""];

    function setBoard(index, item) {
        board[index] = item;
    }

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { board, setBoard, resetBoard };
};

const playRound = () => {
    let currentPlayer = "O";
    let isWinner = false;
    let isTie = false;
    const squares = document.querySelectorAll(".square");
    const header = document.querySelector('.header');
    const body = document.querySelector('.body');
    const footer = document.querySelector('.footer');
    const modal = document.querySelector('.modal');
    const yesReset = document.getElementById('yesReset');
    const noReset = document.getElementById('noReset');

    gameB = gameBoard();
    handleClick(gameB);
    function handleClick(board) {
        squares.forEach((e) => {
            e.addEventListener('click', () => {
                if (e.textContent == "" && isWinner == false) {
                    currentPlayer = (currentPlayer == "O") ? "X" : "O";
                    tempPlayer = (currentPlayer == "X") ? "O" : "X";
                    e.textContent = currentPlayer;
                    e.classList.add("square-x");
                    header.textContent = `Player ${tempPlayer}\'s Turn`;
                    board.setBoard(e.id - 1, currentPlayer);

                    //Check to see if there is a tie or winner!
                    winner = checkWinner(board);
                    isTie = checkTie(board);


                    if (winner.result == true) {
                        header.textContent = `Player ${currentPlayer} is the Winner!`;
                        resetGame(board);
                        isWinner = true;
                    }
                    else if (isTie.result == true) {
                        header.textContent = `Its a tie!`;
                        resetGame(board);
                        isWinner = false;
                    }
                }
            });
        });
    }

    function checkWinner(gameBoard) {
        let result = false;

        const winningCombinations =
            [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]];


        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (gameBoard.board[a] == gameBoard.board[b]
                && gameBoard.board[b] == gameBoard.board[c]
                && gameBoard.board[c] == gameBoard.board[a]
                && gameBoard.board[a] != "") {
                result = true;
            }
        }
        return { result };
    }

    function checkTie() {
        let count = 0;
        let result = false;
        squares.forEach((e) => {
            if (e.textContent == "X" || e.textContent == "O") {
                count++;
                if (count == 9) {
                    result = true;
                }
            }
        });

        return { result };
    }

    function resetGame(board) {
        modal.classList.remove('not-active');
        footer.classList.add('not-active');
        body.classList.add('not-active');
        yesReset.addEventListener('click', () => {
            board.resetBoard();
            for (let i = 0; i < squares.length; i++) {
                squares[i].textContent = "";
            }
            body.classList.remove('not-active');
            modal.classList.add('not-active');
            footer.classList.remove('not-active');
            header.textContent = `Player ${tempPlayer}\'s Turn`;
            isWinner = false;
        });
        noReset.addEventListener('click', () => {
            location.reload();
        });
    }

};

function readyToPlay() {
    const yesBtn = document.getElementById('yesBtn');
    const header = document.querySelector('.header');
    const body = document.querySelector('.body');
    const footer = document.querySelector('.footer');

    yesBtn.addEventListener('click', () => {
        header.textContent = "Lets Play! X's Turn";
        body.classList.remove('not-active');
        footer.classList.remove('not-active');
    });
}

const game = (function () {
    readyToPlay();
    playRound();
})();