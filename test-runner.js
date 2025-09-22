const fs = require('fs');
const path = require('path');

const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

const levels = [
  { name: 'Niveau 0 - Ultra Simple', folder: 'level-0', exercises: 10 },
  { name: 'Niveau 1 - Débutant', folder: 'level-1', exercises: 4 },
  { name: 'Niveau 2 - Intermédiaire', folder: 'level-2', exercises: 5 },
  { name: 'Niveau 3 - Intermédiaire+', folder: 'level-3', exercises: 5 }
];

function runTest(testFile) {
  try {
    const originalCwd = process.cwd();
    const testDir = path.dirname(testFile);
    process.chdir(testDir);
    
    const testContent = fs.readFileSync(testFile, 'utf8');
    
    const testContext = {
      require: require,
      console: console,
      process: process,
      Buffer: Buffer,
      __dirname: testDir,
      __filename: testFile,
      module: { exports: {} },
      exports: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setInterval: setInterval,
      clearInterval: clearInterval
    };
    
    const testFunction = new Function(
      ...Object.keys(testContext),
      testContent
    );
    
    testFunction(...Object.values(testContext));
    
    process.chdir(originalCwd);
    return true;
  } catch (error) {
    console.log(colors.red(`❌ Erreur: ${error.message}`));
    try {
      process.chdir(path.dirname(__filename));
    } catch (e) {}
    return false;
  }
}

function runExercise(level, exercise) {
  const exerciseFolder = `${levels[level].folder}-${exercise}`;
  const testFile = path.join(__dirname, exerciseFolder, 'test.js');
  
  if (!fs.existsSync(testFile)) {
    console.log(colors.red(`❌ Test non trouvé: ${testFile}`));
    return false;
  }
  
  console.log(colors.blue(`\n🧪 Test de l'exercice ${level}.${exercise}`));
  console.log(colors.cyan(`📁 Dossier: ${exerciseFolder}`));
  
  const success = runTest(testFile);
  
  if (success) {
    console.log(colors.green(`✅ Exercice ${level}.${exercise} réussi !`));
    return true;
  } else {
    console.log(colors.red(`❌ Exercice ${level}.${exercise} échoué`));
    console.log(colors.yellow(`💡 Consultez le fichier tips.md pour des indices`));
    return false;
  }
}

function runLevel(levelIndex) {
  const level = levels[levelIndex];
  console.log(colors.bold(`\n🎯 ${level.name}`));
  
  let passedExercises = 0;
  
  for (let i = 1; i <= level.exercises; i++) {
    if (runExercise(levelIndex, i)) {
      passedExercises++;
    } else {
      break;
    }
  }
  
  if (passedExercises === level.exercises) {
    console.log(colors.green(`\n🎉 Niveau ${levelIndex} terminé ! Vous pouvez passer au niveau suivant.`));
    return true;
  } else {
    console.log(colors.yellow(`\n📊 Progression: ${passedExercises}/${level.exercises} exercices réussis`));
    return false;
  }
}

function checkExerciseExists(level, exercise) {
  const exerciseFolder = `${levels[level].folder}-${exercise}`;
  const indexFile = path.join(__dirname, exerciseFolder, 'index.js');
  const testFile = path.join(__dirname, exerciseFolder, 'test.js');
  return fs.existsSync(indexFile) && fs.existsSync(testFile);
}

function testExerciseSilently(level, exercise) {
  const exerciseFolder = `${levels[level].folder}-${exercise}`;
  const testFile = path.join(__dirname, exerciseFolder, 'test.js');
  
  if (!fs.existsSync(testFile)) {
    return false;
  }
  
  const originalCwd = process.cwd();
  const originalLog = console.log;
  const originalError = console.error;
  const originalExit = process.exit;
  
  try {
    console.log = () => {};
    console.error = () => {};
    process.exit = (code) => { throw new Error(`TEST_EXIT_${code || 1}`); };
    
    const testDir = path.dirname(testFile);
    process.chdir(testDir);
    
    const testContent = fs.readFileSync(testFile, 'utf8');
    
    const vm = require('vm');
    const context = vm.createContext({
      require: require,
      console: { log: () => {}, error: () => {} },
      process: { 
        ...process, 
        exit: (code) => { throw new Error(`TEST_EXIT_${code || 1}`); }
      },
      Buffer: Buffer,
      __dirname: testDir,
      __filename: testFile,
      module: { exports: {} },
      exports: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setInterval: setInterval,
      clearInterval: clearInterval,
      global: {}
    });
    
    vm.runInContext(testContent, context, { timeout: 5000 });
    
    return true;
    
  } catch (error) {
    return false;
  } finally {
    console.log = originalLog;
    console.error = originalError;
    process.exit = originalExit;
    process.chdir(originalCwd);
  }
}

function showProgress() {
  console.log(colors.bold('\n📈 Progression générale:'));
  console.log(colors.cyan('⏳ Analyse de vos solutions en cours...'));
  
  levels.forEach((level, index) => {
    let total = 0;
    let passed = 0;
    
    for (let i = 1; i <= level.exercises; i++) {
      if (checkExerciseExists(index, i)) {
        total++;
        if (testExerciseSilently(index, i)) {
          passed++;
        }
      }
    }
    
    const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;
    let status;
    if (passed === total && total > 0) {
      status = '✅';
    } else if (passed > 0) {
      status = '🔄';
    } else {
      status = '❌';
    }
    
    console.log(`${status} ${level.name}: ${passed}/${total} tests réussis (${percentage}%)`);
  });
  
  console.log(colors.yellow('\n💡 Pour tester individuellement:'));
  console.log('   npm run test:level 0        - Tester tout le niveau 0');
  console.log('   npm run test:exercise 0.1   - Tester l\'exercice 0.1');
}

function main() {
  const args = process.argv.slice(2);
  
  console.log(colors.bold('🚀 JavaScript TDD Exercises'));
  console.log(colors.cyan('===============================\n'));
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Commandes disponibles:');
    console.log('  npm test                    - Afficher la progression');
    console.log('  npm run test:level <n>      - Tester un niveau complet');
    console.log('  npm run test:exercise <l.e> - Tester un exercice spécifique');
    console.log('\nExemples:');
    console.log('  npm run test:level 0        - Tester tout le niveau 0');
    console.log('  npm run test:exercise 0.1   - Tester l\'exercice 0.1');
    return;
  }
  
  if (args.includes('--level') && args[1]) {
    const levelIndex = parseInt(args[1]);
    if (levelIndex >= 0 && levelIndex < levels.length) {
      runLevel(levelIndex);
    } else {
      console.log(colors.red('❌ Niveau invalide. Utilisez 0, 1, 2 ou 3'));
    }
    return;
  }
  
  if (args.includes('--exercise') && args[1]) {
    const [levelStr, exerciseStr] = args[1].split('.');
    const level = parseInt(levelStr);
    const exercise = parseInt(exerciseStr);
    
    if (level >= 0 && level < levels.length && exercise >= 1 && exercise <= levels[level].exercises) {
      runExercise(level, exercise);
    } else {
      console.log(colors.red('❌ Exercice invalide. Format: niveau.exercice (ex: 0.1)'));
    }
    return;
  }
  
  showProgress();
  console.log(colors.yellow('\n💡 Utilisez --help pour voir toutes les commandes disponibles'));
}

main();
