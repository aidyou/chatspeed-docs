#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 清理 Vue SSR 注释的函数
function cleanVueComments(content) {
  // 移除 Vue 3 SSR 片段注释
  return content
    .replace(/<!--\[-->/g, '')
    .replace(/<!--\]-->/g, '')
    .replace(/<!--\s*-->/g, '') // 移除空注释
    .replace(/>\s*</g, '><'); // 移除标签间的多余空白
}

// 递归处理目录中的所有 HTML 文件
function processDirectory(dir) {
  const htmlFiles = glob.sync('**/*.html', { cwd: dir });

  htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const cleanedContent = cleanVueComments(content);

    if (content !== cleanedContent) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`✓ 已清理: ${file}`);
    }
  });
}

// 主函数
function main() {
  const distDir = path.join(__dirname, '../docs/.vuepress/dist');

  if (!fs.existsSync(distDir)) {
    console.error('错误: 构建目录不存在，请先运行构建命令');
    process.exit(1);
  }

  console.log('开始清理 Vue SSR 注释...');
  processDirectory(distDir);
  console.log('清理完成！');
}

main();