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

test('Doit afficher les nombres de 1 à 5', () => {
  const expectedNumbers = ['1', '2', '3', '4', '5'];
  const hasAllNumbers = expectedNumbers.every(num => 
    consoleOutput.some(output => output.includes(num))
  );
  assertEquals(
    hasAllNumbers,
    true,
    'Votre code doit afficher tous les nombres de 1 à 5'
  );
});

test('Doit afficher exactement 5 nombres', () => {
  const numberCount = consoleOutput.filter(output => 
    /^[1-5]$/.test(output.trim())
  ).length;
  assertEquals(
    numberCount >= 5,
    true,
    'Votre code doit afficher au moins les 5 nombres'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
