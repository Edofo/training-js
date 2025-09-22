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

let factorielle;
try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

test('Doit définir la fonction factorielle', () => {
  assertEquals(typeof factorielle, 'function', 'factorielle doit être une fonction');
  assertEquals(factorielle.length, 1, 'La fonction factorielle doit avoir 1 paramètre');
});

test('Doit calculer factorielle(0) = 1', () => {
  const resultat = factorielle(0);
  assertEquals(resultat, 1, 'factorielle(0) doit retourner 1');
});

test('Doit calculer factorielle(1) = 1', () => {
  const resultat = factorielle(1);
  assertEquals(resultat, 1, 'factorielle(1) doit retourner 1');
});

test('Doit calculer factorielle(5) = 120', () => {
  const resultat = factorielle(5);
  assertEquals(resultat, 120, 'factorielle(5) doit retourner 120 (5×4×3×2×1)');
});

test('Doit calculer factorielle(6) = 720', () => {
  const resultat = factorielle(6);
  assertEquals(resultat, 720, 'factorielle(6) doit retourner 720');
});

test('Doit calculer factorielle(3) = 6', () => {
  const resultat = factorielle(3);
  assertEquals(resultat, 6, 'factorielle(3) doit retourner 6 (3×2×1)');
});

// Test pour vérifier que c'est bien récursif
test('Doit utiliser la récursion (vérification du code)', () => {
  const codeSource = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  const contientRecursion = codeSource.includes('factorielle(') && 
                           (codeSource.match(/factorielle\(/g) || []).length >= 2;
  
  assertEquals(contientRecursion, true, 'La fonction doit s\'appeler elle-même (récursion)');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
