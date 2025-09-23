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

test('Doit définir la fonction trouverMax', () => {
  assertEquals(typeof trouverMax, 'function', 'trouverMax doit être une fonction');
  assertEquals(trouverMax.length, 1, 'La fonction trouverMax doit avoir 1 paramètre');
});

test('Doit trouver le max dans [1, 5, 3]', () => {
  const resultat = trouverMax([1, 5, 3]);
  assertEquals(resultat, 5, 'trouverMax([1, 5, 3]) doit retourner 5');
});

test('Doit trouver le max dans [10, 2, 8, 15, 7]', () => {
  const resultat = trouverMax([10, 2, 8, 15, 7]);
  assertEquals(resultat, 15, 'trouverMax([10, 2, 8, 15, 7]) doit retourner 15');
});

test('Doit trouver le max dans [-5, -1, -10]', () => {
  const resultat = trouverMax([-5, -1, -10]);
  assertEquals(resultat, -1, 'trouverMax([-5, -1, -10]) doit retourner -1');
});

test('Doit gérer un tableau avec un seul élément', () => {
  const resultat = trouverMax([42]);
  assertEquals(resultat, 42, 'trouverMax([42]) doit retourner 42');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
