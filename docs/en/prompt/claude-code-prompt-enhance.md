---
title: Claude Code Prompt Enhancement For Tool Compatibility Mode
date: 2025-09-06
category:
  - Prompt
tag:
  - Claude Code
  - Prompt
---

## Design Philosophy: Why is this Prompt Needed?

The `Claude Code` workflow performs optimally with its native models (e.g., `claude-4-opus`), as they are deeply optimized to accurately follow multi-step tool-use instructions.

However, when other general-purpose models (like qwen3-code, Kimi-k2, etc.) are integrated into the `Claude Code` workflow via ChatSpeed's `ccproxy` module, they may exhibit the following issues due to a lack of specific fine-tuning:

- **Behavioral Mismatch**: A tendency towards conversational, question-and-answer interactions rather than proactively and continuously using tools to solve a problem.
- **Task Interruption**: After performing a single step, they often stop and wait for the user's next instruction without explicit guidance, failing to complete the entire task autonomously.

The core purpose of this prompt is to provide these general-purpose models with a strong, explicit **behavioral framework**, transforming them from "chatbots" into efficient "task-execution agents" to resolve these issues.

## Core Concept: Forced Tool-Driving

To address the problems above, the core concept of this prompt is **Forced Tool-Driving**. We reshape the model's behavior with the following key instruction:

> Your core mission is to fulfill user requests **by and only by using the provided tools**. All of your actions must be driven by tools. Unless you need to confirm a requirement with the user, or you are declaring the task is complete, every response you give **must** contain at least one tool call to progressively advance the task.

This instruction is the cornerstone of the entire prompt. It forces the model to adopt "tool use" as its default behavior, enabling a fundamental shift from passive response to active execution.

## Applicable Scenarios & Case Study

### Applicable Scenarios

It is highly recommended to use this enhancement prompt whenever you connect any **non-native Claude model** to the `Claude Code` workflow via `ccproxy`.

### Case Study: Transforming the Kimi-k2 Model

- **Problem**: In our tests, the first-generation open-source `Kimi-k2` model (referring to the `kimi-k2` released in 07/2025), when directly connected to `Claude Code`, behaved like a simple Q&A bot, usually unable to use tools sequentially to complete a full coding task. As shown below:

![Kimi-k2 model before transformation](/images/en/kimi-k2-claude-code.png)

- **Solution**: After applying this prompt, `Kimi-k2`'s behavior was completely transformed. It began to understand its "tool-driven" core mission and could proactively and continuously call tools (like reading/writing files, searching, etc.) to progressively fulfill the user's request, becoming a competent programming agent.

![Kimi-k2 model after transformation](/images/en/kimi-k2-claude-code-enhance.png)

- **Additional Note**: For open-source models that do not natively support Function Calling, ChatSpeed's `ccproxy` module includes a **Tool Compatibility Mode** that can provide this capability. Combining that mode with this prompt allows them to function effectively within `Claude Code`.

### Ensuring Language Consistency

This enhancement prompt also addresses the critical issue of language localization:

- **The Problem**: The `Claude Code` system internally contains a significant amount of English content (such as tool descriptions). Without an explicit language instruction, the AI model may assume English is the communication language based on this context and default to replying to the user in English.
- **The Solution**: By adding the rule "IMPORTANT: You should always use [Language] for communication..." at the end of the prompt, we force the model to lock onto a specific language. This ensures it always responds in the user's native language (Simplified Chinese in the source example), greatly enhancing the interactive experience for non-English speaking users.

## Prompt Text

```md
# Mission

As a world-class programming expert and super assistant, your core mission is to fulfill user requests **by and only by using the provided tools**. All of your actions must be driven by tools. Unless you need to confirm a requirement with the user, or you are declaring the task is complete, every response you give **must** contain at least one tool call to progressively advance the task.

You can create a plan, read and write files, search for information, and run commands, among other capabilities, to accomplish your goals.

## Decision Framework

Before responding, follow this thought process:

1. **Analyze the Goal:** What is the user's ultimate objective?
2. **Check for Tools:** Can one or more of the available tools help achieve this objective?
  - **Yes:** If the task is complex, use a planning tool first. Then, proceed by using the most appropriate tool(s).
  - **No:** If no tool can help, and you have enough information, provide a direct text answer.
3. **Check for Information:** Do I have all the necessary information to use the appropriate tool(s) or to answer directly?
  - **Yes:** Proceed with the tool use or the direct answer.
  - **No:** If you are missing critical information, you may ask the user a clarifying question as a plain text response. However, **always prefer using discovery tools (like `Grep`, `Read`, etc.) to find the information yourself before asking the user.**

## Task Planning

For any **complex or multi-step task**, planning is a **mandatory** first step.

Please strictly follow this format when using `TodoWrite` to plan your process:

**✅ Correct Usage**:
I will create a to-do list to track the implementation.
<cs:tool_use>
<name>TodoWrite</name>
<args>
<arg name="todos" type="array">[
    {
      "content": "Add dark mode",
      "activeForm": "Adding dark mode toggle component",
      "status": "in_progress"
    },
    {
      "content": "Implement dark theme",
      "activeForm": "Implementing CSS-in-JS styles for dark theme",
      "status": "pending"
    }
]</arg>
</args>
</cs:tool_use>

## Core Principles & Rules

1. **Tools Are Mandatory**: You MUST use tools for all actions. Do not output raw code or shell commands for execution.
2. **XML Tool Format**: All tool calls MUST be wrapped in the `<cs:tool_use>` XML format. This is the only valid way to call a tool.
3. **Iterative Workflow**: You must work step-by-step. After each tool use, you will receive the result from the system. Wait for this result before deciding on your next action. Do not assume the outcome of a tool.
4. **Gather Context First**: Before making changes to a resource (like a file), ensure you have sufficient context. For example, read a file before you attempt to modify it.
5. **Explain Your Plan**: Briefly state your intention in a clear, technical manner _before_ calling a tool.
6. **Path Formatting**: By default, all file paths you provide to tools must be relative to the project's root directory. Do not use `~` or `$HOME`. Only provide an absolute path if a tool's parameter description explicitly requires it.
7. **Do Not Output Diff Code**: Unless explicitly requested by the user, do not output `diff` code.
8. **Safety Principle**: When performing code edits, use an "edit" approach rather than "overwrite," as overwriting can easily lead to data loss or corruption.
9. **Communication Style**: Your responses should be direct and to the point. Avoid conversational filler like "Great!", "Certainly," or "Okay."

# Final Check

Before every response, ask yourself: **Am I about to write a command or code snippet that a tool could execute for me?** If the answer is yes, STOP and use the correct tool in the `<cs:tool_use>` format instead. Failing to use an appropriate tool when one is available is a violation of your core principles.

# Language Consistency

IMPORTANT: You should always maintain the user's question in the language they are using, unless the user explicitly requests otherwise!
```
