# `Claude Code` 接入指南

> 本章主要讲解如何通过 `CCProxy` 将其他的模型接入 `Claude Code`

## 📋 前提条件

在开始使用前，请确保已完成以下步骤：

1. 已安装了 [Chatspeed](../guide/installation.md)
2. 根据[快速开始](../guide/quickStart.md)添加了必要的模型
3. 已完成[CCProxy 基础配置](configuration.md)
4. 已添加所需的代理模型
5. 已配置好代理密钥

## 🔌 接入 Claude Code

为了方便快速将 CCProxy 代理分组接入 Claude Code，我们提供了两个脚本，分别用于 `zsh` 和 `bash` 环境。利用它们，您可以快速进入不同的代理分组。根据您使用的 Shell 环境，可以直接将相应脚本拷贝到配置文件中或保存为独立脚本。

> **重要**：务必将脚本中的`$DEV_KEY`修改为您在**代理密钥**中设置的密钥，并将`$KIMI_KEY`修改为您的实际密钥。另外，脚本中的`prod`环境使用了 Kimi 官方的 API 接口，如果您使用的是`Claude Code`的官方模型，请将其改为相应的`URL`。

![Copy Proxy Key](/images/zh/proxy-key-3.png)

#### 💻 代理分组切换辅助

1. `zsh` 环境下的代理分组切换脚本

```zsh
# Format: [environment_name]="BASE_URL AUTH_TOKEN"
declare -A CLAUDE_ENV_MAP=(
  [dev]="http://127.0.0.1:11434 $DEV_KEY"
  [prod]="https://api.moonshot.cn/anthropic $KIMI_KEY"
)

# 设置 Claude 环境变量的函数
# 使用示例:
# source ~/.zshrc
# go_claude dev      # 使用 dev 配置，URL 会变成 http://127.0.0.1:11434/dev
# go_claude test     # 同样使用 dev 配置，URL 也是 http://127.0.0.1:11434/test
# go_claude prod     # 使用 prod 配置
go_claude() {
  local group_name="$1"     # 用户输入的原始环境名
  local lookup_key="$1"   # 用于从映射中查找配置的键
  local local_compat_mode="$2"

  # 检查参数是否为空
  if [[ -z "$group_name" ]]; then
    echo "❌ 错误：缺少参数。用法: go_claude <环境名称>"
    # `${(k)VAR}` 是 Zsh 中获取关联数组所有键的语法
    echo "支持的环境名称: ${(k)CLAUDE_ENV_MAP}"
    return 1
  fi

  export CLAUDE_GROUP_ENV="$group_name"

  # 如果输入的环境不是 'prod'，则强制使用 'dev' 的配置
  if [[ "$lookup_key" != "prod" ]]; then
    lookup_key="dev"
  fi

  # 检查 'lookup_key' 是否存在于配置映射中，防止后续操作出错
  if [[ -z "${CLAUDE_ENV_MAP[$lookup_key]}" ]]; then
      echo "❌ 错误：未找到环境 '$lookup_key' 的配置。"
      return 1
  fi

  # 获取对应的值
  # `${(z)VAR}` 是 Zsh 中将字符串按空格分割成数组的语法
  local env_values=("${(z)CLAUDE_ENV_MAP[$lookup_key]}")
  local base_url="${env_values[1]}"
  export ANTHROPIC_AUTH_TOKEN="${env_values[2]}"

  # 构建最终的 URL
  local final_url="$base_url"
  if [[ "$lookup_key" == "dev" ]]; then
    if [[ "$local_compat_mode" == "normal" ]]; then
      final_url="$final_url/$group_name"
    else
      final_url="$final_url/$group_name/compat_mode"
    fi
  fi

  # 如果 group_name 不是 "prod"，则进行接口测试
  if [ "$group_name" != "prod" ]; then
    echo "Testing endpoint: $final_url/v1/models"

    # 检查 ANTHROPIC_AUTH_TOKEN 是否设置
    if [ -z "$ANTHROPIC_AUTH_TOKEN" ]; then
      echo "❌ Error: ANTHROPIC_AUTH_TOKEN is not set for group '$group_name'."
      return 1
    fi

    # 使用 curl 发送请求并获取返回
    local response
    response=$(curl -s -L -X GET "$final_url/v1/models" \
      -H "Content-Type: application/json" \
      -H "x-api-key: $ANTHROPIC_AUTH_TOKEN")

    # 检查 curl 命令是否执行成功
    if [ $? -ne 0 ]; then
      echo "❌ Error: curl command failed to execute."
      return 1
    fi

    # 检查返回是否为空
    if [ -z "$response" ]; then
      echo "❌ Error: Received an empty response from the server."
      return 1
    fi

    # 使用 jq 解析模型数量
    local model_count
    model_count=$(echo "$response" | jq '.data | length')

    # 检查 jq 是否成功解析，以及 model_count 是否为数字
    if [ $? -ne 0 ] || ! [[ "$model_count" =~ ^[0-9]+$ ]]; then
      echo "❌ Error: Failed to parse JSON response or response is not valid."
      echo "   Response: $response"
      return 1
    fi

    # 检查模型数量是否大于 0
    if [ "$model_count" -le 0 ]; then
      echo "❌ Error: Test failed. No models found at the endpoint."
      echo "   Response: $response"
      return 1
    fi

    echo "✅ Test successful. Found $model_count models."
  fi

  # 测试通过或无需测试，导出环境变量
  export ANTHROPIC_BASE_URL="$final_url"

  # 提示成功信息，并明确告知实际使用的配置
  echo "✅ 成功切换到环境: $group_name (使用 '$lookup_key' 配置)"
  echo "👉 ANTHROPIC_BASE_URL = $ANTHROPIC_BASE_URL"
  # echo "   ANTHROPIC_AUTH_TOKEN = $ANTHROPIC_AUTH_TOKEN"

  echo "👉 正在进入 Claude ..."
  claude
}
```

2. `bash`环境下的代理分组切换脚本

```sh
# Format: [environment_name]="BASE_URL AUTH_TOKEN"
declare -A CLAUDE_ENV_MAP=(
  [dev]="http://127.0.0.1:11434 $DEV_KEY"
  [prod]="https://api.moonshot.cn/anthropic $KIMI_KEY"
)

# 设置 Claude 环境变量的函数
# 使用示例:
# source ~/.bashrc
# go_claude dev      # 使用 dev 配置，URL 会变成 http://127.0.0.1:11434/dev
# go_claude test     # 同样使用 dev 配置，URL 也是 http://127.0.0.1:11434/test
# go_claude prod     # 使用 prod 配置
go_claude() {
  local group_name="$1"     # 用户输入的原始环境名
  local lookup_key="$1"   # 用于从映射中查找配置的键
  local local_compat_mode="$2"

  # 检查参数是否为空
  if [[ -z "$group_name" ]]; then
    echo "❌ 错误：缺少参数。用法: go_claude <环境名称>"
    # 在 bash 中获取关联数组的所有键
    echo "支持的环境名称: ${!CLAUDE_ENV_MAP[@]}"
    return 1
  fi

  export CLAUDE_GROUP_ENV="$group_name"

  # 如果输入的环境不是 'prod'，则强制使用 'dev' 的配置
  if [[ "$lookup_key" != "prod" ]]; then
    lookup_key="dev"
  fi

  # 检查 'lookup_key' 是否存在于配置映射中，防止后续操作出错
  if [[ -z "${CLAUDE_ENV_MAP[$lookup_key]}" ]]; then
      echo "❌ 错误：未找到环境 '$lookup_key' 的配置。"
      return 1
  fi

  # 获取对应的值
  # 在 bash 中使用 read -a 来分割字符串为数组
  IFS=' ' read -ra env_values <<< "${CLAUDE_ENV_MAP[$lookup_key]}"
  local base_url="${env_values[0]}"
  export ANTHROPIC_AUTH_TOKEN="${env_values[1]}"

  # 构建最终的 URL
  local final_url="$base_url"
  if [[ "$lookup_key" == "dev" ]]; then
    if [[ "$local_compat_mode" == "normal" ]]; then
      final_url="$final_url/$group_name"
    else
      final_url="$final_url/$group_name/compat_mode"
    fi
  fi

  # 如果 group_name 不是 "prod"，则进行接口测试
  if [ "$group_name" != "prod" ]; then
    echo "Testing endpoint: $final_url/v1/models"

    # 检查 ANTHROPIC_AUTH_TOKEN 是否设置
    if [ -z "$ANTHROPIC_AUTH_TOKEN" ]; then
      echo "❌ Error: ANTHROPIC_AUTH_TOKEN is not set for group '$group_name'."
      return 1
    fi

    # 使用 curl 发送请求并获取返回
    local response
    response=$(curl -s -L -X GET "$final_url/v1/models" \
      -H "Content-Type: application/json" \
      -H "x-api-key: $ANTHROPIC_AUTH_TOKEN")

    # 检查 curl 命令是否执行成功
    if [ $? -ne 0 ]; then
      echo "❌ Error: curl command failed to execute."
      return 1
    fi

    # 检查返回是否为空
    if [ -z "$response" ]; then
      echo "❌ Error: Received an empty response from the server."
      return 1
    fi

    # 使用 jq 解析模型数量
    local model_count
    model_count=$(echo "$response" | jq '.data | length')

    # 检查 jq 是否成功解析，以及 model_count 是否为数字
    if [ $? -ne 0 ] || ! [[ "$model_count" =~ ^[0-9]+$ ]]; then
      echo "❌ Error: Failed to parse JSON response or response is not valid."
      echo "   Response: $response"
      return 1
    fi

    # 检查模型数量是否大于 0
    if [ "$model_count" -le 0 ]; then
      echo "❌ Error: Test failed. No models found at the endpoint."
      echo "   Response: $response"
      return 1
    fi

    echo "✅ Test successful. Found $model_count models."
  fi

  # 测试通过或无需测试，导出环境变量
  export ANTHROPIC_BASE_URL="$final_url"

  # 提示成功信息，并明确告知实际使用的配置
  echo "✅ 成功切换到环境: $group_name (使用 '$lookup_key' 配置)"
  echo "👉 ANTHROPIC_BASE_URL = $ANTHROPIC_BASE_URL"
  # echo "   ANTHROPIC_AUTH_TOKEN = $ANTHROPIC_AUTH_TOKEN"

  echo "👉 正在进入 Claude ..."
  claude
}
```

#### 🔀 代理分组切换

以 `zsh` 为例，将上述脚本拷贝到您的 `~/.zshrc` 中，然后执行 `source ~/.zshrc` 使其生效。

接下来我们就可以开始使用 `Claude Code` 了：

1.  执行 `source ~/.zshrc`
2.  执行 `go_claude qwen`

下面是我的输出示例：

```zsh
> go_claude qwen
Testing endpoint: http://127.0.0.1:11434/qwen/compat_mode/v1/models
✅ Test successful. Found 3 models.
✅ 成功切换到环境: qwen (使用 'dev' 配置)
👉 ANTHROPIC_BASE_URL = http://127.0.0.1:11434/qwen/compat_mode
👉 正在进入 Claude ...
╭───────────────────────────────────────────────────╮
│ ✻ Welcome to Claude Code!                         │
│                                                   │
│   /help for help, /status for your current setup  │
│                                                   │
│   cwd: /Volumes/dev/personal/dev/ai/chatspeed     │
│                                                   │
│   ─────────────────────────────────────────────── │
│                                                   │
│   Overrides (via env):                            │
│                                                   │
│   • API Base URL:                                 │
│   http://127.0.0.1:11434/qwen/compat_mode         │
╰───────────────────────────────────────────────────╯
```

现在，您可以愉快地使用免费的 `Claude Code` 了！
