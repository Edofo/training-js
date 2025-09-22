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

let compterJusqua;
try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

console.log = originalLog;

test('Doit définir la fonction compterJusqua', () => {
  assertEquals(typeof compterJusqua, 'function', 'compterJusqua doit être une fonction');
  assertEquals(compterJusqua.length, 1, 'La fonction compterJusqua doit avoir 1 paramètre');
});

test('Doit compter de 1 à 3', () => {
  consoleOutput = []; // Reset
  const originalLog2 = console.log;
  console.log = (...args) => {
    consoleOutput.push(args.join(' '));
    originalLog2(...args);
  };
  
  compterJusqua(3);
  console.log = originalLog2;
  
  assertEquals(
    consoleOutput.some(output => output.includes('1')),
    true,
    'La fonction doit afficher 1'
  );
  assertEquals(
    consoleOutput.some(output => output.includes('2')),
    true,
    'La fonction doit afficher 2'
  );
  assertEquals(
    consoleOutput.some(output => output.includes('3')),
    true,
    'La fonction doit afficher 3'
  );
});

test('Doit compter de 1 à 5', () => {
  consoleOutput = []; // Reset
  const originalLog3 = console.log;
  console.log = (...args) => {
    consoleOutput.push(args.join(' '));
    originalLog3(...args);
  };
  
  compterJusqua(5);
  console.log = originalLog3;
  
  const expectedNumbers = ['1', '2', '3', '4', '5'];
  const hasAllNumbers = expectedNumbers.every(num => 
    consoleOutput.some(output => output.includes(num))
  );
  assertEquals(
    hasAllNumbers,
    true,
    'La fonction doit afficher tous les nombres de 1 à 5'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
