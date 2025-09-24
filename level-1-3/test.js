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

let consoleOutput = [];
const originalLog = console.log;
console.log = (...args) => {
  consoleOutput.push(args.join(' '));
  originalLog(...args);
};

let compterJusqua;
try {
  const module = await import('./index.js');
  compterJusqua = module.compterJusqua;
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

console.log = originalLog;


(async () => {
test('Doit définir la fonction compterJusqua', () => {
  assertEquals(typeof compterJusqua, 'function', 'compterJusqua doit être une fonction');
  assertEquals(compterJusqua.length, 1, 'La fonction compterJusqua doit avoir 1 paramètre');
});

test('Doit compter de 1 à 3', () => {
  consoleOutput = [];
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
  consoleOutput = []; 
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

})();
