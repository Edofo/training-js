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

// Test du contenu HTML
test('Doit contenir un fichier HTML avec un bouton', () => {
  const htmlFile = path.join(__dirname, 'index.html');
  assertEquals(fs.existsSync(htmlFile), true, 'Le fichier index.html doit exister');
  
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  assertEquals(
    htmlContent.includes('<button') || htmlContent.includes('<input type="button"'),
    true,
    'Le fichier HTML doit contenir un élément bouton'
  );
});

// Test du contenu JavaScript
test('Doit contenir du JavaScript pour gérer le clic', () => {
  const jsFile = path.join(__dirname, 'index.js');
  assertEquals(fs.existsSync(jsFile), true, 'Le fichier index.js doit exister');
  
  const jsContent = fs.readFileSync(jsFile, 'utf8');
  const hasClickHandler = 
    jsContent.includes('addEventListener') ||
    jsContent.includes('onclick') ||
    jsContent.includes('click');
  
  assertEquals(
    hasClickHandler,
    true,
    'Le fichier JavaScript doit contenir un gestionnaire de clic'
  );
  
  assertEquals(
    jsContent.includes('console.log') && jsContent.includes('Clic'),
    true,
    'Le code doit afficher "Clic!" avec console.log'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
  console.log('💡 Pour tester visuellement, ouvrez index.html dans votre navigateur');
} else {
  process.exit(1);
}
