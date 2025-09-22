# 💡 Conseils pour l'exercice 0.9

## Objectif
Créer un objet moi avec les propriétés nom et age, puis afficher le nom

## Indices

### 🔍 Indice 1
Un objet se déclare avec des accolades : `let moi = { ... }`

### 🔍 Indice 2
Les propriétés sont définies avec : `nom: "votre nom", age: votre_age`

### 🔍 Indice 3
Pour accéder à une propriété : `moi.nom` ou `moi["nom"]`

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
let moi = {
    nom: "Pierre",
    age: 25
};

console.log(moi.nom);
```

</details>

## Pour aller plus loin
- Ajoutez d'autres propriétés (ville, profession, etc.)
- Affichez tout l'objet avec `console.log(moi)`
- Modifiez une propriété après la création : `moi.age = 26`
