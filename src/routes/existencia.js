const existencia = require('../models/existencia');

module.exports = function (app) {

    app.get('/existencia', (req, res) => {
        existencia.getExistencia((err, data) => {
            res.json({existencia: data});
        });
    });
    app.get('/SoloExistencia/:idalmacen', (req, res) => {
        let idalmacen = req.params.idalmacen;
        existencia.getSoloExistencia(idalmacen,(err, data) => {
            res.json({
                items: data.length ,
                existencia: data,
            });
            console.log(data.length);
        });
    });
    app.get('/SoloExi/:idalmacen', (req, res) => {
        let idalmacen = req.params.idalmacen;
        existencia.getSoloExistencia(idalmacen,(err, data) => {
            res.json({
                
                items: data.length
            });
            console.log(data.length);
        });
    });
    app.get('/ExistenciaXAlm/:codigo', (req, res) => {
        let codigo = req.params.codigo;
        existencia.getExistenciaArtXAlm(codigo,(err, data) => {
            if (err){
                res.status(500).send({message: 'Error'});
            }else{
                res.json({
                    success: true,
                    Existencia: data
                });
            }
            console.log(data.length);
        });
    });

    app.get('/existencia/:idalmacen', (req, res) => {
        let idalmacen=req.params.idalmacen;
        existencia.getExistenciaAlm(idalmacen,(err, data) => {
            res.json({existencia: data});
        });
    });
    app.get('/almacenes', (req, res) => {
        existencia.getAlmacenes((err, data) => {
            res.json({almacenes: data});
        });
    });
    app.get('/CatalogoArticulo', (req, res) => {
        existencia.getCatalogoArticulo((err, data) => {
            res.json({CatalogoArticulo: data});
        });
    });
    //modificar existencia
    app.put('/modificarExistencia/:idalmacen/:codigoproducto/:entrada/:valor', (req, res) => {
        let idalmacen = req.params.idalmacen;
        let codigoproducto = req.params.codigoproducto;
        let entrada=req.params.entrada;
        let valor=req.params.valor;
        existencia.ModificarExistencia(idalmacen, codigoproducto,entrada,valor, (err, data) => {
            if (err){
                res.status(400).send(createErrorResponse(1, "Error executing query - SQL State: " + err.state + " Message: " + err.message));
            }
            else{
                res.json({existencia:[{"data":"xd","xd":"df"}]});
            }
        });
        
    });

    app.put('/modificarAdicionales/:idalmacen/:entrada/:salida', (req, res) => {
        let idalmacen = req.params.idalmacen;
        let entrada=req.params.entrada;
        let salida=req.params.salida;
        existencia.ModificarAdicional(idalmacen, entrada,salida, (err, data) => {
            if (err){
                res.status(400).send(createErrorResponse(1, "Error executing query - SQL State: " + err.state + " Message: " + err.message));
            }
            else{
                res.json({existencia:[{"data":"xd","xd":"df"}]});
            }
        });
        
    });

    //cargar costo unitario
    app.get('/costoUnitario/:idalmacen/:codigoproducto', (req, res) => {
        let idalmacen = req.params.idalmacen;
        let codigoproducto = req.params.codigoproducto;
        existencia.getCostoUnitario(idalmacen, codigoproducto, (err, data) => {
            res.json({costo: data});
        });
    });

    //hmovimientos de ajuste
    app.post('/agregarMovimiento/:tipoMovimiento/:folio/:posPartida/:fecha/:almacen/:cantidad/:articulo/:costoUni/:costeo/:fechaSys/:hora/:fechaMod', (req, res) => {
        let tipoMovimiento = req.params.tipoMovimiento;
        let folio = req.params.folio;
        let posPartida=req.params.posPartida;
        let fecha = req.params.fecha;
        let almacen = req.params.almacen;
        let cantidad=req.params.cantidad;
        let articulo = req.params.articulo;
        let costoUni = req.params.costoUni;
        let costeo=req.params.costeo;
        let fechaSys=req.params.fechaSys;
        let hora = req.params.hora;
        let fechaMod = req.params.fechaMod;
        existencia.AjustesMacros(tipoMovimiento,folio,posPartida,fecha,almacen,cantidad,articulo,costoUni,costeo,fechaSys,hora,fechaMod, (err, data) => {
  
            if (err){
                res.status(400).send(createErrorResponse(1, "Error executing query - SQL State: " + err.state + " Message: " + err.message));
            }
            else{
                res.json({existencia:[{"data":"xd","xd":"df"}]});
            }
        });
    });
/*
    app.get('/existencia/:idalmacen/:codigoproducto/:entrada', (req, res) => {
        let idalmacen = req.params.idalmacen;
        let codigoproducto = req.params.codigoproducto;
        existencia.getModificar(idalmacen, codigoproducto,entrada, (err, data) => {
            res.json({existencia: data});
        });
    });
*/
    app.get('/prueba/:tipo/:folio/:posicion', (req, res) => {
        let tipo = req.params.tipo;
        let folio = req.params.folio;
        let posicion = req.params.posicion;
        existencia.getPrueba(tipo, folio,posicion, (err, data) => {
            res.json({existencia: data});
        });
    });
    app.get('/adicionales/:almacen', (req, res) => {
        let almacen = req.params.almacen;
        existencia.getAdicional(almacen, (err, data) => {
            res.json({datos: data});
        });
    })
    app.get('/existencia/:idprod', (req, res) => {
        let idprod = req.params.idprod;
        existencia.getExistenciaAll(idprod, (err, data) => {
            res.json({existencia: data});
        });
    })
    app.get('/existenciaALM/:almacen', (req, res) => {
        let almacen = req.params.almacen;
        existencia.getExistenciaById(almacen, (err, data) => {
            res.json({existencia: data});
        });
    })

    //conexiones online
    //existencia de un articulo
    app.get('/existencia/:idalmacen/:codigoproducto/:validar', (req, res) => {
        let idalmacen = req.params.idalmacen;
        let codigoproducto = req.params.codigoproducto;
        let validar = req.params.validar;
        existencia.geteximacro(idalmacen, codigoproducto,validar, (err, data) => {
            res.json({existencia: data});
        });
    });
    app.get('/series/:serie/:codigo', (req, res) => {
        let serie = req.params.serie;
        let codigo=req.params.codigo;
        existencia.getserie(serie,codigo, (err, data) => {
            res.json({existencia: data});
        });
    });
    app.get('/seriescompletas/:codigo/:almacen', (req, res) => {
        let codigo=req.params.codigo;
        let almacen=req.params.almacen
        existencia.getserieAll(codigo,almacen, (err, data) => {
            res.json({series: data});
        });
    });

}
