var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
// var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";
var mongoURL = "mongodb://localhost:27017/freelancer";

function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('project');
        //console.log("In handle request:" + JSON.stringify(msg));
        console.log(msg.req.project_id);
        console.log(msg.req.userId);
        //userId bid_value bid_period
        var o_id = new ObjectID(msg.req.project_id);
        //var user_entry = {"username": msg.req.username, "password":msg.req.password , "email": msg.req.email }
        coll.findOne({ '_id': o_id }, function (err, user1) {
            if (user1) {
                console.log(user1);
                console.log(msg.req.bid_value);
               // res.userId = user1.insertedId;
                msg.req.userId["bid_value"] = parseInt(msg.req.bid_value);
                msg.req.userId["bid_period"] = parseInt(msg.req.bid_period);
                var new_bid_count = parseInt(user1.bid_count)+1;
                var new_bid_avg = (parseInt(user1.bid_avg)+parseInt(msg.req.bid_value))/2;
                var old_bidded_users = user1.bid_user;
                old_bidded_users.push(msg.req.userId);

                console.log("----------------------------------------------");
                console.log(new_bid_avg);
                console.log(new_bid_count);
                console.log(old_bidded_users);
                console.log("----------------------------------------------");

                coll.update({ '_id': o_id }, {
                    $set: {
                        bid_count: new_bid_count,
                        bid_avg: new_bid_avg,
                        bid_user:old_bidded_users
                    }
                },function (err, user1) {
                    col2 = mongo.collection('userA');
                    var ou_id = new ObjectID(msg.req.userId._id);
                    console.log("ou_id : " + ou_id);
                    col2.update(
                        { '_id': ou_id},
                        { $push: {
                                "bid_project": {project_id : new ObjectID(msg.req.project_id) ,bid_value: msg.req.bid_value , bid_period:msg.req.bid_period }
                            }
                        },
                        {upsert:true}
                        , function(err, user1){
                            res.users = old_bidded_users;
                            res.code = "200";
                            res.value = "Success Bid Add";
                            callback(null, res);
                    });

                });
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