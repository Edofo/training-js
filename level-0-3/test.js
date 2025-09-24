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

test('Doit créer les variables a=5 et b=3', () => {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  assertEquals(
    studentCode.match(/(?:const|let|var)\s+a\s*=\s*5/) !== null,
    true,
    'La variable "a" doit valoir 5'
  );
  assertEquals(
    studentCode.match(/(?:const|let|var)\s+b\s*=\s*3/) !== null,
    true,
    'La variable "b" doit valoir 3'
  );
});

test('Doit afficher la somme (8) dans la console', () => {
  assertEquals(
    consoleOutput.some(output => output.includes('8')),
    true,
    'Votre code doit afficher la somme de a et b (8) dans la console'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
