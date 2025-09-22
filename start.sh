#!/bin/bash

echo "🚀 Démarrage rapide - Exercices JavaScript TDD"
echo "=============================================="
echo ""

# Vérifier si node est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "🔗 Téléchargez Node.js: https://nodejs.org/"
    exit 1
fi

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

# Afficher la progression
echo "📈 Votre progression actuelle:"
npm test

echo ""
echo "🎯 Commandes disponibles:"
echo "   npm test                    - Voir la progression"
echo "   npm run test:level 0        - Tester le niveau 0"
echo "   npm run test:exercise 0.1   - Tester l'exercice 0.1"
echo ""
echo "💡 Conseil: Commencez par 'npm run test:level 0'"
echo ""
echo "📚 Documentation:"
echo "   README.md           - Guide complet"
echo "   level-X-Y/tips.md   - Indices pour chaque exercice"
echo ""
echo "Bon apprentissage ! 🚀"
