// Exercice 2.4 : Comptage
// Objectif: Créez une fonction compterVoyelles(phrase) qui compte le nombre de voyelles dans une phrase
function compterVoyelles(phrase) {
    let compteur = 0;
    phrase = phrase.toLowerCase()
    phrase = phrase.split("")
    phrase.forEach(character => {
        if(character == "a" || character == "e" || character == "i" || character == "o" || character == "u" || character == "y") {
            compteur++;
        }
    })
    return compteur;
}

export { compterVoyelles };
