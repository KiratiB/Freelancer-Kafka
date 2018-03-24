var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/freelancer";

function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('skill');

        coll.aggregate([
            { "$project": {
                    "id": "$_id",
                    "name":"$name"
                }}
            ]).toArray(function (err, user1) {
            if (user1) {
                console.log("inside call back" + user1)
                res.code = "200";
                res.value = "Success fetch skill";
                res.skill = user1;
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