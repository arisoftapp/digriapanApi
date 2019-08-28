const user = require('../models/user');
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = function (app) {

    app.post('/log', (req, res) => {
        user.getUserByUsername(req.body.Username, (err, data) => {
            if (err) throw err;
            if (!data || data[0] === null) {
                //res.json({ success: false, message: 'Authentication failed. User not found.' });
                res.json({ hola: [{
                    message: 'El usuario no existe' 
                }] 
                });
            } else if (data) {
                if (data[0].password != req.body.Password) {
                    //res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    res.json({ 
                        hola: [{
                            message: 'Contraseña incorrecta'
                        }]
                    });
                } else{
                    const payload = {
                        email: data[0].email,
                        name: data[0].username,
                        idUsuario: data[0].id,
                        deviceId: data[0].deviceId,
                        device: data[0].device
                    };
                    var token = jwt.sign(payload, app.get('secret'), {
                        expiresIn: '10080m' // expires in half an hour
                    });
                    var expiraEn = new Date();
                    expiraEn.setMinutes(expiraEn.getMinutes() + 10080);
                    res.json({
                        success: true,
                        hola: [{
                            success: true,
                            message: 'Bienvenido ' + data[0].username,
                            expiresIn: expiraEn,
                            token: token,
                        }]
                    });
                }
                
            }
        });
    });

}