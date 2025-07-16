const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');

async function checkConsole() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(['src/**/*.{js,jsx,ts,tsx}']);

  let hasConsoleViolations = false;

  for (const result of results) {
    // Skip logger.ts file
    if (result.filePath.includes('logger.ts')) continue;

    const consoleMessages = result.messages.filter(
      msg => msg.ruleId === 'no-console'
    );

    if (consoleMessages.length > 0) {
      hasConsoleViolations = true;
      console.log(`Found console statements in: ${result.filePath}`);
      consoleMessages.forEach(msg => {
        console.log(`  Line ${msg.line}: ${msg.message}`);
      });
    }
  }

  if (hasConsoleViolations) {
    console.log(
      '\nAll console statements should use the logger utility from src/utils/logger.ts'
    );
    process.exit(1);
  } else {
    console.log(
      'No console statements found in production code (excluding logger utility)'
    );
  }
}

checkConsole().catch(console.error);
