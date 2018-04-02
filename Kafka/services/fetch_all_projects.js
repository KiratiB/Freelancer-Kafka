var mongo = require("./mongo");
// var mongoURL = "mongodb://localhost:27017/freelancer";
var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";
function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('project');

        coll.find({project_status: "Open"}).toArray(function (err, user1) {
            if (user1) {
                console.log("inside call back" + JSON.stringify(user1))
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