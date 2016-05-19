var cron = require('node-cron');
var twitter = require("../controllers/twitterController");


module.exports = {
    programmedTweets: function(){
        cron.schedule('*/3 * * * * *', function(){
            console.log("holi!!");
            twitter.getProgrammed(function (err,tweets) {
                if(err) throw err;
                else {
                    console.log(tweets);
                }
            });
        })
    }
    
    
}



