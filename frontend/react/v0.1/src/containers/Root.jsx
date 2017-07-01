// в зависимости от целей сборки подставляем тот или иной рут компонент
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod')
} else {
  module.exports = require('./Root.dev')
}