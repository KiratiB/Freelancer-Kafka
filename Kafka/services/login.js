var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/freelancer";
var auth = require('passport-local-authenticate');

function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('userA');
        console.log("In handle request:" + JSON.stringify(msg));
        console.log(msg.username);
        console.log(msg.password);

            coll.findOne({
                $or: [{username: msg.username}, {email: msg.username}]
            }, function (err, user1) {
                        if (user1) {
                            console.log(user1);
                            auth.verify(msg.password, user1.password, function(err, doesMatch) {
                            if(doesMatch) {
                                delete user1.password;
                                console.log("INSIDE USER Details")
                                res.code = "200";
                                res.value = "Success Login";
                                res.userId = user1._id;
                                res.userDetails = user1;
                                callback(null, res);
                            }
                            else
                            {
                                res.code = "401";
                                res.value = "Login Error";
                                callback(null, res);
                            }

                            });
                        }
                        else {
                            res.code = "401";
                            res.value = "Login Error";
                            callback(null, res);
                        }
                    });
            });
}
exports.handle_request = handle_request;