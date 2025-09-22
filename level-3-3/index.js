// Exercice 3.3 : DOM basique
// Objectif: Créez une fonction qui ajoute un bouton à la page. Quand on clique dessus, il change de couleur aléatoirement.

function logStatus(message) {
    const statusLog = document.getElementById('status-log');
    if (statusLog) {
        statusLog.innerHTML += '<br>' + new Date().toLocaleTimeString() + ': ' + message;
    }
}

function genererCouleurAleatoire() {
    const couleurs = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85929E'
    ];
    return couleurs[Math.floor(Math.random() * couleurs.length)];
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ajouterBoutonMagique, genererCouleurAleatoire };
}
