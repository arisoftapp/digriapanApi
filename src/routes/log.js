const user = require('../models/user');

module.exports = function (app) {

    app.post('/log', (req, res) => {
        user.getUserByUsername(req.body.Username, (err, data) => {
            if (err) throw err;
            if (!data) {
                //res.json({ success: false, message: 'Authentication failed. User not found.' });
                res.json({ message: 'El usuario no existe' });
            } else if (data) {
                console.log(data);
                console.log(req.body);
                if (data[0].password != req.body.Password) {
                    //res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    res.json({ message: 'Contraseña incorrecta' });
                } else{
                    res.json({
                        success: true,
                        message: 'Bienvenido ' + data[0].username,
                        usuario: [{
                            username: data[0].username,
                            email: data[0].email
                        }]
                    });
                }
                
            }
        });
    });

}