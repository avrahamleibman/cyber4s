
//im my code often the first letters of a name represents type.
//for exsample the name aplle:
//eApple - element | fApple - function | aApple - array
//oApple - object | cApple - class(css)

function fMakeBoard(data) {
    const eTable = document.createElement("table");
    document.body.appendChild(eTable);
    for (let i = 0; i < 8; i++) {
        let eTr = document.createElement("tr");
        eTable.appendChild(eTr);
        for (let j = 0; j < 8; j++) {
            let eTd = document.createElement("td");
            eTr.appendChild(eTd);
            fCellProperties(i,j,eTd,data);
        }
    }
}
function fCellProperties(i,j,eTd,data) {
    eTd.className = (i+j)%2 == 0 ? "white" : "black";
    eTd.id = i + "-" + j;
    if (data[i][j] != undefined) {//check if there is a piece in location
        fAddIcon(i,j,eTd,data);
    }
    eTd.addEventListener("click", (event) => fOnClick(event,i,j));
}
function fAddIcon(i,j,eTd,data) {
    let eImg = document.createElement("img");
    eImg.src = aPieces[data[i][j]][3]; //adds source from data
    eImg.className = "cPiece";
    eTd.appendChild(eImg);
}


function fOnClick(event, i,j) {
    if (oSelected.cell != undefined) {
        if (event.currentTarget.classList[1] == "cSelected") {
            fClearSelected();
            return;
        }
        if (event.currentTarget.classList[1] == "cMove") {
            fMakeAMove(i,j);
            return;
        }
        fClearSelected();
    }
    if (aDataNew[i][j] != undefined) {
        fSelectCell(event, i,j);
    }
}
function fClearSelected() {
    oSelected.cell.classList.remove("cSelected");
    oSelected.cell = undefined;
    oSelected.y = undefined;
    oSelected.x = undefined;
    for (let loc of oSelected.moves) {
        let eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.remove("cMove");
    }
    oSelected.moves = [];
}
function fMakeAMove(i, j) {
    //moves piece in data
    aDataNew[i][j] = aDataNew[oSelected.y][oSelected.x];
    aDataNew[oSelected.y][oSelected.x] = undefined;
    fClearSelected();
    //destroys and creates a board from data
    let eTable = document.getElementsByTagName("table");
    eTable[0].remove();
    fMakeBoard(aDataNew);
}
function fSelectCell(event, i,j) {
    oSelected.cell = event.currentTarget;
    oSelected.y = i;
    oSelected.x = j;
    oSelected.cell.classList.add("cSelected");
    oSelected.moves = fGenerateMoves(i,j);
    for (let loc of oSelected.moves) {
        let eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.add("cMove");
    }
}


function fGenerateMoves(y,x) {
    let result = [];
    const side = aPieces[aDataNew[y][x]][1];
    const piece = aPieces[aDataNew[y][x]][2];
    const aDir = aPieces[aDataNew[y][x]][4];
    let i;
    let j;
    for (let dir of aDir) {
        i = dir[0];  //set to a direction
        j = dir[1];
        while (y+i >= 0 && y+i < 8 && x+j >= 0 && x+j < 8) { //goes while location inside board
            if (aDataNew[y+i][x+j] != undefined) { //stops if finds a piece
                if (aPieces[aDataNew[y+i][x+j]][1] != side) { //can capture if enemy piece
                    if (piece != "pawn" || j != 0) { //pawn can't capture ahead
                        result.push([y+i,x+j]); //capure
                    }
                }
                break; //pieces can't move through other pieces
            }
            if (piece != "pawn" || j == 0) { //pawn can't move diagonally (to an empty place)
                result.push([y+i,x+j]); //move (no capure)
            }
            if (piece == "knight" || piece == "king" || piece == "pawn") { 
                break;  //knight, king and pawn don't go multiple squares at a time
            }
            //increment by 1 in the direction 
            i += Math.sign(i);
            j += Math.sign(j);
        }
    }
    return result;
}

//pieces location on board by index
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
let aDataNew = [];
for (let index of aDataStart) {
    aDataNew.push([...index]);
}

//piece [  0  ,  1  ,  2  ,    3     ,          4            ]
//piece [index, side, type, icon link, diredtions of movement]
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

//info on selected sell
const oSelected = {
    cell: undefined,
    y: undefined,
    x: undefined,
    moves: []
};

//load
window.addEventListener("load", () => {
    fMakeBoard(aDataStart);
});