/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


module.exports = {
    uri_request_token: "https://api.twitter.com/oauth/request_token",
    uri_access_token: "https://api.twitter.com/oauth/access_token",
    consumer_key: "pYGaMnp0f5HroAUdxNyZhhZLT",
    consumer_secret_key: "LSjwvq2AJnec2OKLylIM0v5VS4ql4B4yDONnz3K0Er0VETqrax",
    oauth_v: "1.0",
    uri_callback: "http://localhost:8080/auth/twitter/callback",
    signature: "HMAC-SHA1",
    acciones: {
        user_timeline: "https://api.twitter.com/1.1/statuses/user_timeline.json",
        mentions_timeline: "https://api.twitter.com/1.1/statuses/mentions_timeline.json",
        home_timeline: "https://api.twitter.com/1.1/statuses/home_timeline.json",
        favorites_timeline: "https://api.twitter.com/1.1/favorites/list.json",
        retweets_timeline: "https://api.twitter.com/1.1/statuses/retweets_of_me.json",
        tweet: "https://api.twitter.com/1.1/statuses/update.json"
    }
}