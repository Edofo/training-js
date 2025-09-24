// Exercice 3.5 : Tri personnalisé
// Objectif: Créez une fonction trierPersonnes(personnes, critere) qui trie un tableau de personnes par nom ou par âge selon le critère donné
function trierPersonnes (personnes, critere) {
    return personnes.slice().sort((a,b)=> {
        if (critere === 'nom') {
            return a.nom.localeCompare(b.nom) ;
        }
        return a.age - b.age ;
    });
}


export { trierPersonnes };
