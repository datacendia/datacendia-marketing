/**
 * deploy-ftp.cjs — Manual FTP deploy to Namecheap
 * 
 * Usage: node scripts/deploy-ftp.cjs
 * 
 * Set FTP_PASSWORD env var or you will be prompted.
 * Server: ftp.datacendia.com
 * User:   deploy@datacendia.com
 * Remote: /public_html (deploy account root)
 */
const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const FTP_SERVER = 'ftp.datacendia.com';
const FTP_USER = 'deploy@datacendia.com';

// Directories and files to exclude from upload
const EXCLUDE_DIRS = new Set([
  '.git', '.github', 'node_modules', 'scripts', 'docs'
]);
const EXCLUDE_FILES = new Set([
  'lighthouserc.js', 'serve_static.py', 'verify-translations.js',
  'fix-all-translations.js', 'generate-page-translations.js',
  'README.md', '.gitignore', 'netlify.toml', 'package.json',
  'package-lock.json', 'untranslated-text.json',
  'ENTERPRISE_PLAYBOOK.md', 'MARKETING_PLAN_ZERO_BUDGET.md',
  'MARKETING_VS_PLATFORM_AUDIT.md', 'INVESTOR_DATABASE.md',
  'MASTER_DATACENDIA_BIBLE.md', 'PITCH_DECK_TEMPLATES.md',
  'linkedin-posts.md',
  'audit-results.txt', 'audit-results-2.txt', 'audit-root-results.txt',
  'audit-root-pages-i18n.js', 'audit-translations-full.js',
  'debug-coverage.js', 'show-uncovered.js', 'analyze-coverage.js',
  'extract-untranslated.js', 'fix-nav-i18n.js'
]);

function shouldExclude(name, isDir) {
  if (isDir) return EXCLUDE_DIRS.has(name);
  if (EXCLUDE_FILES.has(name)) return true;
  if (name.startsWith('TIER-') && name.endsWith('.md')) return true;
  return false;
}

function askPassword() {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('FTP Password for deploy@datacendia.com: ', answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function ensureRemoteDir(client, remotePath) {
  const parts = remotePath.split('/').filter(Boolean);
  let current = '/';
  for (const part of parts) {
    current += part + '/';
    try { await client.send('MKD ' + current); } catch(e) { /* exists */ }
  }
}

async function uploadDir(client, localDir, remoteDir) {
  const entries = fs.readdirSync(localDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (shouldExclude(entry.name, entry.isDirectory())) continue;
    
    const localPath = path.join(localDir, entry.name);
    const remotePath = (remoteDir === '.' ? '' : remoteDir) + '/' + entry.name;
    
    if (entry.isDirectory()) {
      try {
        await ensureRemoteDir(client, remotePath);
      } catch(e) {
        console.log(`  … mkdir ${remotePath}`);
      }
      await uploadDir(client, localPath, remotePath);
    } else {
      try {
        await client.uploadFrom(localPath, remotePath);
        const size = (fs.statSync(localPath).size / 1024).toFixed(1);
        console.log(`  ✓ ${remotePath} (${size} KB)`);
      } catch (e) {
        console.error(`  ✗ ${remotePath} — ${e.message}`);
      }
    }
  }
}

async function main() {
  const password = process.env.FTP_PASSWORD || await askPassword();
  if (!password) { console.error('No password provided.'); process.exit(1); }

  const client = new ftp.Client(60000);
  client.ftp.verbose = false;

  try {
    console.log(`\nConnecting to ${FTP_SERVER} as ${FTP_USER}...`);
    await client.access({
      host: FTP_SERVER,
      user: FTP_USER,
      password: password,
      secure: false,
      port: 21
    });
    console.log('Connected!\n');

    // The deploy account root is already /public_html
    console.log('Uploading files...\n');
    await uploadDir(client, ROOT, '.');

    console.log('\n✅ Deploy complete!');
  } catch (e) {
    console.error('\n❌ Deploy failed:', e.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
