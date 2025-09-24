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

test('Doit créer une variable "nom"', () => {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  assertEquals(
    studentCode.includes('const nom') || studentCode.includes('let nom') || studentCode.includes('var nom'),
    true,
    'La variable "nom" doit être définie'
  );
  assertEquals(
    studentCode.match(/(?:const|let|var)\s+nom\s*=\s*["'][^"']+["']/) !== null,
    true,
    'La variable "nom" doit être une chaîne de caractères non vide'
  );
});

test('Doit afficher la variable nom dans la console', () => {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  const nomMatch = studentCode.match(/(?:const|let|var)\s+nom\s*=\s*["']([^"']+)["']/);
  if (nomMatch) {
    const nomValue = nomMatch[1];
    assertEquals(
      consoleOutput.some(output => output.includes(nomValue)),
      true,
      'Votre code doit afficher la valeur de la variable nom avec console.log(nom)'
    );
  } else {
    assertEquals(
      studentCode.includes('console.log(nom)'),
      true,
      'Votre code doit contenir console.log(nom)'
    );
  }
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
