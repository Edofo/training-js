# 💡 Conseils pour l'exercice 1.3

## Objectif
Créer une fonction compterJusqua(n) qui affiche tous les nombres de 1 à n dans la console

## Indices

### 🔍 Indice 1
Utilisez une boucle `for` qui commence à 1 et va jusqu'à n

### 🔍 Indice 2
La condition de la boucle doit être `i <= n` pour inclure n

### 🔍 Indice 3
Dans la boucle, affichez la variable de comptage avec `console.log(i)`

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function compterJusqua(n) {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}
```

</details>

## Pour aller plus loin
- Modifiez la fonction pour compter de 0 à n
- Créez une fonction qui compte de n à 1 (ordre décroissant)
- Ajoutez un paramètre `pas` pour compter par bonds (ex: 2, 4, 6, 8...)
- Que se passe-t-il si n est négatif ou zéro ?
