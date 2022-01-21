/**
 * @type {import('vite').UserConfig}
 */

import legacy from "@vitejs/plugin-legacy"

const config = {
  root: 'src',
  server: {
    open: '/index.html'
  },
  build: {
    minify: false,
    manifest: true,
    outDir: '../dist'
  },
  plugins: [
    legacy({
      targets: ['IE >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] 
    })
  ]
}

export default config
