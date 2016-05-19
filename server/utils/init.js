var user = require('../model/users');
var crypto = require('crypto');

module.exports = {
    createAdmin: function() {
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
    },
    insertSomeUsers: function () {
        user.getUsers(function (err, users) {
            if (users.length < 30) {
                for(var i = 0; i < 30; i++) {
                    var email = "prueba" + i;
                    var pass = "1234";
                    var _user = {
                        "email": email, "password": crypto.createHash('sha1').update(pass).digest('base64'), "b_borrado": Math.random() >= 0.5
                    };
                    user.add(_user, function (err) {

                    });
                }
            }
        });
    }
};

