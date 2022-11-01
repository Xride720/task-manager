/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: 'devolopment' | 'production'
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}