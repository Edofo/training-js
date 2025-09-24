// Exercice 2.3 : Filtrage de tableaux
// Objectif: Créez une fonction nombresImpairs(tableau) qui retourne un nouveau tableau contenant seulement les nombres impairs
function nombresImpairs(tableau){
    const odd = tableau.filter(nombre => nombre % 2 === 1)
    return odd
}

export { nombresImpairs };
