# `Gemini CLI` Integration Guide

> A complete guide to connecting to CCProxy using a custom version of `Gemini CLI`.

`Gemini CLI` is a command-line interface for programming agents. The original `Gemini CLI` can only connect to Google's own `Gemini` models. We need to use a custom fork, [llxprt-code](https://github.com/acoliver/llxprt-code), to enable it to connect to any model proxied by CCProxy.

## 📦 1. Get the Custom Version

Since the official Gemini CLI repository only supports Google's Gemini models, we need to use a fork that supports connecting to other models. This guide uses [llxprt-code](https://github.com/acoliver/llxprt-code) as an example, but you can use any other fork you prefer.

### 🖥️ Install `llxprt-code`

First, make sure you have [Node.js 20](https://nodejs.org/en/download) or higher installed on your system.

You can install it via npm:

```sh
npm install -g @vybestack/llxprt-code
```

Or execute it directly via npx:

```sh
npx https://github.com/acoliver/llxprt-code
```

## 🔌 2. Connect to `llxprt`

### 📋 Prerequisites

Before you begin, ensure you have completed the following steps:

1. Installed [Chatspeed](../guide/installation.md)
2. Added the necessary models according to the [Quick Start](../guide/quickStart.md)
3. Completed the [CCProxy Basic Configuration](configuration.md)
4. Added the required proxy models
5. Configured the proxy keys

> For `llxprt`, the model is specified by the user, so configuring a **Proxy Group** is not a necessary condition.

### 📝 Configure `llxprt`

1. In your command line, switch to your project directory and run `llxprt` to enter.
2. After entering `llxprt`, execute the following configuration commands in order:
   - `/provider openai`
   - `/baseurl http://127.0.0.1:11434/compat_mode/v1`
   - `/key {ProxyKey}`
   - `/model {ModelName}`

**Where:**

- `/baseurl http://127.0.0.1:11434/compat_mode/v1`: We set this to tool compatibility mode, which can better extend the model's capabilities. If you want to use native tool calling, set the address to `http://127.0.0.1:11434/v1`.
- `/model {ModelName}`: Specifies the model name to use, for example `qwen3-coder`. You can get the model name from the [Chatspeed](https://chatspeed.aidyou.ai) settings by clicking through the menu: `Proxy -> Proxy Services`, then find and copy the name of your preferred model.
- `/key {ProxyKey}`: You can get the proxy key from the [Chatspeed](https://chatspeed.aidyou.ai) settings by clicking through the menu: `Proxy -> Proxy Access Keys`. You can create a dedicated key for `llxprt` or use an existing one.

3. After the above settings, `llxprt` can be used normally.
4. If you want to switch models during use, simply execute `/model` to select from the list of available models (if there are multiple).

It should look something like this:

```shell
╭──────────────────╮
│  > who are you?  │
╰──────────────────╯

✦ I'm an interactive CLI agent specializing in software engineering tasks. I'm designed to help you with coding, debugging, project management, and other
  development-related activities. I can read and write files, execute shell commands, search content, and manage tasks - all within your project environment.

  My primary goal is to assist you safely and efficiently while strictly following the project's conventions and your instructions. I work directly within your
  project directory and can help with tasks like:

   - Understanding and modifying code
   - Running tests and build processes
   - Managing dependencies
   - Searching and refactoring code
   - Creating new files and features

  How can I help you with your current project?
```
