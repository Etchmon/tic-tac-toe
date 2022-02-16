// -----To Do------
// 

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
    const playerChoice = (num) => {
        const field = Gameboard.getIndex(num);
        if (field == undefined) {
            Gameboard.setIndex(num, Player.getSign());
        } else {
            console.log('This square is filled')
        }
    }

    return { playerChoice }
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


