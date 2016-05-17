//Modulos a cargar en el servidor
var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    compression = require('compression'),
    path = require('path'),
    config = require('./server/config/config'),
    mongoose = require('mongoose'),
    middleware = require("./server/controllers/middleware"),
    usersController = require('./server/controllers/userController'),
    twitterController = require('./server/controllers/twitterController'),
    session = require('express-session');

var app = express();

app.use(session({ secret: "very secret" }));


app.set('port', (process.env.PORT || config.port));

app.use(compression());
/*app.use(bodyParser({
    uploadDir: __dirname + '/uploads',
    keepExtensions: true
}));*/

app.use(methodOverride());

app.use(express.static(path.join(__dirname, './public')));
app.set('dbUrl', process.env.BBDD || config.db.test);
// connect mongoose to the mongo dbUrl
mongoose.connect(app.get('dbUrl'));
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.send(500, err.message);
});
//Configuramos express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// **************************************************************
//   API REST DE LA APP
// **************************************************************

/** Users **/
app.post("/api/login", usersController.login);
app.post("/api/register", usersController.register);
app.get("/api/user",usersController.getUsers);
app.get("/api/user/:id",usersController.getUser);
app.put("/api/user/:id",usersController.updateUser);
app.delete("/api/user/:id",usersController.deleteUser);

/** Twitter **/
/*app.get("/api/twitterAccount/:user", twitterController.getAccounts);//get lista de cuentas
app.post("/api/twitterAccount",twitterController.addAcount);//anadir cuenta (/:user? o en el body)
app.delete("/api/twitterAccount",twitterController.removeAccount);//eliminar cuenta
app.get("/api/twitterAccount/:user/:twitter", twitterController.getAccount);//devolver cosas de una cuenta
//publica tweet, no se si usar el mismo para los programados tambien
app.post("/api/twitterAccount/tweet", twitterController.tweet);

app.get("/api/hashtag/:user",twitterController.getHashtag);
app.post("/api/hashtag/",twitterController.addHashtag);
app.delete("/api/hashtag/",twitterController.removeHashtag);

app.get("/api/twitterAccount/popularity/:user/:twitter", twitter.Controller.getPopularTweets);//RT y FAVs
*/
//Para que es esto?
app.get("/auth/twitter", twitterController.getOauth);
app.get("/auth/twitter/callback", twitterController.callbackOauth);

/** Stats **/
app.get("/api/stats/:user");
app.get("/api/stats/:user/:twitter");

app.get("/admin/stats/accounts");
app.get("/admin/stats/access");
app.get("/admin/stats/resources");
app.get("/admin/stats/map");



//Zona privada
//app.get("/api/private/getUsers", middleware.ensureAuthenticated, usersController.getUsers);
//app.get("/api/private/getUsers", middleware.ensureAuthenticated, usersController.getUsers);

app.get('*', function(req, res){
  res.status(404).send('<h1>Tíííííííííííííííííííío no me toques la URL o te meto!!!!!!</h1>');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

