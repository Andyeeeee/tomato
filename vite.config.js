// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { VitePluginRadar } from 'vite-plugin-radar'
import { VitePWA } from 'vite-plugin-pwa'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    VitePluginRadar({
      analytics: {
        id: 'G-X92Q29X0K6'
      }
    }),
    VitePWA({
      //設定快取自動更新
      registerType: 'autoUpdate',
      workbox: {
        //自動清除過期的快取
        cleanupOutdatedCaches: true,
        //忽略網址參數
        ignoreURLParametersMatching: [/^[0-9za-zA-Z]*$/],
        //設定快與檔案格式
        globPatterns: [
          '**/*.{html,css,js,mp3,woff,eot,ttf,woff2,ico,png,jpg,jpeg,svg,gif}**'
        ]
      },
      manifest: {
        //名稱
        name: 'Pomodoro',
        short_name: 'Pomodoro',
        //工具列顏色
        theme_color: '#1867C0',
        //啟動畫面被景色
        background_color: '#1867C0',
        //pea顯示範圍
        scope: './',
        //啟動網址:
        start_url: './',
        //顯示模式
        display: 'standalone',
        icon: [
          {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
