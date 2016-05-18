var user = require('../model/users');
var crypto = require('crypto');

module.exports = {
    createAdminIfNotExists: function() {
        var email = "admin";
        var pass = "admin";
        var _user = {
            "email": email, "password": crypto.createHash('sha1').update(pass).digest('base64'),
            "admin": true
        };
        user.removeAdmin(function (err) {
            user.add(_user, function (err) {
                if (!err) {
                    console.log("System init");
                }
            })
        })
    }
};

