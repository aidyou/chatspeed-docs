# 安装指南

本指南将引导您完成 Chatspeed 的安装过程。

## 系统要求

在开始之前，请确保您的系统满足以下要求：

### 最低要求

- **操作系统类型**：Windows、macOS、Linux
- **内存**：1GB RAM 可用
- **存储空间**：500MB 可用空间
- **网络**：稳定的互联网连接

> 目前已测试的系统包括：Windows 10、Windows Server 2019、MacOS 12、MacOS 15、Ubuntu 2024。Linux已预编译了 Redhat 系和 Debian 系的二进制文件。

## 安装方式

### 方式一：预编译二进制文件（推荐）

这是最简单快捷的安装方式：

#### Windows

1. 从 [Releases 页面](https://github.com/aidyou/chatspeed/releases/latest)下载 `.exe` 安装程序。
2. 运行安装程序并按照屏幕上的提示操作。
3. 您可能会看到 Windows SmartScreen 警告。请点击“更多信息”，然后点击“仍要运行”以继续。

#### MacOS

从 [Releases 页面](https://github.com/aidyou/chatspeed/releases/latest)下载 `.dmg` 文件，对于苹果芯片请选择`_aarch64.dmg`后缀的文件，对于 Intel 芯片请选择`_x86.dmg`后缀的文件。

**重要提示：** 在较新版本的 MacOS 上，Gatekeeper 安全机制可能会阻止应用运行，并提示文件“**已损坏**”。这是因为应用尚未经过苹果公证。

请使用以下终端命令来解决此问题：

1. 将 `.app` 文件从挂载的 `.dmg` 镜像中拖拽到您的“应用程序”文件夹。
2. 打开“终端”应用 (Terminal)。
3. 执行以下命令 (可能需要输入您的系统密码):

    ```sh
    sudo xattr -cr /Applications/Chatspeed.app
    ```

4. 命令执行成功后，您就可以正常打开应用了。

#### Linux

1. 从 [Releases 页面](https://github.com/aidyou/chatspeed/releases/latest)下载 `.AppImage`、`.deb` 或 `.rpm` 文件。
2. 对于 `.AppImage` 文件，请先为其添加可执行权限 (`chmod +x Chatspeed*.AppImage`)，然后直接运行。
3. 对于 `.deb` 文件，请使用您的包管理器进行安装，或通过命令 `sudo dpkg -i Chatspeed*.deb` 进行安装。
4. 对于 `.rpm` 文件，请使用您的包管理器进行安装，或通过命令 `sudo rpm -ivh Chatspeed*.rpm` 进行安装。

### 方式二：从源码构建

如果您需要最新的开发版本或想要自定义构建，首先确保您的系统满足以下要求：

- **Rust**：2021 版
- **Node.js**：18.0.0 或更高版本
- **Yarn**：1.22.0 或更高版本

```bash
# 克隆仓库
git clone https://github.com/aidyou/chatspeed.git
cd chatspeed

# 安装依赖
yarn install

# 构建项目
yarn tauri build

```

## 下一步

安装完成后，您可以：

1. **[快速开始](./quickStart.md)** - 运行您的第一个 AI 代理
2. **[配置指南](./configuration.md)** - 详细配置您的模型和分组
3. **[ccproxy 模块](../ccproxy/)** - 了解核心代理功能

## 获取帮助

如果在安装过程中遇到问题：

- 📚 查看 [故障排除指南](./troubleshooting.md)
- 🐛 [报告安装问题](https://github.com/aidyou/chatspeed/issues)
- 💬 [社区讨论](https://github.com/aidyou/chatspeed/discussions)
- 📧 [联系技术支持](mailto:support@chatspeed.ai)
