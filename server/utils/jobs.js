var cron = require('node-cron');
var twitter = require("../controllers/twitterController");


module.exports = {
    programmedTweets: function(){
        cron.schedule('*/1 * * * * *', function(){
            console.log('Hola hola hola');
        })
    }
    
    
}



