const gameBoard = () => 
{
    const board = ["", "", "", "", "", "", "", "", ""]

    function setBoard(index, item)
    {
        board[index] = item
    }

    function resetBoard()
    {
        for (let i = 0; i < board.length; i++)
        {
            board[i] = ""; 
        }
    }

    return { board, setBoard, resetBoard}
}

const playRound = () => {
    let currentPlayer = "O";
    let isWinner = false; 
    const squares = document.querySelectorAll(".square");

    gameB = gameBoard();
    handleClick(gameB);
    function handleClick(board)
    {
        squares.forEach((e) =>
        {
            e.addEventListener('click', () => 
            {
                if (e.textContent == "" && isWinner == false)
                {
                    currentPlayer = (currentPlayer == "O") ? "X" : "O"; 
                    e.textContent = currentPlayer;

                    //Sets the board with the position and player
                    board.setBoard(e.id - 1, currentPlayer);

                    //Testing to see if checkWinner function works = True
                    winner = checkWinner(board);
                    console.log(winner);
                    if (winner.result == true)
                    {
                        isWinner = true; 
                    }
                }
            })
        })
    }

    function checkWinner(gameBoard)
    {
        let result = false;
        
        const winningCombinations = 
            [[0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8],
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]]
        
        
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (gameBoard.board[a] == gameBoard.board[b]
                && gameBoard.board[b] == gameBoard.board[c]
                && gameBoard.board[c] == gameBoard.board[a]
                && gameBoard.board[a] != "") {
                result = true; 
            }
        }
        return {result}
    }
};

const game = (function () {
    playRound();
})();