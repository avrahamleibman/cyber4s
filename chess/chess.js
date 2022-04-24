
//functions
function fMoves(y,x) {
    let result = [];
    const side = aPieces[aDataNew[y][x]][1];
    const piece = aPieces[aDataNew[y][x]][2];
    const aDir = aPieces[aDataNew[y][x]][4];
    let i;
    let j;
    for (let dir of aDir) {
        i = dir[0]; 
        j = dir[1];
        while (y+i >= 0 && y+i < 8 && x+j >= 0 && x+j < 8) {
            if (aDataNew[y+i][x+j] != undefined) {
                if (aPieces[aDataNew[y+i][x+j]][1] != side) {
                    if (piece != "pawn" || j != 0) {
                        result.push([y+i,x+j]);
                    }
                }
                break;
            }
            if (piece != "pawn" || j == 0) {
                result.push([y+i,x+j]);
            }
            if (piece == "knight" || piece == "king" || piece == "pawn") {
                break;
            }
            i += Math.sign(i);
            j += Math.sign(j);
        }
    }
    return result;
}

function fClicked(event, i,j) {
    if (oSelected.cell != undefined) {
        if (event.currentTarget.classList[1] == "cMoves") {
            aDataNew[i][j] = aDataNew[oSelected.locX][oSelected.locY];
            aDataNew[oSelected.locX][oSelected.locY] = undefined;
            let eTable = document.getElementsByTagName("table");
            document.body.removeChild(eTable[0]);
            fMakeTable(aDataNew);
            oSelected.cell = undefined;
            oSelected.locX = undefined;
            oSelected.locY = undefined;
            oSelected.moves = [];
            return;
        }
        oSelected.cell.classList.remove("cSelected");
        for (let loc of oSelected.moves) {
            let eTd = document.getElementById(loc[0] + "-" + loc[1]);
            eTd.classList.remove("cMoves");
        }
        oSelected.moves = [];
        if (oSelected.cell == event.currentTarget) {
            oSelected.cell = undefined;
            oSelected.locX = undefined;
            oSelected.locY = undefined;
            return;
        }
        oSelected.cell = undefined;
        oSelected.locX = undefined;
        oSelected.locY = undefined;
    }
    if (aDataNew[i][j] != undefined) {
        oSelected.cell = event.currentTarget;
        oSelected.locX = i;
        oSelected.locY = j;
        oSelected.cell.classList.add("cSelected");
        oSelected.moves = fMoves(i,j);
        for (let loc of oSelected.moves) {
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
            if (data[i][j] != undefined) {
                let eImg = document.createElement("img");
                eImg.src = aPieces[data[i][j]][3];
                eImg.className = "cPiece";
                eTd.appendChild(eImg);
            }
            eTd.addEventListener("click", (event) => fClicked(event,i,j));
        }
    }
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
    [0, "black", "rook", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png",[[1,0],[-1,0],[0,1],[0,-1]]],
    [1, "black", "knight", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/50px-Chess_ndt45.svg.png",[[2,1],[2,-1],[1,2],[-1,2],[-2,1],[-2,-1],[1,-2],[-1,-2]]],
    [2, "black", "bishop", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/50px-Chess_bdt45.svg.png",[[1,1],[1,-1],[-1,-1],[-1,1]]],
    [3, "black", "queen", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/50px-Chess_qdt45.svg.png",[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,-1],[-1,1]]],
    [4, "black", "king", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/50px-Chess_kdt45.svg.png",[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,-1],[-1,1]]],
    [5, "black", "pawn", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/50px-Chess_pdt45.svg.png",[[1,1],[1,0],[1,-1]]],
    [6, "white", "pawn", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/50px-Chess_plt45.svg.png",[[-1,1],[-1,0],[-1,-1]]],
    [7, "white", "rook", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/50px-Chess_rlt45.svg.png",[[1,0],[-1,0],[0,1],[0,-1]]],
    [8, "white", "knight", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/50px-Chess_nlt45.svg.png",[[2,1],[2,-1],[1,2],[-1,2],[-2,1],[-2,-1],[1,-2],[-1,-2]]],
    [9, "white", "bishop", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/50px-Chess_blt45.svg.png",[[1,1],[1,-1],[-1,-1],[-1,1]]],
    [10, "white", "queen", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/50px-Chess_qlt45.svg.png",[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,-1],[-1,1]]],
    [11, "white", "king", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/50px-Chess_klt45.svg.png",[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,-1],[-1,1]]]
];

//objects
const oSelected = {
    cell: undefined,
    locX: undefined,
    locY: undefined,
    moves: []
};

//load
window.addEventListener("load", () => {fMakeTable(aDataStart)});
