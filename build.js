const fs = require('fs');
const path = require('path');

// === Configuration ===
const VAULT_IMAGE_DIR = String.raw`C:\Users\ryanw\Sync\notebook\z Hidden\z hidden images`;
const VAULT_PREFIX = 'z Hidden/z hidden images/'; // prefix used inside .canvas files
const MEDIA_DIR = path.join(__dirname, 'media');
const PAGES_FILE = path.join(__dirname, 'pages.json');

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function extractTitle(raw) {
  const textNode = raw.nodes.find(n => n.type === 'text');
  if (textNode) return textNode.text.replace(/^#+\s*/, '');
  return null;
}

function run() {
  // Auto-discover all .canvas files in the project directory
  const canvasFiles = fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.canvas'))
    .map(f => f.slice(0, -7)); // strip .canvas extension

  if (canvasFiles.length === 0) {
    console.log('No .canvas files found.');
    return;
  }

  console.log(`Found ${canvasFiles.length} canvas file(s): ${canvasFiles.join(', ')}`);

  // Ensure base media directory exists
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR);
  }

  let totalCopied = 0;
  let totalSkipped = 0;
  const pages = [];

  for (const canvasName of canvasFiles) {
    const canvasFile = path.join(__dirname, canvasName + '.canvas');
    const slug = slugify(canvasName);
    const destDir = path.join(MEDIA_DIR, slug);

    // Parse canvas
    const raw = JSON.parse(fs.readFileSync(canvasFile, 'utf-8'));
    const title = extractTitle(raw) || canvasName;
    pages.push({ canvas: canvasName, title });

    console.log(`\n--- ${title} (${canvasName}.canvas) ---`);

    const fileNodes = raw.nodes.filter(n => n.type === 'file');

    if (fileNodes.length === 0) {
      console.log('  No file nodes found.');
      continue;
    }

    // Ensure destination directory exists
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    for (const node of fileNodes) {
      // Strip vault prefix to get just the filename
      let filename = node.file;
      if (filename.startsWith(VAULT_PREFIX)) {
        filename = filename.slice(VAULT_PREFIX.length);
      }

      const srcFile = path.join(VAULT_IMAGE_DIR, filename);
      const destFile = path.join(destDir, filename);

      if (!fs.existsSync(srcFile)) {
        console.log(`  MISSING: ${filename} (not found in vault)`);
        continue;
      }

      // Skip if destination exists and is the same size
      if (fs.existsSync(destFile)) {
        const srcStat = fs.statSync(srcFile);
        const destStat = fs.statSync(destFile);
        if (srcStat.size === destStat.size) {
          totalSkipped++;
          continue;
        }
      }

      fs.copyFileSync(srcFile, destFile);
      console.log(`  Copied: ${filename}`);
      totalCopied++;
    }
  }

  // Write pages.json
  fs.writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 2) + '\n');
  console.log(`\nWrote pages.json (${pages.length} page(s))`);
  console.log(`Done. Copied: ${totalCopied}, Skipped (unchanged): ${totalSkipped}`);
}

run();
