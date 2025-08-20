import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { cleanCommentsPlugin } from './plugins/clean-comments.js'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Chatspeed',
  description: 'AI Proxy and MCP Management Platform - Any Claude Code, Any Gemini CLI',

  // Set default locale to redirect to English
  base: '/',



  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
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



  theme: defaultTheme({
    logo: '/images/logo.png',
    repo: 'aidyou/chatspeed',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinkPattern: ':repo/edit/:branch/:path',

    locales: {
      '/': {
        selectLanguageName: 'English',
        navbar: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'ccproxy', link: '/en/ccproxy/' },
          { text: 'MCP', link: '/en/mcp/' },
          { text: 'API', link: '/en/api/' }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting Started',
              children: [
                '/en/guide/README.md',
                '/en/guide/installation.md',
                '/en/guide/quickStart.md',
              ]
            },
            // {
            //   text: 'Core Features',
            //   children: [
            //     '/en/guide/features/overview.md',
            //     '/en/guide/features/ai-agents.md',
            //     '/en/guide/features/model-switching.md',
            //     '/en/guide/features/prompt-engineering.md'
            //   ]
            // }
          ],
          '/en/ccproxy/': [
            {
              text: 'ccproxy Module',
              children: [
                '/en/ccproxy/README.md',
              ]
            },
            {
              text: 'Integration',
              children: [
                '/en/ccproxy/claude-code.md',
                '/en/ccproxy/gemini-cli.md',
                '/en/ccproxy/openrouter.md',
                '/en/ccproxy/troubleshooting.md'
              ]
            }
          ],
          '/en/mcp/': [
            {
              text: 'MCP Proxy',
              children: [
                '/en/mcp/README.md',
              ]
            }
          ],
          '/en/api/': [
            {
              text: 'API Reference',
              children: [
                '/en/api/README.md',
              ]
            }
          ]
        },
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        contributorsText: 'Contributors'
      },
      '/zh/': {
        selectLanguageName: '简体中文',
        navbar: [
          { text: '指南', link: '/zh/guide/' },
          { text: 'ccproxy', link: '/zh/ccproxy/' },
          { text: 'MCP', link: '/zh/mcp/' },
          { text: 'API', link: '/zh/api/' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '快速开始',
              children: [
                '/zh/guide/README.md',
                '/zh/guide/installation.md',
                '/zh/guide/quickStart.md',
              ]
            },
            // {
            //   text: '核心功能',
            //   children: [
            //     '/zh/guide/features/overview.md',
            //     '/zh/guide/features/ai-agents.md',
            //     '/zh/guide/features/model-switching.md',
            //     '/zh/guide/features/prompt-engineering.md'
            //   ]
            // }
          ],
          '/zh/ccproxy/': [
            {
              text: 'ccproxy 模块',
              children: [
                '/zh/ccproxy/README.md',
              ]
            },
            // {
            //   text: '集成指南',
            //   children: [
            //     '/zh/ccproxy/claude-code.md',
            //     '/zh/ccproxy/gemini-cli.md',
            //     '/zh/ccproxy/openrouter.md',
            //     '/zh/ccproxy/troubleshooting.md'
            //   ]
            // }
          ],
          '/zh/mcp/': [
            {
              text: 'MCP 代理',
              children: [
                '/zh/mcp/README.md',
              ]
            }
          ],
          '/zh/api/': [
            {
              text: 'API 参考',
              children: [
                '/zh/api/README.md',
                // '/zh/api/ccproxy-api.md',
                // '/zh/api/mcp-api.md',
                // '/zh/api/webhooks.md'
              ]
            }
          ]
        },
        lastUpdated: '最后更新',
        editLinkText: '在 GitHub 上编辑此页',
        contributorsText: '贡献者'
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

  plugins: [
    cleanCommentsPlugin(),
    markdownChartPlugin({
      mermaid: true
    })
  ]
})
