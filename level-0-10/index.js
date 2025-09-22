// Exercice 0.10 : Bouton simple
// Objectif: Créez un bouton HTML qui affiche "Clic!" dans la console quand on clique dessus

function logToVisualConsole(message) {
    const consoleOutput = document.getElementById('console-output');
    if (consoleOutput) {
        const div = document.createElement('div');
        div.textContent = message;
        consoleOutput.appendChild(div);
    }
}

const originalConsoleLog = console.log;
console.log = function(...args) {
    originalConsoleLog.apply(console, args);
    logToVisualConsole(args.join(' '));
};
