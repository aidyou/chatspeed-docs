# Frequently Asked Questions

## Installation

### How to install Chatspeed on macOS?
You can install using Homebrew (recommended):
```bash
brew install aidyou/tap/chatspeed
```

Or download pre-compiled binaries from GitHub.

### How to verify Chatspeed is working after installation?
Run the following command to check the version:
```bash
chatspeed --version
```

## Configuration

### How to add a new AI model?
Use the `chatspeed model add` command to add a new model:
```bash
chatspeed model add \
  --name "my-model" \
  --provider "openai" \
  --model "gpt-3.5-turbo" \
  --api-key "your-api-key" \
  --base-url "https://api.openai.com/v1"
```

### How to create model groups?
Use the `chatspeed group create` command to create groups:
```bash
chatspeed group create \
  --name "coding" \
  --model "qwen-coder" \
  --temperature 0.3 \
  --description "Coding-specific model"
```

## ccproxy

### What AI protocols does ccproxy support?
ccproxy supports the following protocols:
- OpenAI-compatible APIs
- Claude Messages API
- Google Gemini API
- Ollama API

### How to use ccproxy with Claude Code?
Set environment variables:
```bash
export ANTHROPIC_API_BASE="http://localhost:11434/free"
export ANTHROPIC_API_KEY="dummy-key"
```

## MCP

### How to add MCP tools?
Use the `chatspeed mcp add` command to add tools:
```bash
chatspeed mcp add \
  --name "filesystem" \
  --command "npx @modelcontextprotocol/server-filesystem" \
  --args "/path/to/your/project" \
  --description "File system access tool"
```

### How to use MCP tools in IDEs?
Set the server URL in your IDE's MCP configuration:
```
MCP Server URL: http://localhost:11434/mcp/filesystem
```

## Troubleshooting

### What to do if the port is occupied?
Modify the port setting in the configuration file, or terminate the process occupying the port:
```bash
# Find the process occupying the port
lsof -i :11434

# Terminate the process
kill -9 <PID>
```

### What to do if model connection fails?
1. Check if the API Key is correct
2. Verify network connectivity
3. Confirm the model provider's service is available
4. Check logs for detailed error information

### How to view Chatspeed logs?
Use the following command to view logs:
```bash
chatspeed logs
```

## Performance Optimization

### How to improve response speed?
1. Use local models (e.g., Ollama)
2. Enable caching features
3. Optimize prompt engineering
4. Adjust model parameters (e.g., temperature)

### How to reduce usage costs?
1. Use free model providers (e.g., OpenRouter)
2. Create cost-optimized model groups
3. Set appropriate max token limits
4. Utilize model rotation features

## Development

### How to build Chatspeed from source?
```bash
git clone https://github.com/aidyou/chatspeed.git
cd chatspeed
yarn install
yarn build
cargo install --path .
```

### How to contribute code?
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a Pull Request

## Other Questions

### Is Chatspeed open source software?
Yes, Chatspeed is open source software licensed under the MIT License.

### What operating systems are supported?
Chatspeed supports Windows 10+, macOS 10.15+, and Linux (Ubuntu 18.04+).

### How to get technical support?
You can get technical support through:
- [GitHub Issues](https://github.com/aidyou/chatspeed/issues)
- [GitHub Discussions](https://github.com/aidyou/chatspeed/discussions)
- Email support: support@chatspeed.ai
```