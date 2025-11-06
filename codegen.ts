import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.prepr.io/ac_b2677065e3e02436809dd457f2e04ec17508bc58446ee8dd75e5bcc226a33462",
  documents: ['!src/gql/**/*', 'src/queries/**/*.{ts,tsx}'],
  generates: {
    "./src/gql/": {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [],
      config: {
        reactApolloVersion: 3,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;