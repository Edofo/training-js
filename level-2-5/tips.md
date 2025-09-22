# 💡 Conseils pour l'exercice 2.5

## Objectif
Créer une fonction estEmailValide(email) qui vérifie qu'un email contient un "@" et un point après le "@"

## Indices

### 🔍 Indice 1
Utilisez `indexOf('@')` pour trouver la position du caractère @

### 🔍 Indice 2
Si `indexOf()` retourne -1, cela signifie que le caractère n'a pas été trouvé

### 🔍 Indice 3
Cherchez un point après la position du @ avec `indexOf('.', positionArobase + 1)`

### 🔍 Indice 4
L'email est valide si vous trouvez @ ET un point après @

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function estEmailValide(email) {
    const positionArobase = email.indexOf('@');
    
    // Pas de @ trouvé
    if (positionArobase === -1) {
        return false;
    }
    
    // Chercher un point après le @
    const positionPoint = email.indexOf('.', positionArobase + 1);
    
    // Retourner true si on a trouvé un point après @
    return positionPoint !== -1;
}

// Alternative plus courte :
function estEmailValide(email) {
    const arobase = email.indexOf('@');
    return arobase !== -1 && email.indexOf('.', arobase + 1) !== -1;
}
```

</details>

## Pour aller plus loin
- Ajoutez d'autres validations (pas d'espaces, longueur minimale, etc.)
- Utilisez les expressions régulières pour une validation plus robuste
- Vérifiez qu'il n'y a qu'un seul @
- Validez que l'email ne commence/finit pas par @ ou .
