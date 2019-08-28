const express = require('express');
const cors = require('cors');
const server = express();
//const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');

server.use(cors({ credentials: true, origin: true }));
//settings
const port = process.env.PORT || 3002; //Puerto de VIP Cell
server.set('port', process.env.PORT || 3002);
//server.set('secret', config.secret);
//middleware
server.use(morgan('dev'));
server.use(bodyParser.json());
// Rutas
//require('./routes/authenticate')(server);
require ('./routes/almacen')(server);
require ('./routes/log')(server);
require ('./routes/user')(server);
require ('./routes/existencia')(server);
require ('./routes/ajuste')(server);
/*//Middleware to check whether you're auth - Todas las rutas arriba estan desprotegidas
server.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, server.get('secret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Falló la autenticación del token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(405).send({
            success: false,
            message: 'No token provided.'
        });

    }
});
//// Middleware token - Todas las rutas bajo esto estaran protegidas \\\\
//require('./routes/articulo')(server);*/

server.listen(server.get('port'), () => {
    console.log("VIPCell-WS Started successfuly in the port 3002");
});