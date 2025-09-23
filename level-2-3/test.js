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

function assertArrayEquals(actual, expected, message = '') {
  if (!Array.isArray(actual) || actual.length !== expected.length) {
    throw new Error(`${message}\n   Attendu: ${JSON.stringify(expected)}\n   Reçu: ${JSON.stringify(actual)}`);
  }
  for (let i = 0; i < expected.length; i++) {
    if (actual[i] !== expected[i]) {
      throw new Error(`${message}\n   Attendu: ${JSON.stringify(expected)}\n   Reçu: ${JSON.stringify(actual)}`);
    }
  }
}

try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

test('Doit définir la fonction nombresImpairs', () => {
  assertEquals(typeof nombresImpairs, 'function', 'nombresImpairs doit être une fonction');
  assertEquals(nombresImpairs.length, 1, 'La fonction nombresImpairs doit avoir 1 paramètre');
});

test('Doit filtrer [1, 2, 3, 4, 5] en [1, 3, 5]', () => {
  const resultat = nombresImpairs([1, 2, 3, 4, 5]);
  assertArrayEquals(resultat, [1, 3, 5], 'nombresImpairs([1, 2, 3, 4, 5]) doit retourner [1, 3, 5]');
});

test('Doit filtrer [2, 4, 6, 8] en []', () => {
  const resultat = nombresImpairs([2, 4, 6, 8]);
  assertArrayEquals(resultat, [], 'nombresImpairs([2, 4, 6, 8]) doit retourner un tableau vide');
});

test('Doit filtrer [1, 3, 5, 7] en [1, 3, 5, 7]', () => {
  const resultat = nombresImpairs([1, 3, 5, 7]);
  assertArrayEquals(resultat, [1, 3, 5, 7], 'nombresImpairs([1, 3, 5, 7]) doit retourner [1, 3, 5, 7]');
});

test('Doit gérer un tableau vide', () => {
  const resultat = nombresImpairs([]);
  assertArrayEquals(resultat, [], 'nombresImpairs([]) doit retourner un tableau vide');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
