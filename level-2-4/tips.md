# 💡 Conseils pour l'exercice 2.4

## Objectif
Créer une fonction compterVoyelles(phrase) qui compte le nombre de voyelles dans une phrase

## Indices

### 🔍 Indice 1
Les voyelles sont : a, e, i, o, u (et leurs versions majuscules)

### 🔍 Indice 2
Créez une variable compteur initialisée à 0

### 🔍 Indice 3
Parcourez chaque caractère de la phrase avec une boucle `for`

### 🔍 Indice 4
Vérifiez si le caractère est une voyelle et incrémentez le compteur

### 🔍 Indice 5
Convertissez en minuscules pour gérer les majuscules : `caractere.toLowerCase()`

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function compterVoyelles(phrase) {
    const voyelles = 'aeiou';
    let compteur = 0;
    
    for (let i = 0; i < phrase.length; i++) {
        if (voyelles.includes(phrase[i].toLowerCase())) {
            compteur++;
        }
    }
    
    return compteur;
}

// Alternative plus moderne :
function compterVoyelles(phrase) {
    const voyelles = 'aeiou';
    return phrase.toLowerCase()
                 .split('')
                 .filter(char => voyelles.includes(char))
                 .length;
}
```

</details>

## Pour aller plus loin
- Créez une fonction qui compte les consonnes
- Comptez chaque voyelle séparément (retourner un objet)
- Gérez les accents (à, é, è, etc.)
- Créez une fonction qui analyse la fréquence de tous les caractères
