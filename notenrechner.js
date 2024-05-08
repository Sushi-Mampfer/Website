let ganze = document.getElementById("ganz");
let halbe = document.getElementById("halb");
let schnitt = document.getElementById("schnitt");
let min = document.getElementById("minimum");
let ziel = document.getElementById("ziel");
let ganz = 0;
let halb = 0;
let note = 0;

function main() {
    if (ganze.lastChild.value != "") {
        const node = document.createElement("input");
        node.setAttribute("type", "number");
        ganze.appendChild(node);
    }
    if (halbe.lastChild.value != "") {
        const node = document.createElement("input");
        node.setAttribute("type", "number");
        halbe.appendChild(node);
    }
    ganz = ganze.getElementsByTagName('input');
    note = 0
    for (let i = 0; i < ganz.length - 1; i++) {
        if (ganz[i].value == "" || ganz[i].value == "0") {
            ganz[i].remove();
            continue;
        }
        note += parseFloat(ganz[i].value);
    }
    note *= 2;
    halb = halbe.getElementsByTagName('input');
    for (let i = 0; i < halb.length - 1; i++) {
        if (halb[i].value == "" || halb[i].value == "0") {
            halb[i].remove();
            continue;
        }
        note += parseFloat(halb[i].value);
    }
    let totalInputs = ganz.length * 2 + halb.length - 3;
    note /= totalInputs;
    if (note != "" && !isNaN(note)) {
        schnitt.innerHTML = note.toFixed(2);
    }
    if (ziel.value != "" && !isNaN(ziel.value)) {
        for (let i = 1; i < 100; i++) {
//            console.log(ziel.value * (totalInputs / 2 + i) - note * totalInputs / 2);
            if ((ziel.value * (totalInputs / 2 + i) - note * totalInputs / 2) / i <= 6) {
                min.innerHTML = i + "x ";
                min.innerHTML += ((ziel.value * (totalInputs / 2 + i) - note * totalInputs / 2) / i).toFixed(2);
                break;
            } else {
                min.innerHTML = "";
            }
        }
    } else {
        min.innerHTML = "";
    }
    setTimeout(main, 5);
};

setTimeout(main, 5);