const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsTotal = 0;

function test(description, testFn) {
  testsTotal++;
  try {
    testFn();
    console.log(`✅ ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   Erreur: ${error.message}`);
  }
}

function assertEquals(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`${message}\n   Attendu: ${expected}\n   Reçu: ${actual}`);
  }
}

try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

test('Doit définir la fonction compterVoyelles', () => {
  assertEquals(typeof compterVoyelles, 'function', 'compterVoyelles doit être une fonction');
  assertEquals(compterVoyelles.length, 1, 'La fonction compterVoyelles doit avoir 1 paramètre');
});

test('Doit compter les voyelles dans "hello"', () => {
  const resultat = compterVoyelles("hello");
  assertEquals(resultat, 2, 'compterVoyelles("hello") doit retourner 2 (e, o)');
});

test('Doit compter les voyelles dans "JavaScript"', () => {
  const resultat = compterVoyelles("JavaScript");
  assertEquals(resultat, 3, 'compterVoyelles("JavaScript") doit retourner 3 (a, a, i)');
});

test('Doit gérer les majuscules et minuscules', () => {
  const resultat = compterVoyelles("AEIOU");
  assertEquals(resultat, 5, 'compterVoyelles("AEIOU") doit retourner 5');
  
  const resultat2 = compterVoyelles("aeiou");
  assertEquals(resultat2, 5, 'compterVoyelles("aeiou") doit retourner 5');
});

test('Doit gérer une phrase complexe', () => {
  const resultat = compterVoyelles("Bonjour le monde!");
  assertEquals(resultat, 6, 'compterVoyelles("Bonjour le monde!") doit retourner 6 (o, ou, e, o, e)');
});

test('Doit gérer une chaîne sans voyelles', () => {
  const resultat = compterVoyelles("xyz");
  assertEquals(resultat, 0, 'compterVoyelles("xyz") doit retourner 0');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
