# 💡 Conseils pour l'exercice 3.4

## Objectif
Créer une fonction statistiques(nombres) qui retourne un objet avec {moyenne, min, max, total}

## Indices

### 🔍 Indice 1 - Structure de l'objet retourné
```javascript
return {
    moyenne: /* calcul de la moyenne */,
    min: /* plus petit nombre */,
    max: /* plus grand nombre */,
    total: /* somme de tous les nombres */
};
```

### 🔍 Indice 2 - Calcul du total
Utilisez une boucle ou la méthode `reduce()` pour additionner tous les nombres

### 🔍 Indice 3 - Calcul de la moyenne
Moyenne = total ÷ nombre d'éléments : `total / nombres.length`

### 🔍 Indice 4 - Min et Max
Utilisez `Math.min(...nombres)` et `Math.max(...nombres)` ou une boucle

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function statistiques(nombres) {
    // Calcul du total
    let total = 0;
    for (let i = 0; i < nombres.length; i++) {
        total += nombres[i];
    }
    
    // Calcul de la moyenne
    const moyenne = total / nombres.length;
    
    // Trouver min et max
    let min = nombres[0];
    let max = nombres[0];
    
    for (let i = 1; i < nombres.length; i++) {
        if (nombres[i] < min) {
            min = nombres[i];
        }
        if (nombres[i] > max) {
            max = nombres[i];
        }
    }
    
    return {
        moyenne: moyenne,
        min: min,
        max: max,
        total: total
    };
}

// Solution alternative avec les méthodes de tableau :
function statistiques(nombres) {
    const total = nombres.reduce((somme, nombre) => somme + nombre, 0);
    const moyenne = total / nombres.length;
    const min = Math.min(...nombres);
    const max = Math.max(...nombres);
    
    return {
        moyenne,
        min,
        max,
        total
    };
}
```

</details>

## Méthodes utiles

### Calcul du total
- **Boucle for** : `for (let i = 0; i < nombres.length; i++)`
- **reduce()** : `nombres.reduce((somme, nombre) => somme + nombre, 0)`

### Min et Max
- **Math.min/Max** : `Math.min(...nombres)` (avec l'opérateur spread)
- **Boucle** : comparer chaque élément
- **reduce()** : `nombres.reduce((min, nombre) => nombre < min ? nombre : min)`

### Moyenne
- **Formule** : `total / nombres.length`

## Pour aller plus loin
- Ajoutez la médiane (valeur du milieu quand le tableau est trié)
- Calculez l'écart-type
- Ajoutez la gestion d'un tableau vide
- Créez une fonction qui affiche les statistiques de manière formatée
