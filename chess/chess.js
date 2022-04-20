
//functions
function fMoves(y,x) {
    const result = [];
    const side = aPieces[aDataNew[y][x]][1];
    const piece = aPieces[aDataNew[y][x]][2];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i !== y || j !== x) {
                if (piece == "rook") {
                    if (i == y || j == x) {
                        result.push([i,j]);
                    }
                } if (piece == "knight") {
                    if (i !== y && j !== x && Math.abs(i - y) + Math.abs(j - x) == 3) {
                        result.push([i,j]);
                    }
                } if (piece == "bishop") {
                    if (Math.abs(i - y) == Math.abs(j - x)) {
                        result.push([i,j]);
                    }
                }  if (piece == "queen") {
                    if (i == y || j == x || Math.abs(i - y) == Math.abs(j - x)) {
                        result.push([i,j]);
                    }
                } if (piece == "king") {
                    if (Math.abs(i - y) <= 1 && Math.abs(j - x) <= 1) {
                        result.push([i,j]);
                    }
                } if (piece == "pawn") {
                    if (side == "white"){
                        if (y - i == 1 && x == j) {
                            result.push([i,j]);
                        }
                    } else {
                        if (i - y == 1 && x == j) {
                            result.push([i,j]);
                        }
                    }
                }
            }
        }
    }
    return result;
}

function fClicked(event, i,j) {
    if (event.currentTarget.classList[1] == "selected") {
        vClicked[0].classList.remove("selected");
        for (let loc of vClicked[1]) {
            let eTd = document.getElementById(loc[0] + "-" + loc[1]);
            eTd.classList.remove("cMoves");
        }
    } else {
        if (vClicked[0] !== undefined) {
            vClicked[0].classList.remove("selected");
            for (let loc of vClicked[1]) {
                let eTd = document.getElementById(loc[0] + "-" + loc[1]);
                eTd.classList.remove("cMoves");
            }
        }
        vClicked[0] = event.currentTarget;
        vClicked[0].classList.add("selected");
        vClicked[1] = fMoves(i,j);
        for (let loc of vClicked[1]) {
            let eTd = document.getElementById(loc[0] + "-" + loc[1]);
            eTd.classList.add("cMoves");
        }
    }
}

function fMakeTable(data) {
    const eTable = document.createElement("table");
    document.body.appendChild(eTable);
    for (let i = 0; i < 8; i++) {
        let eTr = document.createElement("tr");
        eTable.appendChild(eTr);
        for (let j = 0; j < 8; j++) {
            let eTd = document.createElement("td");
            eTr.appendChild(eTd);
            eTd.className = (i+j)%2 == 0 ? "white" : "black";
            eTd.id = i + "-" + j;
            if (data[i][j] !== undefined) {
                let eImg = document.createElement("img");
                eImg.src = aPieces[data[i][j]][3];
                eImg.className = "cPiece";
                eTd.appendChild(eImg);
                eTd.addEventListener("click", (event) => fClicked(event,i,j));
            }
        }
    }
} 

function fOnLoad() {
    fMakeTable(aDataStart);

}

//arrays
const aDataStart = [
    [0,1,2,3,4,2,1,0],
    [5,5,5,5,5,5,5,5],
    [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
    [6,6,6,6,6,6,6,6],
    [7,8,9,10,11,9,8,7]
];
const aDataNew = aDataStart;

const aPieces = [
    [0, "black", "rook", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png"],
    [1, "black", "knight", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/50px-Chess_ndt45.svg.png"],
    [2, "black", "bishop", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/50px-Chess_bdt45.svg.png"],
    [3, "black", "queen", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/50px-Chess_qdt45.svg.png"],
    [4, "black", "king", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/50px-Chess_kdt45.svg.png"],
    [5, "black", "pawn", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/50px-Chess_pdt45.svg.png"],
    [6, "white", "pawn", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/50px-Chess_plt45.svg.png"],
    [7, "white", "rook", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/50px-Chess_rlt45.svg.png"],
    [8, "white", "knight", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/50px-Chess_nlt45.svg.png"],
    [9, "white", "bishop", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/50px-Chess_blt45.svg.png"],
    [10, "white", "queen", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/50px-Chess_qlt45.svg.png"],
    [11, "white", "king", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/50px-Chess_klt45.svg.png"]
];

//variables
let vClicked = [undefined,undefined];

//load
window.addEventListener("load", fOnLoad);