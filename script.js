//Create a Board
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


//Playround function plays a round of Tic-Tac-Toe
const playRound = () => {

    /* Variables */
    const squares = document.querySelectorAll(".square");
    const header = document.querySelector('.header');
    const body = document.querySelector('.body');
    const footer = document.querySelector('.footer');
    const modal = document.querySelector('.modal');
    const yesReset = document.getElementById('yesReset');
    const noReset = document.getElementById('noReset');
    let currentPlayer = "O";
    let isWinner = false;
    let isTie = false;

    /* Creates a Game Board*/
    gameB = gameBoard();

    /* Begins the Handle Click*/
    handleClick(gameB);

    /* It handles the clicks for each individual grid.
    *@param game board
    */
    function handleClick(board) {
        squares.forEach((e) => {
            e.addEventListener('click', () => {
                if (e.textContent == "" && isWinner == false) {

                    //Alternate the values of X and O
                    currentPlayer = (currentPlayer == "O") ? "X" : "O";
                    //Display the values of current player's turn. 
                    tempPlayer = (currentPlayer == "X") ? "O" : "X";
                    header.textContent = `Player ${tempPlayer}\'s Turn`;
                    //Places the X or O on the grid. 
                    e.textContent = currentPlayer;
                    e.classList.add("square-x");

                    //Add to gameboard array
                    board.setBoard(e.id - 1, currentPlayer);

                    //Check to see if there is a tie or winner!
                    winner = checkWinner(board);
                    isTie = checkTie(board);

                    /*
                    *If there is a winner declare it. 
                    *If there is a tie declare it. 
                    */
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

    /*
    * The following function checks the winner.
    * @param game board
    * @return result -> true or false
    */
    function checkWinner(gameBoard) {
        let result = false;

        //Possible Combinations
        const winningCombinations =
            [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]];


        //Checks to see if there is a winning combination. 
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

    /*
    * The following function checks to see if there is a tie.
    * @return result -> true or false
    */
    function checkTie() {
        let count = 0;
        let result = false;
        //Checks to see if all 9 squares are filled. 
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

    /*
    * Resets the board for the next round.
    * @param game board
    */
    function resetGame(board) {

        //Manipulates displays
        modal.classList.remove('not-active');
        footer.classList.add('not-active');
        body.classList.add('not-active');

        //Asks user if they want to continue
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
        //Reloads the page, if user doesn't want to continue. 
        noReset.addEventListener('click', () => {
            location.reload();
        });
    }

};

/*
* Initial Display
* Asks user if they want to play or not. 
*/
function readyToPlay() {
    const yesBtn = document.getElementById('yesBtn');
    const header = document.querySelector('.header');
    const body = document.querySelector('.body');
    const footer = document.querySelector('.footer');
    const gif = document.getElementById("gif"); 

    yesBtn.addEventListener('click', () => {
        header.textContent = "Lets Play! X's Turn";
        gif.classList.add('not-active'); 
        body.classList.remove('not-active');
        footer.classList.remove('not-active');
    });
}

/*
* Executes the functions, without global scope.  
*/
const game = (function () {
    readyToPlay();
    playRound();
})();