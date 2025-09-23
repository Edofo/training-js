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

try {
  const studentCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  eval(studentCode);
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}

test('Doit créer un objet voiture avec les bonnes propriétés', () => {
  assertEquals(typeof voiture, 'object', 'voiture doit être un objet');
  assertEquals(typeof voiture.marque, 'string', 'voiture.marque doit être une chaîne');
  assertEquals(typeof voiture.modele, 'string', 'voiture.modele doit être une chaîne');
  assertEquals(typeof voiture.annee, 'number', 'voiture.annee doit être un nombre');
  assertEquals(voiture.marque.length > 0, true, 'voiture.marque ne doit pas être vide');
  assertEquals(voiture.modele.length > 0, true, 'voiture.modele ne doit pas être vide');
});

test('Doit avoir une méthode getAge', () => {
  assertEquals(typeof voiture.getAge, 'function', 'voiture.getAge doit être une fonction');
});

test('La méthode getAge doit calculer l\'âge correctement', () => {
  if (voiture.annee === 2020) {
    assertEquals(voiture.getAge(), 5, 'Une voiture de 2020 doit avoir 5 ans en 2025');
  } else {
    const age = voiture.getAge();
    assertEquals(typeof age, 'number', 'getAge() doit retourner un nombre');
    assertEquals(age >= 0, true, 'L\'âge doit être positif');
    assertEquals(age, 2025 - voiture.annee, 'L\'âge doit être calculé comme 2025 - année');
  }
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}
