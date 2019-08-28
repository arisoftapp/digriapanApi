const ajuste = require('../models/ajuste');

module.exports = function (app) {

    app.get('/sinconteo/:alm/:cadena', (req, res) => {
        let cadena = req.params.cadena;
        var idalmacen = req.params.alm;
        /*var codigosArray = req.body.params;
        var codigos = "'";
        for (i = 0; i < codigosArray.length; i++) { 
            codigos = codigos  + codigosArray[i].cod_prod;
            if (i === (codigosArray.length - 1)) {
                codigos = codigos + "'";
            }else {
                codigos = codigos + "','";
            }
        }*/
        console.log(cadena);

        ajuste.getSinConteo(idalmacen, cadena, (err, data) => {
            if (err){
                res.status(500).send({message: 'Error al obtener ID de conteo'});
            }else{
                res.json({
                    success: true,
                    message: 'Consulta con éxito',
                    data: data,
                });
            }
        });
    });
                
}