/**
 * userContoller.js
 *
 * plantilla de controlador
 *
 * @type {exports|module.exports}
 */
var crypto = require('crypto'),
    oauth = require('oauth'),
    twitter = require('../config/twitterConnection');
    user = require('../model/users');

var OAuth = require('oauth').OAuth,
    oauth = new OAuth(
        twitter.uri_request_token,
        twitter.uri_access_token,
        twitter.consumer_key,
        twitter.consumer_secret_key,
        twitter.oauth_v,
        twitter.uri_callback,
        twitter.signature
    );


module.exports = {
    prueba: function (req, res) {
        oauth.get( twitter.acciones.user_timeline
            , "284462392-qT1hXHOomD6K1SnjqWYkMwDdFX2zotTKVSZjHgnx"
            , "scAPiEIsZsLzJO7xHmeVBexq6pCX0qEMEDdqkGnuCSx5M"
            , function (e, data, result){
                res.status(200).send(data);
            });
    },

    getOauth: function(req, res){
        oauth.getOAuthRequestToken(function (error, oauth_token, oauth_token_secret, results) {
            if (error) {
                console.log(error);
                res.send("Authentication Failed!");
            } else {
                req.session.user_id = req.body.user;
                req.session.oauthRequestToken = oauth_token;
                req.session.oauthRequestTokenSecret = oauth_token_secret;
                console.log(req.session.oauthRequestToken + "  - ---  - " + req.session.oauthRequestTokenSecret)
                res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token)
            }
        });
    },
    callbackOauth:function(req, res, next) {
        oauth.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier,
        function(error, oauth_access_token, oauth_access_token_secret, results) {
            if (error) {
                console.log(error);
                res.send("Authentication Failure!");
            } else {
                console.log("Email user " + req.session.user_id)
                console.log("Access Token: " + oauth_access_token + " Access Token Secret: " + oauth_access_token_secret)
                req.session.access_token = oauth_access_token;
                req.session.access_token_secret = oauth_access_token_secret;
                console.log(results, req.session.oauth);
                /*id_twitter:{type: String},
                cuenta:{type: String},
                access_token:{type: String},
                access_token_secret:{type: String},
                info:{type: String},
                tweetP: [ //A publicar
                    {
                        fecha: {type: Date},
                        text:{type:String}
                    }
                ]*/
                var cuentaTwitter = {}
                cuentaTwitter.id_twitter = results.user_id;
                cuentaTwitter.cuenta = results.cuenta;
                cuentaTwitter.access_token = oauth_access_token;
                cuentaTwitter.access_token_secret = oauth_access_token_secret;
                cuentaTwitter.info = "Es muy chuchu chuli";
                
                user.
                console.log(cuentaTwitter);

                res.redirect('/'); // You might actually want to redirect!
            }
        });
    },
    addAccount:function(req,res,next){

    },
    getAccount:function(req,res,next){
        
    },
    getAccounts:function(req,res,next){

    },
    removeAccount:function(req,res,next){

    },
    tweet:function(req,res,next){

    },
    getHashtag:function(req,res,next){
        user.getHashtag(req.body.email, function (err, hashtag) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            // llamada api
            res.status(200).send({error: 0, hashtag: hashtag});
        });
    },
    addHashtag:function(req,res,next){
        user.addHashtag(req.body.email, req.body.hashtag, function (err, hashtag) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            res.status(200).send({error: 0, hashtag: hashtag});
        })
    },
    removeHashtag:function(req,res,next){
        user.removeHashtag(req.body.email, req.body.hashtag, function (err, hashtags) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            res.status(200).send({error: 0, hashtag: hashtag});
        })
    },
    getPopularTweets:function(req,res,next){

    },
}