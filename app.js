// Function that add X or O to innerhtml of grid buttons when clicked

// Function that changes between placing X or O onclick

// Onclick push the X or O into the gameboard array, no more than 9 answers allowed

// After every X or O placement, run a board check function that checks for 3 in a row

// If 3 in a row announce winner

// Computer function that randomly places a guess

const Gameboard = (() => {

    let gameboard = ['X', '0', 'X', '0', 'X', '0', 'X', '0', 'X'];

    const arrayDisplay = () => {
        for (i = 0; i < gameboard.length; i++) {
            document.getElementById('array').innerHTML += gameboard[i];
        }
    }

    return {
        arrayDisplay
    }

})();

const DisplayController = (() => {
    // Create array of the gameboard buttons
    const htmlBoard = Array.from(document.querySelectorAll('button.field'));

    console.log(htmlBoard);
})();

