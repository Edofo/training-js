# 🚀 Exercices JavaScript - Test-Driven Development (TDD)

Bienvenue dans cette série d'exercices JavaScript progressifs conçus pour apprendre en suivant la méthodologie TDD !

## 📋 Table des Matières

- [Installation](#installation)
- [Comment utiliser](#comment-utiliser)
- [Structure des exercices](#structure-des-exercices)
- [Niveaux disponibles](#niveaux-disponibles)
- [Commandes utiles](#commandes-utiles)
- [Conseils pour réussir](#conseils-pour-réussir)

## 🛠 Installation

1. **Clonez ou téléchargez** ce projet
2. **Ouvrez un terminal** dans le dossier du projet
3. **Installez les dépendances** :
   ```bash
   npm install
   ```

## 🎯 Comment utiliser

### Démarrage rapide

1. **Voir votre progression** :
   ```bash
   npm test
   ```

2. **Commencer par le niveau 0** :
   ```bash
   npm run test:level 0
   ```

3. **Tester un exercice spécifique** :
   ```bash
   npm run test:exercise 0.1
   ```

### Workflow recommandé

1. 📖 **Lisez l'objectif** de l'exercice dans le fichier `index.js`
2. 💻 **Écrivez votre code** pour résoudre le problème
3. 🧪 **Testez votre solution** avec la commande de test
4. ❌ **Si les tests échouent** : consultez le fichier `tips.md` pour des indices
5. ✅ **Si les tests passent** : passez à l'exercice suivant !

## 📁 Structure des exercices

Chaque exercice est dans un dossier séparé avec cette structure :

```
level-X-Y/
├── index.js    # 🎯 Votre code va ici
├── test.js     # 🧪 Tests automatiques (ne pas modifier)
└── tips.md     # 💡 Indices et aide
```

## 🎮 Niveaux disponibles

### 🔵 Niveau 0 - Ultra Simple (10 exercices)
**Découverte des bases de JavaScript**
- Variables, fonctions, conditions
- Boucles, tableaux, objets
- Premier contact avec le DOM

### 🟢 Niveau 1 - Débutant (4 exercices)
**Consolidation des fondamentaux**
- Fonctions avec retour de valeur
- Manipulation de tableaux
- Logique conditionnelle

### 🟡 Niveau 2 - Intermédiaire (5 exercices)
**Concepts plus avancés**
- Manipulation de chaînes
- Objets avec méthodes
- Filtrage et validation

### 🟠 Niveau 3 - Intermédiaire+ (5 exercices)
**Défis plus complexes**
- Récursion
- Manipulation du DOM avancée
- Algorithmes et structures de données

## 🛠 Commandes utiles

### Tests
```bash
# Voir la progression générale
npm test

# Tester un niveau complet
npm run test:level 0
npm run test:level 1
npm run test:level 2
npm run test:level 3

# Tester un exercice spécifique
npm run test:exercise 0.1
npm run test:exercise 1.2
npm run test:exercise 2.3

# Voir l'aide
npm test -- --help
```

### Navigation
- **Ordre recommandé** : Suivez l'ordre numérique (0.1 → 0.2 → ... → 3.5)
- **Blocage** : Si vous êtes bloqué, consultez `tips.md` dans le dossier de l'exercice
- **Saut d'exercice** : Possible, mais non recommandé pour l'apprentissage

## 💡 Conseils pour réussir

### ✅ Bonnes pratiques
- **Lisez attentivement** l'objectif avant de coder
- **Testez souvent** votre code pendant que vous l'écrivez
- **Consultez les indices** si vous êtes bloqué plus de 10 minutes
- **Expérimentez** : essayez différentes approches
- **Nommez bien** vos variables et fonctions

### 🚫 Évitez ces erreurs
- Ne modifiez pas les fichiers `test.js`
- Ne sautez pas les étapes de base si vous êtes débutant
- Ne cherchez pas les solutions en ligne avant d'avoir essayé

### 🔍 Débuggage
- Utilisez `console.log()` pour afficher des valeurs intermédiaires
- Vérifiez la syntaxe de vos fonctions (parenthèses, accolades)
- Relisez les messages d'erreur attentivement

## 🎓 Objectifs pédagogiques

### Après le Niveau 0
Vous maîtriserez :
- Les variables et types de base
- Les structures de contrôle (if, for)
- Les fonctions simples
- Les tableaux et objets de base

### Après le Niveau 1
Vous saurez :
- Créer des fonctions qui retournent des valeurs
- Manipuler des tableaux avec des boucles
- Implémenter une logique conditionnelle complexe

### Après le Niveau 2
Vous pourrez :
- Manipuler les chaînes de caractères
- Créer des objets avec des méthodes
- Filtrer et valider des données

### Après le Niveau 3
Vous serez capable de :
- Utiliser la récursion
- Manipuler le DOM de manière avancée
- Résoudre des problèmes algorithmiques

## 🆘 Aide et Support

- **Fichiers tips.md** : Indices progressifs pour chaque exercice
- **Messages d'erreur** : Lisez-les attentivement, ils donnent souvent la solution
- **Console du navigateur** : Pour les exercices DOM, ouvrez les outils de développement

## 🎉 Félicitations !

Chaque exercice réussi vous rapproche de la maîtrise de JavaScript ! 

**Bon apprentissage ! 🚀**
