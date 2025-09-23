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

test('Doit créer un tableau fruits avec les bons éléments', () => {
  assertEquals(Array.isArray(fruits), true, 'fruits doit être un tableau');
  assertArrayEquals(fruits, ["pomme", "banane", "orange"], 'Le tableau fruits doit contenir ["pomme", "banane", "orange"]');
});

test('Doit afficher le premier fruit (pomme)', () => {
  assertEquals(
    consoleOutput.some(output => output.includes('pomme')),
    true,
    'Votre code doit afficher le premier fruit du tableau (pomme)'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
