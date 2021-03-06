const path = require('path');

module.exports = function getStaticPath(app) {
  let servePath = './dist';

  if (app.config.static && app.config.static.path) {
    servePath = app.config.static.path;
  }

  return path.resolve(app.appPath, servePath);
};
