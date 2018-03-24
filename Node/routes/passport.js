var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in passport');
        kafka.make_request('login_topic',{"username":username,"password":password, "topic_c" : "login_topic_response"}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                console.log("ERROR KIRATI");
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    console.log("Kirati");
                    done(null,results);
                }
                else {
                    done(null,false);
                }
            }
        });
    }));
};
