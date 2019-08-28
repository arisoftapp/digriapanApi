let dbMySQL = require('../dbAdmin');
let dbCOBOL = require('../dbMacro');
let dateFormat = require('dateformat');
let existenciaModel = {};
//online
//existencia
existenciaModel.geteximacro = (idalmacen,codigoProducto,v, callback) => {
    if (dbCOBOL) {
        console.log(idalmacen);
        console.log(codigoProducto);
        console.log(v);
            dbCOBOL.query(`SELECT 
            ART_COD1 as 'codigo',
            ART_DESC1 AS 'descripcion',
            ART_SER AS 'serie',
            EXI_ACT as 'existenciaActual'
                    FROM
                    PUBLIC.INVEXI, 
                    PUBLIC.INVART
                 WHERE 
                 (((PUBLIC.INVART.ART_COD` + v +`)= '`+codigoProducto+`')
                 AND ((PUBLIC.INVEXI.EXI_ART)=ART_COD1)
                 AND ((PUBLIC.INVEXI.EXI_ALM)='`+idalmacen+`')
                 )
                 `, function(err, rows, moreResultSets) {
                if (err) {
                    console.log(err);
                }
                else {
                    callback(null, rows);
                }
		    });
    }
};
existenciaModel.getAdicional = (idalmacen, callback) => {
    if (dbCOBOL) {
        //console.log(idalmacen);
            dbCOBOL.query(`SELECT
                    ALM_ADIC_1 as "entrada",
                    ALM_ADIC_2 as "salida"
                    FROM PUBLIC.INVALM
                 WHERE ALM_LLAVE='` + idalmacen +`'`, function(err, rows, moreResultSets) {
                if (err) {
                    console.log(err);
                }
                else {
                    callback(null, rows);
                }
		    });
    }
};

existenciaModel.getserie = (serie,codigo, callback) => {
    if (dbCOBOL) {
        console.log(serie);
			dbCOBOL.query(`SELECT 
            SER_ALM AS 'almacen',
            SER_F_VEN AS 'Fventa'
                    FROM
                    PUBLIC.INVSER
                 WHERE SER_NUM='` + serie +`'
                 AND SER_ART='` + codigo +`'    
                 `, function(err, rows, moreResultSets) {
                if (err) {
                    console.log(err);
                }
                else {
                    callback(null, rows);
                }
		    });
    }
};
existenciaModel.getserieAll = (codigo,almacen, callback) => {
    if (dbCOBOL) {
        console.log(codigo);
        console.log(almacen);
			dbCOBOL.query(`SELECT 
            SER_ALM AS 'almacen',
            SER_NUM AS 'serie'
                    FROM
                    PUBLIC.INVSER
                 WHERE SER_ART='` + codigo +`'   
                 AND SER_ALM='` + almacen +`' 
                 AND SER_F_VEN=null  
                 `, function(err, rows, moreResultSets) {
                if (err) {
                    console.log(err);
                }
                else {
                    callback(null, rows);
                }
		    });
    }
};

//Read

existenciaModel.getExistencia = (callback) => {
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
                    c.ART_COD1 AS 'codigoProducto',
                    c.ART_COD2 AS 'codigoProducto2',
                    c.ART_DESC1 AS 'producto',
                    c.ART_CLF AS 'clasificacion', 
                    c.ART_F_ALT AS 'fechaAlta',
                    c.ART_F_MOD AS 'fechaModificacion',
                    b.ALM_LLAVE AS 'idalmacen',
                    b.ALM_NOMBRE AS 'almacen',
                    a.EXI_ACT as 'existenciaActual'
                 FROM
                    PUBLIC.INVEXI AS a
                        INNER JOIN
                    PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                        INNER JOIN
                    PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1
                    WHERE a.EXI_ACT>0
                    `
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
existenciaModel.getSoloExistencia = (idalmacen,callback) => {
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
             WHERE a.EXI_ALM='` + idalmacen +`'
             AND a.EXI_ACT>0    
             `
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
existenciaModel.getExistenciaAlm = (idalmacen, callback) => {
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
                    c.ART_COD1 AS 'codigoProducto',
                    c.ART_COD2 AS 'codigoProducto2',
                    c.ART_DESC1 AS 'producto',
                    c.ART_CLF AS 'clasificacion',
                    c.ART_F_ALT AS 'fechaAlta',
                    c.ART_F_MOD AS 'fechaModificacion',
                    b.ALM_LLAVE AS 'idalmacen',
                    b.ALM_NOMBRE AS 'almacen',
                    a.EXI_ACT as 'existenciaActual'
                 FROM
                    PUBLIC.INVEXI AS a
                        INNER JOIN
                    PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                        INNER JOIN
                    PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1
                    WHERE b.ALM_LLAVE='` + idalmacen +`'`, function(err, rows, moreResultSets) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        }); 
    }
};
existenciaModel.getExistenciaArtXAlm = (codigo, callback) => {
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
                    c.ART_COD1 AS 'codigo',
                    c.ART_COD2 AS 'codigo2',
                    c.ART_DESC1 AS 'descripcion',
                    c.ART_CLF AS 'clasificacion',
                    c.ART_UVEN AS 'uventa',
                    c.ART_PRE_1 AS 'precio',
                    b.ALM_LLAVE AS 'idalmacen',
                    b.ALM_NOMBRE AS 'almacen',
                    a.EXI_ACT as 'existenciaActual'
                 FROM
                    PUBLIC.INVEXI AS a
                        INNER JOIN
                    PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                        INNER JOIN
                    PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1
                    WHERE c.ART_COD1='` + codigo +`' 
                    AND a.EXI_ACT>0
                    OR c.ART_COD2='` + codigo +`'
                    AND a.EXI_ACT>0
                    `, function(err, rows, moreResultSets) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        }); 
    }
};
existenciaModel.getAlmacenes = (callback) => {
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
        ALM_LLAVE AS 'idalmacen',
        ALM_NOMBRE AS 'almacen'
                 FROM
                 PUBLIC.INVALM`
                 , function(err, rows) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        }); 
    }
};
existenciaModel.getCatalogoArticulo = (callback) => {
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
        ART_COD1 AS 'CodigoArticulo',
        ART_DESC1 AS 'Descripcion',
        ART_PRE_1 AS 'Precio01',
        ART_PRE_2 AS 'Precio02',
        ART_PRE_3 AS 'Precio03',
        ART_CLF AS 'Clasificacion',
        ART_UCOM AS 'UnidadCompra',
        ART_UVEN AS 'UnidadVenta',
        ART_F_ALT AS 'fechaAlta',
        ART_F_MOD AS 'fechaModificacion',
        ART_COS AS 'Costo'
                 FROM
                 PUBLIC.INVART`
                 , function(err, rows) {
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

existenciaModel.getExistenciaById = (idalmacen,  callback) => {
    if (dbCOBOL) {
        console.log(idalmacen);
       
        dbCOBOL.query(`SELECT 
                    b.ALM_LLAVE AS 'idalmacen',

                    c.ART_COD1 AS 'codigoProducto1',

                    a.EXI_ACT as 'existenciaActual'
                 FROM
                    PUBLIC.INVEXI AS a
                        INNER JOIN
                    PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                        INNER JOIN
                    PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1
                 WHERE a.EXI_ALM = '` + idalmacen + `'`, function(err, rows, moreResultSets) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        });
    }
};
//prueba

//modificar
existenciaModel.ModificarExistencia = (idalmacen, codigoarticulo, entrada,valor, callback) => {
    if (dbCOBOL) {
        console.log(idalmacen);
        console.log(codigoarticulo);
        console.log(entrada);    
        console.log(valor);   
        dbCOBOL.queryResult(`UPDATE PUBLIC.INVEXI 
        SET EXI_ACT='`+entrada+`',EXI_VAL='`+valor+`' 
        WHERE EXI_ART='` +codigoarticulo+`' 
        AND EXI_ALM='` + idalmacen + `'`,function(err, rows, moreResultSets) {
            if (err) {
                //console.log("error:" + err);
                throw err;
                    }   
            else {
                callback(null, rows);
                }
        });
        //dbCOBOL.closeSync;
    }
};
existenciaModel.ModificarAdicional = (idalmacen,entrada,salida, callback) => {
    if (dbCOBOL) {
        console.log(idalmacen); 
        console.log(entrada);
        console.log(salida);
        dbCOBOL.queryResult(`UPDATE PUBLIC.INVALM 
        SET ALM_ADIC_1='`+entrada+`',ALM_ADIC_2='`+salida+`' 
        WHERE ALM_LLAVE='`+idalmacen+`'`,function(err, rows, moreResultSets) {
            if (err) {
                //console.log("error:" + err);
                throw err;
                    }   
            else {
                callback(null, rows);
                }
        });
        //dbCOBOL.closeSync;
    }
};

existenciaModel.getCostoUnitario = (idalmacen, codigoarticulo, callback) => {
    if (dbCOBOL) {
        console.log(idalmacen);
        console.log(codigoarticulo);
        //console.log(entrada);
        dbCOBOL.query(`SELECT ART_COS as 'costo',EXI_VAL as 'valor'
                        FROM PUBLIC.INVEXI 
                        INNER JOIN
                        PUBLIC.INVART ON EXI_ART = ART_COD1
                        WHERE EXI_ART='` +codigoarticulo+`'
                        AND EXI_ALM='` + idalmacen + `'
                        `,function(err, rows, moreResultSets) {
        if (err) {
            console.log(err);
                }   
        else {
            callback(null, rows);
            }
        });
    }
};
existenciaModel.getPrueba = (tipo, folio,posicion, callback) => {
    if (dbCOBOL) {
        console.log(tipo);
        console.log(folio);
        console.log(posicion);
        let f="30/10/2018";
        let fecha="2018-10-16";
        console.log(f);
        dbCOBOL.query(`UPDATE PUBLIC.INVMOV 
                        SET IMOV_FCH='` + fecha + `'
                        WHERE IMOV_FOL='X'
                        AND IMOV_POS=3`, function(err, rows, moreResultSets) {
        if (err) {
            console.log("algo salio mal: "+err);
                }   
        else {
            callback(null, rows);
            }
        });
    }
};



existenciaModel.AjustesMacros = (tipoMovimiento,folio,posPartida,fecha,almacen,cantidad,articulo,costoUni,costeo,fechaSys,hora,fechaMod,callback) => {
    if(dbCOBOL)
    {
        
        let f="2019-01-16";
        //dateFormat(now,"shortDate");
        console.log("datos:")
        console.log("tipo movimiento:"+tipoMovimiento+" folio:"+folio+" pospartida:"+posPartida+" fecha:"+fecha+" almacen:"+almacen+" cantidad:"+cantidad+" articulo:"+articulo,costoUni,fechaSys,hora,fechaMod);
        //console.log(now);
        //*
        dbCOBOL.queryResult(`INSERT INTO PUBLIC.INVMOV(IMOV_OPE,
            IMOV_FOL,
            IMOV_POS,
            IMOV_POS_KIT,
            IMOV_TIPO,
            IMOV_FCH,
            IMOV_ALM,
            IMOV_MOV,
            IMOV_CANT,
            IMOV_ART,
            IMOV_COS_UNI,
            IMOV_COSTEO,
            IMOV_AJUS,
            IMOV_MON,
            IMOV_TCAM,
            IMOV_FCH_CAD,
            IMOV_USAL,
            IMOV_PESO_KGS,
            IMOV_CIA,
            IMOV_USU,
            IMOV_STAT,
            IMOV_ORDEN,
            IMOV_FCH_CIE,
            IMOV_TST,
            IMOV_CAJA,
            IMOV_ACT,
            IMOV_VAL,
            IMOV_FCH_SYS,
            IMOV_CANT_ENTR,
            IMOV_HORA,
            IMOV_NSURT,
            IMOV_CANC_FCH_SYS,
            IMOV_HORA_CANC,
            IMOV_USU_CANC,
            IMOV_HRA_REPARTO,
            IMOV_HRA_ENTREGA,
            IMOV_HRA_SURTIDA,
            IMOV_FCH_SURTIDA,
            IMOV_SURT,
            IMOV_FCH_ING_LOT,
            IMOV_FCH_MODIF,
            IMOV_CANT_PROD,
            IMOV_FCH_AVISO,
            IMOV_FCH_ENVIO,
            IMOV_FCH_RECEP)
        VALUES('`+tipoMovimiento+`',
        '`+folio+`',
        '` + posPartida + `',
        '0',
        '1',
        '` + fecha + `',
        '` + almacen + `',
        'A',
        '` + cantidad + `',
        '` + articulo + `',
        '` + costoUni + `',
        '` + costeo + `',
        '0',
        '0',
        '1',
        '0',
        '0',
        '0',
        '1',
        '1',
        'A',
        '1',
        '0',
        'N',
        '0',
        '0',
        '0',
        '` + fechaSys + `',
        '0',
        '` + hora + `',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '` + fechaMod + `',
        '0',
        '0',
        '0',
        '0')`,function(err,rows,moreResultSets)
        {
            if(err)
            {
                console.log("algo salio mal: "+err);
            }
            else{
                callback(null,rows);

            }
        })
        //*
        
    }
};

module.exports = existenciaModel;