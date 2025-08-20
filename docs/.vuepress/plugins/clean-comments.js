import { getDirname, path } from '@vuepress/utils'
import fs from 'fs'
import { glob } from 'glob'

const __dirname = getDirname(import.meta.url)

export const cleanCommentsPlugin = () => ({
  name: 'clean-comments-plugin',

  onGenerated: async (app) => {
    const distDir = app.dir.dest()

    // 清理 Vue SSR 注释的函数
    function cleanVueComments(content) {
      return content
        .replace(/<!--\[-->/g, '')
        .replace(/<!--\]-->/g, '')
        .replace(/<!--\s*-->/g, '') // 移除空注释
        .replace(/>\s+</g, '><') // 移除标签间的多余空白
    }

    // 处理所有 HTML 文件
    const htmlFiles = await glob('**/*.html', { cwd: distDir })

    for (const file of htmlFiles) {
      const filePath = path.resolve(distDir, file)
      const content = fs.readFileSync(filePath, 'utf8')
      const cleanedContent = cleanVueComments(content)

      if (content !== cleanedContent) {
        fs.writeFileSync(filePath, cleanedContent, 'utf8')
        console.log(`✓ 已清理 Vue SSR 注释: ${file}`)
      }
    }

    console.log('Vue SSR 注释清理完成！')
  }
})