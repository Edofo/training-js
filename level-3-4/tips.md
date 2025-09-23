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
