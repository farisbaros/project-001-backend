const controller = require('./Controller');

module.exports = (app) => {
    app.post('/login', controller.login);
    app.post('/signup', controller.signup)
}