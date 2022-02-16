// -----To Do------
// Alert winner and restart game if winCheck returns true

// Gameboard Object to handle grid index and player settings
const Gameboard = (() => {

    // Creates an empty array with length of 9
    let gameboard = new Array(9);

    // Takes a number and returns the index of our gameboard array
    const getIndex = (num) => gameboard[num];

    // Takes a number and player, assigns the player to the index of our gameboard array
    // Sets html of the button clicked to the player

    const setIndex = (num, player) => {
        let htmlField = document.querySelector(`.board button:nth-child(${num + 1})`);
        htmlField.innerHTML = player;
        gameboard[num] = player;
        console.log(gameboard);
    }

    const clear = () => {
        for (i = 0; i < gameboard.length; i++) {
            gameboard[i] = undefined;
        }
    }

    // Return the functions for use outside of object
    return { getIndex, setIndex, clear };
})();

const Player = (() => {

    let sign = 'x';

    const getSign = () => sign;

    return { getSign }
})();

const GameController = (() => {

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
            if (row.every(field => field == 'x')) {
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
            if (col.every(field => field == 'x')) {
                return true;
            }
        }
        return false;
    }

    const diagCheck = (board) => {
        // Arrays that hold each field for a diagonal
        diag1 = [board.getIndex(0), board.getIndex(4), board.getIndex(8)];
        diag2 = [board.getIndex(2), board.getIndex(4), board.getIndex(6)];

        if (diag1.every(field => field == 'x')) {
            return true;
        } else if (diag2.every(field => field == 'x')) {
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

    const restart = () => {
        // clear gameboard array, clear display
        Gameboard.clear();
        DisplayController.clear();

    }

    const playerChoice = (num) => {
        const field = Gameboard.getIndex(num);
        if (field == undefined) {
            Gameboard.setIndex(num, Player.getSign());
            if (winCheck(Gameboard)) {
                alert('winner');
                restart();
            }
        } else {
            console.log('This square is filled');
        }
    }

    return { playerChoice, winCheck }
})();

const DisplayController = (() => {
    // Create array of the gameboard buttons
    const htmlBoard = Array.from(document.querySelectorAll('button.field'));
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
    })();

    const clear = () => {
        for (i = 0; i < htmlBoard.length; i++) {
            htmlBoard[i].innerHTML = '';
        }
    }

    return { clear }
    console.log(htmlBoard);
})();


