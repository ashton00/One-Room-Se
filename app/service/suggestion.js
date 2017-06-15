
/**suggestion 表
+--------------+---------------+------+-----+---------+----------------+
| Field        | Type          | Null | Key | Default | Extra          |
+--------------+---------------+------+-----+---------+----------------+
| SuggestionId | int(11)       | NO   | PRI | NULL    | auto_increment |
| Phone        | bigint(20)    | NO   |     | NULL    |                |
| Name         | varchar(64)   | YES  |     | NULL    |                |
| Description  | varchar(1024) | YES  |     | NULL    |                |
| isReply      | tinyint(1)    | YES  |     | 0       |                |
| isSolve      | tinyint(1)    | YES  |     | 0       |                |
| Solution     | varchar(1024) | YES  |     | NULL    |                |
| Reply        | varchar(1024) | YES  |     | NULL    |                |
+--------------+---------------+------+-----+---------+----------------+
 */

module.exports = app => {
    const db = app.mysql.get('Yishi');
    return class suggestion extends app.Service {
        * add (name, phone) {
            const result = yield db.insert('suggestion', {
                "Name" : name,
                "Phone": phone
            });
            return result;
        }

        * findByPhone(phone) {
            const sugs = yield db.select('suggestion', {
                where: {
                    "Phone": phone
                },
                columns: ["SuggestionId", "Phone", "name", "Description", "isReply", "isSolve", "Solution", "Reply"]
            });

            return sugs;
        }

        * findById(id) {
            const sug = yield db.select('suggestion', {
                where : {
                    "SuggestionId": id
                },
                columns: ["SuggestionId", "Phone", "name", "Description", "isReply", "isSolve", "Solution", "Reply"]
            });
            return sug;
        }
    }
}
