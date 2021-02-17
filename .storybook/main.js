module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-storysource'
  ],
  webpackFinal: config => {
    config.node = {
      fs: 'empty',
      tls: 'empty',
      net: 'empty',
      module: 'empty',
      console: true
    }
    return require('../config-overrides')(config)
  }
}
