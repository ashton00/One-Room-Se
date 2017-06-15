'use strict'


module.exports = app => {
    app.post('/api/merchants/login', 'merchant.login');
    app.post('/api/merchants', 'merchant.register');
    app.post('/api/merchants/forgetpsw', 'merchant.changePassword');
}
