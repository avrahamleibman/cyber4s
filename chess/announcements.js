
//im my code first letter may represents type.
//for exsample the name apple:
//eApple - element | fApple - function | vApple - variable
//aApple - array | oApple - object

function fAnnouncement(){
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
}

function fCanMove(side) {
    let sideMoves = [];
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
