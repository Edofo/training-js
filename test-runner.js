const fs = require('fs');
const path = require('path');

const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

const levels = [
  { name: 'Niveau 0 - Ultra Simple', folder: 'level-0', exercises: 10 },
  { name: 'Niveau 1 - Débutant', folder: 'level-1', exercises: 4 },
  { name: 'Niveau 2 - Intermédiaire', folder: 'level-2', exercises: 5 },
  { name: 'Niveau 3 - Intermédiaire+', folder: 'level-3', exercises: 5 }
];

function runTest(testFile, watchMode = false) {
  try {
    const originalCwd = process.cwd();
    const originalExit = process.exit;
    const testDir = path.dirname(testFile);
    process.chdir(testDir);
    
    if (watchMode) {
      process.exit = (code) => {
        throw new Error(`TEST_EXIT_${code || 0}`);
      };
    }
    
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
    process.exit = originalExit;
    return true;
  } catch (error) {
    if (watchMode && error.message.startsWith('TEST_EXIT_')) {
      const exitCode = parseInt(error.message.replace('TEST_EXIT_', ''));
      try {
        process.chdir(path.dirname(__filename));
      } catch (e) {}
      return exitCode === 0;
    }
    console.log(colors.red(`❌ Erreur: ${error.message}`));
    try {
      process.chdir(path.dirname(__filename));
    } catch (e) {}
    return false;
  }
}

function runExercise(level, exercise, watchMode = false) {
  const exerciseFolder = `${levels[level].folder}-${exercise}`;
  const testFile = path.join(__dirname, exerciseFolder, 'test.js');
  
  if (!fs.existsSync(testFile)) {
    console.log(colors.red(`❌ Test non trouvé: ${testFile}`));
    return false;
  }
  
  console.log(colors.blue(`\n🧪 Test de l'exercice ${level}.${exercise}`));
  console.log(colors.cyan(`📁 Dossier: ${exerciseFolder}`));
  
  const success = runTest(testFile, watchMode);
  
  if (success) {
    console.log(colors.green(`✅ Exercice ${level}.${exercise} réussi !`));
    return true;
  } else {
    console.log(colors.red(`❌ Exercice ${level}.${exercise} échoué`));
    console.log(colors.yellow(`💡 Consultez le fichier tips.md pour des indices`));
    if (watchMode) {
      console.log(colors.cyan(`👀 Modifiez votre fichier et sauvegardez pour retester...`));
    }
    return false;
  }
}

function runLevel(levelIndex, watchMode = false) {
  const level = levels[levelIndex];
  console.log(colors.bold(`\n🎯 ${level.name}`));
  
  let passedExercises = 0;
  
  for (let i = 1; i <= level.exercises; i++) {
    if (runExercise(levelIndex, i, watchMode)) {
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
    if (watchMode) {
      const nextExercise = passedExercises + 1;
      console.log(colors.cyan(`🎯 Concentrez-vous sur l'exercice ${levelIndex}.${nextExercise}`));
      console.log(colors.cyan(`👀 Modifiez vos fichiers et sauvegardez pour retester...`));
    }
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

function watchFiles(callback) {
  const watchedDirs = [];
  
  levels.forEach((level, index) => {
    for (let i = 1; i <= level.exercises; i++) {
      const exerciseFolder = `${level.folder}-${i}`;
      const exerciseDir = path.join(__dirname, exerciseFolder);
      if (fs.existsSync(exerciseDir)) {
        watchedDirs.push(exerciseDir);
      }
    }
  });
  
  console.log(colors.cyan('👀 Surveillance des fichiers activée...'));
  console.log(colors.yellow('💡 Sauvegardez vos fichiers pour relancer automatiquement les tests'));
  console.log(colors.gray('   (Ctrl+C pour arrêter)\n'));
  
  const watchers = watchedDirs.map(dir => {
    return fs.watch(dir, { recursive: false }, (eventType, filename) => {
      if (filename && filename.endsWith('.js')) {
        console.clear();
        console.log(colors.cyan(`🔄 Fichier modifié: ${filename}`));
        callback();
      }
    });
  });
  
  process.on('SIGINT', () => {
    console.log(colors.yellow('\n👋 Arrêt de la surveillance...'));
    watchers.forEach(watcher => watcher.close());
    process.exit(0);
  });
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
    console.log('  npm run watch               - Surveiller et relancer automatiquement');
    console.log('  npm run watch:level <n>     - Surveiller un niveau spécifique');
    console.log('  npm run watch:exercise <l.e>- Surveiller un exercice spécifique');
    console.log('\nExemples:');
    console.log('  npm run test:level 0        - Tester tout le niveau 0');
    console.log('  npm run test:exercise 0.1   - Tester l\'exercice 0.1');
    console.log('  npm run watch:level 0       - Surveiller le niveau 0');
    console.log('  npm run watch:exercise 0.1  - Surveiller l\'exercice 0.1');
    return;
  }
  
  const isWatch = args.includes('--watch');
  
  if (args.includes('--level') && args[args.indexOf('--level') + 1]) {
    const levelIndex = parseInt(args[args.indexOf('--level') + 1]);
    if (levelIndex >= 0 && levelIndex < levels.length) {
      if (isWatch) {
        runLevel(levelIndex, true);
        watchFiles(() => runLevel(levelIndex, true));
      } else {
        runLevel(levelIndex);
      }
    } else {
      console.log(colors.red('❌ Niveau invalide. Utilisez 0, 1, 2 ou 3'));
    }
    return;
  }
  
  if (args.includes('--exercise') && args[args.indexOf('--exercise') + 1]) {
    const exerciseArg = args[args.indexOf('--exercise') + 1];
    const [levelStr, exerciseStr] = exerciseArg.split('.');
    const level = parseInt(levelStr);
    const exercise = parseInt(exerciseStr);
    
    if (level >= 0 && level < levels.length && exercise >= 1 && exercise <= levels[level].exercises) {
      if (isWatch) {
        runExercise(level, exercise, true);
        watchFiles(() => runExercise(level, exercise, true));
      } else {
        runExercise(level, exercise);
      }
    } else {
      console.log(colors.red('❌ Exercice invalide. Format: niveau.exercice (ex: 0.1)'));
    }
    return;
  }
  
  if (isWatch) {
    showProgress();
    watchFiles(() => showProgress());
    return;
  }
  
  showProgress();
  console.log(colors.yellow('\n💡 Utilisez --help pour voir toutes les commandes disponibles'));
}

main();
