
//im my code first letter may represents type.
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