# 💡 Conseils pour l'exercice 0.10

## Objectif
Créer un bouton HTML qui affiche "Clic!" dans la console quand on clique dessus

## Indices

### 🔍 Indice 1 - HTML
Ajoutez un bouton dans le HTML : `<button id="monBouton">Cliquez-moi</button>`

### 🔍 Indice 2 - JavaScript
Récupérez le bouton : `const bouton = document.getElementById('monBouton');`

### 🔍 Indice 3 - Événement
Ajoutez un gestionnaire de clic : `bouton.addEventListener('click', function() { ... });`

### 🔍 Indice 4 - Action
Dans la fonction, affichez le message : `console.log('Clic!');`


## Pour aller plus loin
- Changez le texte du bouton quand on clique dessus
- Comptez le nombre de clics
- Ajoutez plusieurs boutons avec des actions différentes
- Utilisez `onclick` directement dans le HTML au lieu d'addEventListener
