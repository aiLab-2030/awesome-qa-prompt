# Design: Prompt Baseline 质量原则对齐

日期：2026-08-05
仓库：`awesome-qa-prompt`
参考：`awesome-qa-skills`（只借鉴质量原则，不 skill 化）
方案：方案 2（规范 + README 克制化 + 违规点定点修）

## 1. 背景与目标

`awesome-qa-prompt` 是 QA 工作的 **Prompt Baseline**：以可复制使用的提示词为主，提供多版本（Standard / Lite）与多框架变体。

`awesome-qa-skills` 是面向 AI 工具的 **可安装技能包**。两边需要刻意区分，而不是互相改成同一种形态。

本次目标：把 skills 侧已验证的质量原则迁到本仓库的规范、入口文档和明显违规内容上，提升可信度与可用性，同时保持 Prompt Baseline 身份。

### 非目标

- 不做 `SKILL.md`、安装脚本、工具目录镜像
- 不追求与 skills 模块一一对应（不新增 k6 / Bruno / plus 等）
- 不删除 CRISPE / RISE / ICIO / ROSES / LangGPT 框架变体
- 不把 Prompt 全文统一改成 skills 的 8 段短结构
- 不重写 `examples/`、`future-updates/`（除非发现断链且影响入口）

## 2. 定位与边界

### 本仓库是什么

- QA Prompt Baseline：可直接复制到对话/工具中使用的提示词合集
- 覆盖现有 15 个测试类型模块、工作流、框架变体
- 部分模块已有平台场景版（`all_round` / `Web` / `Mobile`）；本次保留，不重构
- 默认入口：各模块 `Standard-version/`（未指定平台时优先通用/全平台入口）

### 本仓库不是什么

- 不是 AI 工具技能包
- 不是 skills 仓库的文档镜像

### 与 skills 的关系

| 维度 | awesome-qa-prompt | awesome-qa-skills |
| --- | --- | --- |
| 产物 | Prompt 正文与模板 | 可安装 Skill |
| 用法 | 复制即用 | 安装到 Cursor / Claude Code 等 |
| 本次借鉴 | 反编造、输入审计、最小可执行、文案克制 | — |
| 本次不借鉴 | — | 技能目录、安装器、`SKILL.md` 结构 |

## 3. 文档与规范改动

### 3.1 新增 `AGENTS.md`

固化协作约定：

- Prompt Baseline 定位与 skills 边界
- 改动原则（最小必要、双语一致、禁止编造）
- 必做验证（`npm run check:all`）
- 汇报方式（直白说明做了什么、结果怎样）

### 3.2 根 README / README_EN

- 明确「Prompt Baseline」定位
- 增加与 `awesome-qa-skills` 的简短区分说明
- 去掉或改写不可验证表述（如「节省 60%」「10+ 年专家设计」）
- 保留真实能力：模块数、双语、版本选择、在线文档
- 快速开始路径：选模块 → 打开 `Standard-version` → 补真实上下文 → 使用
- 目录结构说明与仓库实际一致

### 3.3 `PROMPT_AUTHORING_STANDARD`（中英）

- 保留现有硬规则：输入审计、禁止编造、降级策略、Standard 入口、链接真实可用
- 补充：本仓库是 Prompt Baseline，不要求 skill 化结构
- 强调最小可执行结果，避免鼓励超长万能模板

## 4. Prompt / 模块 README 定点修

### 4.1 必做：模块 README 链接

已知问题（抽查已确认）：

- 中文模块 README 大量链接 `./README_EN.md`，实际英文在 `testing-types/en/<module>/README.md`
- 中文 README 指向同目录下不存在的 `*_EN.md` Prompt 文件

修正规则：

- 语言切换链接指向对应语言目录的真实 README
- Prompt 文件链接指向真实存在的路径
- 默认推荐入口保持 `Standard-version/`
- 中英模块 README 同步修

### 4.2 必做：硬编码 KPI

范围优先：`Standard-version` 的 Full + Lite（中英），含已存在的平台场景文件（`all_round` / `Web` / `Mobile`）中同类明显违规。

将模板中冒充确定目标的数值（如 `≥100%`、`响应时间 ≤ 2秒，并发 ≥ 1000`、`100% WCAG`）改为：

- 待确认 / TBD
- 示例值（显式标注）
- 用户提供则填入

框架变体与其余平台副本：仅在同类明显违规时顺手修，不保证全清，也不借机统一重写。

### 4.3 必做：核心约束缺口补丁

对缺少「输入完整性检查 / 禁止编造 / 输出降级」的 Standard 正文做最小补丁。

不改变整体 Role/Context/Task + 方法论结构，不改写成 skills 短结构。

### 4.4 执行顺序

1. 修模块 README 链接与默认入口说明
2. 扫并修 Standard Full/Lite 硬编码 KPI
3. 补缺核心约束（仅缺口处）
4. 跑 `npm run check:all`，人工抽查 2–3 个高频模块（如 functional-testing、api-testing、test-strategy）

## 5. 验收标准

- [ ] 根文档写清：本仓库是 Prompt Baseline，不是 skills
- [ ] 中英文模块 README 的语言切换与 Prompt 链接可打开
- [ ] 默认推荐仍指向 `Standard-version/`
- [ ] 抽查到的硬编码 KPI 已改为「待确认/示例值」或带假设标注
- [ ] 未引入 skills 目录结构 / 安装脚本 / `SKILL.md`
- [ ] `npm run check:all` 通过
- [ ] 未做全库风格重写、未删框架变体

## 6. 风险

- 框架变体与平台场景副本可能仍残留少量硬 KPI；本轮不承诺清零
- `future-updates/`、`examples/` 不在主范围
- 已与 `origin/main` 同步（含平台场景版增量）；实现时以当前 main 为基线

## 7. 实现后的下一步（本设计通过后）

1. 用 writing-plans 产出实现计划
2. 按计划改文档与定点修 Prompt
3. 跑检查并汇报结果
