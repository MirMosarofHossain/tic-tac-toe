let yourName = document.getElementById("your_name");
let oppoName = document.getElementById("oppo_name");
let startBtn = document.getElementById("start");
let player1 = document.getElementById("you");
let player2 = document.getElementById("oppo");
let gameHeader = document.getElementById("game_header");
let gameContainer = document.getElementById("game_container");
let bgMusic = new Audio("bg_music.mp3");
bgMusic.loop = true;

let player1Name;
let player2Name;

startBtn.addEventListener('click', () => {
    if (yourName.value == "" || oppoName.value == "") {
        alert("Fill the information")
    }
    else {
        player1Name = yourName.value.toUpperCase();
        player2Name = oppoName.value.toUpperCase();
        player1.innerHTML = `${player1Name} (X)`;
        player2.innerHTML = `${player2Name} (O)`;
        gameHeader.style.display = "none";
        gameContainer.style.display = "block";
        bgMusic.play();
    }
})
const winnigPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let btns = document.querySelectorAll(".btn");
let yourTurn = document.getElementById("your_turn");
let oppoTurn = document.getElementById("oppo_turn");
let waterDrop = new Audio("water_drop.mp3");
let gameOver = new Audio("game-over.wav");

let turn = true;
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (turn === true) {
            btn.innerHTML = "X";
            yourTurn.style.backgroundColor = "white";
            oppoTurn.style.backgroundColor = "#66eb66";
            turn = false;
            checkWin();

        }
        else {
            btn.innerHTML = "O";
            yourTurn.style.backgroundColor = "#66eb66";
            oppoTurn.style.backgroundColor = "white";
            turn = true;
            checkWin();
        }
        btn.disabled = true;
        waterDrop.play();
    })
})
function disabaledall() {
    btns.forEach((btn) => {
        btn.disabled = true;
    })
}

let winnerSection = document.getElementById("win_sec");
let winnerOne = document.getElementById("winner");
let winMusic = new Audio("winning-music.mp3");

function showWinner(winner) {
    if (winner == 'X') {
        winnerOne.innerText = player1Name + " ";
    }
    else {
        winnerOne.innerText = player2Name + " ";
    }
    bgMusic.pause();
    gameContainer.style.display = "none";
    winnerSection.style.display = "block"
    winMusic.play();
}

function checkDisable() {
    for (const button of btns) {
        if (button.innerHTML == "") {
            return false;
        }
    }
    return true;
}


function checkWin() {
    winnigPattern.forEach((pattern) => {
        let firstPosition = btns[pattern[0]].innerHTML;
        let secondPosition = btns[pattern[1]].innerHTML;
        let thirdPosition = btns[pattern[2]].innerHTML;
        // console.log(firstPosition, secondPosition, thirdPosition)
        if (firstPosition != "" && secondPosition != "" && thirdPosition != "") {
            if (firstPosition === secondPosition && secondPosition === thirdPosition) {
                let winner = firstPosition;
                disabaledall();
                showWinner(winner);
            }
            else {
                isAllDisable = checkDisable();
                if (isAllDisable == true) {
                    gameContainer.style.display = "none";
                    gameHeader.style.display = "none";
                    winnerSection.style.display = "none";
                    document.getElementById("game_over-sec").style.display = "block"
                    bgMusic.pause();
                    gameOver.play();
                }
            }
        }

    })
}

function reset() {
    btns.forEach((btn) => {
        btn.disabled = false;
        btn.innerHTML = "";
        turn = true;
        yourTurn.style.backgroundColor = "#66eb66";
        oppoTurn.style.backgroundColor = "white";
    })
}

let resetBtn = document.getElementById("reset");
resetBtn.addEventListener('click', reset);

let restartBtns = document.querySelectorAll(".restart");
restartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        reset();
        gameContainer.style.display = "none";
        gameHeader.style.display = "block";
        winnerSection.style.display = "none";
        bgMusic.pause();
        winMusic.pause();
    })
})

let playAgainBtns = document.querySelectorAll(".play_again");
playAgainBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        reset();
        gameContainer.style.display = "block";
        gameHeader.style.display = "none";
        winnerSection.style.display = "none";
        document.getElementById("game_over-sec").style.display = "none"
        winMusic.pause();
        bgMusic.play();
    })
})
