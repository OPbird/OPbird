var user = require('../model/users');
var moment = require('moment');


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
    },
    lastAccessStatistics: function (req, res) {
        user.getUsers(function (err, users) {
            var today = moment(new Date()).format("YYYY-MM-DD");
            var todayAccess = 0;
            var threeDaysAccess = 0;
            var weekAccess = 0;
            var monthAccess = 0;
            var beyondMonth = 0;
            users.forEach(function (user) {
                var userDate = moment(new Date(user.stats.ultimo_acceso.toDateString())).format("YYYY-MM-DD");
                var remainingDate = moment(today).diff(userDate, 'days');
                if (remainingDate == 0) {
                    todayAccess++;
                } else if (remainingDate < 3) {
                    threeDaysAccess++;
                } else if (remainingDate < 7) {
                    weekAccess++;
                } else if (monthAccess < 30) {
                    monthAccess++;
                } else {
                    beyondMonth++
                }
            });
            res.status(200).send({error: 0, todayAccess: todayAccess, threeDaysAccess: threeDaysAccess,
                weekAccess: weekAccess, monthAccess: monthAccess, beyondMonth: beyondMonth});
        })
    }
};