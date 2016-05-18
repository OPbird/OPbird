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
        this.getUser(_email,function(err,user){
            user.b_borrado = true;
            user.stats.baja = Date.now();
            add(user);
            callback(err);
        });
    },
    addAccount: function(_email,_account,callback){
        this.getUser(_email,function(err,user){
            user.cuentas.$push(_account);
            user.save();
            callback(err);
        });
    },
    getHashtag: function(_email, callback) {
        this.getUser(_email, function(err, user) {
            callback(err, user.hashtags);
        })
    },
    addHashtag: function(_email, hashtag, callback) {
        this.getUser(_email, function(err, user) {
            user.update({hashtags: hashtag}, function (err, hashtags) {
                callback(err, hashtags);
            })
        })
    },
    removeHashtag: function(_email, hashtag, callback) {
        this.getUser(_email, function(err, user) {
            // espera tú que me no sé cómo
        })
    }
}