// ===============================
// DATA PEMAIN
// ===============================

const players = [
    {
        name: "Merah",
        color: "red",
        pieces: ["red-1", "red-2", "red-3", "red-4"],
        start: 0
    },
    {
        name: "Hijau",
        color: "green",
        pieces: ["green-1", "green-2", "green-3", "green-4"],
        start: 14
    },
    {
        name: "Kuning",
        color: "yellow",
        pieces: ["yellow-1", "yellow-2", "yellow-3", "yellow-4"],
        start: 28
    },
    {
        name: "Biru",
        color: "blue",
        pieces: ["blue-1", "blue-2", "blue-3", "blue-4"],
        start: 42
    }
];


// ===============================
// VARIABEL GAME
// ===============================

let currentPlayer = 0;
let diceValue = 0;
let diceRolled = false;
let gameOver = false;


// ===============================
// POSISI PION
// ===============================

const piecePositions = {};


// ===============================
// ELEMENT HTML
// ===============================

const rollButton =
    document.getElementById("roll-button");

const diceResult =
    document.getElementById("dice-result");

const currentPlayerText =
    document.getElementById("current-player");

const board =
    document.getElementById("board");


// ===============================
// MEMBUAT PAPAN
// ===============================

function createBoard() {

    for (let row = 0; row < 15; row++) {

        for (let col = 0; col < 15; col++) {

            const cell =
                document.createElement("div");

            cell.classList.add("cell");


            // Rumah Merah
            if (row < 6 && col < 6) {

                cell.classList.add("red-home");

            }


            // Rumah Hijau
            else if (row < 6 && col > 8) {

                cell.classList.add("green-home");

            }


            // Rumah Biru
            else if (row > 8 && col < 6) {

                cell.classList.add("blue-home");

            }


            // Rumah Kuning
            else if (row > 8 && col > 8) {

                cell.classList.add("yellow-home");

            }


            // Jalur
            else {

                cell.classList.add("path");

            }


            // =========================
            // FINISH MERAH
            // =========================

            if (
                row === 7 &&
                col >= 1 &&
                col <= 5
            ) {

                cell.classList.add("red-path");

            }


            // =========================
            // FINISH HIJAU
            // =========================

            if (
                col === 7 &&
                row >= 1 &&
                row <= 5
            ) {

                cell.classList.add("green-path");

            }


            // =========================
            // FINISH KUNING
            // =========================

            if (
                row === 7 &&
                col >= 9 &&
                col <= 13
            ) {

                cell.classList.add("yellow-path");

            }


            // =========================
            // FINISH BIRU
            // =========================

            if (
                col === 7 &&
                row >= 9 &&
                row <= 13
            ) {

                cell.classList.add("blue-path");

            }


            // =========================
            // TENGAH
            // =========================

            if (
                row >= 6 &&
                row <= 8 &&
                col >= 6 &&
                col <= 8
            ) {

                cell.classList.add("center");

            }


            board.appendChild(cell);

        }

    }

}

createBoard();


// ===============================
// JALUR LUAR
// ===============================

const path = [

    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],

    [5, 6],
    [4, 6],
    [3, 6],
    [2, 6],
    [1, 6],
    [0, 6],

    [0, 7],
    [0, 8],

    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 8],

    [6, 9],
    [6, 10],
    [6, 11],
    [6, 12],
    [6, 13],
    [6, 14],

    [7, 14],
    [8, 14],

    [8, 13],
    [8, 12],
    [8, 11],
    [8, 10],
    [8, 9],

    [9, 8],
    [10, 8],
    [11, 8],
    [12, 8],
    [13, 8],
    [14, 8],

    [14, 7],
    [14, 6],

    [13, 6],
    [12, 6],
    [11, 6],
    [10, 6],
    [9, 6],

    [8, 5],
    [8, 4],
    [8, 3],
    [8, 2],
    [8, 1],
    [8, 0],

    [7, 0]
];


// ===============================
// JALUR FINISH
// ===============================

const finishPaths = {

    red: [
        [7, 5],
        [7, 6],
        [7, 7]
    ],

    green: [
        [5, 7],
        [6, 7],
        [7, 7]
    ],

    yellow: [
        [7, 9],
        [7, 8],
        [7, 7]
    ],

    blue: [
        [9, 7],
        [8, 7],
        [7, 7]
    ]

};


// ===============================
// POSISI PION DI RUMAH
// ===============================

const homePositions = {

    "red-1": [8, 8],
    "red-2": [8, 22],
    "red-3": [22, 8],
    "red-4": [22, 22],

    "green-1": [8, 78],
    "green-2": [8, 92],
    "green-3": [22, 78],
    "green-4": [22, 92],

    "blue-1": [78, 8],
    "blue-2": [78, 22],
    "blue-3": [92, 8],
    "blue-4": [92, 22],

    "yellow-1": [78, 78],
    "yellow-2": [78, 92],
    "yellow-3": [92, 78],
    "yellow-4": [92, 92]

};


// ===============================
// INISIALISASI PION
// ===============================

players.forEach(function (player) {

    player.pieces.forEach(function (pieceId) {

        piecePositions[pieceId] = {

            home: true,

            position: -1,

            steps: 0,

            finish: false,

            finishPosition: -1

        };

    });

});


// ===============================
// POSISI AWAL PION
// ===============================

Object.keys(homePositions).forEach(function (pieceId) {

    const piece =
        document.getElementById(pieceId);

    if (!piece) return;

    const [top, left] =
        homePositions[pieceId];

    piece.style.top =
        top + "%";

    piece.style.left =
        left + "%";

});


// ===============================
// DADU
// ===============================

rollButton.addEventListener("click", function () {

    if (gameOver) {
        return;
    }

    if (diceRolled) {
        return;
    }


    diceValue =
        Math.floor(Math.random() * 6) + 1;


    diceResult.textContent =
        diceValue;


    diceRolled = true;


    console.log(
        "Giliran:",
        players[currentPlayer].name
    );

    console.log(
        "Dadu:",
        diceValue
    );


    checkAvailableMove();

});


// ===============================
// CEK PION
// ===============================

function checkAvailableMove() {

    const player =
        players[currentPlayer];

    let canMove = false;


    player.pieces.forEach(function (pieceId) {

        const data =
            piecePositions[pieceId];


        // Pion di rumah
        if (
            data.home &&
            diceValue === 6
        ) {

            canMove = true;

        }


        // Pion di jalur luar
        if (
            !data.home &&
            !data.finish
        ) {

            canMove = true;

        }


        // Pion di finish
        if (data.finish) {

            const finishPath =
                finishPaths[player.color];

            if (
                data.finishPosition + diceValue
                < finishPath.length
            ) {

                canMove = true;

            }

        }

    });


    // Tidak ada pion yang bisa bergerak
    if (!canMove) {

        diceRolled = false;


        setTimeout(function () {

            nextTurn();

        }, 800);


        return;

    }


    enablePieceSelection();

}


// ===============================
// AKTIFKAN PION
// ===============================

function enablePieceSelection() {

    players.forEach(function (player) {

        player.pieces.forEach(function (pieceId) {

            const piece =
                document.getElementById(pieceId);

            if (!piece) return;

            piece.onclick = null;

            piece.style.zIndex = "5";

        });

    });


    const player =
        players[currentPlayer];


    player.pieces.forEach(function (pieceId) {

        const piece =
            document.getElementById(pieceId);

        if (!piece) return;


        piece.style.zIndex = "100";


        piece.onclick = function () {

            movePiece(pieceId);

        };

    });

}


// ===============================
// GERAK PION
// ===============================

function movePiece(pieceId) {

    if (!diceRolled) {
        return;
    }


    const piece =
        document.getElementById(pieceId);

    if (!piece) return;


    const data =
        piecePositions[pieceId];


    const player =
        players[currentPlayer];


    // =========================
    // KELUAR RUMAH
    // =========================

    if (data.home) {

        if (diceValue !== 6) {
            return;
        }


        data.home = false;

        data.position =
            player.start;

        data.steps = 0;

        data.finish = false;

        data.finishPosition = -1;


        movePieceToPath(
            piece,
            data.position
        );


        finishMove(pieceId);

        return;

    }


    // =========================
    // SUDAH DI FINISH
    // =========================

    if (data.finish) {

        moveFinishPiece(
            pieceId,
            piece,
            data,
            player
        );

        return;

    }


    // =========================
    // JALUR LUAR
    // =========================

    moveOutsidePath(
        pieceId,
        piece,
        data,
        player
    );

}


// ===============================
// GERAK DI JALUR LUAR
// ===============================

function moveOutsidePath(
    pieceId,
    piece,
    data,
    player
) {

    let remaining =
        diceValue;


    moveOutsideStep(
        pieceId,
        piece,
        data,
        player,
        remaining
    );

}


// ===============================
// SATU LANGKAH JALUR LUAR
// ===============================

function moveOutsideStep(
    pieceId,
    piece,
    data,
    player,
    remaining
) {

    if (remaining <= 0) {

        finishMove(pieceId);

        return;

    }


    // =========================
    // HITUNG POSISI BERIKUTNYA
    // =========================

    data.position =
        (data.position + 1)
        % path.length;


    data.steps++;


    // =========================
    // TAMPILKAN PION
    // =========================

    movePieceToPath(
        piece,
        data.position
    );


    // =========================
    // CEK APAKAH SUDAH
    // SATU PUTARAN PENUH
    // =========================

    const playerStart =
        player.start;


    const completedLap =
        data.steps >= path.length;


    // =========================
    // SETELAH SATU PUTARAN
    // BOLEH MASUK FINISH
    // =========================

    if (
        completedLap &&
        data.position === playerStart
    ) {

        if (remaining === 1) {

            data.finish = true;

            data.finishPosition = 0;


            movePieceToFinish(
                piece,
                player.color,
                0
            );


            finishMove(pieceId);

            return;

        }

    }


    setTimeout(function () {

        moveOutsideStep(
            pieceId,
            piece,
            data,
            player,
            remaining - 1
        );

    }, 200);

}


// ===============================
// PINDAHKAN PION KE JALUR
// ===============================

function movePieceToPath(
    piece,
    position
) {

    const [row, col] =
        path[position];


    const cellSize =
        100 / 15;


    piece.style.left =
        (
            col * cellSize +
            cellSize / 2
        ) + "%";


    piece.style.top =
        (
            row * cellSize +
            cellSize / 2
        ) + "%";


    piece.style.transform =
        "translate(-50%, -50%)";

}


// ===============================
// PINDAH KE FINISH
// ===============================

function movePieceToFinish(
    piece,
    color,
    position
) {

    const finishPath =
        finishPaths[color];


    const [row, col] =
        finishPath[position];


    const cellSize =
        100 / 15;


    piece.style.left =
        (
            col * cellSize +
            cellSize / 2
        ) + "%";


    piece.style.top =
        (
            row * cellSize +
            cellSize / 2
        ) + "%";


    piece.style.transform =
        "translate(-50%, -50%)";

}


// ===============================
// GERAK DI FINISH
// ===============================

function moveFinishPiece(
    pieceId,
    piece,
    data,
    player
) {

    const finishPath =
        finishPaths[player.color];


    const target =
        data.finishPosition +
        diceValue;


    // Masih di jalur finish
    if (
        target < finishPath.length
    ) {

        animateFinish(
            pieceId,
            piece,
            data,
            player.color,
            target
        );

        return;

    }


    // Tidak boleh melewati tengah
    diceRolled = false;

    removePieceClick();

    nextTurn();

}


// ===============================
// ANIMASI FINISH
// ===============================

function animateFinish(
    pieceId,
    piece,
    data,
    color,
    target
) {

    if (
        data.finishPosition >= target
    ) {

        checkWinner(pieceId);

        return;

    }


    data.finishPosition++;


    movePieceToFinish(
        piece,
        color,
        data.finishPosition
    );


    setTimeout(function () {

        animateFinish(
            pieceId,
            piece,
            data,
            color,
            target
        );

    }, 250);

}


// ===============================
// SELESAI BERGERAK
// ===============================

function finishMove(pieceId) {

    checkCapture(pieceId);


    diceRolled = false;


    removePieceClick();


    // Cek kemenangan
    if (
        checkWinner(pieceId)
    ) {

        return;

    }


    // Dapat 6
    // giliran tetap
    if (diceValue === 6) {

        return;

    }


    nextTurn();

}


// ===============================
// CEK MAKAN PION
// ===============================

function checkCapture(pieceId) {

    const movingPiece =
        piecePositions[pieceId];


    if (
        movingPiece.home ||
        movingPiece.finish
    ) {

        return;

    }


    const position =
        movingPiece.position;


    players.forEach(function (
        player,
        playerIndex
    ) {

        if (
            playerIndex === currentPlayer
        ) {

            return;

        }


        player.pieces.forEach(function (
            enemyId
        ) {

            const enemy =
                piecePositions[enemyId];


            if (
                enemy.home ||
                enemy.finish
            ) {

                return;

            }


            if (
                enemy.position === position
            ) {

                sendPieceHome(enemyId);

            }

        });

    });

}


// ===============================
// KEMBALIKAN KE RUMAH
// ===============================

function sendPieceHome(pieceId) {

    const piece =
        document.getElementById(pieceId);


    const data =
        piecePositions[pieceId];


    if (!piece) {
        return;
    }


    data.home = true;

    data.position = -1;

    data.steps = 0;

    data.finish = false;

    data.finishPosition = -1;


    const [top, left] =
        homePositions[pieceId];


    piece.style.top =
        top + "%";


    piece.style.left =
        left + "%";


    piece.style.transform =
        "translate(-50%, -50%)";


    console.log(
        pieceId +
        " kembali ke rumah."
    );

}


// ===============================
// CEK PEMENANG
// ===============================

function checkWinner(pieceId) {

    const player =
        players[currentPlayer];


    let finishedPieces = 0;


    player.pieces.forEach(function (id) {

        const data =
            piecePositions[id];


        if (
            data.finish &&
            data.finishPosition ===
            finishPaths[player.color].length - 1
        ) {

            finishedPieces++;

        }

    });


    if (finishedPieces === 4) {

        gameOver = true;

        diceRolled = false;

        removePieceClick();

        rollButton.disabled = true;


        currentPlayerText.textContent =
            "🏆 " +
            player.name +
            " MENANG!";


        currentPlayerText.style.color =
            "#ffd700";


        diceResult.textContent =
            "🏆";


        alert(
            "🏆 " +
            player.name +
            " menang!"
        );


        return true;

    }


    return false;

}


// ===============================
// HAPUS KLIK PION
// ===============================

function removePieceClick() {

    players.forEach(function (player) {

        player.pieces.forEach(function (pieceId) {

            const piece =
                document.getElementById(pieceId);


            if (piece) {

                piece.onclick = null;

                piece.style.zIndex = "5";

            }

        });

    });

}


// ===============================
// GANTI GILIRAN
// ===============================

function nextTurn() {

    if (gameOver) {
        return;
    }


    currentPlayer++;


    if (
        currentPlayer >= players.length
    ) {

        currentPlayer = 0;

    }


    currentPlayerText.textContent =
        players[currentPlayer].name;


    if (
        players[currentPlayer].color === "red"
    ) {

        currentPlayerText.style.color =
            "#ff3333";

    }

    else if (
        players[currentPlayer].color === "green"
    ) {

        currentPlayerText.style.color =
            "#33cc66";

    }

    else if (
        players[currentPlayer].color === "yellow"
    ) {

        currentPlayerText.style.color =
            "#ffcc00";

    }

    else if (
        players[currentPlayer].color === "blue"
    ) {

        currentPlayerText.style.color =
            "#3399ff";

    }


    console.log(
        "Sekarang giliran:",
        players[currentPlayer].name
    );

}