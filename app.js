// Function that add X or O to innerhtml of grid buttons when clicked

// Function that changes between placing X or O onclick

// Onclick push Player.sign into gameboard array

// After every X or O placement, run a board check function that checks for 3 in a row

// If 3 in a row announce winner

// Computer function that randomly places a guess

const Gameboard = (() => {

    let gameboard = new Array(9);

    const getIndex = (num) => gameboard[num];

    const setIndex = (num, player) => {

        let htmlBoard = document.querySelector(`.board button:nth-child(${num + 1})`);
        htmlBoard.innerHTML = player;
        gameboard[num] = player;
        console.log(gameboard);

    }

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

        Gameboard.setIndex(num, Player.getSign());
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


