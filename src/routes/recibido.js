const recibido = require('../models/recibido');

module.exports = function (app) {

    app.get('/RecibidoFolioFac/:folio/:almacen', (req, res) => {
        let folio = req.params.folio;
        let almacen = req.params.almacen;
        recibido.getRecibidoFolioFac(folio, almacen, (err, data) => {
            res.json({recibido: data});
        });
    });
    app.post('/cambiarestatus/:folio/:estatus', (req, res) => {
        let folio = req.params.folio;
        let estatus = req.params.estatus;
        recibido.CambiarEstatus(folio,estatus, (err, data) => {
            if (err){
                res.status(500).send({message: 'Error'});
            }else{
                res.json({
                    success: true,
                    recibido: data
                });
            }
        });
    });
    app.post('/cambiarsurtido/:folio/:articulo/:cantidad', (req, res) => {
        let folio = req.params.folio;
        let articulo = req.params.articulo;
        let cantidad = req.params.cantidad;
        recibido.CambiarSurtido(folio,articulo,cantidad, (err, data) => {
            if (err){
                res.status(500).send({message: 'Error'});
            }else{
                res.json({
                    success: true,
                    recibido: data
                });
            }
        });
    });
    app.get('/numsurtido/:folio', (req, res) => {
        let folio = req.params.folio;
        recibido.GetNumSurtido(folio, (err, data) => {
            res.json({data: data});
        });
    });
    app.post('/agregarsurtido/:ope/:fol/:pos/:surt/:cant/:stat/:fch/:fchfact/:cli/:fchmodif', (req, res) => {
        let ope = req.params.ope;
        let fol = req.params.fol;
        let pos = req.params.pos;
        let surt = req.params.surt;
        let cant = req.params.cant;
        let stat = req.params.stat;
        let fch = req.params.fch;
        let fchfact = req.params.fchfact;
        let cli = req.params.cli;
        let fchmodif = req.params.fchmodif;
        recibido.AgregarSurtido(ope,fol,pos,surt,cant,stat,fch,fchfact,cli,fchmodif, (err, data) => {
            if (err){
                res.status(500).send({message: 'Error'});
            }else{
                res.json({
                    success: true,
                    recibido: data
                });
            }
        });
    });
    


}