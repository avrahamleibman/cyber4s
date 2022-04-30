
//im my code the first letters of global variable or function represents its type.
//for exsample the name apple:
//eApple - element | fApple - function | vApple - variable
//aApple - array | oApple - object


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
    eTd.className = (i+j)%2 == 0 ? "white" : "black"; // sets alternating classes
    eTd.id = i + "-" + j;
    if (data[i][j] != undefined) { //checks if there is a piece in location
        fAddIcon(i,j,eTd,data);
    }
    eTd.addEventListener("click", (event) => fOnClick(event,i,j));
}
function fAddIcon(i,j,eTd,data) {
    let eImg = document.createElement("img");
    eTd.appendChild(eImg);
    eImg.src = aPieces[data[i][j]][3]; //adds source from aPieces
    eImg.className = "piece";
    eImg.draggable = false;
}

function fOnClick(event, i,j) {
    if (oSelected.cell != undefined) {
        if (event.currentTarget.classList[1] == "selected") {
            fClearSelected();
            return;
        }
        if (event.currentTarget.classList[1] == "move" || event.currentTarget.classList[1] == "eat") {
            fMakeAMove(i,j);
            return;
        }
        fClearSelected();
    }
    if (aDataNew[i][j] != undefined && aPieces[aDataNew[i][j]][1] == vTurn ) {
        fSelectCell(event, i,j);
    }
}
function fClearSelected() {
    // clears selected cell
    oSelected.cell.classList.remove("selected");
    oSelected.cell = undefined;
    oSelected.y = undefined;
    oSelected.x = undefined;
    // clears selected moves
    for (let loc of oSelected.moves) {
        let eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.remove("move");
    }
    oSelected.moves = [];
    // clears selected captures
    for (let loc of oSelected.eats) {
        let eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.remove("eat");
    }
    oSelected.eats = [];
    // clears selected illegal moves
    for (let loc of oSelected.underCheck) {
        let eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.remove("underCheck");
    }
    oSelected.underCheck = [];
}
function fMakeAMove(i, j) {
    aDataNew[i][j] = aDataNew[oSelected.y][oSelected.x];
    aDataNew[oSelected.y][oSelected.x] = undefined;
    fClearSelected();
    vTurn = vTurn == "white" ? "black" : "white";
    if (i == 0 && aPieces[aDataNew[i][j]][2] == "pawn") {
        fPromote(i,j,7);
        return;
    }
    if (i == 7 && aPieces[aDataNew[i][j]][2] == "pawn") {
        fPromote(i,j,0);
        return;
    }
    fRemakeBoard(aDataNew);
}
function fSelectCell(event, i,j) {
    oSelected.cell = event.currentTarget;
    oSelected.y = i;
    oSelected.x = j;
    oSelected.cell.classList.add("selected");
    for (let move of fPieceMoves(aDataNew,i,j)) {
        if (fIsMoveLegal(move)) {
            if (aDataNew[move[0]][move[1]] == undefined) {
                oSelected.moves.push(move);
            } else {
                oSelected.eats.push(move);
            }
        } else {
            oSelected.underCheck.push(move);
        }
    }
    for (let loc of oSelected.moves) {
        let eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.add("move");
    }
    for (let loc of oSelected.eats) {
        let eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.add("eat");
    }
    for (let loc of oSelected.underCheck) {
        let eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.add("underCheck");
    }
}

function fPieceMoves(data,y,x) {
    let result = [];
    const index = data[y][x];
    const side = aPieces[index][1];
    const piece = aPieces[index][2];
    const aDir = aPieces[index][4];
    let i;
    let j;
    for (let dir of aDir) {
        i = dir[0];  //set to a direction
        j = dir[1];
        while (y+i >= 0 && y+i < 8 && x+j >= 0 && x+j < 8) { //goes while location inside board
            if (data[y+i][x+j] != undefined) { //stops if finds a piece
                if (aPieces[data[y+i][x+j]][1] != side) { //can capture if enemy piece
                    if (piece != "pawn" || j != 0) { //pawn can't capture ahead
                        result.push([y+i,x+j]); //capure
                        if (aPieces[data[y+i][x+j]][2] == "king") { //capured piece is enemy king
                            aCheck[0] = true; //king is under check
                        }
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
function fIsMoveLegal(move) {
    //imagines a move
    const aDataTemp = [];
    for (let index of aDataNew) {
        aDataTemp.push([...index]);
    }
    aDataTemp[move[0]][move[1]] = aDataTemp[oSelected.y][oSelected.x];
    aDataTemp[oSelected.y][oSelected.x] = undefined;
    //is king in check after the move?
    let opponent = vTurn == "white" ? "black" : "white";
    return ! fGivesCheck(aDataTemp, opponent);
}
function fGivesCheck(data, side) { 
    aCheck[0] = false;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (data[i][j] != undefined && aPieces[data[i][j]][1] == side) {
                fPieceMoves(data,i,j);
            }
        } 
    }
    return aCheck[0];
}

function fPromote(i,j,x) {
    const turn = vTurn;
    vTurn = undefined;
    console.log(turn);
    const ePromote = document.createElement("div");
    ePromote.className = "promote";
    document.body.appendChild(ePromote);
    let eImg;
    for (let k = 0+x; k < 4+x; k++) {
        eImg = document.createElement("img");
        eImg.src = aPieces[k][3];
        eImg.className = "piecePromote";
        eImg.id = k;
        eImg.draggable = false;
        ePromote.appendChild(eImg);
        eImg.addEventListener("click",(event) =>{
            aDataNew[i][j] = event.currentTarget.id
            ePromote.remove();
            fRemakeBoard(aDataNew);
            vTurn = turn;
        });
    }
}

function fRemakeBoard(data) {
    //remove check announcement
    let eCheck = document.getElementsByClassName("check");
    if (eCheck[0] != undefined) eCheck[0].remove();
    //make announcement check/mate/Stalemate
    let opponent = vTurn == "white" ? "black" : "white";
    let vCanMove = fCanMove(vTurn);
    let vUnderCheck = fGivesCheck(aDataNew, opponent)
    if ( ! vCanMove ) {
        if (vUnderCheck) {
            fChackmate();
        } else {
            fStalemate();
        }
    } else if (vUnderCheck) {
        fCheck();
    }
    //remakes the board
    let eTable = document.getElementsByTagName("table");
    eTable[0].remove();
    fMakeBoard(data);
}
function fCanMove(side) {
    sideMoves = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (aDataNew[i][j] != undefined && aPieces[aDataNew[i][j]][1] == side) {
                oSelected.y = i;
                oSelected.x = j;
                for (let move of fPieceMoves(aDataNew,i,j)) {
                    if (fIsMoveLegal(move)) {
                        sideMoves.push(move);
                    }
                }
            }
        } 
    }
    oSelected.y = undefined;
    oSelected.x = undefined;
    if (sideMoves.length == 0) {
        return false;
    }
    return true;
}
function fCheck() {
    let eCheck = document.createElement("div");
    document.body.appendChild(eCheck);
    eCheck.className ="check";
    eCheck.innerText = "chack!";
}
function fStalemate() {
    let eStaleMate = document.createElement("div");
    document.body.appendChild(eStaleMate);
    eStaleMate.className ="stalemate";
    eStaleMate.innerText = "stalemate!";
}
function fChackmate() {
    let eWon = document.createElement("div");
    document.body.appendChild(eWon);
    eWon.className ="won";
    eWon.innerText = "chackmate!";
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
const aDataNew = [];
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
    moves: [],
    underCheck: [],
    eats: []
};

// game states
let vTurn = "white";
const aCheck = [false];
let sideMoves = [];

//load
window.addEventListener("load", () => {
    fMakeBoard(aDataStart);
});
