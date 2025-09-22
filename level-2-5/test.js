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

let estEmailValide;
try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

test('Doit définir la fonction estEmailValide', () => {
  assertEquals(typeof estEmailValide, 'function', 'estEmailValide doit être une fonction');
  assertEquals(estEmailValide.length, 1, 'La fonction estEmailValide doit avoir 1 paramètre');
});

test('Doit valider des emails corrects', () => {
  assertEquals(estEmailValide("test@example.com"), true, '"test@example.com" doit être valide');
  assertEquals(estEmailValide("user@domain.fr"), true, '"user@domain.fr" doit être valide');
  assertEquals(estEmailValide("hello@world.org"), true, '"hello@world.org" doit être valide');
});

test('Doit rejeter des emails sans @', () => {
  assertEquals(estEmailValide("testexample.com"), false, '"testexample.com" doit être invalide (pas de @)');
  assertEquals(estEmailValide("user.domain.fr"), false, '"user.domain.fr" doit être invalide (pas de @)');
});

test('Doit rejeter des emails sans point après @', () => {
  assertEquals(estEmailValide("test@example"), false, '"test@example" doit être invalide (pas de point après @)');
  assertEquals(estEmailValide("user@domain"), false, '"user@domain" doit être invalide (pas de point après @)');
});

test('Doit rejeter des emails avec point avant @', () => {
  assertEquals(estEmailValide("test.user@example"), false, '"test.user@example" doit être invalide (point avant @, pas après)');
});

test('Doit gérer les cas limites', () => {
  assertEquals(estEmailValide(""), false, 'Chaîne vide doit être invalide');
  assertEquals(estEmailValide("@"), false, '"@" seul doit être invalide');
  assertEquals(estEmailValide("@."), false, '"@." doit être invalide');
  assertEquals(estEmailValide("a@b.c"), true, '"a@b.c" doit être valide (minimal)');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
