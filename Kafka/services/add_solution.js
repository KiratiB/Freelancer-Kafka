var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
var mongoURL = "mongodb://localhost:27017/freelancer";

function handle_request(msg, callback) {

    var res = {};
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var o_id = new ObjectID(msg.req.project_id);
        console.log(msg.req.project_id);
        var coll = mongo.collection('project');
        coll.updateOne({'_id': o_id },
            {
                $set: {
                    submissionDetails: msg.req.submissionDetails
                }
            },
            {upsert : true},
            function (err, user){
                if(user)
                {
                    console.log("YO YO " + user);
                    res.code = "200";
                    res.value = "Solution updated successfully";
                    callback(null, res);
                }
                else {
                    res.code = "401";
                    res.value = "Internal Server Error";
                    callback(null, res);
                }
            })
    });
}
exports.handle_request = handle_request;