const test = require('./test')
const auth = require('./Auth')
module.exports = (app) => {
    test(app);
    auth(app);
}