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

function assertObjectEquals(actual, expected, message = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\n   Attendu: ${JSON.stringify(expected)}\n   Reçu: ${JSON.stringify(actual)}`);
  }
}

try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

test('Doit définir la fonction grouperParAge', () => {
  assertEquals(typeof grouperParAge, 'function', 'grouperParAge doit être une fonction');
  assertEquals(grouperParAge.length, 1, 'La fonction grouperParAge doit avoir 1 paramètre');
});

test('Doit grouper correctement par tranches d\'âge', () => {
  const personnes = [
    { nom: "Alice", age: 15 },
    { nom: "Bob", age: 25 },
    { nom: "Charlie", age: 70 },
    { nom: "Diana", age: 5 },
    { nom: "Eva", age: 45 }
  ];
  
  const resultat = grouperParAge(personnes);
  
  assertEquals(typeof resultat, 'object', 'Le résultat doit être un objet');
  assertEquals(Array.isArray(resultat["0-17"]), true, 'La tranche "0-17" doit être un tableau');
  assertEquals(Array.isArray(resultat["18-64"]), true, 'La tranche "18-64" doit être un tableau');
  assertEquals(Array.isArray(resultat["65+"]), true, 'La tranche "65+" doit être un tableau');
});

test('Doit classer Alice (15 ans) dans 0-17', () => {
  const personnes = [{ nom: "Alice", age: 15 }];
  const resultat = grouperParAge(personnes);
  
  assertEquals(resultat["0-17"].length, 1, 'Il doit y avoir 1 personne dans 0-17');
  assertEquals(resultat["0-17"][0].nom, "Alice", 'Alice doit être dans la tranche 0-17');
});

test('Doit classer Bob (25 ans) dans 18-64', () => {
  const personnes = [{ nom: "Bob", age: 25 }];
  const resultat = grouperParAge(personnes);
  
  assertEquals(resultat["18-64"].length, 1, 'Il doit y avoir 1 personne dans 18-64');
  assertEquals(resultat["18-64"][0].nom, "Bob", 'Bob doit être dans la tranche 18-64');
});

test('Doit classer Charlie (70 ans) dans 65+', () => {
  const personnes = [{ nom: "Charlie", age: 70 }];
  const resultat = grouperParAge(personnes);
  
  assertEquals(resultat["65+"].length, 1, 'Il doit y avoir 1 personne dans 65+');
  assertEquals(resultat["65+"][0].nom, "Charlie", 'Charlie doit être dans la tranche 65+');
});

test('Doit gérer les cas limites (18 et 65 ans)', () => {
  const personnes = [
    { nom: "Jeune", age: 18 },
    { nom: "Senior", age: 65 }
  ];
  const resultat = grouperParAge(personnes);
  
  assertEquals(resultat["18-64"].length, 2, 'Les personnes de 18 et 65 ans doivent être dans 18-64');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
