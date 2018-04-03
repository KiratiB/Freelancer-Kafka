var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
// var mongoURL = "mongodb://localhost:27017/freelancer";
var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";
function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        console.log("Inside MAKE PAYMENT");
        var coll = mongo.collection('userA');
        var o_id = new ObjectID(msg.req.employer_id);
        // console.log(o_id);
        coll.find({ '_id': o_id }).toArray(function (err, user1) {
            if (user1) {
                // console.log(user1);
                var history = user1[0].transaction_history;
                msg.req.transaction['action'] = 'DEDUCT';
                history.push(msg.req.transaction);

                coll.update({ '_id': o_id },
                    {$set: {
                            transaction_history: history,
                            myFund: msg.req.myFund
                        }
                    }, function (err, user2) {
                    if(user2)
                    {
                        var f_id = new ObjectID(msg.req.freelancer_id);
                        console.log(f_id);
                        coll.find({ '_id': f_id }).toArray(function (err, user3) {
                            if (user3) {
                                // console.log(user3);
                                var historyF = user3[0].transaction_history;
                                msg.req.transaction.action = 'ADD';
                                historyF.push(msg.req.transaction);
                                console.log(msg.req.transaction.money);
                                console.log(user3[0].myFund);
                                var fund = user3[0].myFund + msg.req.transaction.money

                                coll.update({ '_id': f_id },
                                    {$set: {
                                            transaction_history: historyF,
                                            myFund: fund
                                        }
                                    }, function (err, user4) {
                                        if(user4)
                                        {
                                            console.log(o_id);
                                            coll.find({ '_id': o_id }).toArray(function(err, user5) {
                                                if (user5) {

                                                    var col2 = mongo.collection('project');
                                                    var ou_id = new ObjectID(msg.req.transaction.project_id);
                                                    console.log("ou_id : " + ou_id);
                                                    col2.update(
                                                        { '_id': ou_id},
                                                        { $set: {
                                                                "project_status":"Closed"
                                                            }
                                                        }
                                                        , function(err, user6){
                                                            res.code = "200";
                                                            res.value = user5[0];
                                                            callback(null, res);
                                                        });
                                                    console.log(user5[0]);
                                                }
                                                else {
                                                    res.code = "401";
                                                    res.value = "Failed fetch skills";
                                                    callback(null, res);
                                                }
                                            });
                                        }
                                        else{
                                            res.code = "401";
                                            res.value = "Internal Server Error";
                                            callback(null, res);
                                        }
                                    });
                            }
                            else {
                                res.code = "401";
                                res.value = "Internal Server Error";
                                callback(null, res);
                            }
                        });
                    }
                else{
                        res.code = "401";
                        res.value = "Internal Server Error";
                        callback(null, res);
                    }
            });
            }
            else {
                res.code = "401";
                res.value = "Internal Server Error";
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;