let dbMySQL = require('../dbAdmin');
let dbCOBOL = require('../dbMacro');

let existenciaModel = {};

//Read

existenciaModel.getExistencia = (callback) => {
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
                    c.ART_COD1 AS 'codigoProducto',
                    c.ART_DESC1 AS 'producto',
                    b.ALM_LLAVE AS 'idalmacen',
                    b.ALM_NOMBRE AS 'almacen',
                    a.EXI_ACT as 'existenciaActual'
                 FROM
                    PUBLIC.INVEXI AS a
                        INNER JOIN
                    PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                        INNER JOIN
                    PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1`
                 , function(err, rows, moreResultSets) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        }); 
    }
};

existenciaModel.getExistenciaAll = (codigoarticulo, callback) => {
    if (dbCOBOL) {
        console.log(codigoarticulo);
			dbCOBOL.query(`SELECT 
                    b.ALM_LLAVE AS 'idalmacen',
                    b.ALM_NOMBRE AS 'almacen',
                    c.ART_DESC1 AS 'producto',
                    c.ART_COD1 AS 'codigoProducto',
                    a.EXI_ACT as 'existenciaActual'
                 FROM
                    PUBLIC.INVEXI AS a
                        INNER JOIN
                    PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                        INNER JOIN
                    PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1
                 WHERE  a.EXI_ART = '` + codigoarticulo +`'`, function(err, rows, moreResultSets) {
                if (err) {
                    console.log(err);
                }
                else {
                    callback(null, rows);
                }
		    });
    }
};




existenciaModel.getExistenciaById = (idalmacen, codigoarticulo, callback) => {
    if (dbCOBOL) {
        console.log(idalmacen);
        console.log(codigoarticulo);
        dbCOBOL.query(`SELECT 
                    b.ALM_LLAVE AS 'idalmacen',
                    b.ALM_NOMBRE AS 'almacen',
                    c.ART_DESC1 AS 'producto',
                    c.ART_COD1 AS 'codigoProducto',
                    a.EXI_ACT as 'existenciaActual'
                 FROM
                    PUBLIC.INVEXI AS a
                        INNER JOIN
                    PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                        INNER JOIN
                    PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1
                 WHERE a.EXI_ALM = '` + idalmacen + `' AND a.EXI_ART = '` + codigoarticulo +`'`, function(err, rows, moreResultSets) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        });
    }
};

existenciaModel.recibirPeticion = (callback) => {

};

module.exports = existenciaModel;