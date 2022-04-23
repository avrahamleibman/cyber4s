
//functions
function fRookMoves(y,x, side) {
    const result = [];
    for (let i = y+1; i < 8; i++) {
        if (aDataNew[i][x] !== undefined) {
            if (aPieces[aDataNew[i][x]][1] !== side) {
                result.push([i,x]);
            }
            break;
        }
        result.push([i,x]);
    }
    for (let i = y-1; i >= 0; i--) {
        if (aDataNew[i][x] !== undefined) {
            if (aPieces[aDataNew[i][x]][1] !== side) {
                result.push([i,x]);
            }
            break;
        }
        result.push([i,x]);
    }
    for (let j = x+1; j < 8; j++) {
        if (aDataNew[y][j] !== undefined) {
            if (aPieces[aDataNew[y][j]][1] !== side) {
                result.push([y,j]);
            }
            break;
        }
        result.push([y,j]);
    }
    for (let j = x-1; j >= 0; j--) {
        if (aDataNew[y][j] !== undefined) {
            if (aPieces[aDataNew[y][j]][1] !== side) {
                result.push([y,j]);
            }
            break;
        }
        result.push([y,j]);
    }
    return result;
}
function fKnightMoves(y,x, side) {
    const result = [];
    const aLoc = [[y+2,x+1],[y+2,x-1],[y+1,x+2],[y-1,x+2],[y-2,x+1],[y-2,x-1],[y+1,x-2],[y-1,x-2]];
    for (let loc of aLoc) {
        if (loc[0]>=0 && loc[0]<8 && loc[1]>=0 && loc[1]<8) {
            if (aDataNew[loc[0]][loc[1]] == undefined) {
                result.push(loc);
            } else {
                if (aPieces[aDataNew[loc[0]][loc[1]]][1] !== side) {
                    result.push(loc);
                }
            }
        }
    }
    return result;
}
function fBishopMoves(y,x, side) {
    const result = [];
    let i;
    let j;
    i = y+1;
    j = x+1;
    while (i < 8 && j < 8) {
        if (aDataNew[i][j] !== undefined) {
            if (aPieces[aDataNew[i][j]][1] !== side) {
                result.push([i,j]);
            }
            break;
        }
        result.push([i,j]);
        i++;
        j++;
    }
    i = y+1;
    j = x-1;
    while (i < 8 && j >= 0) {
        if (aDataNew[i][j] !== undefined) {
            if (aPieces[aDataNew[i][j]][1] !== side) {
                result.push([i,j]);
            }
            break;
        }
        result.push([i,j]);
        i++;
        j--;
    }
    i = y-1;
    j = x-1;
    while (i >= 0 && j >= 0) {
        if (aDataNew[i][j] !== undefined) {
            if (aPieces[aDataNew[i][j]][1] !== side) {
                result.push([i,j]);
            }
            break;
        }
        result.push([i,j]);
        i--;
        j--;
    }
    i = y-1;
    j = x+1;
    while (i >= 0 && j < 8) {
        if (aDataNew[i][j] !== undefined) {
            if (aPieces[aDataNew[i][j]][1] !== side) {
                result.push([i,j]);
            }
            break;
        }
        result.push([i,j]);
        i--;
        j++;
    }
    return result;
}
function fQueenMoves(y,x, side) {
    const result = [];
    for (let loc of fRookMoves(y,x, side)) {
        result.push(loc);
    }
    for (let loc of fBishopMoves(y,x, side)) {
        result.push(loc);
    }
    return result;
}
function fKingMoves(y,x, side) {
    const result = [];
    const aLoc = [[y+1,x+1],[y+1,x],[y+1,x-1],[y,x+1],[y,x-1],[y-1,x+1],[y-1,x],[y-1,x-1]];
    for (let loc of aLoc) {
        if (loc[0]>=0 && loc[0]<8 && loc[1]>=0 && loc[1]<8) {
            if (aDataNew[loc[0]][loc[1]] == undefined) {
                result.push(loc);
            } else {
                if (aPieces[aDataNew[loc[0]][loc[1]]][1] !== side) {
                    result.push(loc);
                }
            }
        }
    }
    return result;
}
function fPawnMoves(y,x, side) {
    const result = [];
    if (side == "white" && y !== 0) {
        if (aDataNew[y-1][x] == undefined) {
            result.push([y-1,x]);
        }
        if (aDataNew[y-1][x+1] !== undefined) {
            if (aPieces[aDataNew[y-1][x+1]][1] == "black") {
                result.push([y-1,x+1]);
            }
        }
        if (aDataNew[y-1][x-1] !== undefined) {
            if (aPieces[aDataNew[y-1][x-1]][1] == "black") {
                result.push([y-1,x-1]);
            }
        }
    } else if (y !== 7){
        if (aDataNew[y+1][x] == undefined) {
            result.push([y+1,x]);
        }
        if (aDataNew[y+1][x+1] !== undefined) {
            if (aPieces[aDataNew[y+1][x+1]][1] == "white") {
                result.push([y+1,x+1]);
            }
        }
        if (aDataNew[y+1][x-1] !== undefined) {
            if (aPieces[aDataNew[y+1][x-1]][1] == "white") {
                result.push([y+1,x-1]);
            }
        }
    }
    return result;
}

function fMoves(y,x) {
    let result = [];
    const side = aPieces[aDataNew[y][x]][1];
    const piece = aPieces[aDataNew[y][x]][2];
    if (piece == "rook") {
        result = fRookMoves(y,x, side);
    } if (piece == "knight") {
        result = fKnightMoves(y,x, side);
    } if (piece == "bishop") {
        result = fBishopMoves(y,x, side);
    }  if (piece == "queen") {
        result = fQueenMoves(y,x, side);
    } if (piece == "king") {
        result = fKingMoves(y,x, side);
    } if (piece == "pawn") {
        result = fPawnMoves(y,x, side);
    }
    return result;
}

function fClicked(event, i,j) {
    if (event.currentTarget.classList[1] == "selected") {
        vClicked[0].classList.remove("selected");
        for (let loc of vClicked[3]) {
            let eTd = document.getElementById(loc[0] + "-" + loc[1]);
            eTd.classList.remove("cMoves");
        }
    } else if (event.currentTarget.classList[1] == "cMoves") {
        aDataNew[i][j] = aDataNew[vClicked[1]][vClicked[2]];
        aDataNew[vClicked[1]][vClicked[2]] = undefined;
        let eTable = document.getElementsByTagName("table");
        document.body.removeChild(eTable[0]);
        fMakeTable(aDataNew);
    } else {
        if (vClicked[0] !== undefined) {
            vClicked[0].classList.remove("selected");
            for (let loc of vClicked[3]) {
                let eTd = document.getElementById(loc[0] + "-" + loc[1]);
                eTd.classList.remove("cMoves");
            }
        }
        vClicked[0] = event.currentTarget;
        vClicked[1] = i;
        vClicked[2] = j;
        vClicked[0].classList.add("selected");
        if (aDataNew[i][j] !== undefined) {
            vClicked[3] = fMoves(i,j);
        } else {
            vClicked[3] = [];
        }
        for (let loc of vClicked[3]) {
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
            }
            eTd.addEventListener("click", (event) => fClicked(event,i,j));
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
let vClicked = [undefined,undefined,undefined,undefined];

//load
window.addEventListener("load", fOnLoad);