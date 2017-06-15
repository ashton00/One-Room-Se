'use strict';

module.exports = app => {

  /** 用法
   *
   * ===========================
   * 1. 引入分级路由
   * ===========================
   *
   * require('./router/admin')(app);
   *
   * ===========================
   * 2. 中间件
   * ===========================
   *
   * app.get('s', '/search', app.middlewares.uppercase(), * 'search');
   *
   **/
   require('./router/user')(app);
   // 向导页
   require('./router/guide')(app);
   require('./router/merchant.js')(app);
   require('./router/suggestion.js')(app);
};
