let dbMySQL = require('../dbAdmin');
let dbCOBOL = require('../dbMacro');
let dateFormat = require('dateformat');
let recibidoModel = {};


recibidoModel.getRecibidoFolioFac = (folio, alm, callback) => {
    if (dbCOBOL) {
        //console.log(idalmacen);
            dbCOBOL.query(`SELECT
                    VDOC_STAT2 as "estatus",
                    VREN_ART as "articulo",
                    VREN_CANT as "cantidad",
                    ART_DESC1 as "descripcion",
                    ART_COD2 as "codigo2",
                    VREN_POS as "posicion",
                    VREN_C_SURT as "cantsurt",
                    VDOC_FCH as "fecha",
                    VDOC_CLI_F as "cliente",
                    VDOC_VEND as "vendedor"
                    FROM PUBLIC.VENDOC 
                    INNER JOIN PUBLIC.VENREN ON VREN_FOL = VDOC_FOL
                    INNER JOIN PUBLIC.INVART ON ART_COD1 = VREN_ART
                 WHERE VDOC_FOL='` + folio +`'AND VDOC_ALM='` + alm + `'` , function(err, rows, moreResultSets) {
                if (err) {
                    console.log(err);
                    //callback(null,err.message)
                }
                else {                  
                    callback(null, rows);
                }
		    });
    }
};
//actualizar estatus
recibidoModel.CambiarEstatus = (folio,estatus, callback) => {
    if (dbCOBOL) {
        console.log(folio);
        console.log(estatus);
        dbCOBOL.queryResult(`UPDATE PUBLIC.VENDOC 
                        SET VDOC_STAT2='` + estatus + `'
                        WHERE VDOC_FOL='` + folio + `'`
                        , function(err, rows, moreResultSets) {
        if (err) {
            console.log("ERROR: " + err);
            callback(null,err.state)
                }   
        else {
            callback(null, "ok");
            }
        });
    }
};
//cambiar surtido
recibidoModel.CambiarSurtido = (folio,articulo,cantidad, callback) => {
    if (dbCOBOL) {
        console.log(folio);
        console.log(articulo);
        console.log(cantidad);
        dbCOBOL.queryResult(`UPDATE PUBLIC.VENREN 
                        SET VREN_C_SURT='` + cantidad + `'
                        WHERE VREN_FOL='` + folio + `'
                        AND VREN_ART='` + articulo + `'`
                        , function(err, rows, moreResultSets) {
        if (err) {
            console.log("algo salio mal: "+err);
            callback(null,err.state);
                }   
        else {
            callback(null, "ok");
            }
        });
    }
};

recibidoModel.GetNumSurtido = (folio, callback) => {
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT VSRT_SURT FROM PUBLIC.VENSRT
                        WHERE  VSRT_FOL='` + folio + `'`
                        , function(err, rows, moreResultSets) {
                            if (err) {
                                console.log(err);
                                //callback(null,err.message)
                            }
                            else {                  
                                callback(null, rows);
                            }
        });
    }
};
recibidoModel.AgregarSurtido = (ope,fol,pos,surt,cant,stat,fch,fch_fact,cli,fch_modif, callback) => {
    if (dbCOBOL) {
        dbCOBOL.queryResult(`INSERT INTO PUBLIC.VENSRT
        (VSRT_OPE,VSRT_FOL,VSRT_POS,VSRT_SURT,VSRT_CANT,VSRT_STAT,VSRT_FCH,VSRT_FCH_FACT,VSRT_CLI,VSRT_FCH_MODIF)
                        VALUES('` + ope + `',
                        '` + fol + `',
                        '` + pos + `',
                        '` + surt + `',
                        '` + cant + `',
                        '` + stat + `',
                        '` + fch + `',
                        '` + fch_fact + `',
                        '` + cli + `',
                        '` + fch_modif + `')`
                        , function(err, rows, moreResultSets) {
                            if (err) {
                                console.log(err);
                                //callback(null,err.message)
                            }
                            else {                  
                                callback(null, rows);
                            }
        });
    }
};
module.exports = recibidoModel;