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
