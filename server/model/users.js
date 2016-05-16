var User = require('./models').User;

module.exports = {
    add: function(newUser_, callback) {
        var newUser = new User(newUser_);
        newUser.save(function(err){
            callback(err);
        });
    },
    removeUser: function(email_, callback){
        User.remove({email: email_}, function(err){
            callback(err);
        });
    },
    getUsers: function(callback) {
        User.find({}, function(err, user) {
            callback(err, user);
        });
    },
    getUser: function(email_, callback) {
        User.findOne({email: email_}, function(err, user) {
            callback(err, user);
        })
    },
    login: function(_user,callback) {
        User.findOne({email: _user.email, pass: _user.pass}, function(err, user){
            if (err) throw err;
            callback(err,user)
        })
    }
}