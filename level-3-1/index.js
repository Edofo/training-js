// Exercice 3.1 : Manipulation avancée de tableaux
// Objectif: Créez une fonction grouperParAge(personnes) qui prend un tableau d'objets {nom, age} et retourne un objet groupé par tranche d'âge (0-17, 18-64, 65+)


function grouperParAge(personnes) {
    const groupes = {
        "0-17": [],
        "18-64": [],
        "65+": []
    }

    for (let personne of personnes) {
        if (personne.age >= 0 && personne.age <= 17) {
            groupes["0-17"].push(personne);
        } else if (personne.age >= 18 && personne.age <= 65) {
            groupes["18-64"].push(personne);
        } else if (personne.age > 65) {
            groupes["65+"].push(personne);
        }
    }

    return groupes;
} 
export { grouperParAge };
