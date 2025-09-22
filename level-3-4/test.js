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

function assertObjectEquals(actual, expected, message = '') {
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = Object.keys(expected).sort();
  
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    throw new Error(`${message}\n   Clés attendues: ${JSON.stringify(expectedKeys)}\n   Clés reçues: ${JSON.stringify(actualKeys)}`);
  }
  
  for (let key of expectedKeys) {
    if (Math.abs(actual[key] - expected[key]) > 0.0001) {
      throw new Error(`${message}\n   Pour la propriété "${key}":\n   Attendu: ${expected[key]}\n   Reçu: ${actual[key]}`);
    }
  }
}

let statistiques;
try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

test('Doit définir la fonction statistiques', () => {
  assertEquals(typeof statistiques, 'function', 'statistiques doit être une fonction');
  assertEquals(statistiques.length, 1, 'La fonction statistiques doit avoir 1 paramètre');
});

test('Doit calculer les statistiques pour [1, 2, 3, 4, 5]', () => {
  const resultat = statistiques([1, 2, 3, 4, 5]);
  
  assertEquals(typeof resultat, 'object', 'Le résultat doit être un objet');
  assertObjectEquals(resultat, {
    moyenne: 3,
    min: 1,
    max: 5,
    total: 15
  }, 'Statistiques pour [1, 2, 3, 4, 5]');
});

test('Doit calculer les statistiques pour [10, 20, 30]', () => {
  const resultat = statistiques([10, 20, 30]);
  
  assertObjectEquals(resultat, {
    moyenne: 20,
    min: 10,
    max: 30,
    total: 60
  }, 'Statistiques pour [10, 20, 30]');
});

test('Doit gérer un tableau avec un seul élément', () => {
  const resultat = statistiques([42]);
  
  assertObjectEquals(resultat, {
    moyenne: 42,
    min: 42,
    max: 42,
    total: 42
  }, 'Statistiques pour [42]');
});

test('Doit gérer les nombres décimaux', () => {
  const resultat = statistiques([1.5, 2.5, 3.5]);
  
  assertObjectEquals(resultat, {
    moyenne: 2.5,
    min: 1.5,
    max: 3.5,
    total: 7.5
  }, 'Statistiques pour [1.5, 2.5, 3.5]');
});

test('Doit gérer les nombres négatifs', () => {
  const resultat = statistiques([-5, 0, 5]);
  
  assertObjectEquals(resultat, {
    moyenne: 0,
    min: -5,
    max: 5,
    total: 0
  }, 'Statistiques pour [-5, 0, 5]');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
