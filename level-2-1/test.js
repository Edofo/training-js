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

let inverserMot;
try {
  const module = await import('./index.js');
  inverserMot = module.inverserMot;
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}


(async () => {
test('Doit définir la fonction inverserMot', () => {
  assertEquals(typeof inverserMot, 'function', 'inverserMot doit être une fonction');
  assertEquals(inverserMot.length, 1, 'La fonction inverserMot doit avoir 1 paramètre');
});

test('Doit inverser "hello" en "olleh"', () => {
  const resultat = inverserMot("hello");
  assertEquals(resultat, "olleh", 'inverserMot("hello") doit retourner "olleh"');
});

test('Doit inverser "JavaScript" en "tpircSavaJ"', () => {
  const resultat = inverserMot("JavaScript");
  assertEquals(resultat, "tpircSavaJ", 'inverserMot("JavaScript") doit retourner "tpircSavaJ"');
});

test('Doit gérer les mots courts', () => {
  assertEquals(inverserMot("a"), "a", 'inverserMot("a") doit retourner "a"');
  assertEquals(inverserMot("ab"), "ba", 'inverserMot("ab") doit retourner "ba"');
});

test('Doit gérer une chaîne vide', () => {
  const resultat = inverserMot("");
  assertEquals(resultat, "", 'inverserMot("") doit retourner ""');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}

})();
