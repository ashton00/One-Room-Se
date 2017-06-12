'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};


exports.session = true;

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};
