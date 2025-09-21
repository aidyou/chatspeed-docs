import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress/cli'
import { hopeTheme } from 'vuepress-theme-hope'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Chatspeed',
  description: 'AI Proxy and MCP Management Platform - Any Claude Code, Any Gemini CLI',

  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/images/logo-round.png' }],
    ['meta', { name: 'theme-color', content: '#00d4ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Chatspeed',
      description: 'AI Proxy and MCP Management Platform'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Chatspeed',
      description: 'AI 代理和 MCP 管理平台'
    }
  },

  theme: hopeTheme({
    logo: '/images/logo.png',
    repo: 'aidyou/chatspeed',
    docsDir: 'docs',
    docsBranch: 'main',
    editLink: true,

    locales: {
      '/': {
        selectLanguageName: 'English',
        navbar: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'CCProxy', link: '/en/ccproxy/' },
          { text: 'MCP Proxy', link: '/en/mcp/' },
          { text: 'API', link: '/en/api/' },
          { text: 'Prompts', link: '/en/prompt/' },
          { text: 'Blog', link: '/en/posts/' }
        ],
        sidebar: [
          { text: 'Guide', prefix: '/en/guide/', children: 'structure' },
          { text: 'CCProxy', prefix: '/en/ccproxy/', children: 'structure' },
          { text: 'MCP Proxy', prefix: '/en/mcp/', children: 'structure' },
          { text: 'API', prefix: '/en/api/', children: 'structure' },
          { text: 'Prompts', prefix: '/en/prompt/', children: 'structure' },
          { text: 'Posts', prefix: '/en/posts/', children: 'structure' }
        ],
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        contributorsText: 'Contributors',
        blog: {
          name: 'Blog',
          path: '/en/posts/',
          description: 'Chatspeed Blog'
        }
      },
      '/zh/': {
        selectLanguageName: '简体中文',
        navbar: [
          { text: '指南', link: '/zh/guide/' },
          { text: 'CCProxy', link: '/zh/ccproxy/' },
          { text: 'MCP代理', link: '/zh/mcp/' },
          { text: '代理API', link: '/zh/api/' },
          { text: '提示词', link: '/zh/prompt/' },
          { text: '博客', link: '/zh/posts/' }
        ],
        sidebar: [
          { text: '用户指南', prefix: '/zh/guide/', children: 'structure' },
          { text: 'CCProxy 模块', prefix: '/zh/ccproxy/', children: 'structure' },
          { text: 'MCP 代理', prefix: '/zh/mcp/', children: 'structure' },
          { text: 'API 参考', prefix: '/zh/api/', children: 'structure' },
          {
            text: '提示词',
            prefix: '/zh/prompt/',
            children: 'structure'
          },
          { text: '博客', prefix: '/zh/posts/', children: 'structure' }
        ],
        lastUpdated: '最后更新',
        editLinkText: '在 GitHub 上编辑此页',
        contributorsText: '贡献者',
        blog: {
          name: '博客',
          path: '/zh/post/',
          description: 'Chatspeed 博客'
        }
      }
    },

    markdown: {
      mermaid: true
    },

    plugins: {
      blog: {
        filter: ({ filePathRelative }) =>
          filePathRelative &&
          (filePathRelative.startsWith('en/posts/') || filePathRelative.startsWith('zh/posts/'))
      },
      sitemap: {
        hostname: 'https://docs.chatspeed.aidyou.ai',
        excludePaths: ['/404.html'],
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date()
      }
    }
  }),

  bundler: viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions: {
          scss: {
            charset: false
          }
        }
      }
    }
  }),

  plugins: []
})
