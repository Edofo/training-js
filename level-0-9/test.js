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

try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

console.log = originalLog;

test('Doit créer un objet moi avec les propriétés nom et age', () => {
  assertEquals(typeof moi, 'object', 'moi doit être un objet');
  assertEquals(typeof moi.nom, 'string', 'moi.nom doit être une chaîne de caractères');
  assertEquals(typeof moi.age, 'number', 'moi.age doit être un nombre');
  assertEquals(moi.nom.length > 0, true, 'moi.nom ne doit pas être vide');
});

test('Doit afficher le nom de l\'objet', () => {
  assertEquals(
    consoleOutput.some(output => output.includes(moi.nom)),
    true,
    'Votre code doit afficher la propriété nom de l\'objet moi'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
