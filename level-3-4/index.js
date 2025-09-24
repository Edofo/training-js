// Exercice 3.4 : Calculs sur tableaux
// Objectif: Créez une fonction statistiques(nombres) qui retourne un objet avec {moyenne, min, max, total} pour un tableau de nombres
function statistiques(nombres){
    const total = nombres.reduce((acc,val)=> acc + val, 0);
    const min = Math.min(...nombres);
    const max = Math.max(...nombres);
    const moyenne = total / nombres.lenght;
    return {moyenne, min, max, total};
}

export { statistiques };
