const token = require('./bin/token-generator')

module.exports = {
  env: {
    MUSICKIT_TEAM_ID: '@musickit-team-id',
    MUSICKIT_KEY_ID: '@musickit-key-id',
    MUSICKIT_KEY: '@musickit-key',
    MUSIC_TOKEN: token
  }
}
