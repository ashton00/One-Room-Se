'use strict';
const path = require('path');

module.exports = appInfo => {

    const config = {
        keys: appInfo.name + '_1491305047393_8445',
        middleware: [ 'saveSession', //每次操作都会重新延长Session的过期时间，只有长时间未操作才会登出
                      'logger' // 记录API请求的路径时间等内容
                    ],

        // redis-cli -h 127.0.0.1 -p 6379 -a 123456
        //

        redis : {
            default: {
                host: '127.0.0.1',
                port: '6379',
                password: '123456',
                db: '1'
            },
            client: {
                session: {
                    key: 'YISHI_SESS',
                    maxAge: 3 * 3600 * 1000, // 3个小时
                    httpOnly: true,
                    encrypt: false, // 是否加密
                },
                cache: {},
            },
            agent: true,
            app: true,
          },

        sessionRedis : {
        //   name: 'session', // specific `session` as the session store
        },

        salt: 'ThisIsYiShiSha1Salt',

        security:{
            csrf: {
                enable: false,
            }
        },

        bodyParser: {
            jsonLimit: '10mb',
            enable: true
        },

        logger : {
          dir: path.join(appInfo.root, 'logs', appInfo.name),
          encoding: 'utf8',
          env: appInfo.env,
          level: 'INFO',
          consoleLevel: 'INFO',
          outputJSON: false,
          buffer: true,
          appLogName: `${appInfo.name}-web.log`,
          coreLogName: 'egg-web.log',
          agentLogName: 'egg-agent.log',
          errorLogName: 'common-error.log',
          coreLogger: {},
      },



        mysql: {
          clients: {
            // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
            Yishi: {
                host: '127.0.0.1',
                port: '3306',
                user: 'root',
                password: '123456',
                database: 'yishi'
            }
          },
          // 所有数据库配置的默认值
          default: {
          },
          // 是否加载到 app 上，默认开启
          app: true,
          // 是否加载到 agent 上，默认关闭
          agent: true
        },


        httpclient : {
            // 默认开启 http/https KeepAlive 功能
            keepAlive: true,
            // 空闲的 KeepAlive socket 最长可以存活 4 秒
            freeSocketKeepAliveTimeout: 4000,
            // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
            timeout: 30000,
            // 允许创建的最大 socket 数
            maxSockets: Infinity,
            // 最大空闲 socket 数
            maxFreeSockets: 256,
            // 是否开启本地 DNS 缓存，默认关闭
            // 一旦设置开启，则每个域名的 DNS 查询结果将在进程内缓存 10 秒
            enableDNSCache: false
        },
    }

    return config;
}
