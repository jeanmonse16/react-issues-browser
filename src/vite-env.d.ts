
interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string
  readonly VITE_GRAPHQL_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}