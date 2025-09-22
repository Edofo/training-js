# 💡 Conseils pour l'exercice 2.3

## Objectif
Créer une fonction nombresImpairs(tableau) qui retourne un nouveau tableau contenant seulement les nombres impairs

## Indices

### 🔍 Indice 1
Un nombre est impair si le reste de sa division par 2 est 1 : `nombre % 2 === 1`

### 🔍 Indice 2
Utilisez la méthode `filter()` des tableaux pour créer un nouveau tableau

### 🔍 Indice 3
La méthode filter prend une fonction de test en paramètre : `tableau.filter(element => condition)`

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function nombresImpairs(tableau) {
    return tableau.filter(nombre => nombre % 2 === 1);
}

// Alternative avec une boucle :
function nombresImpairs(tableau) {
    let resultat = [];
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i] % 2 === 1) {
            resultat.push(tableau[i]);
        }
    }
    return resultat;
}
```

</details>

## Pour aller plus loin
- Créez une fonction `nombresPairs` pour les nombres pairs
- Filtrez les nombres supérieurs à une valeur donnée
- Créez une fonction qui filtre selon un critère personnalisé
- Combinez plusieurs filtres (ex: nombres impairs ET supérieurs à 5)
