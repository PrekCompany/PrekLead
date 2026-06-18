import fs from 'fs';
import path from 'path';

const filesToFix = [
  'src/routes/app.integrations.tsx',
  'src/routes/privacy.tsx',
  'src/routes/terms.tsx',
  'src/routes/cookies.tsx',
  'src/components/landing/Footer.tsx',
  'src/components/app/AppShell.tsx',
  'src/components/app/AICore.tsx',
  'server/src/db/index.ts',
  'server/src/index.ts',
  'server/src/middleware/auth.ts',
  'server/src/middleware/index.ts',
  'server/src/routes/analytics.ts',
  'server/src/routes/auth.ts',
  'server/src/routes/crm.ts',
  'server/src/routes/leads.ts',
  'server/src/routes/subscriptions.ts',
  'server/src/routes/telegram.ts',
  'server/src/routes/upload.ts',
  'server/src/routes/users.ts',
  'server/src/routes/webhooks.ts',
];

let fixed = 0;

for (const file of filesToFix) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${file}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;

  // Handle both \n (Unix) and \r\n (Windows) line endings
  content = content.replace(/\r?\n<\/parameter>\r?\n<\/write_to_file>\s*$/, '');
  if (content === original) {
    content = content.replace(/\r?\n<\/write_to_file>\r?\n<\/parameter>\s*$/, '');
  }
  content = content.replace(/\s+$/, '');

  if (content !== original) {
    fs.writeFileSync(fullPath, content + '\n', 'utf-8');
    console.log(`FIXED: ${file}`);
    fixed++;
  } else {
    console.log(`OK (no trailing tags): ${file}`);
  }
}

// Fix server tsconfig.json deprecated baseUrl
const tsconfigPath = path.join(process.cwd(), 'server/tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  let tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
  if (tsconfig.compilerOptions && tsconfig.compilerOptions.baseUrl !== undefined && !tsconfig.compilerOptions.ignoreDeprecations) {
    tsconfig.compilerOptions.ignoreDeprecations = "6.0";
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n', 'utf-8');
    console.log('FIXED: server/tsconfig.json (added ignoreDeprecations)');
    fixed++;
  } else {
    console.log('OK: server/tsconfig.json');
  }
}

console.log(`\nTotal files fixed: ${fixed}`);