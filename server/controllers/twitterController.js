/**
 * userContoller.js
 *
 * plantilla de controlador
 *
 * @type {exports|module.exports}
 */
var crypto = require('crypto'),
    oauth = require('oauth'),
    async = require('async'),
    twitter = require('../config/twitterConnection'),
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
                if (req.body.informacion == "" || req.body.informacion == null) {
                    req.session.info = "Sin información"
                } else {
                    req.session.info = req.body.informacion;
                }
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
                    var cuentaTwitter = {}
                    cuentaTwitter.id_twitter = results.user_id;
                    cuentaTwitter.cuenta = results.screen_name;
                    cuentaTwitter.access_token = oauth_access_token;
                    cuentaTwitter.access_token_secret = oauth_access_token_secret;
                    cuentaTwitter.info = req.session.info;

                    user.addAccount(req.session.user_id, cuentaTwitter, function (err, user) {
                        console.log(user);
                    })

                    res.redirect('/'); // You might actually want to redirect!
                }
            });
    },
    getTimelines: function(req,res,next){
        var data,data2,data3,data4,data5;
        async.parallel({
            one: function (callback) {
                oauth.get(twitter.acciones.user_timeline, req.params.accessToken, req.params.accessTokenSecret, function (e, res, result) {
                    callback(null,res);
                });
            },
            two: function (callback) {
                oauth.get(twitter.acciones.home_timeline, req.params.accessToken, req.params.accessTokenSecret, function (e, res, result) {
                    callback(null,res);
                });
            },
            three: function (callback) {
                oauth.get(twitter.acciones.mentions_timeline, req.params.accessToken, req.params.accessTokenSecret, function (e, res, result) {
                    callback(null,res);
                });
            },
            four: function (callback) {
                oauth.get(twitter.acciones.favorites_timeline, req.params.accessToken, req.params.accessTokenSecret, function (e, res, result) {
                    callback(null,res);
                });
            },
            five: function (callback) {
                oauth.get(twitter.acciones.retweets_timeline, req.params.accessToken, req.params.accessTokenSecret, function (e, res, result) {
                    callback(null,res);
                });
            }
        },function(err,results){
            res.status(200).json({error:0,
                user_timeline: JSON.parse(results.one),
                home_timeline: JSON.parse(results.two),
                mentions_timeline: JSON.parse(results.three),
                favorites_timeline: JSON.parse(results.four),
                retweets_timeline: JSON.parse(results.five)});
        });
    },
    addAccount:function(req,res,next){

    },
    getAccount:function(req,res,next){
        user.getUser(req.params.user, function (err,data) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id_twitter==req.paramas.twitter){
                        if (data != null) return res.status(200).send({error:0, cuenta: data.cuenta[i]});
                    }
                }
                return res.status(400).send({error: 1, mensaje: "Cuenta de twitter no existente"});
            }
            else return res.status(400).send({error: 1, mensaje: "Usuario no existente"});

        });
    },
    getAccounts:function(req,res,next){
        console.log(req.params);
        user.getUser(req.params.user, function (err,data) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            if (data != null) return res.status(200).send({error:0, cuentas: data.cuentas});
            else return res.status(400).send({error: 1, mensaje: "Usuario no existente"});
        });
    },
    removeAccount:function(req,res,next){
        user.removeAccount(req.params.id, req.params.id_twitter, function (err, data) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            else return res.status(200).send({error:0, cuentas: "Oka"});
        })

    },
    tweet:function(req,res,next){
        console.log(req.body.text);
        oauth.post(twitter.acciones.tweet,
            req.body.access_token, req.body.access_token_secret, {status: req.body.text},
            function (error, data, response2) {
                if(error){
                    console.log('Error: Something is wrong.\n'+JSON.stringify(error)+'\n');
                    res.status(400).json({error: 1, message: "error al tweetear"})
                }else{
                    console.log('Twitter status updated.\n');
                    console.log(response2+'\n');
                    res.status(200).json({error: 0, tweet: data})
                }
            });

    },
    programmedTweet: function(req,res,next){
        oauth.post(twitter.acciones.tweet,
            req.access_token, req.access_token_secret, {status: req.text},
            function (error, data, response2) {
                if(error){
                    console.log('Error: Something is wrong.\n'+JSON.stringify(error)+'\n');
                    res.status(400).json({error: 1, message: "error al tweetear"})
                }else{
                    console.log('Twitter status updated.\n');
                    console.log(response2+'\n');
                    res.status(200).json({error: 0, tweet: data})
                }
            });
    },
    getProgrammed : function(callback){
        user.getProgrammed(function(err,tweets){
            console.log(tweets);
            callback(err,tweets);
        });
    },
    getHashtags: function(req,res,next){
        user.getHashtags(req.body.email, function (err, hashtag) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            // llamada api
            res.status(200).send({error: 0, hashtag: hashtag});
        });
    },
    getHashtag: function(req,res,next){
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
}