var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
// var mongoURL = "mongodb://localhost:27017/freelancer";
var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";
function handle_request(msg, callback) {

    var res = {};
    mongo.connect(mongoURL, function () {

        console.log("Inside Kafka hire FL");
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('project');
        console.log("Inside hire ");
        console.log(msg.req.project_id);
        console.log(msg.req.fl_id);
        var o_id = new ObjectID(msg.req.project_id);
        var hiredFL ='';
        coll.find({ '_id': o_id }).toArray(function (err, user1) {
            console.log(user1);
            if (user1) {
                user1[0].bid_user.map(user => {
                   if(user._id == msg.req.fl_id)
                   {
                       hiredFL = user;
                   }
                });
                coll.update({'_id': o_id },
                    {
                        $set: {
                            hired_freelancer: hiredFL,
                            project_status: 'Hiring'
                        }
                    },
                    function (err, user){
                        if(user)
                        {
                            res.code = "200";
                            res.value = "Successfully hired";

                            callback(null, res);
                        }
                        else{
                            res.code = "401";
                            res.value = "Internal Server Error";
                            callback(null, res);
                        }
                    })
            }
            else{
                res.code = "401";
                res.value = "Failed Bid Add";
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;