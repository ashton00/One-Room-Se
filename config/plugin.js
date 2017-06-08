'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};


exports.session = true;

exports.redis = {
    enbale: true,
    package: 'egg-redis'
}
