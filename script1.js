let box = document.getElementsByClassName("box");
let result = document.getElementById("result")
let BtnRestart = document.getElementById("resbtn");
box = Array.from(box);

let x = "X";
let o = "O";


let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentplayer = x;

let player = "X";

let running = false;

init();

function init() {
    box.forEach(function (cell) { cell.addEventListener('click', boxClick) });
    BtnRestart.addEventListener('click', restartGame);
    result.textContent = `${currentplayer} Your Turn `;
    running = true;

};

function boxClick() {
    const index = this.dataset.index;
    if (options[index] != "" || !running) {
        return;
    }
    update(this, index);
    checkWinner();
};

function update(box, index) {
    options[index] = player;
    box.innerHTML = currentplayer;

    if (currentplayer == x) {
        box.classList.add("color");
    }
}


function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const rule = win[i];
        const box1 = options[rule[0]];
        const box2 = options[rule[1]];
        const box3 = options[rule[2]];

        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }

        if (box1 == box2 && box2 == box3) {
            isWon = true;
            box[rule[0]].classList.add("win");
            box[rule[1]].classList.add("win");
            box[rule[2]].classList.add("win");
        }
    }


    if (isWon) {
        result.textContent = `${currentplayer} Won the Game`;
        running = false;
        result.classList.add("animation")
    }
    else if (!options.includes("")) {
        result.textContent = "Game Draw";
        running = false;
    }
    else {
        changePlayer();
    }
}

function changePlayer() {
    player = (player == "X") ? "O" : "X";
    currentplayer = (currentplayer == x) ? o : x;
    result.textContent = `${currentplayer} Your Turn `;

    

}

function restartGame() {
    location.reload(true);
}

