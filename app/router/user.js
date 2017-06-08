'use strict'


module.exports = app => {
    app.post('/api/login', 'user.login');
    app.post('/api/users', 'user.register');
}
