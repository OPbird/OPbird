var user = require('../model/users');
var crypto = require('crypto');

module.exports = {
    createAdminIfNotExists: function() {
        var pass = "admin";
        var _user = {
            "email": "admin", "password": crypto.createHash('sha1').update(pass).digest('base64')
        };
        user.add(_user, function (err) {
            if(err) {
                if (err.code == 11000) {
                    console.log("Admin already in db");
                } else {
                    console.log("Error crating admin");
                }
            } else {
                console.log("Admin created");
            }
        })
    }
};

