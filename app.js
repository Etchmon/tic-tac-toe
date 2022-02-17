// -----To Do------
// Clean up UI, add transitions
// Add score tracker
// Add option to play as O
// revise aiChoice to stop winning moves a percentage of the time
// Clean up comments

// Gameboard Object to handle grid index and player settings
const Gameboard = (() => {

    let gameboard = new Array(9);

    const getIndex = (num) => gameboard[num];

    const setIndex = (num, player) => {
        let htmlField = document.querySelector(`.board button:nth-child(${num + 1})`);
        htmlField.innerHTML = player;
        gameboard[num] = player;
        console.log(gameboard);
    }

    const getEmptyIndexAll = () => {
        let fields = [];
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i] == undefined) {
                fields.push(i);
            }
        }
        return fields;
    }

    const clear = () => {
        for (i = 0; i < gameboard.length; i++) {
            gameboard[i] = undefined;
        }
    }

    return { getIndex, setIndex, clear, getEmptyIndexAll };
})();

const Player = (() => {

    let sign = 'x';

    const getSign = () => sign;

    return { getSign }
})();

const GameController = (() => {

    let playerScore = 0;
    let aiScore = 0;

    const rowCheck = (board) => {
        // Create a loop that iterates the beginning index of a row
        for (let i = 0; i < 3; i++) {
            let row = [];
            // Create nested loop that pushes the content of each field in the row into the row array
            // Rows start at index 0, 3, and 6
            for (let j = i * 3; j < i * 3 + 3; j++) {
                row.push(board.getIndex(j));
            }

            // Check the row array for a complete row by checking if every index is 'x';
            if (row.every(field => field == 'x') || row.every(field => field == 'o')) {
                return true;
            }
        }
        return false;
    }

    const colCheck = (board) => {
        // Loop through the index of each row beginning
        for (let i = 0; i < 3; i++) {
            let col = [];
            // Nested loop that pushes contents of a column into the column array
            // Columns start at 0, 1, 2
            for (let j = 0; j < 3; j++) {
                col.push(board.getIndex(i + 3 * j))
            }

            // Check the column array for a complete column
            if (col.every(field => field == 'x') || col.every(field => field == 'o')) {
                return true;
            }
        }
        return false;
    }

    const diagCheck = (board) => {
        // Arrays that hold each field for a diagonal
        diag1 = [board.getIndex(0), board.getIndex(4), board.getIndex(8)];
        diag2 = [board.getIndex(2), board.getIndex(4), board.getIndex(6)];

        if (diag1.every(field => field == 'x') || diag1.every(field => field == 'o')) {
            return true;
        } else if (diag2.every(field => field == 'x') || diag2.every(field => field == 'o')) {
            return true;
        }
    }

    // Check the gameboard for winning patterns
    const winCheck = (board) => {
        if (rowCheck(board) || colCheck(board) || diagCheck(board)) {
            return true;
        }
        return false;
    }

    const drawCheck = (board) => {
        for (let i = 0; i < 9; i++) {
            let field = board.getIndex(i);
            if (field == undefined) {
                return false;
            }
        }
        return true;
    }

    const getScore = () => {
        return { playerScore, aiScore }
    }

    const restart = async function () {
        // clear gameboard array, clear display
        Gameboard.clear();
        DisplayController.clear();

    }

    const aiChoice = (board) => {
        let sign = 'o';
        let fields = board.getEmptyIndexAll();
        let num = Math.floor(Math.random() * fields.length);
        board.setIndex(fields[num], sign);
    }

    const playerChoice = (num) => {
        const field = Gameboard.getIndex(num);
        if (field == undefined) {
            Gameboard.setIndex(num, Player.getSign());
            if (winCheck(Gameboard)) {
                setTimeout(() => alert('winner'), 100);
                playerScore++
                DisplayController.updateScore();
                setTimeout(() => restart(), 100);
                return;
            } else if (drawCheck(Gameboard)) {
                setTimeout(() => alert('draw'), 100);
                setTimeout(() => restart(), 100);
                return;
            } else {
                aiChoice(Gameboard);
                if (winCheck(Gameboard)) {
                    setTimeout(() => alert('Ai wins '), 100);
                    aiScore++;
                    DisplayController.updateScore();
                    setTimeout(() => restart(), 100);
                    return;
                };
            }

        } else {
            console.log('This square is filled');
        }
    }

    return { playerChoice, winCheck, restart, getScore }
})();

const DisplayController = (() => {
    // Create array of the gameboard buttons
    const htmlBoard = Array.from(document.querySelectorAll('button.field'));
    const restartBtn = document.getElementById('restart');
    const playerScore = document.getElementById('player-score');
    const aiScore = document.getElementById('ai-score');
    console.log(Player)

    // initate board module, auto run
    const initiateGame = (() => {

        for (i = 0; i < htmlBoard.length; i++) {
            field = htmlBoard[i];
            console.log(field);
            // event listener to run playerChoice with this button and index number
            field.setAttribute('key', i);
            field.addEventListener('click', GameController.playerChoice.bind(field, i))
        }

        restartBtn.addEventListener('click', () => GameController.restart())
    })();

    const clear = () => {
        for (i = 0; i < htmlBoard.length; i++) {
            htmlBoard[i].innerHTML = '';
        }
    }

    const updateScore = () => {
        playerScore.innerHTML = GameController.getScore().playerScore;
        aiScore.innerHTML = GameController.getScore().aiScore;
    }

    return { clear, updateScore }
    console.log(htmlBoard);
})();


