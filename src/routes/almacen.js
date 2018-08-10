const almacen = require('../models/almacen');

module.exports = function (app) {

    app.get('/almacen', (req, res) => {
        almacen.getAlmacen((err, data) => {
            res.json({almacenes: data});
        });
    });

    app.get('/almacen/:id', (req, res) => {
        var id = req.params.id;
        almacen.getAlmacenById(id, (err, data) => {
            res.json({almacen: data});
        });
    });
} 