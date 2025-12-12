import type { CodegenConfig } from '@graphql-codegen/cli'

// IMPORTANT: Replace the schema URL below with your own Prepr GraphQL URL
// Get your URL from: Prepr Dashboard → Settings → Access tokens
// The URL should look like: https://graphql.prepr.io/ac_YOUR_ACCESS_TOKEN
const config: CodegenConfig = {
    overwrite: true,
    schema: 'https://graphql.prepr.io/ac_808264b0f3a95d8ac97110a5ceaf9d8159638661f63cd17e62163ec6fc626686',
    documents: ['src/queries/**/*.graphql'],
    generates: {
        './src/gql/': {
            preset: 'client',
            presetConfig: {
                fragmentMasking: false,
            },
            plugins: [],
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
}

export default config
