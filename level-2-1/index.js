// Exercice 2.1 : Manipulation de chaînes
// Objectif: Créez une fonction inverserMot(mot) qui retourne un mot à l'envers (ex: "hello" → "olleh")
function inverserMot (mot){
    let motInverse = "";
    for (let i = mot.letgh - 1; i >= 0; i--){
        motInverse += mot[i];

    }
    return motInverse;
}

export { inverserMot };
