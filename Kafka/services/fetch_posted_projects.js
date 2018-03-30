var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
// var mongoURL = "mongodb://localhost:27017/freelancer";
var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";
function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('project');
        console.log("USER ID EMPLOYER : " + msg.req.user_id);
        var o_id = new ObjectID(msg.req.user_id);
        coll.find({ 'userDetails._id' : msg.req.user_id  }).toArray(function (err, user1) {
            if (user1) {
                console.log("inside fetch posted projects --" + user1)
                res.code = "200";
                res.value = user1;
                callback(null, res);
            }
            else {
                res.code = "401";
                res.value = "Failed fetch skills";
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;