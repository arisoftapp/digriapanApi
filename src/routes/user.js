const user = require('../models/user');

module.exports = function (app) {

    app.get('/user/:username', (req, res) => {
        var username = req.params.username;
        user.getUserByUsername(username, (err, data) => {
            res.json({user: data});
        });
    }); 

}