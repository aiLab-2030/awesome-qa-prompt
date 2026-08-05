# Prompt Baseline 质量原则对齐 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保持 Prompt Baseline 定位（不 skill 化）的前提下，对齐规范与入口文档，并定点修复模块 README 断链、硬编码 KPI、英文 Standard Prompt 缺失的核心约束。

**Architecture:** 先改根规范与 README（定位/边界），再批量修 15 组模块 README 链接，再给英文 Standard Prompt 插入统一约束块，最后扫修硬 KPI 并跑 `npm run check:all`。不改目录结构，不删框架/平台变体。

**Tech Stack:** Markdown 内容仓库；校验用 Node 脚本（`npm run check:all` → `scripts/check-prompts.mjs` + `scripts/check-markdown-format.mjs`）。

**Spec:** `docs/superpowers/specs/2026-08-05-prompt-baseline-quality-align-design.md`

---

## File map

| 文件 / 范围 | 职责 |
| --- | --- |
| `AGENTS.md`（新建） | 协作约定：Baseline 定位、与 skills 边界、验证命令 |
| `README.md` / `README_EN.md` | 定位澄清、克制表述、与 skills 区分、快速开始 |
| `PROMPT_AUTHORING_STANDARD.md` / `_EN.md` | 补充 Baseline 边界与最小可执行强调 |
| `testing-types/zh/*/README.md`（15） | 语言切换与英文 Prompt 链接改到真实路径 |
| `testing-types/en/*/README.md`（15） | 简体中文链接改到 `../../zh/<module>/README.md` |
| `testing-types/en/*/Standard-version/*Prompt*.md`（约 70，缺约束） | 插入英文「Usage Constraints」块 |
| `testing-types/zh/requirements-analysis/Standard-version/*Lean*.md`（4） | 补中文约束块（Lean 缺口） |
| Standard KPI 命中文件（约 28，见 Task 6） | 硬数值改为待确认/示例值 |
| 不改 | `SKILL.md`、安装脚本、skills 目录、框架变体全量重写、`future-updates/` |

---

### Task 1: 新建 AGENTS.md

**Files:**
- Create: `AGENTS.md`

- [ ] **Step 1: 创建 `AGENTS.md`**

写入以下全文（可按仓库语气微调，但不得削弱定位与边界）：

```markdown
# AGENTS.md

本文件定义了在 `awesome-qa-prompt` 仓库中协作时的默认工作方式。目标是持续维护一个可直接使用、结构稳定、双语一致、尽量不误导用户的 **QA Prompt Baseline** 仓库。

## 先理解这个项目

- 这是以 Markdown 内容为主的仓库，核心产物是 QA 提示词、模块 README、工作流文档和中英文版本内容。
- 本仓库是 **Prompt Baseline**（复制即用的提示词合集），不是 AI 工具技能包。
- 与 [`awesome-qa-skills`](https://github.com/naodeng/awesome-qa-skills) 的关系：可借鉴质量原则（反编造、输入审计、最小可执行、文案克制）；不要引入 `SKILL.md`、安装脚本或技能目录结构。
- 新增或修改内容时，优先参考：
  - `README.md`
  - `PROMPT_AUTHORING_STANDARD.md`
  - `package.json`
  - `scripts/check-prompts.mjs`
  - `scripts/check-markdown-format.mjs`

## 你的核心任务

1. 先判断改动类型：Prompt 正文 / README / 目录链接 / 校验脚本。
2. 沿用现有结构、语气和双语组织方式，不要凭空发明新套路。
3. 改完后自己验证，不要把“可能有问题”留给用户检查。

## 内容层面的硬规则

1. 不要编造用户未提供的需求、接口、字段、环境、指标、日期、角色或结论；假设必须显式标注。
2. 优先给最小可执行结果，不要默认超长万能模板。
3. 中英文与各版本（Standard / Lite / 框架 / 平台场景）修改时要判断是否需要同步，避免规则漂移。
4. README 与模块说明里的 Markdown 链接必须真实可打开；默认入口优先 `Standard-version/`。

## 写 Prompt 时至少体现

- 输入完整性检查
- 禁止编造
- 信息不足时的降级策略
- 输出服务真实工作场景

## 必做验证

文档或 Prompt 相关改动后运行：

```bash
npm run check:all
```

## 汇报方式

用简单直白的话说清：做了什么、结果怎样、还有没有风险。
```

- [ ] **Step 2: 确认文件存在且定位段落含 “Prompt Baseline” 与 awesome-qa-skills 边界**

Run:

```bash
test -f AGENTS.md && rg -n "Prompt Baseline|awesome-qa-skills|npm run check:all" AGENTS.md
```

Expected: 至少各命中 1 次。

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "$(cat <<'EOF'
docs: add AGENTS.md for prompt baseline collaboration

EOF
)"
```

---

### Task 2: 根 README 克制化 + 与 skills 区分

**Files:**
- Modify: `README.md`
- Modify: `README_EN.md`

- [ ] **Step 1: 改中文 `README.md` 核心亮点与项目价值中的不可验证表述**

把类似内容：

- `每个提示词都由 10+ 年经验的测试专家设计`
- `节省 60% 的文档编写时间`
- `即用即得`（可保留“复制即可使用”，去掉夸张口号感）

改为可核实表述，例如：

```markdown
- 🎯 **面向实战**：按测试场景组织，默认推荐 `Standard-version/` 入口
- 🌍 **双语支持**：完整的中英文提示词，适应国际化团队
- 📚 **内容覆盖**：15 个测试类型 + 工作流程 + 多框架/平台变体
...
- **提升测试效率**：用结构化提示词快速产出可执行的测试方案与用例初稿
```

（保留真实能力条目；不要新增未经证实的百分比。）

- [ ] **Step 2: 在「项目简介」后增加「与 awesome-qa-skills 的区别」小节**

插入：

```markdown
## 与 awesome-qa-skills 的区别

| | Awesome QA Prompt（本仓库） | Awesome QA Skills |
| --- | --- | --- |
| 定位 | QA Prompt Baseline：复制即用的提示词合集 | 可安装到 Cursor / Claude Code 等工具的技能包 |
| 用法 | 打开模块 → 选 `Standard-version` → 粘贴到对话 | 安装 skill 后用 `@skill` 调用 |
| 不做什么 | 不提供技能安装器 / `SKILL.md` 体系 | 不是多框架 Prompt 变体合集 |

技能仓库：[https://github.com/naodeng/awesome-qa-skills](https://github.com/naodeng/awesome-qa-skills)
```

同步更新目录锚点（若 README 有 TOC）。

- [ ] **Step 3: 核对「快速开始」写清路径**

确保出现类似步骤（可沿用现有结构改写）：

1. 进入 `testing-types/zh/<模块>/`
2. 打开 `Standard-version/` 下对应 Prompt
3. 补充真实项目上下文后再使用

修正功能分类里过时路径：若仍写 `testing-types/requirements-analysis/`（缺 `zh/`），改为 `testing-types/zh/requirements-analysis/`（英文 README 对应 `en/`）。不必一次改完所有分类长文，但至少修正明显错误路径，且 TOC/结构描述与仓库一致。

- [ ] **Step 4: 对 `README_EN.md` 做同等修改**

同步：

- 去掉 `10+ years` / `saving 60%` 类表述
- 增加 `Difference from awesome-qa-skills` 对照表
- 快速开始指向 `testing-types/en/<module>/Standard-version/`

- [ ] **Step 5: 抽查营销词已清除**

Run:

```bash
rg -n "60%|10\+|10\+ years|saving 60%" README.md README_EN.md || true
```

Expected: 无业务 KPI 类命中（徽章/无关数字除外）。

- [ ] **Step 6: Commit**

```bash
git add README.md README_EN.md
git commit -m "$(cat <<'EOF'
docs: clarify prompt baseline positioning in root README

EOF
)"
```

---

### Task 3: 更新 Prompt 编写标准（中英）

**Files:**
- Modify: `PROMPT_AUTHORING_STANDARD.md`
- Modify: `PROMPT_AUTHORING_STANDARD_EN.md`

- [ ] **Step 1: 在中文标准「基本原则」前增加定位说明**

在 `# Prompt 编写标准` 后、`## 适用范围` 前（或适用范围内）加入：

```markdown
## 仓库定位

- 本仓库是 **QA Prompt Baseline**，维护可复制使用的提示词与多框架/平台变体。
- 不要求 skill 化结构（无需 `SKILL.md`、安装脚本或工具技能目录）。
- 质量上对齐常见约定：输入审计、禁止编造、最小可执行、链接真实可用；形态上保持 Prompt 合集，不与 `awesome-qa-skills` 混同。
```

- [ ] **Step 2: 在基本原则中强调最小可执行**

确保有明确条目（若已有可加强措辞）：

```markdown
- Prompt 必须优先帮助用户产出“最小可执行结果”，而不是默认生成超长、超全、超细的模板
```

- [ ] **Step 3: 英文标准同步**

在 `PROMPT_AUTHORING_STANDARD_EN.md` 加入对应 `Repository Positioning` 段，语义一致。

- [ ] **Step 4: Commit**

```bash
git add PROMPT_AUTHORING_STANDARD.md PROMPT_AUTHORING_STANDARD_EN.md
git commit -m "$(cat <<'EOF'
docs: note prompt baseline scope in authoring standard

EOF
)"
```

---

### Task 4: 修复 15 组模块 README 语言切换与 Prompt 链接

**Files:**
- Modify: `testing-types/zh/*/README.md`（15 个）
- Modify: `testing-types/en/*/README.md`（15 个）

**模块名列表（两边一致）：**  
`accessibility-testing` `ai-assisted-testing` `api-testing` `automation-testing` `bug-reporting` `functional-testing` `manual-testing` `mobile-testing` `performance-testing` `requirements-analysis` `security-testing` `test-case-reviewer` `test-case-writing` `test-reporting` `test-strategy`

- [ ] **Step 1: 修中文模块语言切换链接**

对每个 `testing-types/zh/<module>/README.md`，将：

```markdown
[English](./README_EN.md) | 简体中文
```

改为：

```markdown
[English](../../en/<module>/README.md) | 简体中文
```

（`<module>` 换成实际目录名。）

- [ ] **Step 2: 修英文模块简体中文链接**

对每个 `testing-types/en/<module>/README.md`，将：

```markdown
English | [简体中文](./README.md)
```

改为：

```markdown
English | [简体中文](../../zh/<module>/README.md)
```

- [ ] **Step 3: 修中文 README 中指向不存在的 `*_EN.md` Prompt 的链接与说明**

规则：

- 链接/路径若为 `Standard-version/FooPrompt_EN.md`，改为指向英文目录真实文件，例如：  
  `[FooPrompt.md](../../en/<module>/Standard-version/FooPrompt.md)`
- 文案里写「英文版文件：`..._EN.md`」的，改为「英文版见 `testing-types/en/<module>/Standard-version/`」
- 保留对本目录中文 Prompt 的正确相对链接（如 `Standard-version/FooPrompt.md`）
- 默认推荐仍写 `Standard-version/`

可用检查找残留：

```bash
rg -n "README_EN\.md|Prompt_EN\.md|_Lite_EN\.md" testing-types/zh --glob "README.md"
```

Expected: 无指向不存在本地 `_EN` 文件的链接（说明性文字若仍提英文，必须指向 `../../en/...`）。

- [ ] **Step 4: 抽查英文 README 是否错误描述中文路径或 `_EN` 文件名**

```bash
rg -n "Prompt_EN\.md|README_EN\.md" testing-types/en --glob "README.md" || true
```

按同样规则修正到真实文件名（英文目录内文件通常无 `_EN` 后缀）。

- [ ] **Step 5: 用脚本验证关键链接目标存在**

Run:

```bash
node -e '
const fs=require("fs");const path=require("path");
const root=process.cwd();
let bad=0;
for (const lang of ["zh","en"]) {
  for (const mod of fs.readdirSync(path.join(root,"testing-types",lang))) {
    const readme=path.join(root,"testing-types",lang,mod,"README.md");
    if(!fs.existsSync(readme)) continue;
    const text=fs.readFileSync(readme,"utf8");
    const re=/\[([^\]]*)\]\(([^)]+)\)/g; let m;
    while((m=re.exec(text))) {
      const t=m[2].split("#")[0].split("?")[0];
      if(!t || t.startsWith("http")) continue;
      const target=path.normalize(path.join(path.dirname(readme),t));
      if(!fs.existsSync(target)) { console.log("MISSING", path.relative(root,readme), "->", t); bad++; }
    }
  }
}
process.exit(bad?1:0);
'
```

Expected: exit 0；无 `MISSING` 输出。

- [ ] **Step 6: Commit**

```bash
git add testing-types/zh/*/README.md testing-types/en/*/README.md
git commit -m "$(cat <<'EOF'
fix: correct bilingual module README links

EOF
)"
```

---

### Task 5: 为缺失约束的 Standard Prompt 插入统一约束块

**背景（已盘点）：**

- 中文 Standard Full/Lite 大多已有「使用约束与降级规则」
- 英文 Standard 约 70 个 `*Prompt*.md` 缺少等价约束（含平台变体）
- 中文 Lean（requirements-analysis）4 个文件缺约束

**Files:**
- Modify: 所有 `testing-types/en/*/Standard-version/*Prompt*.md` 中缺少约束关键词的文件
- Modify: `testing-types/zh/requirements-analysis/Standard-version/RequirementsAnalysisPrompt_Lean*.md`（4）

- [ ] **Step 1: 准备英文标准约束块（插入到 Role/Task 分隔线之后、正文第一个大节之前）**

统一使用：

```markdown
## Usage Constraints and Degradation Rules

### Input Completeness Check
Before producing the main output, run an input audit:
- List Known / Missing / Key assumptions / Main risks
- If missing information would significantly change the result, ask 3-5 high-value clarifying questions first
- If the user does not provide more information, continue with the minimum necessary assumptions and explicitly mark content that depends on them

### Do Not Fabricate
- Do not invent requirements, APIs, fields, flows, environments, traffic/concurrency numbers, team setup, approvers, version numbers, dates, budgets, defect counts, coverage figures, SLA/SLO targets, or compliance conclusions
- For metrics not provided, mark them as TBD / recommended / example values instead of treating them as facts
- Do not force a single toolchain or framework when the input does not justify it; give conditional recommendations

### Output Strategy
- Prefer a minimum executable result first; add optional enhancements only when useful
- Give a short rationale for priorities, risks, and recommendations
- If the user asked for strategy/analysis, do not default to long implementation code; provide scripts/config only when requested or when inputs are sufficient
- If a template field is missing, write "TBD" or "not provided" — never invent values
```

中文 Lean 使用与现有 Lite 一致的「使用约束与降级规则」三段（输入完整性 / 禁止编造 / 输出策略），可从任意已有中文 Lite 复制。

- [ ] **Step 2: 批量插入（可用一次性 node 脚本；不要改已有约束文件）**

判定“已有约束”：文件已匹配  
`Usage Constraints|Do Not Fabricate|Input Completeness|使用约束与降级|禁止编造|输入完整性`。

插入位置启发式：在第一个 `---` 之后的 Role/Task 块结束的下一个 `---` 之后插入；若结构不同，则在标题与第一个 `## ` 之间插入，且避免重复插入。

跑完后复查数量：

```bash
for f in testing-types/en/*/Standard-version/*Prompt*.md; do
  rg -q "Do Not Fabricate|Input Completeness|Usage Constraints" "$f" || echo "MISSING $f"
done
```

Expected: 无 `MISSING` 行。

对中文 Lean：

```bash
for f in testing-types/zh/requirements-analysis/Standard-version/RequirementsAnalysisPrompt_Lean*.md; do
  rg -q "禁止编造|输入完整性|使用约束与降级" "$f" || echo "MISSING $f"
done
```

Expected: 无 `MISSING`。

- [ ] **Step 3: 人工抽查 3 个文件格式**

打开并确认约束块位置正确、未破坏代码围栏：

- `testing-types/en/functional-testing/Standard-version/FunctionalTestingPrompt.md`
- `testing-types/en/api-testing/Standard-version/APITestingPrompt_Lite.md`
- `testing-types/en/test-strategy/Standard-version/TestStrategyPrompt-Web.md`

- [ ] **Step 4: Commit**

```bash
git add testing-types/en/*/Standard-version/ testing-types/zh/requirements-analysis/Standard-version/
git commit -m "$(cat <<'EOF'
fix: add anti-fabrication constraints to English standard prompts

EOF
)"
```

---

### Task 6: 定点修硬编码 KPI（Standard Full/Lite + 已命中平台文件）

**优先文件清单（盘点时命中，实现时以最新 `rg` 为准）：**

- `testing-types/zh|en/.../test-strategy/Standard-version/TestStrategyPrompt*.md`（含平台）
- `testing-types/zh|en/.../functional-testing/Standard-version/FunctionalTestingPrompt*.md`（含平台）
- `testing-types/zh|en/.../api-testing/Standard-version/APITestingPrompt*.md`
- `testing-types/zh|en/.../performance-testing/Standard-version/PerformanceTestingPrompt*.md`
- `testing-types/en/accessibility-testing/Standard-version/AccessibilityTestingPrompt_Lite.md`
- 以及其他 `rg` 新命中的 Standard Prompt

- [ ] **Step 1: 列出当前 KPI 嫌疑行**

Run:

```bash
rg -n "≥ ?100%|并发\s*≥\s*1000|≥\s*1000|100% WCAG|响应时间\s*≤\s*2|Response time\s*≤\s*2|≤\s*2\s*秒|Requirement Coverage:\*\* \[≥|需求覆盖率：\*\* \[≥" testing-types --glob "*Prompt*.md"
```

- [ ] **Step 2: 按规则改写（逐文件最小改动）**

替换原则示例：

| 原写法 | 改法 |
| --- | --- |
| `响应时间 ≤ 2秒，并发 ≥ 1000` | `响应时间：[待确认]；并发：[待确认]（勿填无依据的经验值）` |
| `需求覆盖率：≥ 100%` | `需求覆盖率：[待确认 / 用户提供目标]` |
| `100% WCAG 2.1 AA` | `WCAG 目标级别：[待确认，例如 AA]（示例，非默认承诺）` |
| 表格中自动化程度 `100%` 作为既定目标 | 改为 `[待确认]` 或注明示例 |

注意：公式说明如 `收益/投入 × 100%` 是百分比计算式，可保留；示例报表里的虚构完成率若作为模板演示，在段首加一句「以下为示例数据，非真实项目结果」。

- [ ] **Step 3: 框架变体仅顺手修同类明显违规，不全库清零**

若时间允许，对 `CRISPE-version` 等中与 Step 1 相同模式的明显硬 KPI 修少数几处即可；不做全量保证。

- [ ] **Step 4: Commit**

```bash
git add testing-types/
git commit -m "$(cat <<'EOF'
fix: replace hard-coded KPI placeholders with TBD markers

EOF
)"
```

---

### Task 7: 全量校验与验收抽查

**Files:**
- Verify only（必要时小修）

- [ ] **Step 1: 跑仓库检查**

```bash
npm run check:all
```

Expected:

```text
Prompt checks passed.
Markdown format checks passed.
```

- [ ] **Step 2: 对照 spec 验收清单自检**

确认：

- [ ] 根文档写清 Prompt Baseline，并区分 skills
- [ ] 模块 README 语言切换与 Prompt 链接可打开（Task 4 脚本 exit 0）
- [ ] 默认推荐仍为 `Standard-version/`
- [ ] 抽查 KPI 已改为待确认/示例
- [ ] 未新增 `SKILL.md` / 安装脚本 / skills 目录
- [ ] 未删除框架或平台变体
- [ ] `npm run check:all` 通过

- [ ] **Step 3: 人工打开 3 个高频模块确认**

- `testing-types/zh/functional-testing/README.md` → 英文链接与 Prompt 链接
- `testing-types/zh/api-testing/README.md`
- `testing-types/zh/test-strategy/README.md`

- [ ] **Step 4: 若有校验失败，修后另开 commit（不要 amend 已推送提交）**

```bash
git add -A
git status
git commit -m "$(cat <<'EOF'
fix: address prompt check failures after baseline alignment

EOF
)"
```

---

## Spec coverage check

| Spec 要求 | Task |
| --- | --- |
| 新建 AGENTS.md | Task 1 |
| 根 README 定位 + 克制 + 与 skills 区分 | Task 2 |
| 编写标准补充 Baseline 边界 | Task 3 |
| 模块 README 链接修复 | Task 4 |
| 核心约束缺口补丁 | Task 5 |
| 硬编码 KPI 定点修 | Task 6 |
| `npm run check:all` + 验收 | Task 7 |
| 不 skill 化 / 不删变体 / 不全库重写 | 各 Task 的非目标约束 |

## Placeholder / consistency self-review

- 无 TBD 实现步骤；英文约束块、链接改写规则、KPI 改写表示例已写出
- 模块名列表与仓库 15 模块一致
- 提交信息风格与仓库近期 `docs:` / `fix:` 前缀一致
