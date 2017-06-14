'use strict'


module.exports = app => {
    app.post('/api/users/login', 'user.login');
    app.post('/api/users', 'user.register');
    app.post('/api/users/forgetpsw', 'user.changePassword');
}
