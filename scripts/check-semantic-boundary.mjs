import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// 语义越界检查：Prompt 文件只能声明分析、设计、建议、整理、辅助检查类能力，
// 不得声明真实执行测试、扫描漏洞、产出未经输入支持的测试结果或做出无依据的绝对化承诺。
const root = process.cwd();
const issues = [];

const bannedPatterns = [
  // 声称真实执行
  { pattern: /执行功能测试/, message: 'claims real test execution ("执行功能测试")' },
  { pattern: /执行性能测试/, message: 'claims real test execution ("执行性能测试")' },
  // 声称检测/发现
  { pattern: /检测安全漏洞/, message: 'claims vulnerability detection ("检测安全漏洞")' },
  // 声称高覆盖率
  { pattern: /生成高覆盖率/, message: 'claims unsupported coverage ("生成高覆盖率")' },
  // 声称产出执行结果
  { pattern: /生成测试执行报告/, message: 'claims generating execution reports ("生成测试执行报告")' },
  { pattern: /高效执行/, message: 'claims efficient execution ("高效执行")' },
  // 英文直译与近义改写
  { pattern: /execute functional tests?/i, message: 'claims real test execution ("Execute functional testing/tests")' },
  { pattern: /execute functional test cases/i, message: 'claims real test execution ("Execute functional test cases")' },
  { pattern: /detect vulnerabilities/i, message: 'claims vulnerability detection ("Detect vulnerabilities")' },
  { pattern: /high-coverage/i, message: 'claims unsupported coverage ("high-coverage")' },
  { pattern: /generate test execution reports/i, message: 'claims generating execution reports ("Generate test execution reports")' },
  { pattern: /efficiently execute/i, message: 'claims efficient execution ("efficiently execute")' },
];

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === ".git" || entry === "node_modules" || entry === ".vitepress") continue;
      walk(full, acc);
    } else if (full.endsWith(".md")) {
      const relPath = path.relative(root, full);
      const inScope =
        relPath === "README.md" ||
        relPath === "README_EN.md" ||
        relPath.startsWith("testing-types/") ||
        relPath.startsWith("Workflows/") ||
        relPath.startsWith("future-updates/") ||
        relPath.startsWith("examples/") ||
        relPath.startsWith("docs/") ||
        relPath.startsWith("prompt-frameworks/");
      if (!inScope) continue;
      acc.push(full);
    }
  }
  return acc;
}

function rel(file) {
  return path.relative(root, file);
}

for (const file of walk(root)) {
  const text = readFileSync(file, "utf8");
  for (const { pattern, message } of bannedPatterns) {
    const match = pattern.exec(text);
    if (!match) continue;
    const line = text.slice(0, match.index).split("\n").length;
    issues.push(`${rel(file)}:${line}: ${message}`);
  }
}

if (issues.length) {
  console.error("Semantic boundary checks failed:\n");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("Semantic boundary checks passed.");
