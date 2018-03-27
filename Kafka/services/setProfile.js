var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
var mongoURL = "mongodb://localhost:27017/freelancer";

function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('userA');
        //console.log("In handle request:" + JSON.stringify(msg));
        //console.log(msg.req.userId);
        var o_id = new ObjectID(msg.req.userId);
        coll.update({ '_id': o_id }  ,
            { $set: {
                    "firstname": msg.req.firstname,
                    "lastname": msg.req.lastname,
                    "phonenumber": msg.req.phonenumber,
                    "aboutme": msg.req.aboutme,
                    "profileFile": msg.req.profileFile,
                    "userskills": msg.req.userskills,
                }
            },
            {upsert:true} ,
            function (err, user1) {
            if (user1) {
                console.log("USER ID :" +  user1);
                coll.findOne( { '_id': o_id }, function (err, userdetails) {
                    console.log("------------User Details ------" + JSON.stringify(userdetails));
                    if (userdetails) {
                        res.code = "200";
                        res.value = "Success Signup";
                        res.userId = user1._id;
                        res.userDetails = userdetails;
                        callback(null, res);
                     }
                    else {
                        res.code = "200";
                        res.value = "Success Signup";
                        res.userId = user1._id;
                        callback(null, res);
                    }
                });
            }
            else {
                res.code = "401";
                res.value = "Failed Signup";
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;