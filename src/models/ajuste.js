let dbMySQL = require('../dbAdmin');
let dbCOBOL = require('../dbMacro');
let ajusteModel = {};


ajusteModel.getSinConteo = (idalmacen, codigos, callback) => {
    //console.log(idalmacen);
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
        c.ART_COD1 as 'codigo',
        c.ART_DESC1 AS 'descripcion',
        c.ART_SER AS 'serie',
        a.EXI_ACT as 'existenciaActual'
                FROM
                PUBLIC.INVEXI AS a
                    INNER JOIN
                PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                    INNER JOIN
                PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1
             WHERE a.EXI_ALM='` + idalmacen +`' AND (a.EXI_ACT > 0) AND c.ART_COD1 NOT IN (` + codigos + `) `
                 , function(err, rows, moreResultSets) {
            if (err) {
                //console.log(err);
                throw err;
            }
            else {
                callback(null, rows);
            }
        }); 
    }
};

module.exports = ajusteModel;