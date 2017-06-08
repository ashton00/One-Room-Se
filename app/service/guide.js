
module.exports = app => {

  /**
   * ===========================
   * 1. 获取操作的数据库
   * ===========================
   */

  const db = app.mysql.get('yishi');

  return class guide extends app.Service {

    * find(uid) {
        const user = yield db.get('test', {
            id: uid
        });
        return user;
    }
   /**
    * ===========================
    * read 操作
    * ===========================
    */

    * getSingle(uid) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      // app.mysql.query(sql, values);
      const user = yield db.get('test', {
          id: uid,
      });
      return user;
    }

    * getAll(uid) {

        // SELECT * FROM `posts`;
        const results = yield db.select('posts');
    }

    * getByCondition(uid) {

        /**
         * 查询语句
         * SELECT `author`, `title` FROM `posts`
         * WHERE `status` = 'draft' AND `author` IN('author1','author2')
         * ORDER BY `created_at` DESC, `id` DESC LIMIT 0, 10;
         */

        const results = yield db.select('posts', { // 搜索 post 表
            where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
            columns: ['author', 'title'], // 要查询的表字段
            orders: [['created_at','desc'], ['id','desc']], // 排序方式
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        });
    }

    /**
     * ===========================
     * insert 操作
     * ===========================
     */

    * insert() {

        // INSERT INTO `posts`(`title`) VALUES('Hello World');

        const result = yield db.insert('posts', { title: 'Hello World' });

        /**
         * result的内容
         * {
         *   fieldCount: 0,
         *   affectedRows: 1,
         *   insertId: 3710,
         *   serverStatus: 2,
         *   warningCount: 2,
         *   message: '',
         *   protocol41: true,
         *   changedRows: 0
         * }
         */

         // 判断插入成功
         const insertSuccess = result.affectedRows === 1;
    }

    /**
     * ===========================
     * update 操作
     * ===========================
     */

     * update() {
        // 修改数据，将会根据主键 ID 查找，并更新
        const row = {
          id: 123,
          name: 'fengmk2',
          otherField: 'other field value',    // any other fields u want to update
          modifiedAt: db.literals.now, // `now()` on db server
        };

        // UPDATE `posts` SET `name` = 'fengmk2', `modifiedAt` = NOW() WHERE id = 123 ;

        const result = yield db.update('posts', row); // 更新 posts 表中的记录

        // 判断更新成功
        const updateSuccess = result.affectedRows === 1;
    }

    /**
     * ===========================
     * delete 操作
     * ===========================
     */

     * delete() {

         // DELETE FROM `posts` WHERE `author` = 'fengmk2';
         const result = yield db.delete('posts', {
           author: 'fengmk2',
         });
     }

     * arbitrary() {
         const postId = 1;
         const values = [1, postId];
         const sql = 'update posts set hits = (hits + ?) where id = ?';

         const results = yield db.query(sql, values);
         // => update posts set hits = (hits + 1) where id = 1;
     }

     /**
      * ===========================
      * transaction 操作
      * ===========================
      */
      * transaction1() {
          const conn = yield app.mysql.beginTransaction(); // 初始化事务
          try {
            yield conn.insert(table, row1);  // 第一步操作
            yield conn.update(table, row2);  // 第二步操作
            yield conn.commit(); // 提交事务
          } catch (err) {
            // error, rollback
            yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
            throw err;
          }
      }

      * transaction2() {
          const result = yield db.beginTransactionScope(function* (conn) {
            // don't commit or rollback by yourself
            yield conn.insert(table, row1);
            yield conn.update(table, row2);
            return { success: true };
          }, ctx); // ctx 是当前请求的上下文，如果是在 service 文件中，可以从 `this.ctx` 获取到
          // if error throw on scope, will auto rollback
      }

      /**
       * ===========================
       * 使用 Mysql 内置表达式
       * ===========================
       */
      * literal1 () {
          yield this.app.mysql.insert(table, {
            create_time: db.literals.now,
          });
          // => INSERT INTO `$table`(`create_time`) VALUES(NOW())
      }
      * literal2 () {
          const Literal = db.literals.Literal;
          const first = 'James';
          const last = 'Bond';
          yield db.insert(table, {
            id: 123,
            fullname: new Literal(`CONCAT("${first}", "${last}"`),
          });
          // => INSERT INTO `$table`(`id`, `fullname`) VALUES(123, CONCAT("James", "Bond"))
      }
  }
};
