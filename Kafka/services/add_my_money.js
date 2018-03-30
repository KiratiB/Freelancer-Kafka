var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
// var mongoURL = "mongodb://localhost:27017/freelancer";
var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";
function handle_request(msg, callback) {

    var res = {};
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var o_id = new ObjectID(msg.req.userId);
        var coll = mongo.collection('userA');
        coll.updateOne({'_id': o_id },
            {
                $set: {
                    myFund: parseInt(msg.req.amount)
                }
            },
            {upsert : true},
            function (err, user){
                if(user)
                {
                    // console.log("YO YO " + user);
                    res.code = "200";
                    res.value = "Money added Successfully";
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