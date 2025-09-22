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

let direBonjour;
try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

console.log = originalLog;

test('Doit définir la fonction direBonjour avec un paramètre', () => {
  assertEquals(typeof direBonjour, 'function', 'direBonjour doit être une fonction');
  assertEquals(direBonjour.length, 1, 'La fonction direBonjour doit avoir 1 paramètre');
});

test('Doit afficher "Bonjour [prénom]!" avec le prénom donné', () => {
  const hasValidOutput = consoleOutput.some(output => 
    output.includes('Bonjour') && output.includes('!')
  );
  assertEquals(
    hasValidOutput,
    true,
    'La fonction doit afficher "Bonjour [prénom]!" et être appelée avec un prénom'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
