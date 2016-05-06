var conf = require('../server/config/config'),
    expect = require('chai').expect,
    users = require('../server/model/users.js');
var now = Date.now();

describe('Base de datos', function(){
    describe('#Usuarios', function(){
        it('Debe crear un nuevo usuario', function(done){
            //Aumento el time-out
            users.removeUser("test@test.com", function(){});
            this.timeout(30000);
            var user = {
                email: "test@test.com",
                pass: "asdfadfadsfa",
                nombreCompleto: "Doctor",
                username: "Dow"
            };
            return users.add(user, function(err){
                expect(err).to.equal(null);
                done();
            });
        }),
        it('Buscar un usuario', function(done){
            //Aumento el time-out
            return users.getUser("test@test.com", function(err, user){
               // console.log(user);
                expect(err).to.equal(null);
                done();
            });
        })
    })

});