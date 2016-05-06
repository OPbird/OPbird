var conf = require('../server/config/config'),
    expect = require('chai').expect,
    request = require('supertest'),
    express = require('express'),
    assert = require('assert'),
    request = require("request"),
    app = require('../main'),
    users = require('../server/model/users.js'),
    base_url = "http://localhost:8080/"
var event = {};

var token = "";
//Test del servidor
describe('Controller', function(){
    var url = "http://localhost:8080"
    //Comprobamos que el test esta corriendo
    it("returns status code 200", function(done) {
        request.get(base_url, function(error, response, body) {
            //expect(response.statusCode).toBe(200);
            assert.equal(200, response.statusCode);
            done();
        })
    })
    it('Llamada para crear usuario correctamente', function(done){
        //Aumento del timeout por internet
        this.timeout(30000);
        users.removeUser("controller@test.com", function(){});
        request({
            url: base_url + 'api/registrar', //URL to hit
            method: 'POST', //Specify the method
            json: {
                username: "PRuebaControllers",
                nombreCompleto: "(V)(º,,,,º)(V)",
                email: "controller@test.com",
                pass: "PaSSegura"
            }
        }, function(error, response, body){
            //console.log(body);
            expect(200).to.equal(response.statusCode);
            done();
        });
    })
    it('Llamada para crear usuario previamente introducido', function(done){
        //Aumento del timeout por internet
        this.timeout(30000);
        //users.removeUser("controller@test.com", function(){});
        request({
            url: base_url + 'api/registrar', //URL to hit
            method: 'POST', //Specify the method
            json: {
                username: "PRuebaControllers",
                nombreCompleto: "(V)(º,,,,º)(V)",
                email: "controller@test.com",
                pass: "PaSSegura"
            }
        }, function(error, response, body){
            //console.log(body);
            expect(400).to.equal(response.statusCode);
            expect(1).to.equal(body.error);
            done();
        });
    })
    it('Llamada login contrasenyas no coinciden', function(done){
        //Aumento del timeout por internet
        this.timeout(30000);
        //users.removeUser("controller@test.com", function(){});
        request({
            url: base_url + 'api/login', //URL to hit
            method: 'POST', //Specify the method
            json: {
                email: "controller@test.com",
                pass: "OtraPass"
            }
        }, function(error, response, body){
            //console.log(body);
            expect(400).to.equal(response.statusCode);
            expect(2).to.equal(body.error);
            done();
        });
    })
    it('Llamada login correctamente', function(done){
        //Aumento del timeout por internet
        this.timeout(30000);
        //users.removeUser("controller@test.com", function(){});
        request({
            url: base_url + 'api/login', //URL to hit
            method: 'POST', //Specify the method
            json: {
                email: "controller@test.com",
                pass: "PaSSegura"
            }
        }, function(error, response, body){
            //console.log(body);
            //console.log(body.usuario);
            token = body.token;
            expect(200).to.equal(response.statusCode);
            expect(0).to.equal(body.error);
            done();
        });
    })
    it('Entrar a la parte privada', function(done){
        //Aumento del timeout por internet
        this.timeout(30000);
        //console.log(token);
        //users.removeUser("controller@test.com", function(){});
        request({
            url: base_url + 'api/private/getUsers', //URL to hit
            method: 'GET', //Specify the method
            headers: {
                authorization: token,
                user_id : "controller@test.com"
            }
        }, function(error, response, body){
            //console.log(body);
            //console.log(body.token);
            //token = body.token;
            expect(200).to.equal(response.statusCode);
            //expect(0).to.equal(body.error);
            done();
        });
    })


});
