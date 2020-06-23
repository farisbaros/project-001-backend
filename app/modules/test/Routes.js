const controller = require('./Controller');

module.exports = (app) => {
    app.route('/test')
        .get(controller.get)
        .post(controller.post)
    
    app.route('/test/:id')
        .get(controller.getById)
        .put(controller.put)
        .delete(controller.deletes)
}