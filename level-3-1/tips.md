# 💡 Conseils pour l'exercice 3.1

## Objectif
Créer une fonction grouperParAge(personnes) qui groupe un tableau de personnes par tranches d'âge

## Indices

### 🔍 Indice 1
Créez un objet résultat avec trois propriétés : `"0-17"`, `"18-64"`, et `"65+"`

### 🔍 Indice 2
Chaque propriété doit être un tableau vide au départ

### 🔍 Indice 3
Parcourez le tableau de personnes et ajoutez chaque personne dans la bonne tranche selon son âge

### 🔍 Indice 4
Utilisez des conditions `if/else if/else` pour déterminer la tranche d'âge

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function grouperParAge(personnes) {
    const resultat = {
        "0-17": [],
        "18-64": [],
        "65+": []
    };
    
    for (let i = 0; i < personnes.length; i++) {
        const personne = personnes[i];
        
        if (personne.age <= 17) {
            resultat["0-17"].push(personne);
        } else if (personne.age <= 64) {
            resultat["18-64"].push(personne);
        } else {
            resultat["65+"].push(personne);
        }
    }
    
    return resultat;
}

// Alternative avec forEach :
function grouperParAge(personnes) {
    const resultat = {
        "0-17": [],
        "18-64": [],
        "65+": []
    };
    
    personnes.forEach(personne => {
        if (personne.age <= 17) {
            resultat["0-17"].push(personne);
        } else if (personne.age <= 64) {
            resultat["18-64"].push(personne);
        } else {
            resultat["65+"].push(personne);
        }
    });
    
    return resultat;
}
```

</details>

## Pour aller plus loin
- Créez des tranches d'âge personnalisables (paramètre supplémentaire)
- Ajoutez des statistiques (nombre total, âge moyen par tranche)
- Triez les personnes par âge dans chaque tranche
- Utilisez la méthode `reduce()` pour une approche fonctionnelle
