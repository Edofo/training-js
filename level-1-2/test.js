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

let estMajeur;
try {
  const module = await import('./index.js');
  estMajeur = module.estMajeur;
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}


(async () => {
test('Doit définir la fonction estMajeur', () => {
  assertEquals(typeof estMajeur, 'function', 'estMajeur doit être une fonction');
  assertEquals(estMajeur.length, 1, 'La fonction estMajeur doit avoir 1 paramètre');
});

test('Doit retourner true pour un âge >= 18', () => {
  assertEquals(estMajeur(18), true, 'estMajeur(18) doit retourner true');
  assertEquals(estMajeur(25), true, 'estMajeur(25) doit retourner true');
  assertEquals(estMajeur(65), true, 'estMajeur(65) doit retourner true');
});

test('Doit retourner false pour un âge < 18', () => {
  assertEquals(estMajeur(17), false, 'estMajeur(17) doit retourner false');
  assertEquals(estMajeur(10), false, 'estMajeur(10) doit retourner false');
  assertEquals(estMajeur(0), false, 'estMajeur(0) doit retourner false');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}

})();
