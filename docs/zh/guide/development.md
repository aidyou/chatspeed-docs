# 开发指南

## 开发要求

### 系统依赖

- sqlite3: 数据库操作所需
- bzip2: 压缩功能所需

### 推荐的IDE设置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 开发

```sh
yarn install
yarn tauri dev
```

## 构建

### Windows

#### 先决条件

1. 安装 Visual Studio 2022，包含：
   - "使用C++的桌面开发"工作负载
   - Windows SDK (10.0.22621.0 或更高版本)
   - MSVC v143 - VS 2022 C++ x64/x86 构建工具
   - 对于 ARM64 构建："MSVC v143 - VS 2022 C++ ARM64 构建工具"

2. 安装 Node.js 和 Yarn

   ```sh
   # 如果尚未安装，则安装 yarn
   npm install -g yarn
   ```

3. 安装 Rust

   ```sh
   # 从 https://rustup.rs/ 安装
   rustup target add x86_64-pc-windows-msvc  # 用于 x64 构建
   rustup target add aarch64-pc-windows-msvc # 用于 ARM64 构建
   ```

4. 安装依赖项

   ```sh
   # 安装项目依赖
   yarn install
   ```

5. 安装和配置 vcpkg

   ```sh
   # 克隆并引导 vcpkg
   git clone https://github.com/microsoft/vcpkg
   cd vcpkg
   .\bootstrap-vcpkg.bat

   # 安装所需的库
   # 对于 x64 构建：
   .\vcpkg install sqlite3:x64-windows-static-md
   .\vcpkg install bzip2:x64-windows-static-md

   # 对于 ARM64 构建：
   .\vcpkg install sqlite3:arm64-windows-static-md
   .\vcpkg install bzip2:arm64-windows-static-md
   ```

#### 构建

选项 1：使用自动化构建脚本（推荐）

```sh
# 这将自动设置环境并构建
.\build.bat
```

选项 2：手动构建

```sh
# 首先，设置环境变量
.\setup-env.ps1  # PowerShell 脚本（推荐）
# 或
.\setup-env.bat  # 批处理脚本（用于兼容性）

# 然后构建
yarn tauri build
```

构建输出将位于 `src-tauri/target/release/`。

注意：每次打开新的命令提示窗口时都需要进行环境设置，因为环境变量仅在当前会话中有效。

### Linux

#### 先决条件

```sh
# 安装系统依赖（适用于 Debian/Ubuntu）
sudo apt-get update
sudo apt-get install -y \
  build-essential \
  pkg-config \
  libssl-dev \
  libgtk-3-dev \
  libwebkit2gtk-4.1-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  libsoup-3.0-dev \
  libbz2-dev \
  libsqlite3-dev

# 安装 Node.js 和 Yarn
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g yarn

# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### 构建

```sh
# 安装依赖
yarn install

# 构建
yarn tauri build
```

### macOS

#### 先决条件

```sh
# 如果尚未安装，则安装 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装系统依赖
brew install node
brew install yarn
brew install sqlite3

# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### 构建

```sh
# 安装依赖
yarn install

# 不打包构建
yarn tauri build --no-bundle

# 为 macOS App Store 之外的分发打包
yarn tauri bundle --bundles app,dmg
```
