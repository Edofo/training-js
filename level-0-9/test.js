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

test('Doit créer un objet moi avec les propriétés nom et age', () => {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  assertEquals(
    studentCode.match(/(?:const|let|var)\s+moi\s*=\s*{/) !== null,
    true,
    'moi doit être un objet'
  );
  assertEquals(
    studentCode.includes('nom') && studentCode.includes('age'),
    true,
    'L\'objet moi doit avoir les propriétés nom et age'
  );
});

test('Doit afficher le nom de l\'objet', () => {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  assertEquals(
    studentCode.includes('console.log') && (studentCode.includes('moi.nom') || studentCode.includes('moi["nom"]')),
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
