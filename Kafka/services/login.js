var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/freelancer";

function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('userA');
        console.log("In handle request:" + JSON.stringify(msg));
        console.log(msg.username);
        console.log(msg.password);

        coll.findOne( {password :msg.password , $or: [ { username: msg.username }, { email: msg.username } ]  }, function (err, user1) {
            if (user1) {
                //console.log("inside call back" + user1._id)
                coll.findOne( {_id : user1._id}, function (err, userdetails) {
                    console.log("User Details" + JSON.stringify(userdetails));
                    if (userdetails) {
                        console.log("INSIDE USER Details")
                        res.code = "200";
                        res.value = "Success Login";
                        res.userId = user1._id;
                        res.userDetails = userdetails;
                        callback(null, res);
                    }
                    else{
                        console.log("INSIDE USER Details ERROR")
                        res.code = "200";
                        res.value = "Success Login";
                        res.userId = user1._id;
                        callback(null, res);
                    }
                });
            }
            else {
                console.log("Inside 401")
                res.code = "401";
                res.value = "Failed Login";
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;