---
title: Workflow Engine
description: Chatspeed's Workflow Engine is a tool-driven, task-oriented execution kernel built around a Plan -> Execute -> Review loop, featuring stable recovery, true background multi-workflow execution, approval notifications, sandboxed directory control, and safer low-friction Bash automation.
keywords: Workflow, Chatspeed, AI Agent, Task Execution, ReAct Loop, Tool-Driven, Approval Recovery, Background Workflow, Multi-Workflow, Context Compression, Memory, Sub-Agent, Code Agent, Safe Bash, Approval Notification, Chatspeed Workflow
---

# Workflow Engine

> **A tool-driven execution engine built around a Plan -> Execute -> Review loop to improve task quality and completion reliability.**

Chatspeed's Workflow (`src-tauri/src/workflow/react`) is a **first-class task execution engine** — not merely an extended chat session. Its foundation is a **tool-driven ReAct runtime**: progress is expected to converge through tool calls, structured observations, approvals, and explicit completion rather than through free-form chatting alone.

At the product level, the workflow is organized around a **Plan -> Execute -> Review** loop:

- **Plan** defines the approach and reduces wasted execution
- **Execute** pushes the task forward through concrete tool actions
- **Review** checks quality, catches regressions, and forces a clean completion boundary

That loop is what makes the system suitable for coding, debugging, refactoring, and other tasks where quality depends on controlled execution rather than persuasive text output.

---

## 🎯 Core Architecture

The Workflow engine is built around several key runtime modules:

| Component | Role |
|-----------|------|
| **WorkflowExecutor** | Main ReAct loop runner — manages AI conversation, tool calls, state transitions, and lifecycle |
| **WorkflowManager** | Global session registry — manages multiple concurrent workflow sessions |
| **Child task orchestration** | Delegates isolated subtasks through child-task and orchestrator modules |
| **IntelligenceManager** | AI-powered summarization, quality audits, and tool approval reviews |
| **ContextManager** | Builds and rebuilds transcript and model-facing context projections |
| **ContextCompressor** | Intelligent tiered context compression to reduce token usage |
| **MemoryManager** | Persistent memory across sessions (project-level and global) |
| **PathGuard** | Filesystem access control that blocks sensitive system paths |
| **SkillScanner** | Discovers and integrates reusable skill packages |
| **LoopDetector** | Sliding-window loop detection to prevent infinite execution |

---

## 🚀 Key Features

### 🔧 Tool-Driven Execution

The workflow does not behave like an extended chat thread. Instead, it advances through:

1. **Planning** — The AI creates a structured execution plan
2. **Tool Calling** — The AI invokes tools (file edit, web fetch, shell, etc.)
3. **Observation** — The system returns structured tool results
4. **Approval** — Potentially risky tool calls wait for user confirmation
5. **Submission** — Explicit task completion via `complete_workflow_with_summary`

Tool use is not an optional add-on in this model. It is the main path for real progress. Brief reasoning is allowed, but the workflow is expected to resolve quickly into the next concrete tool action whenever work remains.

### 🔁 Plan -> Execute -> Review Loop

Workflow quality is protected by a repeatable loop:

1. **Plan** — create or refine the next execution strategy
2. **Execute** — use tools to perform the smallest useful next action
3. **Review** — inspect results, approvals, diffs, findings, or audit output before converging on the next step or final completion

This loop improves quality in several ways:

- it reduces aimless reasoning-only turns
- it makes execution observable through structured tool output
- it creates explicit review boundaries before completion
- it makes long-running coding tasks more resilient to drift

### 🧭 Runtime Invariants

The workflow runtime follows a few architectural rules that matter in practice:

- **Backend authority is absolute** — session liveness, runtime state, wait reason, approvals, and resumability are owned by the backend runtime.
- **Structured state beats transcript text** — recovery and UI synchronization come from structured events, tool metadata, and execution context, not from reparsing assistant prose.
- **`messages` is durable history** — transcript history is authoritative.
- **`context_messages` is a rebuildable projection** — it exists to feed the model efficiently, not to become a second source of truth.
- **Waiting is modeled explicitly** through `WorkflowState` plus `WaitReason`, rather than inferred from message text.

### ♻️ Stable Recovery

Recovery is treated as a runtime guarantee, not a best-effort convenience feature.

- Approval states, waiting states, and execution states are modeled explicitly in backend runtime state
- A workflow can be interrupted and resumed without turning the UI transcript into the source of truth
- If the app is closed while a plan approval or tool approval is pending, the next session can resume from the current structured state instead of forcing the user to restart the task
- Completed sessions also support controlled hot-resume behavior for valid follow-up work

### 🧩 Plan/Act Separation

Workflows can use **different models for planning and execution**:
- **Plan model**: High-capability model for strategizing (e.g., `deepseek-v4`, `claude-4-sonnet`)
- **Act model**: Cost-effective model for execution (e.g., `gemma3-12b`, `qwen3-code`)

This reduces costs while maintaining planning quality.

### 🧵 True Background Multi-Workflow Execution

This is not a single-task chat tab pretending to be a workflow.

- Users can run multiple workflows concurrently
- Each workflow has its own runtime state, approvals, context, and progress tracking
- Users can switch between active workflows without collapsing them into one thread
- Child-agent and background execution modes allow long-running work to continue while the user focuses elsewhere

### 🧵 Child Agent Orchestration

Workflows can spawn **child sub-agents** for parallel subtasks:
- `execution_mode="call"` — The workflow pauses until the child agent completes
- `execution_mode="background"` — The child runs in parallel while the main agent continues

### ✅ Approval and Review System

- **Auto-approve list**: Tools trusted for automatic execution
- **Smart AI review**: AI-generated risk assessment for unknown tools
- **Full user approval**: Manual confirmation for every tool call
- **Final audit mode**: Optional independent code review before completion
- **Shell policy**: Custom rules for shell command approvals

Together, approvals and review stages make the workflow less like "AI trying things until it sounds done" and more like a controlled execution loop with visible quality gates.

### 🔔 Global Notifications

Background execution remains visible even when the user is not actively watching one workflow.

- Pending approvals from background workflows can trigger global notifications
- Task completion can also trigger completion notifications
- Notification channels include in-app status visibility and optional sound playback, making it easier to notice approvals and finished work without babysitting the workflow

### 🧠 Context Compression

The engine uses **intelligent tiered compression** around task boundaries:

| Mode | Behavior |
|------|----------|
| `Rollup` | Non-blocking, streams during execution |
| `Blocking` | Full halt until compression completes |

Compression rules:
- Preserve the latest completed task
- Only compress older completed work
- Initial rollup triggers after 3 completed tasks with active task
- Deeper integration = Long-running task stamina

> In real coding tests with `deepseek-v4`, context compression achieves roughly **96% cache hit rate**.

### 💾 Memory System

Two scopes of persistent memory:

| Scope | Path | Purpose |
|-------|------|---------|
| **Global** | `~/.chatspeed/memory.md` | Cross-project AI knowledge |
| **Project** | `~/.chatspeed/project/{transformed_path}/memory.md` | Per-project context |

Memory is kept outside project directories to avoid git tracking and to remain reusable across workflow sessions.

### 🔒 Security

The workflow engine provides multiple security layers:

- **PathGuard**: Blocks access to sensitive system paths (`/etc`, `/bin`, `C:\Windows`, etc.)
- **Tool Whitelisting**: Restrict which tools the AI can call
- **Auto-Approval**: Configure trusted tools for silent execution
- **Shell Policy**: Define rules for shell command execution
- **Allowed Paths**: Configure authorized workspace directories

Even when the user enables broad approval behavior, destructive system-level operations are still expected to be blocked by runtime safety controls. The model is sandboxed to authorized directories rather than granted unrestricted machine access.

### 🛡️ Safer Low-Friction Bash

The workflow is designed to reduce approval fatigue without turning shell access into a trust free-for-all.

- Read-oriented Bash patterns can be auto-approved more aggressively
- Shell policy and path validation keep execution bounded to authorized areas
- This allows lower-friction coding workflows while still blocking clearly unsafe or destructive operations
- In practice, the goal is fewer interruptions for normal engineering tasks without weakening the core safety model

### ⚙️ State Machine

The workflow engine operates through a complete state machine:

| State | Meaning |
|-------|---------|
| `Pending` | Session created, not yet started |
| `Thinking` | AI is reasoning |
| `Executing` | Tool is being executed |
| `Auditing` | Final audit in progress |
| `Stopping` | Cancellation in progress |
| `Paused` | Waiting for continue/stop confirmation |
| `AwaitingUser` | Waiting for user text input |
| `AwaitingApproval` | Waiting for tool approval |
| `AwaitingAutoApproval` | AI-assisted approval review |
| `AwaitingSubAgent` | Waiting for child agent result |
| `Completed` | Task completed successfully |
| `Error` | Irrecoverable error |
| `Cancelled` | Cancelled by user |

Waiting-related transitions are explicit, and resume validation is driven by the current `wait_reason`.

---

## 🔄 Integration with Other Modules

### Skills System
Workflows can load and use **skill packages** from multiple sources:
- User-installed skills (`~/.chatspeed/skills`)
- Built-in skills (`@chatspeed/skills`)
- Workflow-managed skill configurations

### MCP Tools
The workflow integrates directly with ChatSpeed's MCP proxy, allowing the AI to call:
- `WebSearch` / `WebFetch` — Internet access
- Installed MCP tools — Context7, Tavily, Puppeteer, and more

### AGENTS.md
Workflows support per-project agent configurations through `AGENTS.md` files, defining agent roles, tool access, and behavior profiles.

---

## 🎬 Getting Started

1. **Create a new workflow** from the workflow sidebar in ChatSpeed
2. **Select models** for planning and execution (or use the same model)
3. **Configure tools** — choose which skills and MCP tools to enable
4. **Start a task** — describe what you need done
5. **Monitor progress** — view streaming output, approve tool calls, review results
6. **Post-completion** — review the final audit report when enabled

### Workflow UI Components

ChatSpeed provides dedicated workflow interfaces:
- **Workflow Sidebar** — Session management and switching between active workflows
- **Workflow Message List** — Streamed conversation output with tool execution details
- **Approval Dialog** — Tool call approval/rejection interface
- **File Preview Diff** — Side-by-side file diff for reviewed changes
- **Task Ledger** — Todo list and tool execution tracking
- **Status Panel** — Current workflow state and agent progress
- **Model Selector** — Per-workflow model configuration
- **Skills Selector** — Skill package selection for each workflow

---

## 📚 Documentation Sections

- **[Getting Started](../guide/)** — Installation and quick start
- **[CCProxy Module](../ccproxy/)** — Core proxy functionality
- **[MCP Integration](../mcp/)** — Model Context Protocol proxy
- **[API Reference](../api/)** — Complete API documentation
