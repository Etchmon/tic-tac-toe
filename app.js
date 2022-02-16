// -----To Do------
// check for 3 in a row through columns, rows, and diagonals
// Add player 2 ability to assign 0's

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

    // Return the functions for use outside of object
    return { getIndex, setIndex };
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
                return true
            }
        }
        return false;
    }

    const winCheck = (board) => {
        if (rowCheck(board)) {
            return true;
        }
        return false;
    }

    const playerChoice = (num) => {
        const field = Gameboard.getIndex(num);
        if (field == undefined) {
            Gameboard.setIndex(num, Player.getSign());
            console.log(winCheck(Gameboard))
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


    console.log(htmlBoard);
})();


