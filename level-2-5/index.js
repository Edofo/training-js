// Exercice 2.5 : Validation
// Objectif: Créez une fonction estEmailValide(email) qui vérifie si un email contient un "@" et un point après le "@"z
function estEmailValide (email) {
const arobase = email.indexOf("@");
if (arobase === -1) {
    return false;

}
const point = email.indexOf("." , arobase + 1);
if (point == arobase + 1) {

    return false
}
return point !== -1;
}
export { estEmailValide };
