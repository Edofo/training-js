// Exercice 2.2 : Objets basiques
// Objectif: Créez un objet voiture avec les propriétés marque, modele, annee et une méthode getAge() qui retourne l'âge de la voiture

let voiture = {
    marque: "Toyota",
    modele: "Yaris",
    annee: 2024,
    getAge: function() {
        return 2025 - this.annee;
    }
}

export { voiture };
