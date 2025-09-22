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

let consoleOutput = [];
const originalLog = console.log;
console.log = (...args) => {
  consoleOutput.push(args.join(' '));
  originalLog(...args);
};

let nom;
try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

console.log = originalLog;

test('Doit créer une variable "nom"', () => {
  assertEquals(typeof nom !== 'undefined', true, 'La variable "nom" doit être définie');
  assertEquals(typeof nom, 'string', 'La variable "nom" doit être une chaîne de caractères');
  assertEquals(nom.length > 0, true, 'La variable "nom" ne doit pas être vide');
});

test('Doit afficher la variable nom dans la console', () => {
  assertEquals(
    consoleOutput.some(output => output.includes(nom)),
    true,
    'Votre code doit afficher la valeur de la variable nom avec console.log(nom)'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
