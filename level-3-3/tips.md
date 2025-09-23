# 💡 Conseils pour l'exercice 3.3

## Objectif
Créer une fonction qui ajoute un bouton à la page. Quand on clique dessus, il change de couleur aléatoirement.

## Indices

### 🔍 Indice 1 - Créer le bouton
```javascript
const bouton = document.createElement('button');
bouton.textContent = 'Bouton Magique';
```

### 🔍 Indice 2 - Ajouter le gestionnaire de clic
```javascript
bouton.addEventListener('click', function() {
    // Code pour changer la couleur
});
```

### 🔍 Indice 3 - Changer la couleur
```javascript
bouton.style.backgroundColor = genererCouleurAleatoire();
```

### 🔍 Indice 4 - Ajouter au container
```javascript
const container = document.getElementById('buttons-container');
container.appendChild(bouton);
```


## Concepts DOM utilisés

### Création d'éléments
- `document.createElement('button')` : crée un nouvel élément bouton
- `element.textContent` : définit le texte du bouton

### Gestion d'événements
- `addEventListener('click', fonction)` : écoute les clics
- Fonction anonyme ou fléchée pour le gestionnaire

### Manipulation de styles
- `element.style.backgroundColor` : change la couleur de fond
- Couleurs CSS : hex (#FF0000), RGB, noms de couleurs

### Manipulation du DOM
- `document.getElementById()` : récupère un élément par son ID
- `appendChild()` : ajoute un enfant à un élément

## Pour aller plus loin
- Ajoutez un compteur de clics sur chaque bouton
- Créez différents types d'animations (rotation, taille, etc.)
- Ajoutez un bouton pour supprimer tous les boutons magiques
- Sauvegardez l'état des boutons dans localStorage
