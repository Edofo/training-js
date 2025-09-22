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
test('Doit contenir un fichier HTML avec les éléments nécessaires', () => {
  const htmlFile = path.join(__dirname, 'index.html');
  assertEquals(fs.existsSync(htmlFile), true, 'Le fichier index.html doit exister');
  
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  assertEquals(
    htmlContent.includes('buttons-container'),
    true,
    'Le HTML doit contenir un élément avec id "buttons-container"'
  );
});

// Test du contenu JavaScript
test('Doit définir la fonction ajouterBoutonMagique', () => {
  const jsFile = path.join(__dirname, 'index.js');
  assertEquals(fs.existsSync(jsFile), true, 'Le fichier index.js doit exister');
  
  const jsContent = fs.readFileSync(jsFile, 'utf8');
  assertEquals(
    jsContent.includes('function ajouterBoutonMagique') || 
    jsContent.includes('ajouterBoutonMagique = ') ||
    jsContent.includes('const ajouterBoutonMagique'),
    true,
    'Le code doit définir une fonction ajouterBoutonMagique'
  );
});

test('Doit utiliser createElement pour créer un bouton', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  assertEquals(
    jsContent.includes('createElement') && 
    (jsContent.includes('button') || jsContent.includes('\'button\'')),
    true,
    'Le code doit utiliser createElement pour créer un bouton'
  );
});

test('Doit ajouter un gestionnaire d\'événement pour le clic', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  const hasClickHandler = 
    jsContent.includes('addEventListener') ||
    jsContent.includes('onclick') ||
    jsContent.includes('click');
  
  assertEquals(
    hasClickHandler,
    true,
    'Le code doit ajouter un gestionnaire de clic au bouton'
  );
});

test('Doit utiliser appendChild ou une méthode similaire', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  const hasAppendMethod = 
    jsContent.includes('appendChild') ||
    jsContent.includes('append') ||
    jsContent.includes('insertBefore');
  
  assertEquals(
    hasAppendMethod,
    true,
    'Le code doit ajouter le bouton au DOM avec appendChild ou une méthode similaire'
  );
});

test('Doit changer la couleur du bouton (backgroundColor)', () => {
  const jsContent = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  assertEquals(
    jsContent.includes('backgroundColor') || jsContent.includes('background-color'),
    true,
    'Le code doit modifier la couleur de fond du bouton'
  );
});

console.log(`\nRésultat: ${testsPassed}/${testsTotal} tests réussis`);
if (testsPassed === testsTotal) {
  console.log('🎉 Tous les tests sont passés !');
  console.log('💡 Pour tester visuellement, ouvrez index.html dans votre navigateur');
} else {
  process.exit(1);
}
