---
title: API Introduction
description: Explore Chatspeed's CCProxy API access rules. Learn about grouping, tool compatibility mode, and various API endpoints for OpenAI, Claude, Gemini, and Ollama protocols.
---

# API Introduction

The Chatspeed `CCProxy` module provides flexible and powerful API access rules for easy invocation by various clients. This section details these rules, helping you understand how to access and combine various AI models and tools via `CCProxy`.

### Core Concepts

API access in `CCProxy` is primarily based on the following two core concepts:

1. **Grouping (Group)**
    You can set up independent model groups for different clients or use cases. By including the group name in the API path, you can easily isolate different clients' access capabilities to models and quickly switch models as needed.
    - **Example**: If your group name is `gemini`, to access the Claude protocol chat interface, you can use `/gemini/v1/messages`.

2. **Tool Compatibility Mode**
    For models that do not natively support tool calling (Function Calling), `CCProxy` provides a tool compatibility mode, allowing them to gain and execute tool calling capabilities. To enable tool compatibility mode, simply add `compat_mode` to the API entry endpoint.
    - **Example**: `/gemini/compat_mode/v1/messages`

3. **Dynamic Group Switching**
    By using the `/switch` prefix in the API path, you can access the group that is currently set as "Active" in the Chatspeed interface. This allows you to switch between different backend models and injection rules directly from the interface without changing the configuration in your clients (e.g., IDEs, plugins).
    - **Example**: `/switch/v1/chat/completions`

### API Access Endpoints

Below are the basic API entry points provided by `CCProxy`:

- `/mcp/sse`: MCP Proxy Entry (Server-Sent Events Protocol)
- `/mcp/http`: MCP Proxy Entry (Streamable HTTP Protocol)
- `/v1/models`: OpenAI compatible interface and Claude format model list interface
- `/v1/chat/completions`: OpenAI compatible interface chat entry
- `/v1/messages`: Claude native protocol message interface
- `/v1beta/models`: Gemini chat model list interface
- `/v1beta/models/{model}/generateContent`: Gemini chat synchronous access interface
- `/v1beta/models/{model}/streamGenerateContent`: Gemini chat streaming access interface
- `/api/tags`: Ollama protocol model list interface
- `/api/chat`: Ollama protocol chat entry
- `/api/show`: Ollama protocol model details interface

### Combined API Access

By combining **Grouping** and **Tool Compatibility Mode**, you can build more flexible API access paths. Please refer to the API list below for specific combinations.

| Type | Protocol        | Group   | Compat | API Address                                                          | Note                                                                                         |
| ---- | --------------- | ------- | ------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| MCP  | Streamable HTTP |         | false  | /mcp/http                                                            | Recommended                                                                                  |
| MCP  | SSE             |         | false  | /mcp/sse                                                             | Not recommended                                                                              |
| Chat | Openai          |         | false  | /v1/chat/completions                                                 |                                                                                              |
| Chat | Openai          | {group} | false  | /{group}/v1/chat/completions                                         | Replace {group} with the group name                                                          |
| Chat | Openai          | {group} | true   | /{group}/compat_mode/v1/chat/completions                             | Replace {group} with the group name                                                          |
| Chat | Openai          |         | true   | /compat_mode/v1/chat/completions                                     |                                                                                              |
| Chat | Openai          | switch  | false  | /switch/v1/chat/completions                                          | Uses the currently "Active" group                                                            |
| Chat | Openai          | switch  | true   | /switch/compat_mode/v1/chat/completions                              | Uses the currently "Active" group                                                            |
| Chat | Claude          |         | false  | /v1/messages                                                         |                                                                                              |
| Chat | Claude          | {group} | false  | /{group}/v1/messages                                                 | Replace {group} with the group name                                                          |
| Chat | Claude          | {group} | true   | /{group}/compat_mode/v1/messages                                     | Replace {group} with the group name                                                          |
| Chat | Claude          |         | true   | /compat_mode/v1/messages                                             |                                                                                              |
| Chat | Claude          | switch  | false  | /switch/v1/messages                                                  | Uses the currently "Active" group                                                            |
| Chat | Claude          | switch  | true   | /switch/compat_mode/v1/messages                                      | Uses the currently "Active" group                                                            |
| Chat | Gemini          |         | false  | /v1beta/models/{model}/generateContent?key={key}                     | Replace {model} with the model name and {key} with the API Key                               |
| Chat | Gemini          | {group} | false  | /{group}/v1beta/models/{model}/generateContent?key={key}             | Replace {group} with the group name, {model} with the model name, and {key} with the API Key |
| Chat | Gemini          | {group} | true   | /{group}/compat_mode/v1beta/models/{model}/generateContent?key={key} | Replace {group} with the group name, {model} with the model name, and {key} with the API Key |
| Chat | Gemini          |         | true   | /compat_mode/v1beta/models/{model}/generateContent?key={key}         | Replace {model} with the model name and {key} with the API Key                               |
| Chat | Ollama          |         | false  | /api/chat                                                            |                                                                                              |
| Chat | Ollama          | {group} | false  | /{group}/api/chat                                                    | Replace {group} with the group name                                                          |
| Chat | Ollama          | {group} | true   | /{group}/compat_mode/api/chat                                        | Replace {group} with the group name                                                          |
| Chat | Ollama          |         | true   | /compat_mode/api/chat                                                |                                                                                              |
| List | Openai          |         |        | /v1/models                                                           | Supports groups and compatibility mode                                                       |
| List | Calude          |         |        | /v1/models                                                           | Supports groups and compatibility mode                                                       |
| List | Gemini          |         |        | /v1beta/models                                                       | Supports groups and compatibility mode                                                       |
| List | Ollama          |         |        | /api/tags                                                            | Supports groups and compatibility mode                                                       |
