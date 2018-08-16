let dbMacro = require('../dbMacro');
let almacenModel = {};

//Read

almacenModel.getAlmacen = (callback) => {
    if (dbMacro) {
        dbMacro.query("SELECT ALM_LLAVE as 'id', ALM_NOMBRE as 'descripcion' FROM PUBLIC.INVALM ", (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                callback(null, rows);
            }
        });
    }
};

module.exports = almacenModel;