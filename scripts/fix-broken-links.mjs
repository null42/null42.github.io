// 批量修复 content/ 下 markdown 文件中失效的相对路径链接
// 策略：解析每个相对链接为绝对路径，检查目标文件是否存在；
// 若不存在，按文件名在 content/ 下搜索新位置，找到后重写相对路径。
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentDir = path.join(root, 'content');

// 递归扫描 content/ 下所有 .md 文件（避免 glob 包的行为差异）
function walkMd(dir, base = '') {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkMd(fullPath, relPath));
    } else if (entry.name.endsWith('.md')) {
      results.push(relPath);
    }
  }
  return results;
}

const files = walkMd(contentDir).filter(f => !f.startsWith('fundamentals-work/chunks/'));

// 构建文件名索引：basename(lower) -> [相对路径列表]
const fileIndex = new Map();
for (const file of files) {
  const basename = path.posix.basename(file).toLowerCase();
  if (!fileIndex.has(basename)) fileIndex.set(basename, []);
  fileIndex.get(basename).push(file.replace(/\\/g, '/'));
}

let totalRewrites = 0;
let totalChecked = 0;
const rewrittenFiles = new Set();
const unmatched = [];

// 调试：先验证脚本能找到已知问题文件
const testFile = files.find(f => f.replace(/\\/g, '/').includes('motor/algorithm/ALG-00-Current-Loop-Intuition'));
console.log(`DEBUG: testFile = ${testFile}`);
console.log(`DEBUG: total files scanned = ${files.length}`);
console.log(`DEBUG: fileIndex has CT-01 = ${fileIndex.has('ct-01-open-loop-closed-loop.md')}`);

for (const file of files) {
  const fullPath = path.join(contentDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  const fileDir = path.posix.dirname(file.replace(/\\/g, '/'));

  // 匹配 markdown 链接中的相对路径（以 . 或字母开头，以 .md 结尾，非绝对路径）
  const newContent = content.replace(/(\[[^\]]*\]\()([^)#:]+?\.md)([^)]*\))/g, (match, prefix, target, suffix) => {
    totalChecked++;
    if (target.startsWith('/') || target.startsWith('#') || /^[a-z]+:\/\//i.test(target)) return match;

    // 解析相对路径为 content/ 下的相对路径
    const resolved = path.posix.normalize(path.posix.join('/', fileDir, target)).replace(/^\//, '');
    const fullPathCheck = path.join(contentDir, resolved);

    if (fs.existsSync(fullPathCheck)) return match; // 文件存在，无需修复

    // 文件不存在，按 basename 搜索新位置
    const basename = path.posix.basename(resolved).toLowerCase();
    const candidates = fileIndex.get(basename) || [];
    if (candidates.length === 0) {
      unmatched.push(`${file} -> ${target}`);
      return match;
    }

    // 优先选择与原路径同栏目（section）的候选；否则取第一个
    const originalSection = file.split('/')[1] || '';
    const preferred = candidates.find(c => c.startsWith(originalSection + '/')) || candidates[0];
    let relPath = path.posix.relative(fileDir, preferred);
    if (!relPath.startsWith('.')) relPath = './' + relPath;

    totalRewrites++;
    rewrittenFiles.add(file);
    return `${prefix}${relPath}${suffix}`;
  });

  if (newContent !== content) {
    fs.writeFileSync(fullPath, newContent, 'utf8');
  }
}

console.log(`DEBUG: totalChecked = ${totalChecked}`);

console.log(`✓ Rewrote ${totalRewrites} links in ${rewrittenFiles.size} files`);
if (unmatched.length > 0) {
  console.log(`\n✗ ${unmatched.length} unmatched links:`);
  for (const u of unmatched.slice(0, 30)) console.log(`  ${u}`);
  if (unmatched.length > 30) console.log(`  ... and ${unmatched.length - 30} more`);
}
