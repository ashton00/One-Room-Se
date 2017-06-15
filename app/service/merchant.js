
/** Merchant表
+-------------+------------------+------+-----+-------------------+----------------+
| Field       | Type             | Null | Key | Default           | Extra          |
+-------------+------------------+------+-----+-------------------+----------------+
| MerchantId  | int(11)          | NO   | PRI | NULL              | auto_increment |
| Account     | varchar(64)      | YES  |     | NULL              |                |
| Phone       | bigint(20)       | NO   | UNI | NULL              |                |
| Email       | varchar(64)      | YES  |     | NULL              |                |
| Level       | int(11)          | YES  |     | NULL              |                |
| Points      | int(10) unsigned | YES  |     | NULL              |                |
| CreateAt    | timestamp        | YES  |     | CURRENT_TIMESTAMP |                |
| QQorWechat  | varchar(45)      | YES  |     | NULL              |                |
| Company     | varchar(64)      | YES  |     | NULL              |                |
| Address     | varchar(255)     | YES  |     | NULL              |                |
| Description | varchar(255)     | YES  |     | NULL              |                |
| JobTitle    | varchar(64)      | YES  |     | NULL              |                |
| Password    | varchar(64)      | YES  |     | NULL              |                |
| Realname    | varchar(45)      | YES  |     | NULL              |                |
| ZipCode     | varchar(16)      | YES  |     | NULL              |                |
| isDelete    | tinyint(1)       | YES  |     | 0                 |                |
| isValid     | tinyint(1)       | YES  |     | 0                 |                |
+-------------+------------------+------+-----+-------------------+----------------+

 */
module.exports = app => {
    const db = app.mysql.get('Yishi');
    return class merchant extends app.Service {
        * login(phone, password) {
            const merchant = yield db.select('merchant', {
                where: {
                    "phone": phone,
                    "password": password
                },
                columns:['MerchantId','Account','Phone','Email','Level','Points','CreateAt','QQorWechat','Company','Address','Description','JobTitle','Realname','ZipCode']
            })

            return merchant;
        }

        * findByPhone(phone) {
            const merchant = yield db.select('merchant', {
                where: {
                    phone: phone,
                },
                columns:['MerchantId','Account','Phone']
            });
            return merchant;
        }

        * register(phone, password, realname, email, QQorWechat, jobTitle, company, address, zipCode, description) {
            const result = yield db.insert('merchant', {
                "phone" : phone,
                "password": password,
                "realname" :  realname,
                "email" : email,
                "QQorWechat" : QQorWechat,
                "jobTitle" : jobTitle,
                "company" : company,
                "address" : address,
                "zipCode" : zipCode,
                "description" : description
            });

            return result;
        }

        * updatePswByMerchantId(password, phone) {
            const query = {
                "password":  password
            }

            const result = yield db.update('merchant', query, {
                where : {
                    "phone": phone,
                },
                columns: ["password"]
            });

            const isUpdateSuccess = result.affectedRows === 1;

            return isUpdateSuccess
        }
    }
}
