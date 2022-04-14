function abba() {
    let eTable;
    let eTr;
    let eTd;
    let j;
    let i;

    eTable = document.createElement("table");
    document.body.appendChild(eTable);
    for (j = 0; j < 8; j++) {
        eTr = document.createElement("tr");
        eTable.appendChild(eTr);
        for (i = 0; i < 8; i++) {
            eTd = document.createElement("td");
            if ( (i+j)%2 == 0) {
                eTd.className = "white";
            } else {
                eTd.className = "black";
            }
            eTr.appendChild(eTd);
        }
    }
}
window.addEventListener("load", abba);