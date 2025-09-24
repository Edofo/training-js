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

try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

console.log = originalLog;

test('Doit définir la fonction direBonjour avec un paramètre', () => {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  assertEquals(
    studentCode.includes('function direBonjour') || studentCode.includes('const direBonjour') || studentCode.includes('let direBonjour'),
    true,
    'direBonjour doit être une fonction'
  );
  assertEquals(
    studentCode.match(/function\s+direBonjour\s*\([^)]*\)/) !== null || studentCode.match(/direBonjour\s*=.*\([^)]*\)\s*=>/) !== null,
    true,
    'La fonction direBonjour doit avoir un paramètre'
  );
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
