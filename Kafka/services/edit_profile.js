var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/freelancer";

function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('user');

        coll.find({ '_id' :new ObjectId(msg.req.userid)  }).toArray(function (err, user1) {
            if (user1) {
                console.log("inside edit profile --" + user1)
                res.code = "200";
                res.value = user1;
                callback(null, res);
            }
            else {
                res.code = "401";
                res.value = "Failed Edit Profile";
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;