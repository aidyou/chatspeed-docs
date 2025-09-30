---
title: Claude Code Integration Guide
description: This guide explains how to connect other models to Claude Code via CCProxy. It details prerequisites and steps for connecting CCProxy proxy groups to Claude Code using zsh and bash scripts.
keywords: Claude Code, Integration Guide, CCProxy, Chatspeed, proxy models, zsh, bash, scripts, AI models, development environment
---
# `Claude Code` Integration Guide

> This chapter explains how to connect other models to `Claude Code` via `CCProxy`.

## 📋 Prerequisites

Before you begin, ensure you have completed the following steps:

1. Installed [Chatspeed](../guide/installation.md)
2. Added the necessary models according to the [Quick Start](../guide/quickStart.md)
3. Completed the [CCProxy Basic Configuration](configuration.md)
4. Added the required proxy models
5. Configured the proxy keys

## 🔌 Connecting to Claude Code

To quickly connect CCProxy proxy groups to Claude Code, we provide two scripts for `zsh` and `bash` environments. They allow you to switch between different proxy groups rapidly. Depending on your shell environment, you can copy the corresponding script into your configuration file or save it as a separate script.

> **Important**: Be sure to change `$DEV_KEY` in the script to the key you set in **Proxy Keys**, and change `$KIMI_KEY` to your actual key. Additionally, the `prod` environment in the script uses Kimi's official API endpoint. If you are using `Claude Code`'s official model, please change the `URL` accordingly.

![Copy Proxy Key](/images/en/proxy-key-3.png)

#### 💻 Proxy Group Switching Helper

1. Proxy group switching script for `zsh` environment

```zsh
# Format: [environment_name]="BASE_URL AUTH_TOKEN"
declare -A CLAUDE_ENV_MAP=(
  [dev]="http://127.0.0.1:11434 $DEV_KEY"
  [prod]="https://api.moonshot.cn/anthropic $KIMI_KEY"
)

# Function to set Claude environment variables
# Usage example:
# source ~/.zshrc
# go_claude dev      # Use dev config, URL becomes http://127.0.0.1:11434/dev
# go_claude test     # Also uses dev config, URL is also http://127.0.0.1:11434/test
# go_claude prod     # Use prod config
go_claude() {
  local group_name="$1"     # Original environment name entered by the user
  local lookup_key="$1"   # Key used to look up configuration in the map
  local local_compat_mode="$2"

  # Check if the argument is empty
  if [[ -z "$group_name" ]]; then
    echo "❌ Error: Missing argument. Usage: go_claude <environment_name>"
    # `${(k)VAR}` is Zsh syntax to get all keys of an associative array
    echo "Supported environment names: ${(k)CLAUDE_ENV_MAP}"
    return 1
  fi

  export CLAUDE_GROUP_ENV="$group_name"

  # If the input environment is not \'prod\', force use of \'dev\' configuration
  if [[ "$lookup_key" != "prod" ]]; then
    lookup_key="dev"
  fi

  # Check if \'lookup_key\' exists in the config map to prevent errors
  if [[ -z "${CLAUDE_ENV_MAP[$lookup_key]}" ]]; then
      echo "❌ Error: Configuration for environment \'$lookup_key\' not found."
      return 1
  fi

  # Get the corresponding values
  # `${(z)VAR}` is Zsh syntax to split a string into an array by spaces
  local env_values=("${(z)CLAUDE_ENV_MAP[$lookup_key]}")
  local base_url="${env_values[1]}"
  export ANTHROPIC_AUTH_TOKEN="${env_values[2]}"

  # Build the final URL
  local final_url="$base_url"
  if [[ "$lookup_key" == "dev" ]]; then
    if [[ "$local_compat_mode" == "normal" ]]; then
      final_url="$final_url/$group_name"
    else
      final_url="$final_url/$group_name/compat_mode"
    fi
  fi

  # If group_name is not "prod", test the endpoint
  if [ "$group_name" != "prod" ]; then
    echo "Testing endpoint: $final_url/v1/models"

    # Check if ANTHROPIC_AUTH_TOKEN is set
    if [ -z "$ANTHROPIC_AUTH_TOKEN" ]; then
      echo "❌ Error: ANTHROPIC_AUTH_TOKEN is not set for group \'$group_name\'"
      return 1
    fi

    # Use curl to send the request and get the response
    local response
    response=$(curl -s -L -X GET "$final_url/v1/models" \
      -H "Content-Type: application/json" \
      -H "x-api-key: $ANTHROPIC_AUTH_TOKEN")

    # Check if the curl command executed successfully
    if [ $? -ne 0 ]; then
      echo "❌ Error: curl command failed to execute."
      return 1
    fi

    # Check if the response is empty
    if [ -z "$response" ]; then
      echo "❌ Error: Received an empty response from the server."
      return 1
    fi

    # Use jq to parse the number of models
    local model_count
    model_count=$(echo "$response" | jq ".data | length")

    # Check if jq parsed successfully and if model_count is a number
    if [ $? -ne 0 ] || ! [[ "$model_count" =~ ^[0-9]+$ ]]; then
      echo "❌ Error: Failed to parse JSON response or response is not valid."
      echo "   Response: $response"
      return 1
    fi

    # Check if the number of models is greater than 0
    if [ "$model_count" -le 0 ]; then
      echo "❌ Error: Test failed. No models found at the endpoint."
      echo "   Response: $response"
      return 1
    fi

    echo "✅ Test successful. Found $model_count models."
  fi

  # Test passed or not required, export environment variables
  export ANTHROPIC_BASE_URL="$final_url"

  # Display success message and clarify which configuration is being used
  echo "✅ Successfully switched to environment: $group_name (using \'$lookup_key\' config)"
  echo "👉 ANTHROPIC_BASE_URL = $ANTHROPIC_BASE_URL"
  # echo "   ANTHROPIC_AUTH_TOKEN = $ANTHROPIC_AUTH_TOKEN"

  echo "👉 Entering Claude ..."
  claude --model claude-sonnet-4-5-20250929
}
```

2. Proxy group switching script for `bash` environment

```sh
# Format: [environment_name]="BASE_URL AUTH_TOKEN"
declare -A CLAUDE_ENV_MAP=(
  [dev]="http://127.0.0.1:11434 $DEV_KEY"
  [prod]="https://api.moonshot.cn/anthropic $KIMI_KEY"
)

# Function to set Claude environment variables
# Usage example:
# source ~/.bashrc
# go_claude dev      # Use dev config, URL becomes http://127.0.0.1:11434/dev
# go_claude test     # Also uses dev config, URL is also http://127.0.0.1:11434/test
# go_claude prod     # Use prod config
go_claude() {
  local group_name="$1"     # Original environment name entered by the user
  local lookup_key="$1"   # Key used to look up configuration in the map
  local local_compat_mode="$2"

  # Check if the argument is empty
  if [[ -z "$group_name" ]]; then
    echo "❌ Error: Missing argument. Usage: go_claude <environment_name>"
    # Get all keys of an associative array in bash
    echo "Supported environment names: ${!CLAUDE_ENV_MAP[@]}"
    return 1
  fi

  export CLAUDE_GROUP_ENV="$group_name"

  # If the input environment is not \'prod\', force use of \'dev\' configuration
  if [[ "$lookup_key" != "prod" ]]; then
    lookup_key="dev"
  fi

  # Check if \'lookup_key\' exists in the config map to prevent errors
  if [[ -z "${CLAUDE_ENV_MAP[$lookup_key]}" ]]; then
      echo "❌ Error: Configuration for environment \'$lookup_key\' not found."
      return 1
  fi

  # Get the corresponding values
  # Use read -a in bash to split a string into an array
  IFS=\' \' read -ra env_values <<< "${CLAUDE_ENV_MAP[$lookup_key]}"
  local base_url="${env_values[0]}"
  export ANTHROPIC_AUTH_TOKEN="${env_values[1]}"

  # Build the final URL
  local final_url="$base_url"
  if [[ "$lookup_key" == "dev" ]]; then
    if [[ "$local_compat_mode" == "normal" ]]; then
      final_url="$final_url/$group_name"
    else
      final_url="$final_url/$group_name/compat_mode"
    fi
  fi

  # If group_name is not "prod", test the endpoint
  if [ "$group_name" != "prod" ]; then
    echo "Testing endpoint: $final_url/v1/models"

    # Check if ANTHROPIC_AUTH_TOKEN is set
    if [ -z "$ANTHROPIC_AUTH_TOKEN" ]; then
      echo "❌ Error: ANTHROPIC_AUTH_TOKEN is not set for group \'$group_name\'"
      return 1
    fi

    # Use curl to send the request and get the response
    local response
    response=$(curl -s -L -X GET "$final_url/v1/models" \
      -H "Content-Type: application/json" \
      -H "x-api-key: $ANTHROPIC_AUTH_TOKEN")

    # Check if the curl command executed successfully
    if [ $? -ne 0 ]; then
      echo "❌ Error: curl command failed to execute."
      return 1
    fi

    # Check if the response is empty
    if [ -z "$response" ]; then
      echo "❌ Error: Received an empty response from the server."
      return 1
    fi

    # Use jq to parse the number of models
    local model_count
    model_count=$(echo "$response" | jq ".data | length")

    # Check if jq parsed successfully and if model_count is a number
    if [ $? -ne 0 ] || ! [[ "$model_count" =~ ^[0-9]+$ ]]; then
      echo "❌ Error: Failed to parse JSON response or response is not valid."
      echo "   Response: $response"
      return 1
    fi

    # Check if the number of models is greater than 0
    if [ "$model_count" -le 0 ]; then
      echo "❌ Error: Test failed. No models found at the endpoint."
      echo "   Response: $response"
      return 1
    fi

    echo "✅ Test successful. Found $model_count models."
  fi

  # Test passed or not required, export environment variables
  export ANTHROPIC_BASE_URL="$final_url"

  # Display success message and clarify which configuration is being used
  echo "✅ Successfully switched to environment: $group_name (using \'$lookup_key\' config)"
  echo "👉 ANTHROPIC_BASE_URL = $ANTHROPIC_BASE_URL"
  # echo "   ANTHROPIC_AUTH_TOKEN = $ANTHROPIC_AUTH_TOKEN"

  echo "👉 Entering Claude ..."
  claude --model claude-sonnet-4-5-20250929
}
```

#### 🔀 Proxy Group Switching

Taking `zsh` as an example, copy the above script to your `~/.zshrc`, then execute `source ~/.zshrc` to make it effective.

Next we can start using `Claude Code`:

1. Execute `source ~/.zshrc`
2. Execute `go_claude qwen`

Below is my output example:

```zsh
> go_claude qwen
Testing endpoint: http://127.0.0.1:11434/qwen/compat_mode/v1/models
✅ Test successful. Found 3 models.
✅ Successfully switched to environment: qwen (using 'dev' config)
👉 ANTHROPIC_BASE_URL = http://127.0.0.1:11434/qwen/compat_mode
👉 Entering Claude ...
╭───────────────────────────────────────────────────╮
│ ✻ Welcome to Claude Code!                         │
│                                                   │
│   /help for help, /status for your current setup  │
│                                                   │
│   cwd: /opt/dev/chatspeed                         │
│                                                   │
│   ─────────────────────────────────────────────── │
│                                                   │
│   Overrides (via env):                            │
│                                                   │
│   • API Base URL:                                 │
│   http://127.0.0.1:11434/qwen/compat_mode         │
╰───────────────────────────────────────────────────╯
```

Now you can enjoy using the free `Claude Code`!
