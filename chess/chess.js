let vClicked;

let aPieces = []
let srcPieces = {
    bRook: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png",
    bKnight: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/50px-Chess_ndt45.svg.png",
    bBishop: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/50px-Chess_bdt45.svg.png",
    bQueen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/50px-Chess_qdt45.svg.png",
    bKing: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/50px-Chess_kdt45.svg.png",
    bPawn: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/50px-Chess_pdt45.svg.png",
    wPawn: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/50px-Chess_plt45.svg.png",
    wRook: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/50px-Chess_rlt45.svg.png",
    wKnight: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/50px-Chess_nlt45.svg.png",
    wBishop: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/50px-Chess_blt45.svg.png",
    wQueen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/50px-Chess_qlt45.svg.png",
    wKing: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/50px-Chess_klt45.svg.png"
    };

class Piece {
    constructor(row, col, type, side) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.side = side;
        eval("this.source = srcPieces." + type);
    }
}

function fPiece(cell, source) {
    let vPiece = document.createElement("img");
    vPiece.setAttribute("class", "cPiece");
    vPiece.setAttribute("src", source);
    cell.appendChild(vPiece);

}

function fClicked(event) {
    if (vClicked !== undefined) {
        vClicked.classList.remove("selected");
    }
    vClicked = event.currentTarget;
    vClicked.classList.add("selected");
}

function fStart () {
    let i = 0;
    for (let x in srcPieces) {
        if (i < 5) {
            aPieces.push(new Piece(0, i, x, "w"));
            if (i < 3) {
                aPieces.push(new Piece(0, 7 - i, x, "w"));
            }
        } if (i == 5) {
            for (let k = 0; k < 8; k++) {
                aPieces.push(new Piece(1, k, x, "w"));
            }
        } if (i == 6) {
            for (let k = 0; k < 8; k++) {
                aPieces.push(new Piece(6, k, x, "b"));
            }            
        } if (i >= 7) {
            aPieces.push(new Piece(7, i - 7, x, "b"));
            if (i < 10) {
                aPieces.push(new Piece(7, 14 - i, x, "b"));
            }
        }
        i++;
    }
}

function stage0() {
    let eTr;
    let eTd;
    let vId;

    let eTable = document.createElement("table");
    document.body.appendChild(eTable);
    for (let j = 0; j < 8; j++) {
        eTr = document.createElement("tr");
        eTable.appendChild(eTr);
        for (let i = 0; i < 8; i++) {
            eTd = document.createElement("td");
            vId++;
            eTd.id = vId.toString(); 
            if ( (i+j)%2 == 0) {
                eTd.className = "white";
            } else {
                eTd.className = "black";
            }
            eTr.appendChild(eTd);
            eTd.addEventListener("click",fClicked);
        }
    }
    fStart();
    for (let x of aPieces) {
        fPiece(eTable.rows[x.row].cells[x.col],x.source);
    }

}

window.addEventListener("load", stage0);