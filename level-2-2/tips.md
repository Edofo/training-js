# 💡 Conseils pour l'exercice 2.2

## Objectif
Créer un objet voiture avec les propriétés marque, modele, annee et une méthode getAge()

## Indices

### 🔍 Indice 1
Un objet avec méthodes ressemble à ceci :
```javascript
let objet = {
    propriete: "valeur",
    methode: function() { ... }
};
```

### 🔍 Indice 2
Dans une méthode, utilisez `this` pour accéder aux propriétés de l'objet

### 🔍 Indice 3
L'âge de la voiture = année actuelle - année de fabrication

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
let voiture = {
    marque: "Toyota",
    modele: "Corolla",
    annee: 2020,
    getAge: function() {
        return 2025 - this.annee;
    }
};

// Ou avec la syntaxe moderne :
let voiture = {
    marque: "Toyota",
    modele: "Corolla",
    annee: 2020,
    getAge() {
        return 2025 - this.annee;
    }
};
```

</details>

## Pour aller plus loin
- Ajoutez d'autres méthodes (demarrer, arreter, etc.)
- Créez une méthode qui retourne une description complète de la voiture
- Utilisez `new Date().getFullYear()` pour l'année actuelle
- Créez un constructeur de voiture avec une fonction
