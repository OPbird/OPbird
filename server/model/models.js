/**
 * models.js
 *
 * Aqui se declararan todos los modelos de
 * nuestra app
 *
 * @type {*|exports|module.exports}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// define the userSchema
var userSchema = new Schema({
    email: {type: String, require: true, unique: true},
    pass: {type: String, require: true},
    nombreCompleto: {type: String, require: true},
    username: {type: String, require: true},
    bvalid: {type: Number, default: 1},
    created_at: {type: Date, default: Date.now}
});

// Export the User model
exports.User = mongoose.model('User', userSchema);
