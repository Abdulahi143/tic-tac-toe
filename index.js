let boxes = document.querySelectorAll('.box');
let scoreX = document.getElementById('score-x');
let scoreO = document.getElementById('score-o');
let scoreTie = document.getElementById('score-tie');

let playerTurn = 0; // 0 for Player 1 (X), 1 for Player 2 (O)
let player1Score = 0;
let player2Score = 0;
let tieScore = 0;
let moveCount = 0; // Track the number of moves

let playerOneIcon = `<div class="x"></div>`;
let playerTwoIcon = `<div class="o"></div>`;

function checkWon() {
    const winConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left
        [2, 4, 6], // Diagonal from top-right
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (boxes[a].innerHTML.includes('x') && boxes[b].innerHTML.includes('x') && boxes[c].innerHTML.includes('x')) {
            blinkBoxes();
            return "Player 1";
        }
        if (boxes[a].innerHTML.includes('o') && boxes[b].innerHTML.includes('o') && boxes[c].innerHTML.includes('o')) {
            blinkBoxes();
            return "Player 2";
        }
    }
    return null;
}

function resetBoard() {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('blink');
    });
    playerTurn = 1 - playerTurn; 
    moveCount = 0;
}

function blinkBoxes() {
    boxes.forEach((box) =>{
        box.classList.add('blink');
    })
}

boxes.forEach((box, i) => {
    box.addEventListener('click', () => {
        if (box.innerHTML.trim() !== "" || moveCount >= 9) return;

        if (playerTurn === 0) {
            box.innerHTML = playerOneIcon;
        } else {
            box.innerHTML = playerTwoIcon;
        }

        moveCount++;

        if (moveCount >= 5) { // Only check for a winner after 5 moves
            let winner = checkWon();
            if (winner) {
                if (winner === "Player 1") {
                    player1Score++;
                    scoreX.textContent = player1Score;
                } else if (winner === "Player 2") {
                    player2Score++;
                    scoreO.textContent = player2Score;
                }
                console.log(`${winner} won the game!`);
                moveCount = 9; // To prevent further moves
                setTimeout(resetBoard, 2000); // Reset the board after a short delay
                return;
            }
        }

        // Check for a tie if all boxes are filled and no winner
        if (moveCount === 9) {
            tieScore++;
            scoreTie.textContent = tieScore;
            console.log("It's a tie!");
            setTimeout(resetBoard, 2000); // Reset the board after a short delay
            return;
        }

        playerTurn = 1 - playerTurn; // Toggle turn: 0 to 1, 1 to 0
    });
});
