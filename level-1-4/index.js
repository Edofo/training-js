// Exercice 1.4 : Tableaux simples
// Objectif: Créez une fonction trouverMax(tableau) qui retourne le plus grand nombre d'un tableau
function trouverMax(tableau) {
    if (!Array.isArray(tableau) || tableau.length === 0){
        return undefined;
    }
    let max = tableau[0];
    for (let i = 1; i <= tableau.length; i++) {
        if (tableau[i] > max) {
            max = tableau[i];
        }
    }
    return max;
}

export { trouverMax };
