var cron = require('node-cron');
var twitter = require("../controllers/twitterController");
var user = require("../model/users");


module.exports = {
    programmedTweets: function(){
        cron.schedule('*/3 * * * * *', function(){
            //console.log("holi!!");
            twitter.getProgrammed(function (err,tweets) {
                if(err) throw err;
                else {
                    for(var i = 0;i<tweets.length;i++){
                        twitter.programmedTweet(tweets[i],function(err){
                        });
                    }
                }
            });
        })
    }
}



