var User = require('./models').User;

module.exports = {
    add: function(_newUser, callback) {
        var newUser = new User(_newUser);
        newUser.save(function(err){
            callback(err);
        });
    },
    getUsers: function(callback) {
        User.find({}, function(err, user) {
            callback(err, user);
        });
    },
    getUser: function(_email, callback) {
        User.findOne({email: _email}, function(err, user) {
            callback(err, user);
        })
    },
    removeUser: function(_email, callback){
        getUser(_email,function(err,user){
            user.b_borrado = true;
            user.stats.baja = Date.now();
            add(user);
            callback(err);
        });
    },
}