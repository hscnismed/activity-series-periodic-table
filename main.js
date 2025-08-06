const metals = [
    "Li", "K", "Ba", "Sr", "Ca", "Na", "Mg", "Al", "Zn", "Cr", "Fe", "Cd",
    "Co", "Ni", "Sn", "Pb", "Cu", "Hg", "Ag", "Pt", "Au"
];
const metalPositions = {
    H: [1, 1],
    He: [18, 1],
    Li: [1, 2],
    Be: [2, 2],
    B: [13, 2],
    C: [14, 2],
    N: [15, 2],
    O: [16, 2],
    F: [17, 2],
    Ne: [18, 2],
    Na: [1, 3],
    Mg: [2, 3],
    Al: [13, 3],
    Si: [14, 3],
    P: [15, 3],
    S: [16, 3],
    Cl: [17, 3],
    Ar: [18, 3],
    K: [1, 4],
    Ca: [2, 4],
    Sc: [3, 4],
    Ti: [4, 4],
    V: [5, 4],
    Cr: [6, 4],
    Mn: [7, 4],
    Fe: [8, 4],
    Co: [9, 4],
    Ni: [10, 4],
    Cu: [11, 4],
    Zn: [12, 4],
    Ga: [13, 4],
    Ge: [14, 4],
    As: [15, 4],
    Se: [16, 4],
    Br: [17, 4],
    Kr: [18, 4],
    Rb: [1, 5],
    Sr: [2, 5],
    Y: [3, 5],
    Zr: [4, 5],
    Nb: [5, 5],
    Mo: [6, 5],
    Tc: [7, 5],
    Ru: [8, 5],
    Rh: [9, 5],
    Pd: [10, 5],
    Ag: [11, 5],
    Cd: [12, 5],
    In: [13, 5],
    Sn: [14, 5],
    Sb: [15, 5],
    Te: [16, 5],
    I: [17, 5],
    Xe: [18, 5],
    Cs: [1, 6],
    Ba: [2, 6],
    "La-Lu": [3,6],
    Hf: [4, 6],
    Ta: [5, 6],
    W: [6, 6],
    Re: [7, 6],
    Os: [8, 6],
    Ir: [9, 6],
    Pt: [10, 6],
    Au: [11, 6],
    Hg: [12, 6],
    Tl: [13, 6],
    Pb: [14, 6],
    Bi: [15, 6],
    Po: [16, 6],
    At: [17, 6],
    Rn: [18, 6],
    Fr: [1, 7],
    Ra: [2, 7],
    "Ac-Lr": [3, 7],
    Rf: [4, 7],
    Db: [5, 7],
    Sg: [6, 7],
    Bh: [7, 7],
    Hs: [8, 7],
    Mt: [9, 7],
    Ds: [10, 7],
    Rg: [11, 7],
    Cn: [12, 7],
    Nh: [13, 7],
    Fl: [14, 7],
    Mc: [15, 7],
    Lv: [16, 7],
    Ts: [17, 7],
    Og: [18, 7]
};
const metalColors = {
    Li: "#ff0000",  // bright red
    K: "#e60000",
    Ba: "#cc0000",
    Sr: "#b30000",
    Ca: "#990000",
    Na: "#800000",  // deep red
    Mg: "#730000",  // dark red, nearing maroon
    Al: "#660000",  // classic maroon
    Zn: "#550000",  // deeper maroon
    Cr: "#440000",  // brownish maroon
    Fe: "#330000",  // very dark maroon
    Cd: "#261010",  // reddish black
    Co: "#1f1010",  // muted reddish black
    Ni: "#191111",  // dark reddish black
    Sn: "#151212",  // faint maroon-black
    Pb: "#101010",  // charcoal
    Cu: "#1a1a1a",  // soft black
    Hg: "#141414",  // darker
    Ag: "#0f0f0f",  // deeper black
    Pt: "#0a0a0a",  // nearly pure black
    Au: "#000000"   // black
};


const dragContainer = document.getElementById("dragContainer");
const periodicTable = document.getElementById("periodicTable");
// Create draggable metal elements
metals.forEach(symbol => {
    const div = document.createElement("div");
    div.className = "metal";
    div.textContent = symbol;
    div.draggable = true;
    div.style.backgroundColor = metalColors[symbol];
    div.style.color = "white";
    div.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", symbol);
    });
    dragContainer.appendChild(div);
});
// Create periodic table grid
for (let row = 1; row <= 7; row++) {
    for (let col = 1; col <= 18; col++) {
        const cell = document.createElement("div");
        cell.className = "element";
        const matchedElement = Object.entries(metalPositions).find(
            ([symbol, pos]) => pos[0] === col && pos[1] === row
        );
        if (matchedElement) {
            const [symbol] = matchedElement;
            cell.textContent = symbol;
            if (metals.includes(symbol)) {
                cell.classList.add("dropzone");
                cell.addEventListener("dragover", e => {
                    e.preventDefault();
                    cell.classList.add("highlight");
                });
                cell.addEventListener("dragleave", () => {
                    cell.classList.remove("highlight");
                });
                cell.addEventListener("drop", e => {
                    e.preventDefault();
                    const draggedSymbol = e.dataTransfer.getData("text/plain");
                    if (draggedSymbol === symbol) {
                        cell.style.backgroundColor = metalColors[draggedSymbol];
                        cell.style.color = "white";
                        cell.textContent = `✓ ${symbol}`;
                    } else {
                        alert("Oops! That's not the correct position.");
                    }
                    cell.classList.remove("highlight");
                });
            }
        }
        periodicTable.appendChild(cell);
        // Show Answer and Clear functionality

        const correctOrder = [
            "Li", "K", "Ba", "Sr", "Ca", "Na", "Mg",
            "Al", "Zn", "Cr", "Fe", "Cd", "Co", "Ni",
            "Sn", "Pb", "Cu", "Hg", "Ag", "Pt", "Au"
        ];

        const showAnswerBtn = document.getElementById("show-answer-btn");
        const clearAllBtn = document.getElementById("clear-all-btn");

        // Show the correct answers
        showAnswerBtn.addEventListener("click", () => {
            document.querySelectorAll(".dropzone").forEach(cell => {
                const symbol = cell.textContent.replace("✓ ", "").trim();
                if (correctOrder.includes(symbol)) {
                    cell.style.backgroundColor = metalColors[symbol];
                    cell.style.color = "white";
                    cell.textContent = `✓ ${symbol}`;
                }
            });
        });

        // Clear all filled cells
        clearAllBtn.addEventListener("click", () => {
            document.querySelectorAll(".dropzone").forEach(cell => {
                const symbol = cell.textContent.replace("✓ ", "").trim();
                if (correctOrder.includes(symbol)) {
                    cell.style.backgroundColor = "#f0f0f0";
                    cell.style.color = "black";
                    cell.textContent = symbol;
                }
            });
        });

    }
}

