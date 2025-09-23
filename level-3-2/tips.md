# 💡 Conseils pour l'exercice 3.2

## Objectif
Créer une fonction récursive factorielle(n) qui calcule n! (factorielle de n)

## Rappel mathématique
- factorielle(0) = 1 (par définition)
- factorielle(1) = 1
- factorielle(n) = n × factorielle(n-1) pour n > 1

## Indices

### 🔍 Indice 1
Une fonction récursive s'appelle elle-même

### 🔍 Indice 2
Il faut toujours un **cas de base** qui arrête la récursion (ici : n <= 1)

### 🔍 Indice 3
Le **cas récursif** fait appel à la fonction avec un paramètre plus petit

### 🔍 Indice 4
Structure générale :
```javascript
function factorielle(n) {
    if (/* cas de base */) {
        return /* valeur simple */;
    } else {
        return /* n × factorielle(n-1) */;
    }
}
```


## Déroulement pour factorielle(5)
```
factorielle(5) = 5 × factorielle(4)
               = 5 × (4 × factorielle(3))
               = 5 × (4 × (3 × factorielle(2)))
               = 5 × (4 × (3 × (2 × factorielle(1))))
               = 5 × (4 × (3 × (2 × 1)))
               = 5 × (4 × (3 × 2))
               = 5 × (4 × 6)
               = 5 × 24
               = 120
```

## Pour aller plus loin
- Créez une fonction récursive pour la suite de Fibonacci
- Implémentez une fonction de puissance récursive : `puissance(base, exposant)`
- Créez une fonction qui calcule la somme des nombres de 1 à n de manière récursive
- Comparez les performances avec une version itérative (boucle)
