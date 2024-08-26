let boxes = document.querySelectorAll('.box');
let scoreX = document.getElementById('score-x');
let scoreO = document.getElementById('score-o');
let scoreTie = document.getElementById('score-tie');

let playerTurn = 0;
let playerXScore = 0;
let playerOScore = 0;
let tieScore = 0;
let moveCount = 0;

const checkWon = () => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (boxes[a].innerHTML.includes('x') && boxes[b].innerHTML.includes('x') && boxes[c].innerHTML.includes('x')) {
            blinkBoxes([a, b, c]);
            return "Player X";
        }
    
        if (boxes[a].innerHTML.includes('o') && boxes[b].innerHTML.includes('o') && boxes[c].innerHTML.includes('o')) {
            blinkBoxes([a, b, c]);
            return "Player O";
        }
    }
    return null;
}

const resetBoard = () => {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('blink');
    });
    moveCount = 0;
}

const blinkBoxes = (winCombo) => {
    winCombo.forEach(index => {
        boxes[index].classList.add('blink');
    });
}

boxes.forEach((box, i) => {
    box.addEventListener('click', () => {
        if (box.innerHTML.trim() !== "" || moveCount >= 9) return;

        if (playerTurn === 0) {
            box.innerHTML = `<div class="x"></div>`;
        } else {
            box.innerHTML = `<div class="o"></div>`;
        }

        moveCount++;

        if (moveCount >= 5) {
            let winner = checkWon();
            if (winner) {
                if (winner === "Player X") {
                    playerXScore++;
                    scoreX.textContent = playerXScore;
                } else if (winner === "Player O") {
                    playerOScore++;
                    scoreO.textContent = playerOScore;
                }

                moveCount = 9;
                setTimeout(resetBoard, 2000);
                return;
            }
        }

        if (moveCount === 9) {
            tieScore++;
            scoreTie.textContent = tieScore;
            setTimeout(resetBoard, 2000);
            return;
        }

        playerTurn = 1 - playerTurn; // Toggle turn: 0 to 1, 1 to 0
    });
});
