import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let testsPassed = 0;
let testsTotal = 0;

const test = (description, testFn) => {
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

const assertEquals = (actual, expected, message = '') => {
  if (actual !== expected) {
    throw new Error(`${message}\n   Attendu: ${expected}\n   Reçu: ${actual}`);
  }
}

let calculerAge;
try {
  const module = await import('./index.js');
  calculerAge = module.calculerAge;
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}


(async () => {
test('Doit définir la fonction calculerAge', () => {
  assertEquals(typeof calculerAge, 'function', 'calculerAge doit être une fonction');
  assertEquals(calculerAge.length, 1, 'La fonction calculerAge doit avoir 1 paramètre');
});

test('Doit calculer l\'âge correctement pour 1990', () => {
  const age = calculerAge(1990);
  assertEquals(age, 35, 'calculerAge(1990) doit retourner 35 (2025 - 1990)');
});

test('Doit calculer l\'âge correctement pour 2000', () => {
  const age = calculerAge(2000);
  assertEquals(age, 25, 'calculerAge(2000) doit retourner 25 (2025 - 2000)');
});

test('Doit calculer l\'âge correctement pour 2005', () => {
  const age = calculerAge(2005);
  assertEquals(age, 20, 'calculerAge(2005) doit retourner 20 (2025 - 2005)');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}

})();
