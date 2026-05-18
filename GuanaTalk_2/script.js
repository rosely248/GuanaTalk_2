// --- 1. BASE DE DATOS LOCAL DE GUANATALK ---
const guanaDictionary = [
    { word: "CUSCATLAN", hint: "Antiguo nombre de El Salvador", definition: "Nombre nahuat del territorio central." },
    { word: "COLON", hint: "Moneda usada antes del dólar", definition: "Nombrada en honor a Cristóbal Colón." },
    { word: "PUPUSA", hint: "Platillo nacional", definition: "Tortilla de maíz o arroz rellena." },
    { word: "CIPOTE", hint: "Manera casual de decir 'niño'", definition: "Término muy común para infantes o jóvenes." },
    { word: "SHUCO", hint: "Bebida caliente de maíz fermentado", definition: "Se sirve en morro y suele llevar frijoles negros." },
    { word: "CHERO", hint: "Tu mejor amigo", definition: "Sinónimo de compañero o amigo cercano." },
    { word: "VADO", hint: "Obstáculo en la calle para reducir velocidad", definition: "Comúnmente llamado 'túmulo'." },
    { word: "CHAFA", hint: "De mala calidad o imitación", definition: "Usado para cosas que no son originales." }
];

// --- 2. VARIABLES DE ESTADO ---
let currentGame = {
    wordObj: null,
    guesses: [],
    mistakes: 0,
    maxMistakes: 6 // Subimos a 6 para que coincida con las partes del cuerpo
};

// --- 3. REFERENCIAS DOM ---
const elements = {
    word: document.getElementById("word-display"),
    hint: document.getElementById("hint-text"),
    usedLetters: document.getElementById("used-letters"),
    attempts: document.getElementById("attempts"),
    keyboard: document.getElementById("keyboard"),
    progress: document.getElementById("progress"),
    definitionArea: document.getElementById("definition-area"),
    hangman: {
        head: document.getElementById("h-head"),
        body: document.getElementById("h-body"),
        armL: document.getElementById("h-arm-l"),
        armR: document.getElementById("h-arm-r"),
        legL: document.getElementById("h-leg-l"),
        legR: document.getElementById("h-leg-r")
    }
};

// --- 4. FUNCIONES DE LÓGICA DEL JUEGO ---

function initGame() {
    currentGame.guesses = [];
    currentGame.mistakes = 0;
    
    const randomIndex = Math.floor(Math.random() * guanaDictionary.length);
    currentGame.wordObj = guanaDictionary[randomIndex];

    elements.usedLetters.innerHTML = "";
    elements.hint.innerText = currentGame.wordObj.hint;
    elements.definitionArea.style.display = "none";
    
    resetHangmanVisuals();
    updateAttempts();
    createKeyboard();
    updateWordDisplay();
}

function updateWordDisplay() {
    elements.word.innerText = currentGame.wordObj.word
        .split('')
        .map(letter => currentGame.guesses.includes(letter) ? letter : "_")
        .join(' ');
        
    checkGameStatus();
}

function handleGuess(letter, button) {
    if (currentGame.guesses.includes(letter) || isGameOver()) return;

    currentGame.guesses.push(letter);
    button.disabled = true;

    if (currentGame.wordObj.word.includes(letter)) {
        button.classList.add("correct");
        updateWordDisplay();
    } else {
        button.classList.add("wrong");
        currentGame.mistakes++;
        updateAttempts();
        updateHangmanVisuals();
        addUsedLetter(letter);
    }
}

// --- 5. FUNCIONES VISUALES ---

function updateAttempts() {
    elements.attempts.innerText = currentGame.maxMistakes - currentGame.mistakes;
    const pct = ((currentGame.maxMistakes - currentGame.mistakes) / currentGame.maxMistakes) * 100;
    elements.progress.style.width = pct + "%";
}

function addUsedLetter(letter) {
    const span = document.createElement("span");
    span.innerText = letter + " ";
    elements.usedLetters.appendChild(span);
}

function updateHangmanVisuals() {
    const partsOrder = [
        elements.hangman.head,
        elements.hangman.body,
        elements.hangman.armL,
        elements.hangman.armR,
        elements.hangman.legL,
        elements.hangman.legR
    ];

    if (currentGame.mistakes > 0 && currentGame.mistakes <= partsOrder.length) {
        partsOrder[currentGame.mistakes - 1].style.opacity = "1";
    }
}

function resetHangmanVisuals() {
    // Ponemos en opacidad 0 todas las partes del hombrecito
    Object.values(elements.hangman).forEach(part => {
        if (part) part.style.opacity = "0";
    });
}

function createKeyboard() {
    elements.keyboard.innerHTML = "";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    letters.forEach(letter => {
        const btn = document.createElement("button");
        btn.innerText = letter;
        btn.onclick = () => handleGuess(letter, btn);
        elements.keyboard.appendChild(btn);
    });
}

// --- 6. CIERRE DEL JUEGO ---

function isGameOver() {
    return currentGame.mistakes >= currentGame.maxMistakes || getGuessedWord() === currentGame.wordObj.word;
}

function getGuessedWord() {
    return elements.word.innerText.replace(/\s/g, '');
}

function checkGameStatus() {
    if (getGuessedWord() === currentGame.wordObj.word) {
        endGame(true);
    } else if (currentGame.mistakes >= currentGame.maxMistakes) {
        endGame(false);
    }
}

function endGame(win) {
    elements.keyboard.innerHTML = win ? "<h3>¡GANASTE! 🎉</h3>" : "<h3>¡PERDISTE! 💀</h3>";
    
    elements.definitionArea.style.display = "block";
    elements.definitionArea.innerHTML = `
        <p><strong>${currentGame.wordObj.word}:</strong> ${currentGame.wordObj.definition}</p>
        <button onclick="initGame()" style="margin-top:10px; padding:10px; cursor:pointer;">Jugar de Nuevo</button>
    `;
    
    if(!win) {
         elements.word.innerText = currentGame.wordObj.word;
    }
}

// Iniciar por primera vez
initGame();