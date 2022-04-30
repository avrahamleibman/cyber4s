
//im my code first letter may represents type.
//for exsample the name apple:
//eApple - element | fApple - function | vApple - variable
//aApple - array | oApple - object

//on click
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
        const eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.remove("move");
    }
    oSelected.moves = [];
    // clears selected captures
    for (let loc of oSelected.eats) {
        const eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.remove("eat");
    }
    oSelected.eats = [];
    // clears selected illegal moves
    for (let loc of oSelected.underCheck) {
        const eTd = document.getElementById(loc[0] + "-" + loc[1]);
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
    //cell selection
    oSelected.cell = event.currentTarget;
    oSelected.y = i;
    oSelected.x = j;
    oSelected.cell.classList.add("selected");
    //categorize moves
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
    //add css classes fot each category
    for (let loc of oSelected.moves) {
        const eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.add("move");
    }
    for (let loc of oSelected.eats) {
        const eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.add("eat");
    }
    for (let loc of oSelected.underCheck) {
        const eTd = document.getElementById(loc[0] + "-" + loc[1]);
        eTd.classList.add("underCheck");
    }
}

//movement computation
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
    //pause game while promotion
    const turn = vTurn;
    vTurn = undefined;
    // creates promotion display
    const ePromote = document.createElement("div");
    ePromote.className = "promote";
    document.body.appendChild(ePromote);
    // creates promotion options
    for (let k = 0+x; k < 4+x; k++) {
        const eImg = document.createElement("img");
        eImg.src = aPieces[k][3];
        eImg.className = "piecePromote";
        eImg.id = k;
        eImg.draggable = false;
        ePromote.appendChild(eImg);
        // onClick make promotion and resume game
        eImg.addEventListener("click",(event) =>{
            aDataNew[i][j] = event.currentTarget.id
            ePromote.remove();
            vTurn = turn;
            fRemakeBoard(aDataNew);
        });
    }
}


function fRemakeBoard(data) {
    fAnnouncement();
    //remakes the board
    const eTable = document.getElementsByTagName("table");
    eTable[0].remove();
    fMakeBoard(data);
}