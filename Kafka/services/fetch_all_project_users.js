var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
// var mongoURL = "mongodb://localhost:27017/freelancer";
var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";

function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('project');
        console.log(msg.req.project_id);
        var o_id = new ObjectID(msg.req.project_id);
        coll.findOne({ '_id': o_id }, function (err, user1) {
            if (user1) {
                console.log(user1);
                console.log("****************************");
                console.log(user1.bid_user);
                res.users = user1.bid_user;
                res.code = "200";
                res.value = "Successfully user fetch";
                callback(null, res);
            }
            else {
                res.code = "401";
                res.value = "Failed Bid Add";
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;