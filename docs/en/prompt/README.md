# Prompt Library

Welcome to the Chatspeed Prompt Library!

This library collects a series of meticulously designed prompt templates aimed at optimizing the interaction between Chatspeed's `CCProxy` module and various Large Language Models (LLMs), thereby maximizing AI's potential in your workflow.

## Available Prompts

### Claude Code Tool Compatibility Mode Prompt Enhancement

- **File**: [claude-code-prompt-enhance.md](claude-code-prompt-enhance.md)
- **Description**: Applicable for **Tool Compatibility Mode** under `CCProxy`, enabling **non-Claude models** to utilize Claude Code capabilities. Optimizes code generation and instruction adherence. Recommended for model groups configured for Claude Code in `CCProxy`.

### Claude Code Native Tool Call Prompt Enhancement

- **File**: [claude-code-prompt-enhance-native-tool-call.md](claude-code-prompt-enhance-native-tool-call.md)
- **Description**: Applicable for scenarios where `CCProxy` **directly calls Claude Code** and leverages the **model's own tool-calling capabilities**. Optimizes code generation and instruction adherence. Recommended for model groups configured for Claude Code in `CCProxy`.

### General Prompt Template

- **File**: [common.md](common.md)
- **Description**: A set of general basic instructions suitable for any AI IDE or code plugin integrated via `CCProxy`. It establishes a fundamental interaction framework and behavioral guidelines for the AI, recommended as the base prompt for default groups.

## How to Use

1.  **Copy and Apply**: Simply copy the prompt content and paste it into the corresponding `CCProxy` group settings in the Chatspeed client.
2.  **Customize and Optimize**: Freely modify and adjust the prompts according to your specific needs and preferences.
3.  **Combine and Innovate**: Experiment by combining snippets from different templates to create powerful prompts that better suit your personal workflow.

## Contribution Guide

We warmly welcome you to share your insights! If you have excellent prompt templates, you can contribute by:

1.  **Adding New Templates**: Submit your original prompt files.
2.  **Improving Existing Templates**: Suggest optimizations for prompts already in this library.
3.  **Sharing Use Cases**: Showcase how you leveraged these prompts to accomplish outstanding work.

---

_Please note: All prompts in this library are specifically designed for scenarios where AI models are connected via Chatspeed's proxy module (`CCProxy`) to complete programming tasks, and are primarily tailored for tool compatibility mode scenarios._
