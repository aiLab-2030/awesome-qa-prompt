# 测试报告评审阶段 Prompt

[English](../../../en/ai-quality-analysis-mvp/08-test-report-review/README.md) | 简体中文

## 阶段目标

由产品、QA、UI/UX、技术和 PM 五个角色基于同一版本的全部前序 Artifact 与测试报告独立评审，再汇总为一份供 Human Task 最终确认的可追溯评审报告。五个角色的职责不同：产品核对业务验收证据，QA 核对测试结论、缺陷和剩余风险，UI/UX 核对体验证据，技术核对技术风险、环境限制和非功能证据，PM 只整理行动项、负责人、依赖和时间安排。

## 允许输入

每份角色 Prompt 都接收以下完整、可读且版本明确的 Artifact：

- 需求分析报告
- 测试策略
- 测试策略评审报告
- 代码评审报告
- 测试用例
- 测试用例评审报告
- 测试报告

角色 Prompt 不接收其他角色的测试报告评审输出。汇总 Prompt 只接收五份角色评审报告，不重新读取上述 Artifact，也不补做缺失角色的评审。

## 关键边界

- 产品与 UI/UX 先判断是否需要参与完整评审；没有相应业务或体验范围时输出最小参与判断，不生成通用清单。
- QA 与技术固定参与，但 QA 负责测试结论、缺陷和剩余质量风险，技术负责环境、稳定性、性能、安全、可观测性和其他非功能证据。
- PM 不复核或改写测试事实、缺陷等级、风险等级、执行状态和质量结论，只整理测试报告已有行动项及输入明确提供的负责人、依赖和时间安排。
- 所有事实、差异、缺口与建议必须追溯到指定版本的输入；冲突并列保留，不按多数意见覆盖少数高风险发现。
- 测试报告若写明“未执行或证据不足”，任何角色和汇总都不得改写为通过、质量达标或满足发布条件。

## 评审结论

汇总 Prompt 只能输出一个结论：`建议通过`、`建议补充证据` 或 `建议终止评审`。该结论只是提供给 Human Task 的建议，不构成审批、发布、豁免或风险接受决定。

## Prompt 文件

- [产品专家测试报告评审 Prompt](Standard-version/ProductExpertTestReportReviewPrompt.md)
- [QA 专家测试报告评审 Prompt](Standard-version/QAExpertTestReportReviewPrompt.md)
- [UI/UX 专家测试报告评审 Prompt](Standard-version/UIUXExpertTestReportReviewPrompt.md)
- [技术专家测试报告评审 Prompt](Standard-version/TechnicalExpertTestReportReviewPrompt.md)
- [PM 专家测试报告评审 Prompt](Standard-version/PMExpertTestReportReviewPrompt.md)
- [测试报告评审汇总 Prompt](Standard-version/TestReportReviewSynthesisPrompt.md)

## 推荐调用顺序

1. 锁定七项输入的名称、来源、版本和可读范围。
2. 将同一套输入分别交给五份角色 Prompt，不混入其他角色评审。
3. 保留产品与 UI/UX 的参与判断，以及每个角色的证据定位、分歧和限制。
4. 仅将五份完整角色评审报告交给汇总 Prompt，得到三个允许结论之一。
5. 将汇总报告交给 Human Task 作最终确认；AI 不预填人工决定。

## 版本说明

当前阶段提供可直接复制使用的 Standard 版本，也是默认推荐入口。
