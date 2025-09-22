# 💡 Conseils pour l'exercice 0.5

## Objectif
Créer une fonction direBonjour(prenom) qui affiche "Bonjour [prénom]!" avec le prénom donné

## Indices

### 🔍 Indice 1
Une fonction avec paramètre : `function direBonjour(prenom) { ... }`

### 🔍 Indice 2
Pour utiliser le paramètre dans la fonction, référez-vous à `prenom`

### 🔍 Indice 3
Concaténez les chaînes avec `+` : `"Bonjour " + prenom + "!"`

### 🔍 Indice 4
Appelez la fonction avec un argument : `direBonjour("Pierre");`

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function direBonjour(prenom) {
    console.log("Bonjour " + prenom + "!");
}

direBonjour("Pierre");
```

</details>

## Pour aller plus loin
- Essayez avec différents prénoms
- Pouvez-vous utiliser les template literals (backticks) à la place ? `\`Bonjour ${prenom}!\``
- Que se passe-t-il si vous appelez la fonction sans argument ?
