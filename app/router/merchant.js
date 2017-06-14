'use strict'


module.exports = app => {
    app.post('/api/merchant/login', 'merchant.login');
    app.post('/api/merchant', 'merchant.register');
    app.post('/api/merchant/forgetpsw', 'merchant.changePassword');
}
