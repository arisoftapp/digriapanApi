var db = require('../dbAdmin');

let userModel = {};

//Read
userModel.getUser = (callback) => {
    if (db) {
        db.query("SELECT * FROM usuario ", (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                callback(null, rows);
            }
        });
    }
};

userModel.getUserByUsername = (username, callback) => {
    if (db) {
        db.query('SELECT a.*, b.id AS deviceId, b.deviceid AS device FROM usuario AS a INNER JOIN dispositivos_usuario AS b ON a.id = b.idusuario WHERE a.username = ?', [username], function(err, row) {
            if (err) {
                throw err;
            }
            else {
                callback(null, row);
            }
        });
    }
};

userModel.getDeviceID = (username, callback) => {
    if (db){
        query = 
        db.query(`SELECT a.id, a.deviceid FROM dispositivos_usuario as a
                  INNER JOIN usuario as b on a.idusuario = b.id
                  WHERE b.username = ?`, username, (err, row)=> {
            if (!err) {
                callback(null, row);
            }
            else {
                throw err;
            }
        });
    }
};

//Insert
userModel.insertUser = (userData, callback) => {

    if (db) {
        db.query('INSERT INTO usuario SET ?', userData,
            (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    callback(null, result);
                }
            }
        )
    }
};

module.exports = userModel;