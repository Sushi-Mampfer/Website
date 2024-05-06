const spielfeld = document.getElementById('spielfeld');
spielfeld.height = 750;
spielfeld.width = 1500;
const ctx = spielfeld.getContext('2d');

// Spielereigenschaften
const spieler = [
    { x: 50, y: 250, steuerungen: {up: 'w', left: 'a', down: 's', right: 'd'}, groesse: 20, geschwindigkeit: 1.5, geschwindigkeitY: 0, onground: false}, // Spieler 1
    { x: 150, y: 150, steuerungen: {up: 't', left: 'f', down: 'g', right: 'h'}, groesse: 20, geschwindigkeit: 1.5, geschwindigkeitY: 0, onground: false}, // Spieler 2
    { x: 250, y: 100, steuerungen: {up: 'i', left: 'j', down: 'k', right: 'l'}, groesse: 20, geschwindigkeit: 1.5, geschwindigkeitY: 0, onground: false}, // Spieler 3
];

// Spielvariablen
let faengerIndex = 0;
let pressedKeys = {};
const schwerkraft = 0.2500; // Schwerkraftstärke
const plattformen = [
    { x: 0, y: 200, breite: 200, hoehe: 20 },
    { x: 100, y: 100, breite: 100, hoehe: 20 },
    { x: 150, y: 550, breite: 50, hoehe: 20 },
];

// Spielfunktionen
function checkCollisionWithPlatform(spieler, plattform) {
    return (
        spieler.x < plattform.x + plattform.breite &&
        spieler.x + spieler.groesse > plattform.x &&
        spieler.y < plattform.y + plattform.hoehe &&
        spieler.y + spieler.groesse > plattform.y
    );
}
function handlePlayerMovement(spieler, steuerungen) {
    spieler.geschwindigkeitX = 0; // Horizontale Geschwindigkeit initialisieren

    if (pressedKeys[steuerungen.up] && spieler.onground == true) { // Sprung verhindern, wenn bereits nach oben bewegt
        spieler.geschwindigkeitY -= 12; // Sprunghöhe
    }
    if (pressedKeys[steuerungen.left]) {
        spieler.geschwindigkeitX -= spieler.geschwindigkeit;
    }
    if (pressedKeys[steuerungen.right]) {
        spieler.geschwindigkeitX += spieler.geschwindigkeit;
    }

    // Begrenzen Sie die Spielerbewegung auf die Spielfläche (horizontale Begrenzung)
    spieler.x = Math.max(0, Math.min(spieler.x + spieler.geschwindigkeitX, spielfeld.width - spieler.groesse));

    // Begrenzen Sie die Spielerbewegung auf die Spielfläche (vertikale Begrenzung)
    if (spieler.y + spieler.geschwindigkeitY <= 0) { // Oben am Rand
        spieler.y = 0;
        spieler.geschwindigkeitY = 0; // Sprung nach oben stoppen
        spieler.onground = false;
    } else if (spieler.y + spieler.geschwindigkeitY + spieler.groesse >= spielfeld.height) { // Unten am Rand
        spieler.y = spielfeld.height - spieler.groesse;
        spieler.geschwindigkeitY = 0; // Fallen nach unten stoppen
        spieler.onground = true;
    } else {
        spieler.onground = false;
    }
    if (spieler.onground == false) {
        spieler.geschwindigkeitY += schwerkraft;
    }
}

function checkCollision(spieler, objekt) {
    return (
        spieler.x < objekt.x + objekt.breite &&
        spieler.x + spieler.groesse > objekt.x &&
        spieler.y < objekt.y + objekt.hoehe &&
        spieler.y + spieler.groesse > objekt.y
    );
}

function catchPlayer(gefangenerSpielerIndex) {
    spieler[gefangenerSpielerIndex].x = spielfeld.width / 2;
    spieler[gefangenerSpielerIndex].y = spielfeld.height / 2;

    faengerIndex = (faengerIndex + 1) % spieler.length;
}

function zeichneSpiel() {
    ctx.clearRect(0, 0, spielfeld.width, spielfeld.height);

    spieler.forEach((spieler, index) => {
        ctx.fillStyle = index === faengerIndex ? 'red' : 'blue';
        ctx.fillRect(spieler.x, spieler.y, spieler.groesse, spieler.groesse);
    });

    plattformen.forEach((plattform) => {
        ctx.fillStyle = 'brown';
        ctx.fillRect(plattform.x, plattform.y, plattform.breite, plattform.hoehe);
    });
}

function spielSchleife() {
    spieler.forEach((spieler) => {
        handlePlayerMovement(spieler, spieler.steuerungen);
        // Kollisionen mit Plattformen überprüfen und anpassen
        plattformen.forEach((plattform) => {
            if (checkCollisionWithPlatform(spieler, plattform)) {
                // Kollisionsbehandlung hier, z.B. die Y-Geschwindigkeit auf 0 setzen, um das Springen zu verhindern
                spieler.geschwindigkeitY = 0;
                // Optional: Den Spieler auf die Oberseite der Plattform setzen, wenn er von unten kollidiert
                // spieler.y = plattform.y - spieler.groesse;
                // Optional: Wenn der Spieler von oben kollidiert, könntest du ihn auf die Unterseite der Plattform setzen
            }
        });
        // Spielergeschwindigkeit aktualisieren
        spieler.x += spieler.geschwindigkeitX;
        spieler.y += spieler.geschwindigkeitY;
        
    });

    // Kollisionen prüfen und Fänger wechseln
    for (let i = 0; i < spieler.length; i++) {
        for (let j = i + 1; j < spieler.length; j++) {
            if (checkCollision(spieler[i], spieler[j]) && i !== faengerIndex) {
                console.log("catch");
                catchPlayer(j);
            }
        }
    }

    zeichneSpiel();

    requestAnimationFrame(spielSchleife);
}

// Tastaturereignisse
window.addEventListener('keydown', (event) => {
    pressedKeys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
    pressedKeys[event.key] = false;
});

// Spiel initialisieren und starten
spielSchleife();
