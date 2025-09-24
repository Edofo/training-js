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

function assertArrayEquals(actual, expected, message = '') {
  if (!Array.isArray(actual) || actual.length !== expected.length) {
    throw new Error(`${message}\n   Attendu: ${JSON.stringify(expected)}\n   Reçu: ${JSON.stringify(actual)}`);
  }
  for (let i = 0; i < expected.length; i++) {
    if (JSON.stringify(actual[i]) !== JSON.stringify(expected[i])) {
      throw new Error(`${message}\n   À l'index ${i}:\n   Attendu: ${JSON.stringify(expected[i])}\n   Reçu: ${JSON.stringify(actual[i])}`);
    }
  }
}

let trierPersonnes;
try {
  const module = await import('./index.js');
  trierPersonnes = module.trierPersonnes;
} catch (error) {
  console.log(`❌ Erreur lors du chargement du code: ${error.message}`);
  process.exit(1);
}


(async () => {
test('Doit définir la fonction trierPersonnes', () => {
  assertEquals(typeof trierPersonnes, 'function', 'trierPersonnes doit être une fonction');
  assertEquals(trierPersonnes.length, 2, 'La fonction trierPersonnes doit avoir 2 paramètres');
});

test('Doit trier par nom (ordre alphabétique)', () => {
  const personnes = [
    { nom: "Charlie", age: 30 },
    { nom: "Alice", age: 25 },
    { nom: "Bob", age: 35 }
  ];
  
  const resultat = trierPersonnes(personnes, "nom");
  
  assertArrayEquals(resultat, [
    { nom: "Alice", age: 25 },
    { nom: "Bob", age: 35 },
    { nom: "Charlie", age: 30 }
  ], 'Tri par nom (ordre alphabétique)');
});

test('Doit trier par âge (ordre croissant)', () => {
  const personnes = [
    { nom: "Charlie", age: 30 },
    { nom: "Alice", age: 25 },
    { nom: "Bob", age: 35 }
  ];
  
  const resultat = trierPersonnes(personnes, "age");
  
  assertArrayEquals(resultat, [
    { nom: "Alice", age: 25 },
    { nom: "Charlie", age: 30 },
    { nom: "Bob", age: 35 }
  ], 'Tri par âge (ordre croissant)');
});

test('Doit retourner un nouveau tableau (ne pas modifier l\'original)', () => {
  const personnes = [
    { nom: "Charlie", age: 30 },
    { nom: "Alice", age: 25 }
  ];
  const original = JSON.parse(JSON.stringify(personnes));
  
  const resultat = trierPersonnes(personnes, "nom");
  
  assertEquals(
    JSON.stringify(personnes), 
    JSON.stringify(original),
    'Le tableau original ne doit pas être modifié'
  );
  
  assertEquals(
    resultat !== personnes,
    true,
    'La fonction doit retourner un nouveau tableau'
  );
});

test('Doit gérer un tableau avec une seule personne', () => {
  const personnes = [{ nom: "Alice", age: 25 }];
  
  const resultatNom = trierPersonnes(personnes, "nom");
  const resultatAge = trierPersonnes(personnes, "age");
  
  assertArrayEquals(resultatNom, [{ nom: "Alice", age: 25 }], 'Tri par nom avec une personne');
  assertArrayEquals(resultatAge, [{ nom: "Alice", age: 25 }], 'Tri par âge avec une personne');
});

test('Doit gérer les noms identiques en triant par âge', () => {
  const personnes = [
    { nom: "Alice", age: 30 },
    { nom: "Alice", age: 25 },
    { nom: "Alice", age: 35 }
  ];
  
  const resultat = trierPersonnes(personnes, "nom");
  
  assertEquals(resultat.length, 3, 'Doit conserver tous les éléments');
  assertEquals(resultat[0].nom, "Alice", 'Tous les noms doivent être Alice');
  assertEquals(resultat[1].nom, "Alice", 'Tous les noms doivent être Alice');
  assertEquals(resultat[2].nom, "Alice", 'Tous les noms doivent être Alice');
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
} else {
  process.exit(1);
}

})();
