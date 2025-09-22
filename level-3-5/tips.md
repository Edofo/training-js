# 💡 Conseils pour l'exercice 3.5

## Objectif
Créer une fonction trierPersonnes(personnes, critere) qui trie un tableau de personnes par nom ou par âge

## Indices

### 🔍 Indice 1 - Copier le tableau
Créez une copie pour ne pas modifier l'original : `const copie = [...personnes];`

### 🔍 Indice 2 - Méthode sort()
Utilisez la méthode `sort()` avec une fonction de comparaison personnalisée

### 🔍 Indice 3 - Fonction de comparaison
```javascript
copie.sort((a, b) => {
    if (critere === "nom") {
        // Comparaison alphabétique
    } else if (critere === "age") {
        // Comparaison numérique
    }
});
```

### 🔍 Indice 4 - Comparaisons
- **Nom** : `a.nom.localeCompare(b.nom)` pour l'ordre alphabétique
- **Âge** : `a.age - b.age` pour l'ordre croissant

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function trierPersonnes(personnes, critere) {
    // Créer une copie pour ne pas modifier l'original
    const copie = [...personnes];
    
    // Trier selon le critère
    copie.sort((a, b) => {
        if (critere === "nom") {
            return a.nom.localeCompare(b.nom);
        } else if (critere === "age") {
            return a.age - b.age;
        }
        return 0; // Cas par défaut
    });
    
    return copie;
}

// Solution alternative plus explicite :
function trierPersonnes(personnes, critere) {
    const copie = personnes.slice(); // Autre façon de copier
    
    if (critere === "nom") {
        copie.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (critere === "age") {
        copie.sort((a, b) => a.age - b.age);
    }
    
    return copie;
}
```

</details>

## Concepts importants

### Copie de tableau
- **Spread operator** : `[...tableau]`
- **slice()** : `tableau.slice()`
- **Array.from()** : `Array.from(tableau)`

### Fonction de comparaison sort()
- **Retour < 0** : a vient avant b
- **Retour > 0** : a vient après b  
- **Retour = 0** : a et b sont égaux

### Comparaisons
- **Chaînes** : `a.localeCompare(b)` (gère les accents)
- **Nombres** : `a - b` (croissant) ou `b - a` (décroissant)
- **Booléens** : `a - b` (false < true)

## Pour aller plus loin
- Ajoutez un troisième paramètre pour l'ordre (croissant/décroissant)
- Implémentez un tri multi-critères (nom puis âge en cas d'égalité)
- Créez une fonction qui trie par n'importe quelle propriété
- Ajoutez la gestion des critères invalides
