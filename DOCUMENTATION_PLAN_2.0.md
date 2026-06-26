# ChatSpeed 2.0 Documentation Plan / ChatSpeed 2.0 文档编写计划

## 1. Scope and source of truth / 范围与事实来源

### English

This plan is based on the features that are already visible in these sources:

- `RELEASE.md`
- `src-tauri/src/workflow/react/CONSTITUTION.md`
- `src-tauri/src/ccproxy/README.md`
- Existing docs under `chatspeed-docs/docs/workflow`, `chatspeed-docs/docs/ccproxy`, and `chatspeed-docs/docs/posts`

Write only what can be supported by release notes, code/module README files, existing UI, or testable behavior. Do not claim undocumented UX details, unsupported provider behavior, or benchmark results beyond what is already stated in `RELEASE.md`.

### 简体中文

本计划仅基于以下已确认来源制定：

- `RELEASE.md`
- `src-tauri/src/workflow/react/CONSTITUTION.md`
- `src-tauri/src/ccproxy/README.md`
- `chatspeed-docs/docs/workflow`、`chatspeed-docs/docs/ccproxy`、`chatspeed-docs/docs/posts` 下现有文档

后续写正文时，只能介绍发布说明、模块 README、现有界面或可验证行为已经明确存在的能力。不要补写未证实的 UI 细节、未声明的厂商兼容行为，或超出 `RELEASE.md` 的性能结论。

## 2. Current documentation gap / 当前缺口

### English

Current status:

- `workflow` has a strong overview page, but almost no task-level documentation.
- `ccproxy` has a good introduction plus client setup pages, but lacks 2.0-specific protocol, routing, switcher, and Responses API docs.
- The blog section already exists in both languages, but it is still light on Workflow 2.0 and CCProxy 2.0 problem-solving content.

### 简体中文

当前状态：

- `workflow` 只有总览页，缺少面向功能点和使用场景的拆分文档。
- `ccproxy` 已有总览和客户端接入文档，但缺少 2.0 新增的协议面、路由、切换器、`Responses API` 等专门页面。
- 中英文 blog 菜单已经存在，但围绕 Workflow 2.0 和 CCProxy 2.0 的问题解决型内容仍然偏少。

## 3. Documentation goals / 文档目标

### English

- Explain ChatSpeed 2.0 as a real product upgrade, not a changelog dump.
- Cover Workflow and CCProxy with feature pages that match actual behavior.
- Build SEO landing pages around high-intent queries.
- Build AEO-friendly pages with short answers, FAQs, and comparison sections.
- Publish mirrored Simplified Chinese and English content with consistent structure.

### 简体中文

- 把 ChatSpeed 2.0 讲清楚，避免把文档写成发布说明的重复版。
- 围绕 Workflow 和 CCProxy 建立与真实能力一致的功能页。
- 用高意图搜索词组织核心落地页。
- 用短答案、FAQ、对比段落提升 AEO 表现。
- 中英文同步维护，结构一致，术语稳定。

## 4. Proposed information architecture / 建议的信息架构

### 4.1 Workflow docs / Workflow 文档

### English

Priority pages to add:

1. `docs/workflow/how-it-works.md`
   Purpose: explain the Plan -> Execute -> Review loop, tool-driven execution, and why Workflow is not just chat.
2. `docs/workflow/session-lifecycle.md`
   Purpose: cover states, wait reasons, pause/stop/resume, hot recovery, and completion follow-up.
3. `docs/workflow/approvals-and-safety.md`
   Purpose: cover approvals, shell policy, allowed paths, tool whitelisting, and safety boundaries.
4. `docs/workflow/context-and-memory.md`
   Purpose: explain context projection, compression, global/project memory, and long-task stability.
5. `docs/workflow/child-agents.md`
   Purpose: cover child tasks, `call` vs `background`, and suitable task delegation patterns.
6. `docs/workflow/skills-mcp-agents-md.md`
   Purpose: explain Skills, MCP tools, and `AGENTS.md` integration in one practical page.
7. `docs/workflow/configuration.md`
   Purpose: cover plan/act model split, skill selection, tool settings, and runtime configuration surfaces.

Chinese mirrors:

- `docs/zh/workflow/how-it-works.md`
- `docs/zh/workflow/session-lifecycle.md`
- `docs/zh/workflow/approvals-and-safety.md`
- `docs/zh/workflow/context-and-memory.md`
- `docs/zh/workflow/child-agents.md`
- `docs/zh/workflow/skills-mcp-agents-md.md`
- `docs/zh/workflow/configuration.md`

### 简体中文

建议新增的 Workflow 文档：

1. `docs/workflow/how-it-works.md`
   目标：讲清 `计划 -> 执行 -> 审查`、工具驱动执行，以及 Workflow 为什么不是“加强版聊天”。
2. `docs/workflow/session-lifecycle.md`
   目标：讲状态机、等待原因、暂停/停止/恢复、热恢复与完成后的追问续跑。
3. `docs/workflow/approvals-and-safety.md`
   目标：讲审批、Shell Policy、授权路径、工具白名单与安全边界。
4. `docs/workflow/context-and-memory.md`
   目标：讲上下文投影、压缩、全局/项目记忆，以及长任务稳定性。
5. `docs/workflow/child-agents.md`
   目标：讲子智能体、`call` 与 `background` 两种模式，以及适合拆分的任务类型。
6. `docs/workflow/skills-mcp-agents-md.md`
   目标：把 Skills、MCP 工具和 `AGENTS.md` 集成放在一个实用页面里讲透。
7. `docs/workflow/configuration.md`
   目标：讲规划/执行模型分离、技能选择、工具配置与运行期配置项。

对应中文镜像页：

- `docs/zh/workflow/how-it-works.md`
- `docs/zh/workflow/session-lifecycle.md`
- `docs/zh/workflow/approvals-and-safety.md`
- `docs/zh/workflow/context-and-memory.md`
- `docs/zh/workflow/child-agents.md`
- `docs/zh/workflow/skills-mcp-agents-md.md`
- `docs/zh/workflow/configuration.md`

### 4.2 CCProxy docs / CCProxy 文档

### English

Priority pages to add:

1. `docs/ccproxy/openai-responses-api.md`
   Purpose: explain `POST /v1/responses`, direct forwarding, fallback adaptation, and route variants.
2. `docs/ccproxy/routing-and-compat.md`
   Purpose: explain direct routes, grouped routes, `/switch`, `/compat`, and route precedence.
3. `docs/ccproxy/proxy-switcher.md`
   Purpose: explain group-level switching, server-level switching, and server token stats/trends.
4. `docs/ccproxy/reasoning-and-tool-compat.md`
   Purpose: explain reasoning/thinking compatibility and tool-compat mode boundaries.
5. `docs/ccproxy/header-filtering-and-retries.md`
   Purpose: explain proxy header filtering, retry behavior, and stability-oriented design.
6. `docs/ccproxy/provider-adaptation.md`
   Purpose: explain the unified adaptation pipeline across OpenAI, Claude, Gemini, and Ollama.

Chinese mirrors:

- `docs/zh/ccproxy/openai-responses-api.md`
- `docs/zh/ccproxy/routing-and-compat.md`
- `docs/zh/ccproxy/proxy-switcher.md`
- `docs/zh/ccproxy/reasoning-and-tool-compat.md`
- `docs/zh/ccproxy/header-filtering-and-retries.md`
- `docs/zh/ccproxy/provider-adaptation.md`

### 简体中文

建议新增的 CCProxy 文档：

1. `docs/ccproxy/openai-responses-api.md`
   目标：讲清 `POST /v1/responses`、直通、回退适配和各种路由变体。
2. `docs/ccproxy/routing-and-compat.md`
   目标：讲直连路由、分组路由、`/switch`、`/compat` 和路由优先级。
3. `docs/ccproxy/proxy-switcher.md`
   目标：讲分组级切换、服务器级切换，以及按服务器聚合的 token 统计/趋势。
4. `docs/ccproxy/reasoning-and-tool-compat.md`
   目标：讲 reasoning/thinking 兼容与 tool compatibility mode 的边界。
5. `docs/ccproxy/header-filtering-and-retries.md`
   目标：讲响应头过滤、重试机制与稳定性设计。
6. `docs/ccproxy/provider-adaptation.md`
   目标：讲 OpenAI、Claude、Gemini、Ollama 的统一适配链路。

对应中文镜像页：

- `docs/zh/ccproxy/openai-responses-api.md`
- `docs/zh/ccproxy/routing-and-compat.md`
- `docs/zh/ccproxy/proxy-switcher.md`
- `docs/zh/ccproxy/reasoning-and-tool-compat.md`
- `docs/zh/ccproxy/header-filtering-and-retries.md`
- `docs/zh/ccproxy/provider-adaptation.md`

## 5. Recommended writing order / 建议编写顺序

### English

P0:

1. Workflow landing page refresh: add links to all new subpages.
2. CCProxy landing page refresh: add links to all new 2.0 pages.
3. `workflow/how-it-works`
4. `workflow/approvals-and-safety`
5. `ccproxy/openai-responses-api`
6. `ccproxy/routing-and-compat`
7. `ccproxy/proxy-switcher`

P1:

1. `workflow/session-lifecycle`
2. `workflow/context-and-memory`
3. `workflow/skills-mcp-agents-md`
4. `ccproxy/reasoning-and-tool-compat`
5. `ccproxy/provider-adaptation`

P2:

1. `workflow/child-agents`
2. `workflow/configuration`
3. `ccproxy/header-filtering-and-retries`
4. Cross-link cleanup, screenshots, and FAQ enrichment

### 简体中文

P0：

1. 更新 Workflow 首页，把新页面入口补齐。
2. 更新 CCProxy 首页，把 2.0 新页面入口补齐。
3. `workflow/how-it-works`
4. `workflow/approvals-and-safety`
5. `ccproxy/openai-responses-api`
6. `ccproxy/routing-and-compat`
7. `ccproxy/proxy-switcher`

P1：

1. `workflow/session-lifecycle`
2. `workflow/context-and-memory`
3. `workflow/skills-mcp-agents-md`
4. `ccproxy/reasoning-and-tool-compat`
5. `ccproxy/provider-adaptation`

P2：

1. `workflow/child-agents`
2. `workflow/configuration`
3. `ccproxy/header-filtering-and-retries`
4. 做交叉链接、补截图、补 FAQ

## 6. SEO and AEO rules / SEO 与 AEO 写作规则

### English

For each doc page:

- Put the primary query in `title`, `description`, first paragraph, one `h2`, and FAQ.
- Keep one page focused on one intent. Do not mix setup, architecture, and troubleshooting into one long page.
- Lead with a short answer block: "What it is", "When to use it", "What problem it solves".
- Add an FAQ section with 3 to 6 direct questions.
- Add comparison sections where useful, such as:
  - Workflow vs chat
  - `/v1/responses` vs `/v1/chat/completions`
  - `/switch` vs grouped routes
  - tool compat mode vs native tool calling
- Add internal links to setup, API, and related problem-solving pages.

Suggested metadata pattern:

- Title: exact user-facing query
- Description: one-sentence answer plus product context
- Keywords: query variants, protocol names, and tool names already supported by the product

### 简体中文

每篇页面都建议遵循：

- 核心搜索词放进 `title`、`description`、首段、至少一个 `h2` 和 FAQ。
- 一页只解决一个意图，不把入门、架构、排障混在超长页面里。
- 开头先给短答案区块：这是什么、什么时候用、解决什么问题。
- 每页补一个 3 到 6 问的 FAQ。
- 需要对比时，直接做对比段：
  - Workflow vs 普通聊天
  - `/v1/responses` vs `/v1/chat/completions`
  - `/switch` vs 分组路由
  - tool compat mode vs 原生 tool calling
- 做好站内链接，串起配置、API、排障和博客内容。

建议的元信息写法：

- Title：直接对应用户搜索意图
- Description：一句话回答 + 产品语境
- Keywords：同义搜索词、协议名、已支持的工具名

## 7. Blog plan for search and Q&A intent / 面向搜索与问答意图的 Blog 计划

### English

Important note:

- The ideas below are based on existing product capabilities, current doc gaps, and topics already present in the blog section.
- They should be validated later with Search Console, analytics, community questions, and referral keywords before publishing priority is finalized.

Recommended blog topics:

1. `posts/workflow/workflow-vs-chat-for-coding-tasks.md`
   Query intent: "AI workflow vs chat", "coding agent workflow"
2. `posts/workflow/how-approval-based-ai-coding-works.md`
   Query intent: "safe AI coding agent", "AI agent approval flow"
3. `posts/ccproxy/openai-responses-api-proxy-guide.md`
   Query intent: "OpenAI Responses API proxy", "self-host responses api"
4. `posts/ccproxy/switch-vs-compat-vs-group-routes.md`
   Query intent: "ccproxy switch route", "compat mode vs normal proxy"
5. `posts/ccproxy/how-to-use-free-models-in-claude-code.md`
   Query intent: already close to existing blog demand; update with 2.0 switcher and responses angle
6. `posts/ccproxy/why-header-filtering-matters-in-ai-proxy.md`
   Query intent: "empty reply from server ai proxy", "connection dropped reverse proxy llm"
7. `posts/workflow/long-running-ai-tasks-context-compression.md`
   Query intent: "AI agent context compression", "long running coding agent memory"

Chinese mirrors:

- `docs/zh/posts/...` with the same structure and matching slugs where possible

### 简体中文

重要说明：

- 下面这些选题是基于当前产品能力、现有文档缺口和已发布 blog 主题推导出的候选项。
- 真正发布前，最好再结合 Search Console、站内统计、社区问答和外部引荐词做一次优先级校正。

建议 blog 选题：

1. `posts/workflow/workflow-vs-chat-for-coding-tasks.md`
   搜索意图："AI 工作流和聊天有什么区别"、"coding agent workflow"
2. `posts/workflow/how-approval-based-ai-coding-works.md`
   搜索意图："安全的 AI 编程智能体"、"AI agent 审批机制"
3. `posts/ccproxy/openai-responses-api-proxy-guide.md`
   搜索意图："OpenAI Responses API 代理"、"self-host responses api"
4. `posts/ccproxy/switch-vs-compat-vs-group-routes.md`
   搜索意图："ccproxy switch 路由"、"compat mode 和普通代理区别"
5. `posts/ccproxy/how-to-use-free-models-in-claude-code.md`
   搜索意图：延续现有热门方向，但补上 2.0 的 switcher 和 responses 视角
6. `posts/ccproxy/why-header-filtering-matters-in-ai-proxy.md`
   搜索意图："AI 代理 empty reply from server"、"LLM reverse proxy connection dropped"
7. `posts/workflow/long-running-ai-tasks-context-compression.md`
   搜索意图："AI agent 上下文压缩"、"长任务 coding agent memory"

中文镜像：

- 在 `docs/zh/posts/...` 下同步建立对应文章，目录结构尽量保持一致。

## 8. Tone and style rules / 语气与风格要求

### English

- Prefer concrete verbs and tested scenarios.
- Avoid inflated claims like "revolutionary", "ultimate", or "perfect".
- Avoid AI-sounding filler and generic introductions.
- Use examples, route tables, state tables, and "when this fails" sections.
- Separate confirmed facts from recommended practice.

### 简体中文

- 多写动作和场景，少写空话。
- 避免 "颠覆式"、"终极"、"完美" 这类夸张词。
- 避免明显的 AI 套话和泛泛开场。
- 多用示例、路由表、状态表、失败场景说明。
- 把“已确认事实”和“推荐实践”明确分开。

## 9. Execution checklist / 执行检查清单

### English

Before a page is marked done:

- Confirm every capability against code, release note, or UI.
- Add bilingual frontmatter with localized `title`, `description`, and `keywords`.
- Add at least one FAQ block.
- Add internal links to at least two related pages.
- Check that the English and Chinese pages match in structure.
- If a screenshot is used, ensure it reflects 2.0 UI.

### 简体中文

每篇页面完成前都检查：

- 每个能力点都能在代码、发布说明或 UI 中找到依据。
- 中英文都补齐 `title`、`description`、`keywords`。
- 至少有一个 FAQ 区块。
- 至少补 2 个相关页面的站内链接。
- 中英文页面结构尽量一致。
- 如果放截图，确认是 2.0 界面。

## 10. Recommended next action / 建议下一步

### English

Start with the seven P0 items, because they cover the largest 2.0 delta and create the main landing pages needed for both search and product onboarding.

### 简体中文

建议先写 P0 的 7 项，因为它们覆盖了 2.0 最大的增量，也最适合作为搜索入口页和产品导览页。
