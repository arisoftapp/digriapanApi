const existencia = require('../models/existencia');

module.exports = function (app) {

    app.get('/existencia', (req, res) => {
        existencia.getExistencia((err, data) => {
            res.json({existencia: data});
        });
    });

    app.get('/existencia/:idalmacen/:codigoproducto', (req, res) => {
        let idalmacen = req.params.idalmacen;
        let codigoproducto = req.params.codigoproducto;
        existencia.getExistenciaById(idalmacen, codigoproducto, (err, data) => {
            res.json({existencia: data});
        });
    });

    app.get('/existencia/:idprod', (req, res) => {
        let idprod = req.params.idprod;
        existencia.getExistenciaAll(idprod, (err, data) => {
            res.json({existencia: data});
        });
    })
}
