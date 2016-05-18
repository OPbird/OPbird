var user = require('../model/users');

module.exports = {
    accountsStatistics: function (req, res) {
        user.getUsers(function (err, users) {
            var total = users.length;
            user.getDownsUsers(function (err, user) {
                if (err) res.status(500).send({error: 3, mensaje: "Server Error"});
                var ups = total - user.length;
                res.status(200).send({error:0, ups: ups, downs: user.length});
            });
        })
    }
};