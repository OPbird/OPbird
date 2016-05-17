/**
 * userContoller.js
 *
 * plantilla de controlador
 *
 * @type {exports|module.exports}
 */
var crypto = require('crypto');
    //User = require('../model/users.js');
var oauth = require('oauth');

var OAuth = require('oauth').OAuth
    , oauth = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "pYGaMnp0f5HroAUdxNyZhhZLT",
    "LSjwvq2AJnec2OKLylIM0v5VS4ql4B4yDONnz3K0Er0VETqrax",
    "1.0",
    "http://localhost:8080/auth/twitter/callback",
    "HMAC-SHA1"
);
module.exports = {
   getOauth: function(req, res){
      oauth.getOAuthRequestToken(function (error, oauth_token, oauth_token_secret, results) {
         if (error) {
            console.log(error);
            res.send("Authentication Failed!");
         }
         else {
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
             }
             else {
                console.log("Access Token: " + oauth_access_token + " Access Token Secret: " + oauth_access_token_secret)
                req.session.access_token = oauth_access_token;
                req.session.access_token_secret = oauth_access_token_secret;
                console.log(results, req.session.oauth);
                res.send("Authentication Successful");
                oauth.get( 'https://api.twitter.com/1.1/statuses/user_timeline.json'
                    , oauth_access_token
                    , oauth_access_token_secret
                    , function (e, data, result){
                       if (e) console.error(e);
                       console.log(JSON.parse(data));
                    });
                // res.redirect('/'); // You might actually want to redirect!
             }
          }
      );
   }
}