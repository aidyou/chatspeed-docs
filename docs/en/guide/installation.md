# Installation Guide

This guide will walk you through the installation process for Chatspeed.

## System Requirements

Before you begin, please ensure your system meets the following requirements:

### Minimum Requirements

- **Operating System**: Windows, macOS, Linux
- **Memory**: 1GB RAM available
- **Storage**: 500MB available space
- **Network**: A stable internet connection

> Currently tested systems include: Windows 10, Windows Server 2019, macOS 12, macOS 15, and Ubuntu 2024. Pre-compiled binaries are available for Red Hat and Debian-based Linux distributions.

## Installation Methods

### Method 1: Pre-compiled Binaries (Recommended)

This is the easiest and fastest way to install:

#### Windows

1.  Download the `.exe` installer from the [Releases page](https://github.com/aidyou/chatspeed/releases/latest).
2.  Run the installer and follow the on-screen instructions.
3.  You may see a Windows SmartScreen warning. Click "More info," then "Run anyway" to proceed.

#### macOS

Download the `.dmg` file from the [Releases page](https://github.com/aidyou/chatspeed/releases/latest). For Apple Silicon, choose the file with the `_aarch64.dmg` suffix; for Intel chips, choose the `_x86.dmg` suffix.

**Important Note:** On recent versions of macOS, the Gatekeeper security feature may prevent the app from running and show a message that the file is "**damaged**". This is because the application has not yet been notarized by Apple.

Please use the following terminal command to resolve this issue:

1.  Drag the `.app` file from the mounted `.dmg` image to your "Applications" folder.
2.  Open the Terminal app.
3.  Execute the following command (you may need to enter your system password):

    ```sh
    sudo xattr -cr /Applications/Chatspeed.app
    ```

4.  After the command executes successfully, you can open the application normally.

#### Linux

1.  Download the `.AppImage`, `.deb`, or `.rpm` file from the [Releases page](https://github.com/aidyou/chatspeed/releases/latest).
2.  For `.AppImage` files, first grant execute permissions (`chmod +x Chatspeed*.AppImage`), then run it directly.
3.  For `.deb` files, use your package manager to install, or install via the command `sudo dpkg -i Chatspeed*.deb`.
4.  For `.rpm` files, use your package manager to install, or install via the command `sudo rpm -ivh Chatspeed*.rpm`.

### Method 2: Building from Source

If you need the latest development version or want to customize the build, first ensure your system meets the following requirements:

- **Rust**: 2021 edition
- **Node.js**: 18.0.0 or later
- **Yarn**: 1.22.0 or later

```bash
# Clone the repository
git clone https://github.com/aidyou/chatspeed.git
cd chatspeed

# Install dependencies
yarn install

# Build the project
yarn tauri build

```

## Next Steps

After installation, you can:

1. **[Quick Start](./quickStart.md)** - Get started quickly.
2. **[CCProxy Module](../ccproxy/)** - Learn about the core proxy features.
3. **[MCP Module](../mcp/)** - Learn about the core proxy features.

## Getting Help

If you encounter problems during installation:

- 🐛 [Report an issue](https://github.com/aidyou/chatspeed/issues)
- 💬 [Join the discussion](https://github.com/aidyou/chatspeed/discussions)
- 📧 [Contact support](mailto:support@chatspeed.ai)
