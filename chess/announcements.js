
//im my code first letter may represents type.
//for exsample the name apple:
//eApple - element | fApple - function | vApple - variable
//aApple - array | oApple - object

function fAnnouncement(){
    //remove check announcement
    const eCheck = document.getElementsByClassName("check");
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
}

function fCanMove(side) {
    const sideMoves = [];
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
    const eCheck = document.createElement("div");
    document.body.appendChild(eCheck);
    eCheck.className ="check";
    eCheck.innerText = "chack!";
}
function fStalemate() {
    const eStaleMate = document.createElement("div");
    document.body.appendChild(eStaleMate);
    eStaleMate.className ="stalemate";
    eStaleMate.innerText = "stalemate!";
}
function fChackmate() {
    const eCheckmate = document.createElement("div");
    document.body.appendChild(eCheckmate);
    eCheckmate.className ="checkmate";
    eCheckmate.innerText = "chackmate!";
}
