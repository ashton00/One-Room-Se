

/** User 表
+----------+------------------------------+------+-----+---------+----------------+
| Field    | Type                         | Null | Key | Default | Extra          |
+----------+------------------------------+------+-----+---------+----------------+
| UserId   | bigint(20) unsigned zerofill | NO   | PRI | NULL    | auto_increment |
| Phone    | bigint(20)                   | YES  | UNI | NULL    |                |
| Password | varchar(64)                  | NO   |     | NULL    |                |
| Realname | varchar(64)                  | YES  |     | NULL    |                |
| Nickname | varchar(64)                  | YES  |     | NULL    |                |
| Gender   | enum('male','female')        | YES  |     | NULL    |                |
| Email    | varchar(64)                  | YES  |     | NULL    |                |
| Level    | int(10) unsigned             | YES  |     | NULL    |                |
| Points   | int(10) unsigned             | YES  |     | NULL    |                |
| CeateAt  | datetime                     | YES  |     | NULL    |                |
| IdCard   | bigint(20) unsigned          | YES  |     | NULL    |                |
| isDelete | tinyint(1)                   | NO   |     | 0       |                |
| isValid  | tinyint(1)                   | NO   |     | 0       |                |
+----------+------------------------------+------+-----+---------+----------------+
 */

module.exports = app => {
    const db = app.mysql.get('Yishi');
    return class user extends app.Service {
        /**
         * 用户登陆
         * @param [Number] phone
         * @param [String] password
         */
        * login(phone, password) {
            const user = yield db.select('user', {
                where: {
                    phone: phone,
                    password: password
                },
                columns: ['UserId', 'Realname', 'Nickname', 'Gender', 'Email', 'Level', 'Points', 'CeateAt', 'IDCard', 'isDelete', 'isValid']
            });
            return user;
        }

        * findByPhone(phone) {
            const user = yield db.select('user', {
                where: {
                    phone: phone,
                },
                columns: ['UserId', 'Realname', 'Nickname', 'Gender', 'Email', 'Level', 'Points', 'CeateAt', 'IDCard', 'isDelete', 'isValid']
            });
            return user;
        }

        * register(phone, password) {
            const result = yield db.insert('user', {
                phone: phone,
                password: password
            });
            return result;
        }

        *updatePswByUserId(psw, userId) {
            const query = {
                "Password" : psw
            }
            const result  = yield db.update('user', query, {
                where: {
                    "UserId": userId
                },
                columns: ["Password"]

            });

            const isUpdateSuccess = result.affectedRows === 1;

            return isUpdateSuccess;
        }

    }
}
