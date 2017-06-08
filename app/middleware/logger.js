
const logger = require('morgan');
module.exports = () => {
  return function* (next) {
    yield next;
    logger('dev');
  };
};
