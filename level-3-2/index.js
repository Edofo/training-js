// Exercice 3.2 : Récursion simple
// Objectif: Créez une fonction récursive factorielle(n) qui calcule n! (factorielle de n)
function factorielle(n){
    if (n <= 1) {
        return 1
    }
    return n * factorielle(n - 1);
}

export { factorielle };
