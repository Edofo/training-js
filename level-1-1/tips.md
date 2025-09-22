# 💡 Conseils pour l'exercice 1.1

## Objectif
Créer une fonction calculerAge(anneeNaissance) qui retourne l'âge d'une personne en 2025

## Indices

### 🔍 Indice 1
Une fonction qui retourne une valeur utilise le mot-clé `return`

### 🔍 Indice 2
L'âge = année actuelle - année de naissance

### 🔍 Indice 3
En 2025, pour quelqu'un né en 1990 : âge = 2025 - 1990 = 35

## Solution
<details>
<summary>Cliquez pour voir la solution</summary>

```javascript
function calculerAge(anneeNaissance) {
    return 2025 - anneeNaissance;
}
```

</details>

## Pour aller plus loin
- Modifiez la fonction pour utiliser l'année actuelle au lieu de 2025
- Ajoutez une validation : que se passe-t-il si l'année de naissance est dans le futur ?
- Créez une fonction qui calcule l'âge en mois ou en jours
