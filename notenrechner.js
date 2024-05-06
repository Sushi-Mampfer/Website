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
    const totalInputs = ganz.length * 2 + halb.length - 3;
    note /= totalInputs;
    schnitt.innerHTML = note.toFixed(2);
    if (ziel.value != "") {
        min.innerHTML = ziel.value * (totalInputs / 2 + 1) - note * totalInputs / 2;
    }
    setTimeout(main, 5);
};

setTimeout(main, 5);