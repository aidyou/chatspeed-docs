# Chatspeed Documentation

This is the official documentation for Chatspeed - the AI proxy and MCP management platform.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
yarn install

# Start development server
yarn docs:dev

# Build for production
yarn docs:build
```

### Project Structure

```
docs/
├── docs/                    # Documentation source
│   ├── .vuepress/          # VuePress configuration
│   │   └── config.js       # Main configuration file
│   ├── README.md           # English homepage
│   ├── guide/              # Getting started guide
│   ├── ccproxy/            # ccproxy module documentation
│   ├── mcp/                # MCP integration documentation
│   ├── api/                # API reference
│   └── zh/                 # Chinese documentation
│       ├── README.md       # Chinese homepage
│       ├── guide/          # Chinese guide
│       ├── ccproxy/        # Chinese ccproxy docs
│       ├── mcp/            # Chinese MCP docs
│       └── api/            # Chinese API docs
├── package.json            # Project configuration
└── README.md              # This file
```

## 📖 Documentation Sections

### English Documentation
- **[Getting Started](./docs/guide/)** - Installation and quick start
- **[ccproxy Module](./docs/ccproxy/)** - Core proxy functionality
- **[MCP Integration](./docs/mcp/)** - Model Context Protocol
- **[API Reference](./docs/api/)** - Complete API documentation

### Chinese Documentation (中文文档)
- **[快速开始](./docs/zh/guide/)** - 安装和快速入门
- **[ccproxy 模块](./docs/zh/ccproxy/)** - 核心代理功能
- **[MCP 集成](./docs/zh/mcp/)** - 模型上下文协议
- **[API 参考](./docs/zh/api/)** - 完整的 API 文档

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Yarn package manager

### Local Development
1. Clone the repository
2. Install dependencies: `yarn install`
3. Start dev server: `yarn docs:dev`
4. Open http://localhost:8080

### Building
```bash
yarn docs:build
```

The built files will be in `docs/.vuepress/dist/`.

## 🤝 Contributing

We welcome contributions to improve the documentation!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `yarn docs:dev`
5. Submit a pull request

### Writing Guidelines
- Use clear, concise language
- Include code examples where helpful
- Add both English and Chinese versions for new content
- Follow the existing structure and formatting

## 📝 License

This documentation is licensed under the MIT License.