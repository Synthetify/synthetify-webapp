const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const resolve = item => {
  return path.join(__dirname, '../', item)
}
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    // '@storybook/preset-create-react-app',
    '@storybook/addon-actions/register',
    // '@storybook/addon-knobs/register',
    // '@storybook/addon-viewport/register',
    '@storybook/addon-storysource'
  ],
  core: {
    builder: 'storybook-builder-vite'
  },
  viteFinal(config, { configType }) {
    // customize the Vite config here
    config.resolve.alias.foo = 'bar'
    console.log(config)
    config.define = {
      'process.env.NODE_DEBUG': 'false'
    }
    Object.assign(config.resolve.alias, {
      '@sb': resolve('.storybook'),
      '@static': resolve('src/static'),
      '@components': resolve('src/components'),
      '@containers': resolve('src/containers'),
      '@pages': resolve('src/pages'),
      '@web3': resolve('src/web3'),
      '@reducers': resolve('src/store/reducers'),
      '@selectors': resolve('src/store/selectors'),
      '@sagas': resolve('src/store/sagas'),
      '@consts': resolve('src/store/consts')
    })
    // return the customized config
    return config
  }
  // ... other options here
  // webpackFinal: config => {
  //   // config.node = {
  //   //   fs: 'empty',
  //   //   tls: 'empty',
  //   //   net: 'empty',
  //   //   module: 'empty',
  //   //   console: true
  //   // }

  //   config.resolve.fallback.crypto = false
  //   Object.assign(config.resolve.alias, {
  //     '@sb': resolve('.storybook'),
  //     '@static': resolve('src/static'),
  //     '@components': resolve('src/components'),
  //     '@containers': resolve('src/containers'),
  //     '@pages': resolve('src/pages'),
  //     '@web3': resolve('src/web3'),
  //     '@reducers': resolve('src/store/reducers'),
  //     '@selectors': resolve('src/store/selectors'),
  //     '@sagas': resolve('src/store/sagas'),
  //     '@consts': resolve('src/store/consts')
  //   })
  //   Object.assign(config.resolve.fallback, {
  //     fs: false
  //   })
  //   config.plugins.push(new NodePolyfillPlugin())
  //   return config
  // }
}
