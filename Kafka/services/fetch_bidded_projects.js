var mongo = require("./mongo");
var ObjectID = require('mongodb').ObjectID;
// var mongoURL = "mongodb://localhost:27017/freelancer";
var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";

function handle_request(msg, callback) {
    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('userA');
        //console.log("USER ID FREELANCER : " + msg.req.user_id);
        var o_id = new ObjectID(msg.req.user_id);
        //{ 'bid_user._id' : msg.req.user_id  }
        var project_ids = [];
        var project_details = [];


        coll.aggregate([
            {
                $unwind: "$bid_project"
            },
            {
                $lookup:
                    {
                        from: "project",
                        localField: "bid_project.project_id",
                        foreignField: "_id",
                        as: "project_details"
                    }
            },
            {
                $match: { "project_details": { $ne: [] }, '_id':o_id }
            }
        ]).toArray(function (err, user1) {
           if(user1)
           {
               console.log(user1);
               for(var i = 0 ; i < user1.length ; i++)
               {
                   project_details.push({project_details : user1[i].project_details, my_bid: user1[i].bid_project.bid_value})
               }
               console.log(project_details);
               res.code = "200";
               res.value = project_details;
               callback(null, res);
           }
        });


        //
        // coll.find({'_id': o_id}).toArray(function (err, user1) {
        //     if (user1) {
        //         for (var i = 0; i < user1[0].bid_project.length; i++) {
        //             project_ids.push(user1[0].bid_project[i].project_id);
        //         }
        //         console.log("ARRAY PROJECT_ID " +  project_ids);
        //         for (var j = 0; j < project_ids.length; j++) {
        //             //p_id = new ObjectID(project_ids[i]);
        //             coll = mongo.collection('project');
        //             coll.find({'_id': new ObjectID(project_ids[j]) }).toArray(function (err, user2) {
        //                 console.log(JSON.stringify(user2));
        //                 project_details.push(user2);
        //         });
        //         }
        //         if(project_details.length === project_ids.length) {
        //             console.log(project_details.length);
        //             console.log(project_details);
        //             res.code = "200";
        //             res.value = project_details;
        //             callback(null, res);
        //         }
        //     }
        // });
    });
}
exports.handle_request = handle_request;